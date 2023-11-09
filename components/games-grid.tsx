'use client'

import { getGames } from '@/actions/game-actions'
import { GameCard } from '@/components/game-card'
import { useQuery } from '@tanstack/react-query'

export function GamesGrid() {
	const { data, error } = useQuery({
		queryKey: ['games'],
		queryFn: getGames,
	})
	if (error || !data?.games) {
		console.error(error)
		return <div>Error loading games</div>
	}
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			{data.games.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	)
}
