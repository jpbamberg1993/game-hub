import { GamesTable } from '@/lib/db/schema/games'
import { db } from '@/lib/db/drizzle'
import { NextResponse } from 'next/server'

export async function GET() {
	const games = await db.select().from(GamesTable).limit(20)

	return games
		? NextResponse.json({ games }, { status: 200 })
		: NextResponse.json({ message: 'No games found' }, { status: 404 })
}
