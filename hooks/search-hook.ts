import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

export function useSearchQueryUpdater(searchText: string) {
	const router = useRouter()
	const routerRef = useRef(router)
	const initialRender = useRef(true)
	const [text, setText] = useState(searchText)
	const [query] = useDebounce(text, 750)

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false
			return
		}

		if (!query) {
			routerRef.current.push('/')
		} else {
			routerRef.current.push(`/?search=${query}`)
		}
	}, [query])

	return { text, setText }
}
