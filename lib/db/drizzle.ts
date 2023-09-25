import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as dotenv from 'dotenv'

dotenv.config()

export const db = drizzle(sql)
