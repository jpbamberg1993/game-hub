export type RawgGame = {
	id: number
	slug: string
	name: string
	released: string
	background_image: string
	rating: number
	rating_top: number
	ratings_count: number
	metacritic: number
	playtime: number
	genres: RawgGenre[]
}

export type RawgGenre = {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
}

export class RawgApi {
	private readonly BASE_URL: string = 'https://api.rawg.io/api'

	public async getGenres(): Promise<RawgGenre[]> {
		try {
			const response = await this.sendRequest(`genres`)
			const json = await response.json()
			return json.results
		} catch (e) {
			console.error(e)
			return []
		}
	}

	public async getGames(): Promise<RawgGame[]> {
		try {
			const response = await this.sendRequest(`games`)
			const json = await response.json()
			return json.results
		} catch (e) {
			console.error(e)
			return []
		}
	}

	private async sendRequest(route: string) {
		return await fetch(
			`${this.BASE_URL}/${route}?key=${process.env.RAWG_API_KEY}`
		)
	}
}
