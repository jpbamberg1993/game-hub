'use client'

import React from 'react'
import { getGames } from '@/actions/game-actions'
import { GameCard } from '@/components/game-card'
import { useInfiniteQuery } from '@tanstack/react-query'

export function GamesGrid() {
	const { data, error } = useInfiniteQuery({
		queryKey: ['games'],
		queryFn: getGames,
		initialPageParam: 0,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	})
	if (error || !data?.pages) {
		console.error(error)
		return <div>Error loading games</div>
	}
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
			{data.pages.map((page) => (
				<React.Fragment key={page.nextPage}>
					{page.data?.map((game) => <GameCard key={game.id} game={game} />)}
				</React.Fragment>
			))}
		</div>
	)
}
