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
import { GamesToPlatformsTable } from './games-to-platforms-table'
import { Platform } from '@/lib/db/schema/platforms'

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
	platforms: many(GamesToPlatformsTable),
}))

export type BaseGame = InferSelectModel<typeof GamesTable>
export type Game = BaseGame & {
	platforms: { platform: Platform | null }[]
}
export type NewGame = InferInsertModel<typeof GamesTable>
