/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Client } from 'pg'
import * as PostgressConnectionStringParser from 'pg-connection-string'
import pgtools from 'pgtools'

export default class DbReset {
  private client : Client

  private DatabaseName : string

  private PostgresUrl : string

  /**
   *
   */
  constructor(databaseName : string, postgresUrl : string) {
    this.DatabaseName = databaseName
    this.PostgresUrl = postgresUrl

    const {
      host, user, password, port,
    } = PostgressConnectionStringParser.parse(postgresUrl)

    this.client = new Client({
      host, user, password, port: Number(port), database: 'postgres',
    })
  }

  public async DropDatabase() {
    const {
      host, user, password, port,
    } = PostgressConnectionStringParser.parse(this.PostgresUrl)

    await pgtools.dropdb(
      {
        user,
        password,
        port,
        host,
      },
      this.DatabaseName,
      (err, res) => {
      },
    )
  }

  public async TryCreateDb() {
    console.log('\nChecking if Db needs to be created\n')

    await this.client.connect()

    const { rowCount } = await this.client.query(`
    SELECT 'CREATE DATABASE ${this.DatabaseName}'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${this.DatabaseName}')
    `)

    if (rowCount) {
      console.log('\nCreating DB\n')
      await this.client.query(`CREATE DATABASE ${this.DatabaseName}`)
      console.log('\nDB successfully created\n')
    } else {
      console.log('\nNo need to create DB\n')
    }

    await this.client.end()
  }
}
