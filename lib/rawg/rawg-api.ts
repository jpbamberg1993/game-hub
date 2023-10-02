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
	// Todo: Figure out a cleaner way to build up queries
	private readonly BASE_URL: string = 'https://api.rawg.io/api'

	public async getPlatforms(): Promise<RawgPlatform[]> {
		const response = await this.sendRequest(`/platforms`)
		const json = await response.json()
		if (json.next) {
			const nextPageResponse = await fetch(json.next)
			const nextPageJson = await nextPageResponse.json()
			json.results = json.results.concat(nextPageJson.results)
		}
		return json.results
	}

	public async getGenres(): Promise<RawgGenre[]> {
		const response = await this.sendRequest(`/genres`)
		const json = await response.json()
		return json.results
	}

	public async getGames(page: number): Promise<RawgGame[]> {
		try {
			const response = await this.sendRequest(
				`/games`,
				new URLSearchParams({ page: page.toString() })
			)
			const json = await response.json()
			return json.results
		} catch (e) {
			console.error(e)
			return []
		}
	}

	private async sendRequest(route: string, queryParameters?: URLSearchParams) {
		const rawgUrl = new URL(this.BASE_URL + route)
		const searchParams = rawgUrl.searchParams
		searchParams.append('key', process.env.RAWG_API_KEY ?? '')
		if (queryParameters) {
			for (const [key, value] of queryParameters.entries()) {
				searchParams.append(key, value)
			}
		}
		return await fetch(rawgUrl.toString())
	}
}
