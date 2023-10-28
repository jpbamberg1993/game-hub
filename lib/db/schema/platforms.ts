import {
	integer,
	pgTable,
	smallint,
	text,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { relations } from 'drizzle-orm'
import { GamesToPlatforms } from './games-to-platforms'

export const PlatformsTable = pgTable(
	'platforms',
	{
		id: smallint('id').primaryKey().notNull(),
		name: varchar('name', { length: 255 }).notNull(),
		slug: varchar('slug', { length: 255 }).notNull(),
		gamesCount: integer('games_count').notNull(),
		imageBackground: text('image_background').notNull(),
	},
	(platforms) => {
		return {
			uniqueIdx: uniqueIndex(`unique_idx`).on(platforms.slug),
		}
	}
)

export const PlatformsRelations = relations(PlatformsTable, ({ many }) => {
	return {
		games: many(GamesToPlatforms),
	}
})

export type Platform = InferSelectModel<typeof PlatformsTable>
export type NewPlatform = InferInsertModel<typeof PlatformsTable>
