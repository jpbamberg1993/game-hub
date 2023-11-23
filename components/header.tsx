import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from '@/components/search-input'
import { ThemeToggle } from '@/components/theme-toggle'

type Props = {
	searchText: string
}

export function Header({ searchText }: Props) {
	return (
		<header className='flex items-center py-4'>
			<Link href='/' className='relative'>
				<Image
					src='/next.svg'
					width={100}
					height={20}
					alt='Next js logo'
					className='dark:filter-neon'
				/>
			</Link>
			<SearchInput searchText={searchText} />
			<ThemeToggle />
		</header>
	)
}
