import { ConnectionPool, Transaction } from '@databases/pg'

export type IdType = number | string

export type Connections = ConnectionPool | Transaction

export interface IBaseRepository<Entity> {
  Create(entity: Partial<Entity>, connection? : Connections): Promise<Entity>;
  UpdateOne(updateQuery: Partial<Entity>, entity: Partial<Entity>, connection? : Connections): Promise<boolean>;
  // Delete(query: Entity, connection? : ConnectionPool): Promise<void>;
  FindOne(query: Partial<Entity>, connection? : Connections): Promise<Entity>;
  FindAll(query: Partial<Entity>, connection? : Connections): Promise<Entity[]>;
}
