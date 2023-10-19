import { Platform } from '@/lib/db/schema'
import { IconType } from 'react-icons'
import {
	FaAndroid,
	FaApple,
	FaLinux,
	FaPlaystation,
	FaWindows,
	FaXbox,
} from 'react-icons/fa'
import { SiNintendo } from 'react-icons/si'
import { BsGlobe } from 'react-icons/bs'
import { Gi3DGlasses } from 'react-icons/gi'

type Props = {
	platforms: { platform: Platform | null }[]
}

export function PlatformIconList({ platforms }: Props) {
	const iconMap = new Map<string, IconType>([
		['pc', FaWindows],
		['xbox', FaXbox],
		['playstation', FaPlaystation],
		['nintendo', SiNintendo],
		['mac', FaApple],
		['linux', FaLinux],
		['ios', FaApple],
		['android', FaAndroid],
		['web', BsGlobe],
	])

	return (
		<div className='flex'>
			{platforms.map(({ platform }) => {
				if (!platform) return null
				const Icon = iconMap.get(platform.slug) ?? Gi3DGlasses
				return <Icon key={platform.id} />
			})}
		</div>
	)
}
