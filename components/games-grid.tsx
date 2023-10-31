import { GameCard } from '@/components/game-card'
import { Game } from '@/lib/db/schema'

type Props = {
	games: Game[]
}
export function GamesGrid({ games }: Props) {
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			{games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	)
}
