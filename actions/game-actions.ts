'use server'

import {
	Game,
	GamesTable,
	GamesToGenresTable,
	GamesToPlatforms,
	GenresTable,
	Platform,
	PlatformsTable,
} from '@/lib/db/schema'
import { db } from '@/lib/db/drizzle'
import { asc, eq, getTableColumns, ilike, sql } from 'drizzle-orm'

export type GameQuery = {
	searchText: string
	genreSlug?: string
}

export async function getGames({
	page = 0,
	query,
}: {
	page: number
	query: GameQuery
}): Promise<{ data?: Game[]; nextPage: number; error?: Error | unknown }> {
	const nextPage = page + 1
	console.log(`getGames: query: ${JSON.stringify(query)}`)
	try {
		const statement = db
			.select({
				...getTableColumns(GamesTable),
				platforms: sql<
					Platform[]
				>`json_agg(json_build_object('id', platforms.id, 'name', platforms.name, 'slug', platforms.slug, 'parentSlug', platforms.parent_slug, 'gamesCount', platforms.games_count, 'imageBackground', platforms.image_background))`,
			})
			.from(GamesTable)
			.innerJoin(GamesToPlatforms, eq(GamesTable.id, GamesToPlatforms.gameId))
			.innerJoin(
				PlatformsTable,
				eq(GamesToPlatforms.platformId, PlatformsTable.id)
			)
			.innerJoin(
				GamesToGenresTable,
				eq(GamesTable.id, GamesToGenresTable.gameId)
			)
			.innerJoin(GenresTable, eq(GamesToGenresTable.genreId, GenresTable.id))
			.where(ilike(GamesTable.name, `%${query.searchText}%`))
			.groupBy(GamesTable.id)
			.orderBy(asc(GamesTable.createdAt))
			.limit(20)
			.offset(page * 20)
		if (query.genreSlug) {
			statement.where(eq(GenresTable.slug, query.genreSlug))
		}
		const data = await statement.execute()
		return { data, nextPage }
	} catch (error) {
		console.error(error)
		return { error: error, nextPage }
	}
}
