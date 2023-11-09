import { Game } from '@/lib/db/schema'

export async function getGames(): Promise<{
	games?: Game[]
	error?: Error | unknown
}> {
	try {
		const gamesResponse = await fetch('http://localhost:3000/api/games')
		if (!gamesResponse.ok) {
			return { error: new Error(gamesResponse.statusText) }
		}
		const data = await gamesResponse.json()
		return { games: data.games }
	} catch (error) {
		console.error(error)
		return { error: error }
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
