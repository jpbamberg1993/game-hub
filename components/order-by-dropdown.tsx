'use client'

import { useSearchQueryParams } from '@/providers/game-query-params-provider'
import { OrderBy, OrderByDisplay } from '@/actions/order-by'

export function OrderByDropdown() {
	const { gameQueryParams, setGameQueryParams } = useSearchQueryParams()

	return (
		<select
			value={gameQueryParams.orderBy}
			onChange={(event) =>
				setGameQueryParams({
					...gameQueryParams,
					orderBy: event.target.value as any,
				})
			}
			className='block w-44 rounded-md border border-gray-300 bg-white py-2 pl-1 pr-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 sm:text-sm'
		>
			{Object.values(OrderBy).map((orderBy) => (
				<option key={orderBy} value={orderBy}>
					{OrderByDisplay[orderBy]}
				</option>
			))}
		</select>
	)
}
