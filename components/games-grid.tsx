'use client'

import React from 'react'
import { getGames } from '@/actions/game-actions'
import { GameCard } from '@/components/game-card'
import { useQuery } from '@tanstack/react-query'

// Todo: Move this back to a normal query
// Todo: Then make sure it can handle query params
// Todo: Then implement pagination

export function GamesGrid() {
	const { data, error } = useQuery({
		queryKey: ['games'],
		queryFn: () => getGames({ pageParam: 0 }),
	})
	if (error || !data?.data) {
		console.error(error)
		return <div>Error loading games</div>
	}
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			{data.data.map((game) => (
				<GameCard key={game.id} game={game} />
			))}
		</div>
	)
}
