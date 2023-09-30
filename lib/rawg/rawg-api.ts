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
	parent_platforms: { platform: RawgPlatform }[]
}

export type RawgGenre = {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
}

export type RawgPlatform = {
	id: number
	name: string
	slug: string
	games_count: number
	image_background: string
}

export class RawgApi {
	private readonly BASE_URL: string = 'https://api.rawg.io/api'

	public async getPlatforms(): Promise<RawgPlatform[]> {
		const response = await this.sendRequest(`platforms`)
		const json = await response.json()
		if (json.next) {
			const nextPageResponse = await fetch(json.next)
			const nextPageJson = await nextPageResponse.json()
			json.results = json.results.concat(nextPageJson.results)
		}
		return json.results
	}

	public async getGenres(): Promise<RawgGenre[]> {
		const response = await this.sendRequest(`genres`)
		const json = await response.json()
		return json.results
	}

	public async getGames(): Promise<RawgGame[]> {
		const response = await this.sendRequest(`games`)
		const json = await response.json()
		return json.results
	}

	private async sendRequest(route: string) {
		return await fetch(
			`${this.BASE_URL}/${route}?key=${process.env.RAWG_API_KEY}`
		)
	}
}
