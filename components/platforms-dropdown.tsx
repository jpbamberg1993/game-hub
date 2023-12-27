'use client'

import { useSearchQueryParams } from '@/providers/game-query-params-provider'
import { Platform } from '@/lib/db/schema'

type Props = {
	platforms: Platform[]
}

export function PlatformsDropdown({ platforms }: Props) {
	const { gameQueryParams, setGameQueryParams } = useSearchQueryParams()

	return (
		<select
			value={gameQueryParams.platformSlug}
			onChange={(event) =>
				setGameQueryParams({
					...gameQueryParams,
					platformSlug: event.target.value,
				})
			}
			className='block w-56 rounded-md border border-gray-300 bg-white py-2 pl-1 pr-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 sm:text-sm'
		>
			<option value=''>All Platforms</option>
			{platforms.map((p) => (
				<option key={p.id} value={p.slug}>
					{p.name}
				</option>
			))}
		</select>
	)
}
