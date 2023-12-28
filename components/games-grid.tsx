'use client'

import React from 'react'
import { GameQuery, getGames } from '@/actions/game-actions'
import { GameCard } from '@/components/game-card'
import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'

type Props = {
	gameQuery: GameQuery
}

export function GamesGrid({ gameQuery }: Props) {
	const { data, fetchNextPage, hasNextPage, isLoading, error } =
		useInfiniteQuery({
			queryKey: ['games', gameQuery],
			queryFn: ({ pageParam }) =>
				getGames({ page: pageParam, query: gameQuery }),
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.nextPage,
		})
	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
		console.error(`Error loading games: `, error)
		return <div>Error loading games</div>
	}
	if (!data) {
		return null
	}
	const fetchedGamesCount = data.pages.reduce(
		(count, page) => count + (page.data?.length ?? 0),
		0
	)
	if (fetchedGamesCount === 0) {
		return (
			<div className='flex justify-center'>
				<Image
					src='/no-games.svg'
					alt='No games found'
					width={600}
					height={800}
					className='dark:hidden'
				/>
				<Image
					src='/no-games-neon.svg'
					alt='No games found'
					width={600}
					height={800}
					className='hidden dark:block'
				/>
			</div>
		)
	}
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
