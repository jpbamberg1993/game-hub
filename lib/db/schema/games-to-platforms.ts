import { pgTable, smallint, uniqueIndex, uuid } from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { relations } from 'drizzle-orm'
import { PlatformsTable } from './platforms'
import { GamesTable } from './games'

export const GamesToPlatforms = pgTable(
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
	GamesToPlatforms,
	({ one }) => {
		return {
			platform: one(PlatformsTable, {
				fields: [GamesToPlatforms.platformId],
				references: [PlatformsTable.id],
			}),
			game: one(GamesTable, {
				fields: [GamesToPlatforms.gameId],
				references: [GamesTable.id],
			}),
		}
	}
)

export type GameToPlatform = InferSelectModel<typeof GamesToPlatforms>
export type NewGameToPlatform = InferInsertModel<typeof GamesToPlatforms>
