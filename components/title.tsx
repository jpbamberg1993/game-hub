import { GameQuery } from '@/actions/game-actions'
import { Genre } from '@/lib/db/schema'

type Props = {
	gameQuery: GameQuery
	genres: Genre[]
}
export function Title({ gameQuery, genres }: Props) {
	let label = 'Games'
	if (gameQuery.genreSlug) {
		const genre = genres.find((g) => g.slug === gameQuery.genreSlug)!
		label += ` - ${genre.name}`
	}
	return (
		<div className='px-4 text-4xl dark:text-white'>
			<h1 className='font-bold'>{label}</h1>
		</div>
	)
}
