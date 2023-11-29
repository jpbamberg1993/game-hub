import { GenresTable } from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'

export async function getGenres() {
	try {
		return await db.select().from(GenresTable)
	} catch (e) {
		console.error(e)
		return []
	}
}
