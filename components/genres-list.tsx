'use client'

import { getGenres } from '@/actions/genre-actions'
import { Genre } from '@/lib/db/schema'
import { useGenreHook } from '@/hooks/genre-hook'
import Image from 'next/image'

type Props = {
	genres: Genre[]
	selectedGenre?: string
}

export function GenresList({ genres, selectedGenre }: Props) {
	const { genre, setGenre } = useGenreHook(selectedGenre ?? '')

	return (
		<div className='pt-2'>
			<h2 className='pb-2 text-xl font-bold dark:text-white'>Genres</h2>
			<ul>
				{genres.map((g) => (
					<li key={g.id} className='flex items-center pb-2'>
						<Image
							src={g.imageBackground}
							alt={g.name}
							width={32}
							height={32}
							className='h-[32px] w-[32px] rounded-lg object-cover'
						/>
						<button
							onClick={() => setGenre(g.slug)}
							className='pl-2 text-gray-400'
						>
							{g.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
