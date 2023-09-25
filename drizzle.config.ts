import * as dotenv from 'dotenv'
import { Config } from 'drizzle-kit'
dotenv.config()

export default {
	schema: './lib/db/schema',
	out: './lib/db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL + '?sslmode=require' || '',
	},
} satisfies Config
