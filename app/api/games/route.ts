import { Game } from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'

export async function GET() {
	let games: Game[] = []
	try {
		games = await db.query.GamesTable.findMany({
			with: {
				platforms: {
					columns: {},
					with: {
						platform: true,
					},
				},
			},
			limit: 20,
		})
	} catch (e) {
		console.error(e)
	}

	return Response.json({ games })
}
