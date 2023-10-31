import { GamesGrid } from '@/components/games-grid'
import { GenresList } from '@/components/genres-list'
import { headers } from 'next/headers'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

function getBaseUrl() {
	const protocol = process.env.NODE_ENV === `development` ? `http` : `https`
	const host = headers().get(`host`)
	return `${protocol}://${host}`
}

export default async function GameGrid() {
	const gamesResponse = await fetch(`${getBaseUrl()}/api/games`)
	if (!gamesResponse.ok) return <div>Failed to load games</div>
	const data = await gamesResponse.json()

	return (
		<div className='container mx-auto'>
			<GenresList />
			<GamesGrid games={data.games} />
		</div>
	)
}
