import { Game } from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const page = searchParams.get('page') as string
	let games: Game[] = []
	try {
		const games = await db.query.GamesTable.findMany({
			with: {
				platforms: {
					columns: {},
					with: {
						platform: true,
					},
				},
			},
			offset: parseInt(page) * 20,
			limit: 20,
		})
		return Response.json({ games })
	} catch (e) {
		console.error(e)
	}

	return Response.json({ games })
}
