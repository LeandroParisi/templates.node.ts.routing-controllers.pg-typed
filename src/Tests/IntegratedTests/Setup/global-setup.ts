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

// const client2 = new Client({
//   host, user, password, port: Number(port), database: 'postgres',
// })

class GlobalSetup {
  private static dbReset = new DbReset(IntegratedTestsConfig.TEST_DATABASE_NAME, IntegratedTestsConfig.LOCAL_POSTGRESS_URL)

  static async Setup() {
    await this.CreateDataBase()
  }

  private static async CreateDataBase() {
    await this.dbReset.TryCreateDb()
    await this.TrySeedDb()
  }

  private static async TrySeedDb() {
    await client.connect()

    console.log('\nChecking if Db needs to be seeded\n')

    const { rowCount } = await client.query(`
    SELECT * FROM information_schema.tables
      WHERE table_catalog = '${IntegratedTestsConfig.TEST_DATABASE_NAME}' AND table_name = 'countries'
    `)

    if (!rowCount) {
      console.log('\nSeeding DB\n')

      // await client.query(createDatabaseScript)

      console.log('\nDB successfully seeded\n')
    } else {
      console.log('\nNo need to seed DB\n')
    }

    await client.end()
  }

  // private static async TryCreateDb() {
  //   console.log('\nChecking if Db needs to be created\n')

  //   await client2.connect()

  //   const { rowCount } = await client2.query(`
  //   SELECT 'CREATE DATABASE ${IntegratedTestsConfig.TEST_DATABASE_NAME}'
  //     WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${IntegratedTestsConfig.TEST_DATABASE_NAME}')
  //   `)

  //   if (rowCount) {
  //     console.log('\nCreating DB\n')
  //     await client2.query(`CREATE DATABASE ${IntegratedTestsConfig.TEST_DATABASE_NAME}`)
  //     console.log('\nDB successfully created\n')
  //   } else {
  //     console.log('\nNo need to create DB\n')
  //   }

  //   await client2.end()
  // }
}

module.exports = async () => {
  try {
    console.log('\nSetting up test environment\n')
    await GlobalSetup.Setup()
    console.log('\nSuccessfully set up test environment\n')
  } catch (error) {
    console.log('\nError trying to set up test environment\n')
    console.log(error)
    process.exit(1)
  }
}
