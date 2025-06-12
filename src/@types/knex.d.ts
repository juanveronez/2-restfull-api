// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    meals: {
      id: string
      session_id?: string
      name: string
      description: string
      is_diet: boolean
      moment: string
      created_at: string
    }
  }
}
