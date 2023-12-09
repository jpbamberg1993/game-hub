'use client'

import { Genre } from '@/lib/db/schema'
import { GameQuery } from '@/actions/game-actions'
import { useGenreHook } from '@/hooks/genre-hook'
import { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

type Props = {
	genres: Genre[]
	gameQuery: GameQuery
}

export function MobileFilterMenu({ genres, gameQuery }: Props) {
	const { genre, setGenre } = useGenreHook(gameQuery.genreSlug ?? '')
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)

	return (
		<>
			<button
				onClick={() => setDisplayMenu(!displayMenu)}
				className='md:hidden'
			>
				<RxHamburgerMenu className='h-10 w-10 dark:text-white' />
			</button>
			{displayMenu && (
				<div
					id='mobileOverlay'
					className='fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75'
				>
					<div className='text-center text-white'>
						<p>Overlay Content Here</p>
						<button
							onClick={() => setDisplayMenu(!displayMenu)}
							className='mt-4 rounded bg-red-500 px-4 py-2 text-white'
						>
							Close
						</button>
					</div>
				</div>
			)}
		</>
	)
}
