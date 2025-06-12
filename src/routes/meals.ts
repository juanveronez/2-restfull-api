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

  app.delete('/:id', async ({ params }, reply) => {
    const { id } = getMealParamsSchema.parse(params)
    await knex('meals').delete().where('id', id)
    return reply.status(204).send()
  })

  app.put('/:id', async ({ params, body }, reply) => {
    const { id } = getMealParamsSchema.parse(params)
    const updateMeal = createMealSchema.parse(body)

    await knex('meals').update(updateMeal).where('id', id)
    return reply.status(200).send()
  })

  app.get('/metrics', async () => {
    const [total, diet, notDiet] = await Promise.all([
      knex('meals').count('id', { as: 'total' }).first(),
      knex('meals').where('is_diet', 1).count('id', { as: 'diet' }).first(),
      knex('meals').where('is_diet', 0).count('id', { as: 'not_diet' }).first(),
    ])

    return {
      metrics: {
        total: total?.total,
        diet: diet?.diet,
        not_diet: notDiet?.not_diet,
      },
    }
  })
}
