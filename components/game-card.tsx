import { Game } from '@/lib/db/schema/games'
import { PlatformIconList } from '@/components/platform-icon-list'
import { getCroppedImageUrl } from '@/lib/utils'
import Image from 'next/image'

type Props = {
	game: Game
}

export function GameCard({ game }: Props) {
	return (
		<div className='transform overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-transform hover:scale-105 dark:border-gray-700 dark:bg-cyan-950'>
			<div className='relative h-60 w-full'>
				<Image
					src={getCroppedImageUrl(game.backgroundImage)}
					alt={game.name}
					layout='fill'
					objectFit='cover'
				/>
			</div>
			<div className='p-6'>
				<PlatformIconList platforms={game.platforms} />
			</div>
		</div>
	)
}
