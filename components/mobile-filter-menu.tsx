import { Genre } from '@/lib/db/schema'
import { GameQuery } from '@/actions/game-actions'
import { useGenreHook } from '@/hooks/genre-hook'

type Props = {
	genres: Genre[]
	gameQuery: GameQuery
}

export function MobileFilterMenu({ genres, gameQuery }: Props) {
	const { genre, setGenre } = useGenreHook(gameQuery.genreSlug ?? '')
}
