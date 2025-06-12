import fastify from 'fastify'
import { mealsRoute } from './routes/meals'

export const app = fastify()

app.register(mealsRoute, { prefix: 'meals' })
