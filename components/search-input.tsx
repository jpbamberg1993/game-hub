'use client'

import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSearchQueryUpdater } from '@/hooks/search-hook'

type Props = {
	searchText: string
}

export function SearchInput({ searchText }: Props) {
	const { text, setText } = useSearchQueryUpdater(searchText)

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
