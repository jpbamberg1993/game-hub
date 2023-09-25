import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { db } from './drizzle'

migrate(db, {
	migrationsFolder: './lib/db/migrations',
})
	.then(() => {
		console.log('Migration successful')
		process.exit(0)
	})
	.catch((err) => {
		console.error('Migration failed', err)
		process.exit(1)
	})
