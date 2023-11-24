'use client'

import { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSearchQueryUpdater } from '@/hooks/search-hook'
import { useIsMac } from '@/hooks/is-mac-hook'
import { useSearchInputKeyboardHook } from '@/hooks/search-input-keyboard-hook'

type Props = {
	searchText: string
}

export function SearchInput({ searchText }: Props) {
	const searchRef = useRef<HTMLInputElement>(null)
	useSearchInputKeyboardHook(searchRef)
	const { text, setText } = useSearchQueryUpdater(searchText)
	const { isMac } = useIsMac()
	const placeholder = isMac ? '⌘+K to search' : 'Ctrl+K to search'

	return (
		<div className='flex-grow px-4'>
			<span className='sr-only'>Search</span>
			<div className='flex items-center rounded-full border px-3 py-2 focus-within:border-blue-400 dark:bg-gray-900 dark:bg-opacity-50'>
				<BsSearch className='dark:text-gray-50' />
				<input
					ref={searchRef}
					value={text}
					onChange={(event) => setText(event.target.value)}
					type='text'
					name='search'
					placeholder={placeholder}
					className='flex-grow bg-transparent pl-2 focus:outline-none dark:text-stone-200'
				/>
			</div>
		</div>
	)
}
