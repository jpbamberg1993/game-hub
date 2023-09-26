import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
import { getTimeStamp } from '../column-utils'
import { GamesTable } from './games'

export const UsersTable = pgTable(
	'users',
	{
		id: uuid('id').primaryKey().defaultRandom().notNull(),
		name: varchar('name', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }).notNull(),
		image: varchar('image', { length: 255 }).notNull(),
		createdAt: getTimeStamp('created_at'),
		updateAt: getTimeStamp('updated_at'),
	},
	(users) => {
		return {
			uniqueIdx: uniqueIndex(`unique_idx`).on(users.email),
		}
	}
)

export type User = InferSelectModel<typeof UsersTable>
export type NewUser = InferInsertModel<typeof UsersTable>

export const UsersRelations = relations(UsersTable, ({ many }) => ({
	games: many(GamesTable),
}))
