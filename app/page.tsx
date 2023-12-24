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
import { MobileFilterMenu } from '@/components/mobile-filter-menu'

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
		typeof searchParams.searchText === 'string' ? searchParams.searchText : ''
	const genreSlug =
		typeof searchParams.genreSlug === 'string' ? searchParams.genreSlug : ''
	const gameQuery = { searchText, genreSlug }
	const queryClient = new QueryClient()
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['games', gameQuery],
		queryFn: () => getGames({ page: 0, query: gameQuery }),
		initialPageParam: 0,
	})

	return (
		<div className='container mx-auto'>
			<Header />
			<div className='grid md:grid-cols-[auto_1fr]'>
				<div className='hidden md:block'>
					<GenresList genres={genres} selectedGenre={genreSlug} />
				</div>
				<div>
					<Title gameQuery={gameQuery} genres={genres} />
					<div className='grid grid-cols-[1fr_auto] pt-2 align-middle'>
						<div></div>
						<MobileFilterMenu genres={genres} gameQuery={gameQuery} />
					</div>
					<HydrationBoundary state={dehydrate(queryClient)}>
						<GamesGrid gameQuery={gameQuery} />
					</HydrationBoundary>
				</div>
			</div>
		</div>
	)
}
