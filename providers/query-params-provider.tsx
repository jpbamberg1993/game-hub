'use client'

import { GameQuery } from '@/actions/game-actions'
import {
	createContext,
	ReactNode,
	useCallback,
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

const QueryParamsContext = createContext<
	| {
			gameQueryParams: GameQuery
			setGameQueryParams: (query: GameQuery) => void
	  }
	| undefined
>(undefined)

function getInitialGameQuery(searchParams: ReadonlyURLSearchParams) {
	// Todo: Move query parameters to constants
	const searchText = searchParams.get('searchText') ?? ''
	const genreSlug = searchParams.get('genreSlug') ?? ''
	return { searchText, genreSlug }
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
