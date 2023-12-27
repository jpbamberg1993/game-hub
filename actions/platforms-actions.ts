import { db } from '@/lib/db/drizzle'
import { PlatformsTable } from '@/lib/db/schema'

export async function getPlatforms() {
	try {
		return await db.select().from(PlatformsTable)
	} catch (e) {
		console.error(e)
		return []
	}
}
