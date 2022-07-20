/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Client } from 'pg'
import * as PostgressConnectionStringParser from 'pg-connection-string'
import DbReset from '../../../Server/Infrastructure/GeneralScripts/Classes/DbReset'
import IntegratedTestsConfig from './IntegratedTestsConfig'

const {
  host, user, password, port,
} = PostgressConnectionStringParser.parse(IntegratedTestsConfig.LOCAL_POSTGRESS_URL)

const client = new Client({
  host, user, password, port: Number(port), database: IntegratedTestsConfig.TEST_DATABASE_NAME,
})

class GlobalTearDown {
  private static dbReset = new DbReset(IntegratedTestsConfig.TEST_DATABASE_NAME, IntegratedTestsConfig.LOCAL_POSTGRESS_URL)

  static async Setup() {
    try {
      console.log('Trying to unseed DB\n')
      await client.connect()
      // await client.query(dropDatabaseScript)
      console.log('Successfully unseed DB\n')
    } catch (e) {
      console.log('Error trying to unseed Db.\n')
      console.log(e)
    } finally {
      await client.end()
      console.log('Trying to drop DB\n')
      await this.dbReset.DropDatabase()
      console.log('Successfully drop DB\n')
    }
  }
}

module.exports = async () => {
  try {
    console.log('Closing up test environment')
    await GlobalTearDown.Setup()
    console.log('Successfully close up test environment')
  } catch (error) {
    console.log('Error trying to close up test environment')
    console.log(error)
    process.exit(1)
  }
}
