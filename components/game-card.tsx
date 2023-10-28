import { Game } from '@/lib/db/schema/games'
import { PlatformIconList } from '@/components/platform-icon-list'
import { getCroppedImageUrl } from '@/lib/utils'

type Props = {
	game: Game
}

export function GameCard({ game }: Props) {
	return (
		<div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-cyan-950'>
			<img
				src={getCroppedImageUrl(game.backgroundImage)}
				alt={game.name}
				className='aspect-w-16 aspect-h-9'
			/>
			<div className='p-6'>
				<PlatformIconList platforms={game.platforms} />
			</div>
		</div>
	)
}
