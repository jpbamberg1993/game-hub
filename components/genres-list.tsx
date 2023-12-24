'use client'

import { Genre } from '@/lib/db/schema'
import { useGenreHook } from '@/hooks/genre-hook'
import Image from 'next/image'
import { useSearchQueryParams } from '@/providers/query-params-provider'

type Props = {
	genres: Genre[]
	selectedGenre?: string
}

export function GenresList({ genres }: Props) {
	const { gameQueryParams, setGameQueryParams } = useSearchQueryParams()

	return (
		<div className='pt-2 md:pr-4'>
			<h2 className='pb-2 text-xl font-bold dark:text-white'>Genres</h2>
			<ul>
				{genres.map((g) => {
					const activeGenre = gameQueryParams.genreSlug === g.slug
					return (
						<li
							key={g.id}
							className={`flex items-center py-1.5 pl-1 ${
								activeGenre && 'border border-gray-700 dark:border-neon'
							}`}
						>
							<Image
								src={g.imageBackground}
								alt={g.name}
								width={32}
								height={32}
								className='h-[32px] w-[32px] rounded-lg object-cover'
							/>
							<button
								onClick={() =>
									setGameQueryParams({ ...gameQueryParams, genreSlug: g.slug })
								}
								className={`pl-2 text-gray-400 ${
									activeGenre && 'font-bold text-gray-700 dark:text-white'
								}`}
							>
								{g.name}
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
