import { FastifyInstance } from 'fastify'
import { knex } from '../infra/database'

export function mealsRoute(app: FastifyInstance) {
  app.get('/', async () => {
    const meals = await knex('meals').select()
    return { meals }
  })
}
