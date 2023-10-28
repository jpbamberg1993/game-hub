import { RawgApi, RawgPlatform } from '../../rawg/rawg-api'
import { Platform, PlatformsTable } from '../schema/platforms'
import { db } from '../drizzle'

export class SeedPlatforms {
	constructor(private readonly rawgApi: RawgApi) {}

	async run() {
		const rawgPlatforms = await this.rawgApi.getPlatforms()
		const platforms = this.mapPlatforms(rawgPlatforms)
		const savedPlatforms = await this.savePlatforms(platforms)
		return rawgPlatforms.length === savedPlatforms.length
	}

	private async savePlatforms(platforms: Platform[]): Promise<Platform[]> {
		return db.insert(PlatformsTable).values(platforms).returning()
	}

	private mapPlatforms(rawgPlatforms: RawgPlatform[]) {
		return rawgPlatforms.map((platform) => {
			return {
				id: platform.id,
				name: platform.name,
				slug: platform.slug,
				parentSlug: this.getParentSlug(platform.slug),
				gamesCount: platform.games_count,
				imageBackground: platform.image_background,
			} as Platform
		})
	}

	private getParentSlug(slug: string) {
		const platforms = [
			{ keyword: 'playstation', slug: 'playstation' },
			{ keyword: 'xbox', slug: 'xbox' },
			{ keyword: 'nintendo', slug: 'nintendo' },
			{ keyword: 'ios', slug: 'ios' },
			{ keyword: 'android', slug: 'android' },
			{ keyword: 'mac', slug: 'mac' },
			{ keyword: 'apple', slug: 'mac' },
			{ keyword: 'linux', slug: 'linux' },
			{ keyword: 'pc', slug: 'pc' },
			{ keyword: 'ps-vita', slug: 'ps-vita' },
			{ keyword: 'wii', slug: 'wii' },
		]
		const platform = platforms.find((p) => slug.includes(p.keyword))
		return platform ? platform.slug : 'other'
	}
}
