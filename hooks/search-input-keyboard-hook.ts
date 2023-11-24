import { RefObject, useEffect, useRef } from 'react'

export function useSearchInputKeyboardHook(
	searchRef: RefObject<HTMLInputElement>
) {
	useEffect(() => {
		function handleMetaKeyPlusK(event: KeyboardEvent) {
			if (event.metaKey && event.key === 'k') {
				event.preventDefault()
				searchRef.current?.focus()
			}
		}

		window.addEventListener('keydown', handleMetaKeyPlusK)

		return () => window.removeEventListener('keydown', handleMetaKeyPlusK)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
