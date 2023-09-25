import { db } from '@/lib/db/drizzle'
import { NewUser, User, UsersTable } from '@/lib/db/schema/users'

const newUsers: NewUser[] = [
	{
		name: `Guillermo Rauch`,
		email: `rauchg@vercel.com`,
		image: `https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg`,
	},
	{
		name: `Lee Robinson`,
		email: `lee@vercel.com`,
		image: `https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg`,
	},
	{
		name: `Steven Tey`,
		email: `stey@vercel.com`,
		image: `https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg`,
	},
	{
		name: `Paul Bamberger`,
		email: `jpb10191@gmail.com`,
		image: `https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg`,
	},
]

export async function seed() {
	// Create table with raw SQL
	console.log(`Created "users" table`)

	const insertedUsers: User[] = await db
		.insert(UsersTable)
		.values(newUsers)
		.returning()
	console.log(`Seeded ${insertedUsers.length} users`)

	return {
		insertedUsers,
	}
}
