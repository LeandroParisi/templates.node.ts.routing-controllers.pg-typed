/* eslint-disable no-shadow */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as PostgressConnectionStringParser from 'pg-connection-string'

require('dotenv/config')

const { env } = process

export enum Envs {
  TEST = 'test',
  LOCAL = 'local',
  DSV = 'dsv',
  PROD = 'prd',
}

const {
  database, host, port, password, user,
} = PostgressConnectionStringParser.parse(env.DATABASE_URL)

export default class CONSTANTS {
  static ENV : Envs = env.NODE_ENV as Envs

  static PORT = Number(env.PORT)

  static CONNECTION_STRING : string = env.DATABASE_URL

  static LOCAL_POSTGRESS_URL = `postgres://${user}:${password}@${host}:${port}`

  static DATABASE_NAME : string = database

  static ROUTE_IGNORE_PATTERN = '__IGNORE__'

  static SALT_SECRET = env.MY_SECRET

  static COUNTRY_STATE_CITY_API_KEY = env.COUNTRY_STATE_CITY_API_KEY
}
