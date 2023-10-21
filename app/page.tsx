import { db } from '@/lib/db/drizzle'
import { GameCard } from '@/components/game-card'
import { Game } from '@/lib/db/schema'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function GameGrid() {
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

	return (
		<div className='sm:columns-2 lg:columns-4'>
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	)
}
