'use client'

import { getGenres } from '@/actions/genre-actions'
import { Genre } from '@/lib/db/schema'
import { useGenreHook } from '@/hooks/genre-hook'

type Props = {
	genres: Genre[]
	selectedGenre?: string
}

export function GenresList({ genres, selectedGenre }: Props) {
	const { genre, setGenre } = useGenreHook(selectedGenre ?? '')
	return (
		<ul>
			{genres.map((g) => (
				<li key={g.id}>
					<button onClick={() => setGenre(g.slug)}>{g.name}</button>
				</li>
			))}
		</ul>
	)
}
