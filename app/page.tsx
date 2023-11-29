import { GamesGrid } from '@/components/games-grid'
import { GenresList } from '@/components/genres-list'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { getGames } from '@/actions/game-actions'
import { Header } from '@/components/header'
import { Title } from '@/components/title'
import { getGenres } from '@/actions/genre-actions'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	// Info: Fetching genres
	const genres = await getGenres()

	// Info: Fetching games
	const searchText =
		typeof searchParams.search === 'string' ? searchParams.search : ''
	const genreSlug =
		typeof searchParams.genre === 'string' ? searchParams.genre : ''
	const gameQuery = { searchText, genreSlug }
	const queryClient = new QueryClient()
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['games', gameQuery],
		queryFn: () => getGames({ page: 0, query: gameQuery }),
		initialPageParam: 0,
	})

	return (
		<div className='container mx-auto'>
			<Header searchText={searchText} />
			<div>
				<GenresList genres={genres} selectedGenre={genreSlug} />
				<div>
					<Title />
					<HydrationBoundary state={dehydrate(queryClient)}>
						<GamesGrid gameQuery={gameQuery} />
					</HydrationBoundary>
				</div>
			</div>
		</div>
	)
}
