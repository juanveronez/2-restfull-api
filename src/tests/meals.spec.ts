import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app'
import { execSync } from 'node:child_process'
import { CreateMeal } from '../models/meal'

describe('[routes] /meals', async () => {
  const meal1: CreateMeal = {
    name: 'Breakfast',
    description: '1st meal of the day :)',
    is_diet: true,
    date: '2025-06-12',
    time: '08:35',
  }

  const meal2: CreateMeal = {
    name: 'Take a chocolate bar',
    description: 'I was sad and take something to eat',
    is_diet: false,
    date: '2025-06-12',
    time: '11:25',
  }

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

  it('POST /meals', async () => {
    await request(app.server).post('/meals').send(meal1).expect(201)
  })

  it('GET /meals', async () => {
    await request(app.server).post('/meals').send(meal1).expect(201)
    await request(app.server).post('/meals').send(meal2).expect(201)

    const response = await request(app.server).get('/meals')
    expect(response.body).toEqual({
      meals: [
        expect.objectContaining({
          name: 'Breakfast',
          description: '1st meal of the day :)',
          is_diet: 1,
          date: '2025-06-12',
          time: '08:35',
        }),
        expect.objectContaining({
          name: 'Take a chocolate bar',
          description: 'I was sad and take something to eat',
          is_diet: 0,
          date: '2025-06-12',
          time: '11:25',
        }),
      ],
    })
  })

  it('GET /meals/:id', async () => {
    await request(app.server).post('/meals').send(meal1).expect(201)

    const mealsResponse = await request(app.server).get('/meals')

    const mealId = mealsResponse.body.meals[0].id
    expect(mealId).toBeDefined()

    const mealResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .expect(200)

    expect(mealResponse.body.meal).toEqual(
      expect.objectContaining({
        name: 'Breakfast',
        description: '1st meal of the day :)',
        is_diet: 1,
        date: '2025-06-12',
        time: '08:35',
      }),
    )
  })

  it('DELETE /meals/:id', async () => {
    await request(app.server).post('/meals').send(meal1).expect(201)

    const mealsResponse1 = await request(app.server).get('/meals')

    const mealId = mealsResponse1.body.meals[0].id
    expect(mealId).toBeDefined()

    await request(app.server).delete(`/meals/${mealId}`).expect(204)

    const mealsResponse2 = await request(app.server).get('/meals')
    expect(mealsResponse2.body.meals.length).toBe(0)
  })

  it('PUT /meals/:id', async () => {
    await request(app.server).post('/meals').send(meal1).expect(201)

    const mealsResponse = await request(app.server).get('/meals')

    const mealId = mealsResponse.body.meals[0].id
    expect(mealId).toBeDefined()

    await request(app.server).put(`/meals/${mealId}`).send(meal2).expect(200)

    const mealResponse = await request(app.server).get(`/meals/${mealId}`)
    expect(mealResponse.body.meal).toEqual(
      expect.objectContaining({
        name: 'Take a chocolate bar',
        description: 'I was sad and take something to eat',
        is_diet: 0,
        date: '2025-06-12',
        time: '11:25',
      }),
    )
  })
})
