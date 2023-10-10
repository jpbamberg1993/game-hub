import { Game } from '@/lib/db/schema/games'

type Props = {
	game: Game
}

export function GameCard({ game }: Props) {
	return (
		<div className='columns-2xs'>
			<img src={game.backgroundImage} alt={game.name} />
			{/*<div>{game}</div>*/}
		</div>
	)
}
