/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { SQLQuery } from '@databases/pg'
import 'reflect-metadata'
import { TestDbConnection } from './TestDbConnection'


export default class DbSetup {
  // public userSetup = new UserSetup()

  public async ExecuteQuery<T>(query : SQLQuery) : Promise<T> {
    return await TestDbConnection.db.query(query) as unknown as T
  }

  public async CleanUp() {
    try {
      // await this.userSetup.CleanUp()

    } catch (e) {
      const error = e as Error
      console.log('Failed to clean up test info\n')
      console.log(`${error.message}\n`)
      console.log('TODO: Solve this in the future, since db will be all cleaned after all tests\n')
    }
  }
}
