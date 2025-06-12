import { z } from 'zod'

export const createMealSchema = z.object({
  name: z.string(),
  description: z.string(),
  is_diet: z.boolean(),
  date: z.string().date(), // yyyy-mm-dd
  time: z.string().time(),
})

export const getMealParamsSchema = z.object({
  id: z.string().uuid(),
})

export type CreateMeal = z.infer<typeof createMealSchema>
export type GetMealParams = z.infer<typeof getMealParamsSchema>
