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
	const nextPage = pageParam
	try {
		const gamesResponse = await fetch(
			`http://localhost:3000/api/games?page=${nextPage}`
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

// export async function getGames() {
// 	try {
// 		const data = await db.query.GamesTable.findMany({
// 			with: {
// 				platforms: {
// 					columns: {},
// 					with: {
// 						platform: true,
// 					},
// 				},
// 			},
// 			limit: 20,
// 		})
// 		return { data }
// 	} catch (error) {
// 		console.error(error)
// 		return { error: error }
// 	}
// }
