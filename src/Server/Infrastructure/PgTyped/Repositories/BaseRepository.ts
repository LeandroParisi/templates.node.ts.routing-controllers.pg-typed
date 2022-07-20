/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { TableHelper, WhereCondition } from '@databases/pg-typed'
import { Service } from 'typedi'
import DateUtils from '../../../../Commons/Utils/DateUtils'
import { Connections, IBaseRepository } from '../../../Application/Shared/Database/Repositories/IRepository'
import { CaseSerializer } from '../../../Application/Shared/Serializers/CaseSerializer'
import EntityCleaning from '../../../Application/Shared/Serializers/EntityCleaning'
import { BaseEntity } from '../../../Domain/Entities/BaseClasses/BaseEntity'
import { PgTypedDbConnection } from '../PostgresTypedDbConnection'

@Service()
export abstract class BaseRepository<
    Entity extends BaseEntity,
    DbEntity,
    DbInsertableEntity
  > implements IBaseRepository<Entity> {
  abstract table : TableHelper<DbEntity, DbInsertableEntity, 'defaultConnection'>

  async Create(model: Partial<Entity>, connection?: Connections): Promise<Entity> {
    const dbConnection = connection || PgTypedDbConnection.db

    const cleanedEntity = EntityCleaning.CleanEntity(model)

    const serializedEntity = CaseSerializer.CastToSnake<Partial<Entity>, DbInsertableEntity>(cleanedEntity)

    const [inserted] = await this.table(dbConnection).insert(serializedEntity)

    const deserializedEntity = CaseSerializer.CastToCamel<DbEntity, Entity>(inserted)

    return deserializedEntity
  }

  async FindOne(query: Partial<Entity>, connection?: Connections): Promise<Entity> {
    const dbConnection = connection || PgTypedDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(query)

    const entity = await this.table(dbConnection).findOne(serializedQuery)

    return CaseSerializer.CastToCamel<DbEntity, Entity>(entity)
  }

  async FindAll(query: Partial<Entity>, connection?: Connections): Promise<Entity[]> {
    const dbConnection = connection || PgTypedDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(query)

    const entities = await this.table(dbConnection).find(serializedQuery).all()

    return CaseSerializer.CastArrayToCamel<DbEntity, Entity>(entities)
  }

  async Count(query: Partial<Entity>, connection?: Connections) : Promise<number> {
    const dbConnection = connection || PgTypedDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(query)

    const count = await this.table(dbConnection).count(serializedQuery)

    return count
  }

  async UpdateOne(
    updateQuery: Partial<Entity>, entity: Partial<Entity>, connection?: Connections,
  ): Promise<boolean> {
    const dbConnection = connection || PgTypedDbConnection.db

    const serializedQuery = CaseSerializer.CastToSnake<Partial<Entity>, WhereCondition<DbEntity>>(updateQuery)

    const serializedEntity = CaseSerializer.CastToSnake<Partial<Entity>, Partial<DbEntity>>(entity)

    const [updatedEntities] = await this.table(dbConnection).update(
      serializedQuery,
      { ...serializedEntity, updated_at: DateUtils.DateNow() },
    )

    return !!updatedEntities
  }

  // async Delete(query: WhereCondition<DbEntity>, connection?: Connections): Promise<void> {
  //   const dbConnection = connection || PgTypedDbConnection.db

  //   const del = await this.table(dbConnection).delete(query)
  // }
}
