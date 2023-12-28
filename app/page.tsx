import { GamesGrid } from '@/components/games-grid'
import { GenresList } from '@/components/genres-list'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { GameQuery, getGames } from '@/actions/game-actions'
import { Header } from '@/components/header'
import { Title } from '@/components/title'
import { getGenres } from '@/actions/genre-actions'
import { MobileFilterMenu } from '@/components/mobile-filter-menu'
import { getPlatforms } from '@/actions/platforms-actions'
import { PlatformsDropdown } from '@/components/platforms-dropdown'
import { parseOrderByQueryParam } from '@/lib/utils'
import { OrderBy } from '@/actions/order-by'
import { OrderByDropdown } from '@/components/order-by-dropdown'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const genres = await getGenres()
	const platforms = await getPlatforms()

	// Info: Fetching games
	const searchText =
		typeof searchParams.searchText === 'string' ? searchParams.searchText : ''
	const genreSlug =
		typeof searchParams.genreSlug === 'string' ? searchParams.genreSlug : ''
	const platformSlug =
		typeof searchParams.platformSlug === 'string'
			? searchParams.platformSlug
			: ''
	const orderBy = parseOrderByQueryParam(searchParams.orderBy as string)
	const gameQuery: GameQuery = { searchText, genreSlug, platformSlug }
	if (orderBy) {
		gameQuery.orderBy = orderBy
	}
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
					<div className='grid w-auto auto-cols-min grid-flow-col gap-2 pb-2 pt-2 align-middle'>
						<PlatformsDropdown platforms={platforms} />
						<OrderByDropdown />
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
