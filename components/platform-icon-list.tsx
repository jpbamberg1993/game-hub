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
import { SiNintendo, SiPlaystationvita } from 'react-icons/si'
import { BsGlobe } from 'react-icons/bs'
import { Gi3DGlasses, GiSmartphone } from 'react-icons/gi'
import { filterDuplicates } from '@/lib/utils'

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
		['ios', GiSmartphone],
		['android', FaAndroid],
		['web', BsGlobe],
		['ps-vita', SiPlaystationvita],
	])

	const flattenedPlatforms: Platform[] = platforms
		.filter(({ platform }) => platform !== null)
		.map(({ platform }) => platform as Platform)

	const filteredPlatforms = filterDuplicates(flattenedPlatforms, 'parentSlug')

	return (
		<div className='flex'>
			{filteredPlatforms.map((platform) => {
				if (!platform) return null
				const Icon = iconMap.get(platform.parentSlug) ?? Gi3DGlasses
				return <Icon key={platform.id} />
			})}
		</div>
	)
}
