import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function useGenreHook(initialGenre: string) {
	const router = useRouter()
	const routerRef = useRef(router)
	const [genre, setGenre] = useState(initialGenre)

	useEffect(() => {
		if (genre) {
			routerRef.current.push(`/?genre=${genre}`)
		} else {
			routerRef.current.push('/')
		}
	}, [genre])

	return { genre, setGenre }
}
