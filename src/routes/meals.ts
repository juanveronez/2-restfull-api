import { FastifyInstance } from 'fastify'
import { knex } from '../infra/database'
import { createMealSchema, getMealParamsSchema } from '../models/meal'

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

  app.get('/:id', async ({ params }) => {
    const { id } = getMealParamsSchema.parse(params)
    const meal = await knex('meals').select().where('id', id).first()
    return { meal }
  })
}
