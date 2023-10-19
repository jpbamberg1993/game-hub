import { GamesTable, NewGame } from '../schema/games'
import { RawgApi, RawgGame } from '../../rawg/rawg-api'
import { db } from '../drizzle'
import { User } from '../schema/users'
import { GamesToGenresTable, NewGameToGenre } from '../schema/genres'
import {
	GamesToPlatformsTable,
	NewGameToPlatform,
} from '../schema/gamesToPlatformsTable'

export class SeedGames {
	constructor(
		private readonly rawgApi: RawgApi,
		private readonly users: User[]
	) {}

	public async run() {
		const pages = 100
		const concurrentLimit = 10
		const activeTasks: Promise<any>[] = []
		let currentPage = 1

		while (currentPage <= pages) {
			if (activeTasks.length >= concurrentLimit) {
				await Promise.race(activeTasks)
			}
			const activeTask = this.seed(currentPage)
				.then(() => {
					activeTasks.splice(activeTasks.indexOf(activeTask), 1)
				})
				.catch((e) => {
					console.error(e)
					activeTasks.splice(activeTasks.indexOf(activeTask), 1)
				})
			activeTasks.push(activeTask)
			currentPage++
		}

		await Promise.all(activeTasks)
	}

	private async seed(page: number) {
		const rawgGames = await this.rawgApi.getGames(page)
		const games = this.mapGames(rawgGames)
		const savedGames = await this.saveGames(games)
		await this.saveGamesToGenres(savedGames, rawgGames)
		await this.saveGamesToPlatforms(savedGames, rawgGames)
	}

	private async saveGamesToPlatforms(games: NewGame[], rawgGames: RawgGame[]) {
		let gamesToPlatforms: NewGameToPlatform[] = []
		for (const rawgGame of rawgGames) {
			const game = games.find((g) => g.sourceId === rawgGame.id)
			if (!game) {
				continue
			}
			const platforms = rawgGame.parent_platforms.map((platform) => {
				return {
					gameId: game.id,
					platformId: platform.platform.id,
				} as NewGameToPlatform
			})
			gamesToPlatforms = gamesToPlatforms.concat(platforms)
		}
		return db.insert(GamesToPlatformsTable).values(gamesToPlatforms).returning()
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
		return rawgGames
			.filter((game) => game.released && game.background_image && game.rating)
			.map((game) => {
				return {
					name: game.name,
					sourceId: game.id,
					slug: game.slug,
					released: game.released,
					backgroundImage: game.background_image,
					rating: game.rating.toString(),
					ratingTop: game.rating_top,
					ratingsCount: game.ratings_count,
					metacritic: game.metacritic ?? 0,
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
