import { useEffect, useState } from 'react'

export function useIsMac() {
	const [isMac, setIsMac] = useState(false)
	useEffect(() => {
		setIsMac(navigator.userAgent.toUpperCase().includes('MAC'))
	}, [])
	return { isMac }
}
