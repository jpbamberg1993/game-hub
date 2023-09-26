import { timestamp } from 'drizzle-orm/pg-core'

export function getTimeStamp(name: string) {
	return timestamp(name, { withTimezone: true }).notNull().defaultNow()
}
