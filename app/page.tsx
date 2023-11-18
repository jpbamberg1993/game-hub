import { GamesGrid } from '@/components/games-grid'
import { GenresList } from '@/components/genres-list'
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import { getGames } from '@/actions/game-actions'

export const preferredRegion = `home`
export const dynamic = `force-dynamic`

export default async function Home() {
	const queryClient = new QueryClient()
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['games'],
		queryFn: getGames,
		initialPageParam: 0,
	})
	return (
		<div className='container mx-auto'>
			<GenresList />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<GamesGrid />
			</HydrationBoundary>
		</div>
	)
}
