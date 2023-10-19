import { pgTable, smallint, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { relations } from 'drizzle-orm'
import { PlatformsTable } from './platforms'
import { GamesTable } from './games'

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

export const GamesToPlatformsRelations = relations(
	GamesToPlatformsTable,
	({ one }) => {
		return {
			platform: one(PlatformsTable, {
				fields: [GamesToPlatformsTable.platformId],
				references: [PlatformsTable.id],
			}),
			game: one(GamesTable, {
				fields: [GamesToPlatformsTable.gameId],
				references: [GamesTable.id],
			}),
		}
	}
)

export type GameToPlatform = InferSelectModel<typeof GamesToPlatformsTable>
export type NewGameToPlatform = InferInsertModel<typeof GamesToPlatformsTable>
