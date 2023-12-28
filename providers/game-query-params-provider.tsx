'use client'

import { GameQuery } from '@/actions/game-actions'
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import {
	ReadonlyURLSearchParams,
	usePathname,
	useRouter,
	useSearchParams,
} from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { parseOrderByQueryParam } from '@/lib/utils'

const QueryParamsContext = createContext<
	| {
			gameQueryParams: GameQuery
			setGameQueryParams: (query: GameQuery) => void
	  }
	| undefined
>(undefined)

function getInitialGameQuery(searchParams: ReadonlyURLSearchParams) {
	const getQueryParam = (key: keyof GameQuery) => searchParams.get(key) ?? ''
	const searchText = getQueryParam('searchText') ?? ''
	const genreSlug = getQueryParam('genreSlug') ?? ''
	const platformSlug = getQueryParam('platformSlug') ?? ''
	const query: GameQuery = { searchText, genreSlug, platformSlug }
	const orderBy = parseOrderByQueryParam(searchParams.get('orderBy') as string)
	if (orderBy) {
		query.orderBy = orderBy
	}
	return query
}

export function GameQueryParamsProvider({ children }: { children: ReactNode }) {
	const router = useRouter()
	const routerRef = useRef(router)
	const pathname = usePathname()
	const pathnameRef = useRef(pathname)
	const searchParams = useSearchParams()
	const [gameQueryParams, setGameQueryParams] = useState<GameQuery>(
		getInitialGameQuery(searchParams)
	)
	const [gameQueryParamsDebounced] = useDebounce(gameQueryParams, 500)
	const initialRender = useRef(true)

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false
			return
		}
		if (routerRef.current) {
			let params = new URLSearchParams()
			Object.entries(gameQueryParamsDebounced).forEach(([key, value]) => {
				if (value === undefined || value === '') {
					params.delete(key)
				} else {
					params.set(key, value)
				}
			})
			routerRef.current.push(`${pathnameRef.current}?${params.toString()}`)
		}
	}, [gameQueryParamsDebounced, pathnameRef])

	return (
		<QueryParamsContext.Provider
			value={{ gameQueryParams, setGameQueryParams }}
		>
			{children}
		</QueryParamsContext.Provider>
	)
}

export function useSearchQueryParams() {
	const context = useContext(QueryParamsContext)
	if (context === undefined) {
		throw new Error(
			'useGameQueryParams must be used within a GameQueryParamsProvider'
		)
	}
	return context
}
