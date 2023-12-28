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
import {
	and,
	asc,
	desc,
	eq,
	getTableColumns,
	ilike,
	not,
	sql,
} from 'drizzle-orm'
import { OrderBy } from '@/actions/order-by'
import { parseOrderByQueryParam } from '@/lib/utils'

export type GameQuery = {
	searchText: string
	genreSlug?: string
	platformSlug?: string
	orderBy?: OrderBy
}

function isAscending(orderBy: OrderBy): boolean {
	if (!orderBy) return true
	switch (orderBy) {
		case OrderBy.createdAt:
		case OrderBy.name:
			return true
		case OrderBy.rating:
		case OrderBy.released:
		case OrderBy.metacritic:
			return false
	}
}

export async function getGames({
	page = 0,
	query,
}: {
	page: number
	query: GameQuery
}): Promise<{ data?: Game[]; nextPage: number; error?: Error | unknown }> {
	const orderBy = parseOrderByQueryParam(query.orderBy) ?? OrderBy.createdAt
	const ascending = isAscending(orderBy)
	const nextPage = page + 1
	try {
		const g = db
			.select({
				...getTableColumns(GamesTable),
			})
			.from(GamesTable)
			.innerJoin(GamesToPlatforms, eq(GamesTable.id, GamesToPlatforms.gameId))
			.innerJoin(
				PlatformsTable,
				eq(GamesToPlatforms.platformId, PlatformsTable.id)
			)
			.where(
				query.platformSlug
					? eq(PlatformsTable.slug, query.platformSlug)
					: not(eq(PlatformsTable.slug, ''))
			)
			.as('g')

		const statement = db
			.select({
				id: g.id,
				sourceId: g.sourceId,
				createdAt: g.createdAt,
				updatedAt: g.updatedAt,
				slug: g.slug,
				name: g.name,
				released: g.released,
				backgroundImage: g.backgroundImage,
				rating: g.rating,
				ratingTop: g.ratingTop,
				ratingsCount: g.ratingsCount,
				metacritic: g.metacritic,
				playtime: g.playtime,
				userId: g.userId,
				platforms: sql<
					Platform[]
				>`json_agg(json_build_object('id', platforms.id, 'name', platforms.name, 'slug', platforms.slug, 'parentSlug', platforms.parent_slug, 'gamesCount', platforms.games_count, 'imageBackground', platforms.image_background))`,
			})
			.from(g)
			.innerJoin(GamesToPlatforms, eq(g.id, GamesToPlatforms.gameId))
			.innerJoin(
				PlatformsTable,
				eq(GamesToPlatforms.platformId, PlatformsTable.id)
			)
			.innerJoin(GamesToGenresTable, eq(g.id, GamesToGenresTable.gameId))
			.innerJoin(
				GenresTable,
				and(
					eq(GamesToGenresTable.genreId, GenresTable.id),
					ilike(g.name, `%${query.searchText}%`) // This should not be here
				)
			)
			.groupBy(
				g.id,
				g.name,
				g.slug,
				g.sourceId,
				g.createdAt,
				g.updatedAt,
				g.released,
				g.backgroundImage,
				g.rating,
				g.ratingTop,
				g.ratingsCount,
				g.metacritic,
				g.playtime,
				g.userId
			)
			.orderBy(ascending ? asc(g[orderBy]) : desc(g[orderBy]))
			.limit(20)
			.offset(page * 20)
		if (query.genreSlug) {
			statement.where(eq(GenresTable.slug, query.genreSlug))
		}
		const data = await statement.execute()
		return { data, nextPage }
	} catch (error) {
		console.error('--> Error getting games')
		console.error(error)
		return { error: error, nextPage }
	}
}
