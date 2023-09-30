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
				gamesCount: platform.games_count,
				imageBackground: platform.image_background,
			} as Platform
		})
	}
}
