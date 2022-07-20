/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TableHelper, WhereCondition } from '@databases/pg-typed'
import { Service } from 'typedi'
import { Connections } from '../../../../../../Server/Application/Shared/Database/Repositories/IRepository'
import { CaseSerializer } from '../../../../../../Server/Application/Shared/Serializers/CaseSerializer'
import { BaseEntity } from '../../../../../../Server/Domain/Entities/BaseClasses/BaseEntity'
import { TestDbConnection } from '../TestDbConnection'

@Service()
export abstract class BaseEntitySetup<
    Entity extends BaseEntity,
    DbEntity,
    DbInsertableEntity
  > {
  abstract table : TableHelper<DbEntity, DbInsertableEntity, 'defaultConnection'>

  protected connection = TestDbConnection.db

  public EntitiesToDispose : Array<Entity> = []

  async Create(model: Partial<Entity>, connection?: Connections): Promise<Entity> {
    const dbConnection = connection || TestDbConnection.db

    const entity = this.CleanEntity(model)

    const serializedEntity = CaseSerializer.CastToSnake<Partial<Entity>, DbInsertableEntity>(entity)

    const [inserted] = await this.table(dbConnection).insert(serializedEntity)

    const deserializedEntity = CaseSerializer.CastToCamel<DbEntity, Entity>(inserted)

    this.EntitiesToDispose.push(deserializedEntity)

    return deserializedEntity
  }

  async FindOne(query: Partial<Entity>, connection?: Connections): Promise<Entity> {
    const dbConnection = connection || TestDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(query)

    const entity = await this.table(dbConnection).findOne(serializedQuery)

    return CaseSerializer.CastToCamel<DbEntity, Entity>(entity)
  }

  async FindAll(query: Partial<Entity>, connection?: Connections): Promise<Entity[]> {
    const dbConnection = connection || TestDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(query)

    const entities = await this.table(dbConnection).find(serializedQuery).all()

    return CaseSerializer.CastArrayToCamel<DbEntity, Entity>(entities)
  }

  async Delete(query: Partial<Entity>, connection?: Connections): Promise<void> {
    const dbConnection = connection || TestDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(query)

    await this.table(dbConnection).delete(serializedQuery)
  }

  async DeleteById(id : number, connection?: Connections): Promise<void> {
    const dbConnection = connection || TestDbConnection.db

    await this.table(dbConnection).delete({ id } as unknown as WhereCondition<DbEntity>)
  }

  async CleanUp() : Promise<void> {
    for (const entity of this.EntitiesToDispose) {
      await this.PreCleanUp(entity)
      await this.DeleteById(entity.id)
    }
  }

  async UpdateOne(
    updateQuery: Partial<Entity>, entity: Partial<Entity>, connection?: Connections,
  ): Promise<boolean> {
    const dbConnection = connection || TestDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(updateQuery)

    const serializedEntity = CaseSerializer.CastToSnake<Partial<Entity>, Partial<DbEntity>>(entity)

    const [updatedEntities] = await this.table(dbConnection).update(
      serializedQuery,
      { ...serializedEntity },
    )

    return !!updatedEntities
  }

  private CleanEntity(model: Partial<Entity>) : Partial<Entity> {
    const entity = { ...model }

    Object.entries(entity).forEach(([key, value]) => {
      if (!value && key === 'id') {
        delete entity[key]
      }
    })

    return entity
  }

  async PreCleanUp(_entity : Entity) {
    // If necessary to make a pre clean up for an entity, ex.: when it has related data on pivot tables
  }
}
