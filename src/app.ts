import fastify from 'fastify'

export const app = fastify()

app.get('/', () => ({ message: 'Hello World!' }))
