import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from '@/components/search-input'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
	return (
		<header className='flex items-center py-4'>
			<Link href='/' className='flex-none'>
				<Image src='/next.svg' width={100} height={100} alt='Next js logo' />
			</Link>
			<SearchInput />
			<ThemeToggle />
		</header>
	)
}
