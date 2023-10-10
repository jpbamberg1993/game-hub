import { Game, GamesTable } from '@/lib/db/schema/games'
import { db } from '@/lib/db/drizzle'
import { GameCard } from '@/components/game-card'
import { PlatformsTable } from '@/lib/db/schema/platforms'
import { eq } from 'drizzle-orm'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function Home() {
	let games: Game[] = []
	try {
		// games = await db
		// 	.select()
		// 	.from(GamesTable)
		// 	.innerJoin(PlatformsTable, eq(GamesTable.id, PlatformsTable.id))
		// 	.limit(20)
	} catch (e) {
		console.error(e)
	}

	return (
		<div className='columns-2xs'>
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	)
}
