import { Game } from '@/lib/db/schema/games'
import { PlatformIconList } from '@/components/platform-icon-list'

type Props = {
	game: Game
}

export function GameCard({ game }: Props) {
	return (
		<div>
			<img src={game.backgroundImage} alt={game.name} />
			<div>
				<PlatformIconList platforms={game.platforms} />
			</div>
		</div>
	)
}
