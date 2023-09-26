import {
	integer,
	pgTable,
	smallint,
	text,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core'
import { InferSelectModel, relations } from 'drizzle-orm'
import { GamesTable } from './games'
import { getTimeStamp } from '../column-utils'

export const GenresTable = pgTable(
	'genres',
	{
		id: smallint('id').primaryKey().notNull(),
		createdAt: getTimeStamp('created_at'),
		updateAt: getTimeStamp('updated_at'),
		name: varchar('name', { length: 255 }).notNull(),
		slug: varchar('slug', { length: 255 }).notNull(),
		gamesCount: integer('games_count').notNull(),
		imageBackground: text('image_background').notNull(),
	},
	(genres) => {
		return {
			uniqueIdx: uniqueIndex(`unique_idx`).on(genres.slug),
		}
	}
)

export type Genre = InferSelectModel<typeof GenresTable>
export type NewGenre = InferSelectModel<typeof GenresTable>

export const GamesToGenresTable = pgTable(
	'games_to_genres',
	{
		gameId: uuid('game_id').notNull(),
		genreId: smallint('genre_id').notNull(),
	},
	(t) => {
		return {
			uniqueIdx: uniqueIndex(`unique_idx`).on(t.gameId, t.genreId),
		}
	}
)

export const GenresRelations = relations(GenresTable, ({ many }) => ({
	genres: many(GamesToGenresTable),
}))

export const genresRelations = relations(GamesToGenresTable, ({ one }) => ({
	genres: one(GenresTable, {
		fields: [GamesToGenresTable.genreId],
		references: [GenresTable.id],
	}),
	games: one(GamesTable, {
		fields: [GamesToGenresTable.gameId],
		references: [GamesTable.id],
	}),
}))
