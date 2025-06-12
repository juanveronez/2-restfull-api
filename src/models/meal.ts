import { z } from 'zod'

export const createMealSchema = z.object({
  name: z.string(),
  description: z.string(),
  is_diet: z.boolean(),
  date: z.string().date(), // yyyy-mm-dd
  time: z.string().time(),
})

export type CreateMeal = z.infer<typeof createMealSchema>
