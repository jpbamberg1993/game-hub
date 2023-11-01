import ms from 'ms'
import noImage from '../public/no-image-placeholder.webp'
import { headers } from 'next/headers'

export function timeAgo(timestamp: Date, timeOnly?: boolean): string {
	if (!timestamp) return `never`
	return `${ms(Date.now() - new Date(timestamp).getTime())}${
		timeOnly ? `` : ` ago`
	}`
}

export function getCroppedImageUrl(url: string): string {
	if (!url) return noImage.src

	const target = 'media/'
	const index = url.indexOf(target)

	if (index === -1) return url

	const start = url.substring(0, index)
	const end = url.substring(index + target.length)

	return `${start}media/crop/600/400/${end}`
}

export function filterDuplicates<T, K extends keyof T>(arr: T[], key: K): T[] {
	return arr.filter(
		(obj, index) =>
			index === arr.findIndex((otherObj) => obj[key] === otherObj[key])
	)
}

export function getAbsoluteUrl(route: string) {
	const protocol = process.env.NODE_ENV === `development` ? `http` : `https`
	const host = headers().get(`host`)
	return `${protocol}://${host}/api${route}`
}
