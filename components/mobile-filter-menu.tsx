'use client'

import { Genre } from '@/lib/db/schema'
import { GameQuery } from '@/actions/game-actions'
import { useEffect, useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { Buttton } from '@/components/buttton'
import { GenresList } from '@/components/genres-list'
import { IoCloseCircle } from 'react-icons/io5'

type Props = {
	genres: Genre[]
	gameQuery: GameQuery
}

export function MobileFilterMenu({ genres, gameQuery }: Props) {
	const [displayMenu, setDisplayMenu] = useState<boolean>(false)

	useEffect(() => {
		setDisplayMenu(false)
	}, [gameQuery.genreSlug, setDisplayMenu])

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
					className='fixed inset-0 z-50 h-full overflow-auto bg-gray-900'
				>
					<div className='grid p-4'>
						<Buttton
							onClick={() => setDisplayMenu(!displayMenu)}
							className='fixed bottom-0 right-0 justify-self-end px-4 py-4 dark:text-white'
						>
							<IoCloseCircle size={55} />
						</Buttton>
						<GenresList genres={genres} selectedGenre={gameQuery.genreSlug} />
					</div>
				</div>
			)}
		</>
	)
}
