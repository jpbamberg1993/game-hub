import { GamesGrid } from '@/components/games-grid'
import { GenresList } from '@/components/genres-list'
import { getAbsoluteUrl } from '@/lib/utils'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function GameGrid() {
	const gamesResponse = await fetch(`${getAbsoluteUrl('/games')}`)
	if (!gamesResponse.ok) return <div>Failed to load games</div>
	const data = await gamesResponse.json()

	return (
		<div className='container mx-auto'>
			<GenresList />
			<GamesGrid games={data.games} />
		</div>
	)
}
