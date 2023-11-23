'use server'

import { Game } from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'

export type GameQuery = {
	searchText: string
}

export async function getGames({
	page = 0,
	query,
}: {
	page: number
	query: GameQuery
}): Promise<{ data?: Game[]; nextPage: number; error?: Error | unknown }> {
	const nextPage = page + 1
	try {
		const data = await db.query.GamesTable.findMany({
			with: {
				platforms: {
					columns: {},
					with: {
						platform: true,
					},
				},
			},
			where: (game, { ilike }) => ilike(game.name, `%${query.searchText}%`),
			offset: page * 20,
			limit: 20,
		})
		return { data, nextPage }
	} catch (error) {
		console.error(error)
		return { error: error, nextPage }
	}
}
