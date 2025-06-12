import { z } from 'zod'
import { config } from 'dotenv'

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  DATABASE_URL: z.string(),
})

export const env = envSchema.parse(process.env)
