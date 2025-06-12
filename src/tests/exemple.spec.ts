import { afterAll, beforeAll, beforeEach, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { execSync } from 'node:child_process'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(async () => {
  execSync('npm run knex migrate:rollback --all')
  execSync('npm run knex migrate:latest')
})

it('should get Hello World', async () => {
  const response = await request(app.server).get('/')
  expect(response.body).toEqual({ meals: [] })
})
