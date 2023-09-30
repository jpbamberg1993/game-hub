import {
	date,
	integer,
	numeric,
	pgTable,
	smallint,
	text,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { getTimeStamp } from '../column-utils'
import { UsersTable } from './users'
import { GamesToGenresTable } from './genres'
import { PlatformsTable } from './platforms'

export const GamesTable = pgTable(
	'games',
	{
		id: uuid('id').primaryKey().defaultRandom().notNull(),
		sourceId: integer('source_id').notNull(),
		createdAt: getTimeStamp('created_at'),
		updateAt: getTimeStamp('updated_at'),
		slug: varchar('slug', { length: 255 }).notNull(),
		name: varchar('name', { length: 255 }).notNull(),
		released: date('released_at').notNull(),
		backgroundImage: text('background_image').notNull(),
		rating: numeric('rating', { precision: 3, scale: 2 }).notNull(),
		ratingTop: smallint('rating_top').notNull(),
		ratingsCount: integer('ratings_count').notNull(),
		metacritic: integer('metacritic').notNull(),
		playtime: integer('playtime').notNull(),
		userId: uuid('user_id').notNull(),
	},
	(games) => {
		return {
			uniqueIdx: uniqueIndex(`unique_idx`).on(games.slug),
		}
	}
)

export const GamesRelations = relations(GamesTable, ({ one, many }) => ({
	user: one(UsersTable, {
		fields: [GamesTable.userId],
		references: [UsersTable.id],
	}),
	genres: many(GamesToGenresTable),
}))

export type Game = InferSelectModel<typeof GamesTable>
export type NewGame = InferInsertModel<typeof GamesTable>

export const GamesToPlatformsTable = pgTable(
	'games_to_platforms',
	{
		gameId: uuid('game_id').notNull(),
		platformId: smallint('platform_id').notNull(),
	},
	(t) => {
		return {
			uniqueIdx: uniqueIndex(`unique_idx`).on(t.gameId, t.platformId),
		}
	}
)

export type GameToPlatform = InferSelectModel<typeof GamesToPlatformsTable>
export type NewGameToPlatform = InferInsertModel<typeof GamesToPlatformsTable>

// Todo: Add relations
export const platformsRelations = relations(
	GamesToPlatformsTable,
	({ one }) => {
		return {
			platforms: one(PlatformsTable, {
				fields: [GamesToPlatformsTable.platformId],
				references: [PlatformsTable.id],
			}),
			games: one(GamesTable, {
				fields: [GamesToPlatformsTable.gameId],
				references: [GamesTable.id],
			}),
		}
	}
)
