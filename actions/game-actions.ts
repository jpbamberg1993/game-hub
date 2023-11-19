'use server'

import { Game } from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'

export async function getGames({
	pageParam = 0,
}: {
	pageParam: number
}): Promise<{ data?: Game[]; nextPage: number; error?: Error | unknown }> {
	const nextPage = pageParam + 1
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
			offset: pageParam * 20,
			limit: 20,
		})
		return { data, nextPage }
	} catch (error) {
		console.error(error)
		return { error: error, nextPage }
	}
}
