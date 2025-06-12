import { knex as configKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/development.db',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/infra/migrations',
  },
}

export const knex = configKnex(config)
