import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from '@/components/search-input'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
	return (
		<header className='flex items-center justify-between py-4'>
			<Link href='/'>
				<Image src='/next.svg' width={500} height={500} alt='Next js logo' />
			</Link>
			<SearchInput />
			<ThemeToggle />
		</header>
	)
}
