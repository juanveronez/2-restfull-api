import { knex as configKnex, Knex } from 'knex'
import { env } from '../env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/infra/migrations',
  },
}

export const knex = configKnex(config)
