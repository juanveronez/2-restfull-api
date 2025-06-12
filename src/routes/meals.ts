import { FastifyInstance } from 'fastify'
import { knex } from '../infra/database'
import { createMealSchema } from '../models/meal'

export function mealsRoute(app: FastifyInstance) {
  app.get('/', async () => {
    const meals = await knex('meals').select()
    return { meals }
  })

  app.post('/', async ({ body }, reply) => {
    const meal = createMealSchema.parse(body)
    await knex('meals').insert(meal)

    return reply.status(201).send()
  })
}
