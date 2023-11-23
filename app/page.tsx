import { GamesGrid } from '@/components/games-grid'
import { GenresList } from '@/components/genres-list'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { getGames } from '@/actions/game-actions'
import { Header } from '@/components/header'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function Home({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined }
}) {
	const searchText =
		typeof searchParams.search === 'string' ? searchParams.search : ''
	const gameQuery = { searchText }
	const queryClient = new QueryClient()
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['games'],
		queryFn: () => getGames({ page: 0, query: gameQuery }),
		initialPageParam: 0,
	})
	return (
		<div className='container mx-auto'>
			<Header searchText={searchText} />
			<GenresList />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<GamesGrid gameQuery={gameQuery} />
			</HydrationBoundary>
		</div>
	)
}
