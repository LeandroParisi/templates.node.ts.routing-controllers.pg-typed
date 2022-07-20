/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import createConnectionPool, { ConnectionPool, sql } from '@databases/pg'
import { types } from 'pg'
import StaticImplements from '../../../../../Commons/Anotations/StaticImplements'
import IDbConnection from '../../../../../Server/Infrastructure/DbConnections/Interfaces/IDbConnection'
// import DatabaseSchema from '../../../../../Server/Infrastructure/PgTyped/Schemas/__generated__'
// import databaseSchema from '../../../../../Server/Infrastructure/PgTyped/Schemas/__generated__/schema.json'
import IntegratedTestsConfig from '../../IntegratedTestsConfig'

types.setTypeParser(types.builtins.INT8, (value: string) => parseInt(value, 10))

types.setTypeParser(types.builtins.FLOAT8, (value: string) => parseInt(value, 10))

types.setTypeParser(types.builtins.NUMERIC, (value: string) => parseInt(value, 10))

@StaticImplements<IDbConnection<ConnectionPool>>()
export class TestDbConnection {
  static db = createConnectionPool({
    connectionString: IntegratedTestsConfig.TEST_DATABASE_URL,
    bigIntMode: 'bigint',
  })

  // static tables = tables<DatabaseSchema>({
  //   databaseSchema,
  // })

  static sql = sql
}
