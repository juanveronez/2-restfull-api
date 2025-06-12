import { afterAll, beforeAll, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

it('should get Hello World', async () => {
  const response = await request(app.server).get('/').expect(200)
  expect(response.body).toEqual({ message: 'Hello World!' })
})
