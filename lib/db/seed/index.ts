import { db } from '../drizzle'
import { NewUser, User, UsersTable } from '../schema/users'
import { RawgApi } from '../../rawg/rawg-api'
import { SeedGames } from './seed-games'
import { SeedGenres } from './seed-genres'
import { SeedPlatforms } from './seed-platforms'

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

async function seedUsers() {
	await db.insert(UsersTable).values(newUsers).returning()
}

async function seedGenres() {
	const rawgApi = new RawgApi()
	const seedGenres = await new SeedGenres(rawgApi).run()
	if (seedGenres) {
		console.log('Genres seeded')
	} else {
		console.log('Genres failed to seed')
	}
}

async function seedPlatforms() {
	const rawgApi = new RawgApi()
	const seedPlatforms = await new SeedPlatforms(rawgApi).run()
	if (seedPlatforms) {
		console.log('Platforms seeded')
	} else {
		console.log('Platforms failed to seed')
	}
}

async function seedGames() {
	const rawgApi = new RawgApi()
	const users = await db.select().from(UsersTable).limit(10)
	await new SeedGames(rawgApi, users).run()
	console.log('Games seeded')
}

async function seed() {
	const recordsToSeed = process.argv[2]?.toString()
	switch (recordsToSeed) {
		case 'seed-users':
			await seedUsers()
			break
		case 'seed-genres':
			await seedGenres()
			break
		case 'seed-games':
			await seedGames()
			break
		case 'seed-platforms':
			await seedPlatforms()
			break
		default:
			console.error(`You didn't specify what you wanted to seed.`)
	}
}

seed()
	.then(() => {
		console.log('Seed successful')
		process.exit(0)
	})
	.catch((err) => {
		console.error('Seed failed', err)
		process.exit(1)
	})
