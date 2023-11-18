'use client'

import React from 'react'
import { getGames } from '@/actions/game-actions'
import { GameCard } from '@/components/game-card'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'

export function GamesGrid() {
	const { data, fetchNextPage, hasNextPage, isLoading, error } =
		useInfiniteQuery({
			queryKey: ['games'],
			queryFn: getGames,
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextPage,
		})
	if (error || !data?.pages) {
		console.error(error)
		return <div>Error loading games</div>
	}
	const fetchedGamesCount = data?.pages.reduce(
		(count, page) => count + (page.data?.length ?? 0),
		0
	)
	return (
		<InfiniteScroll
			next={fetchNextPage}
			hasMore={hasNextPage}
			loader={isLoading}
			dataLength={fetchedGamesCount}
		>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
				{data.pages.map((page) => (
					<React.Fragment key={page.nextPage}>
						{page.data?.map((game) => <GameCard key={game.id} game={game} />)}
					</React.Fragment>
				))}
			</div>
		</InfiniteScroll>
	)
}
