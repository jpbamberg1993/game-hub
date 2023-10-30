import { Game } from '@/lib/db/schema/games'
import { PlatformIconList } from '@/components/platform-icon-list'
import { getCroppedImageUrl } from '@/lib/utils'
import Image from 'next/image'
import { CriticScore } from '@/components/critic-score'
import { Rating } from '@/components/rating'

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
				<div className='align-center flex justify-between'>
					<PlatformIconList platforms={game.platforms} />
					<CriticScore score={game.metacritic} />
				</div>
				<h2 className='pt-3 text-xl font-bold dark:text-white'>{game.name}</h2>
				<Rating rating={game.ratingTop} />
			</div>
		</div>
	)
}
