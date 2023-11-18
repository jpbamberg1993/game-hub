import { Game } from '@/lib/db/schema'

export async function getGames({
	pageParam = 0,
}: {
	pageParam: number
}): Promise<{
	data?: Game[]
	nextPage: number
	error?: Error | unknown
}> {
	const nextPage = pageParam + 1
	try {
		const gamesResponse = await fetch(
			`http://localhost:3000/api/games?page=${pageParam}`
		)
		if (!gamesResponse.ok) {
			return { error: new Error(gamesResponse.statusText), nextPage }
		}
		const data = await gamesResponse.json()
		return { data: data.games, nextPage }
	} catch (error) {
		console.error(error)
		return { error: error, nextPage: nextPage }
	}
}
