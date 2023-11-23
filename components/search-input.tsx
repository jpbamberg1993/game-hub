'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

type Props = {
	searchText: string
}

export function SearchInput({ searchText }: Props) {
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

	return (
		<div className='flex-grow px-4'>
			<span className='sr-only'>Search</span>
			<div className='flex items-center rounded-full border px-3 py-2 focus-within:border-blue-400 dark:bg-gray-900 dark:bg-opacity-50'>
				<BsSearch className='dark:text-gray-50' />
				<input
					value={text}
					onChange={(event) => setText(event.target.value)}
					type='text'
					name='search'
					placeholder='Search'
					className='flex-grow bg-transparent pl-2 focus:outline-none dark:text-stone-200'
				/>
			</div>
		</div>
	)
}
