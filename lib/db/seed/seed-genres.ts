import { db } from '../drizzle'
import { RawgApi, RawgGenre } from '../../rawg/rawg-api'
import { Genre, GenresTable } from '../schema/genres'

export class SeedGenres {
	constructor(private readonly rawgApi: RawgApi) {}

	async run() {
		const rawgGenres = await this.rawgApi.getGenres()
		const genres = this.mapGenres(rawgGenres)
		const savedGenres = await this.saveGenres(genres)
		return savedGenres.length === savedGenres.length
	}

	private async saveGenres(genres: Genre[]) {
		return db.insert(GenresTable).values(genres).returning()
	}

	private mapGenres(rawgGenres: RawgGenre[]) {
		return rawgGenres.map((genre) => {
			return {
				id: genre.id,
				name: genre.name,
				slug: genre.slug,
				gamesCount: genre.games_count,
				imageBackground: genre.image_background,
			} as Genre
		})
	}
}
