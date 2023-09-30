import { GamesTable, NewGame } from '../schema/games'
import { RawgApi, RawgGame } from '../../rawg/rawg-api'
import { db } from '../drizzle'
import { User } from '../schema/users'
import { GamesToGenresTable, NewGameToGenre } from '../schema/genres'

export class SeedGames {
	constructor(
		private readonly rawgApi: RawgApi,
		private readonly users: User[]
	) {}

	async run() {
		const rawgGames = await this.rawgApi.getGames()
		const games = this.mapGames(rawgGames)
		const savedGames = await this.saveGames(games)
		const gamesToGenres = await this.saveGamesToGenres(savedGames, rawgGames)
		return (
			rawgGames.length === savedGames.length &&
			savedGames.length === gamesToGenres.length
		)
	}

	private async saveGamesToGenres(games: NewGame[], rawgGames: RawgGame[]) {
		let gamesToGenres: NewGameToGenre[] = []
		for (const rawgGame of rawgGames) {
			const game = games.find((g) => g.sourceId === rawgGame.id)
			if (!game) {
				continue
			}
			const genres = rawgGame.genres.map((genre) => {
				return {
					gameId: game.id,
					genreId: genre.id,
				} as NewGameToGenre
			})
			gamesToGenres = gamesToGenres.concat(genres)
		}
		return db.insert(GamesToGenresTable).values(gamesToGenres).returning()
	}

	private async saveGames(games: NewGame[]) {
		return db.insert(GamesTable).values(games).returning()
	}

	private mapGames(rawgGames: RawgGame[]): NewGame[] {
		return rawgGames.map((game) => {
			return {
				name: game.name,
				sourceId: game.id,
				slug: game.slug,
				released: game.released,
				backgroundImage: game.background_image,
				rating: game.rating.toString(),
				ratingTop: game.rating_top,
				ratingsCount: game.ratings_count,
				metacritic: game.metacritic,
				playtime: game.playtime,
				userId: this.getRandomUserId(),
			} as NewGame
		})
	}

	private getRandomUserId() {
		const randomIndex = Math.floor(Math.random() * this.users.length)
		return this.users[randomIndex].id
	}
}
