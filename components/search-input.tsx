'use client'

import { useRef } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useIsMac } from '@/hooks/is-mac-hook'
import { useSearchInputKeyboardHook } from '@/hooks/search-input-keyboard-hook'
import { useSearchQueryParams } from '@/providers/query-params-provider'

type Props = {
	searchText: string
}

export function SearchInput() {
	const searchRef = useRef<HTMLInputElement>(null)
	useSearchInputKeyboardHook(searchRef)
	const { gameQueryParams, setGameQueryParams } = useSearchQueryParams()
	const { isMac } = useIsMac()
	const placeholder = isMac ? '⌘+K to search' : 'Ctrl+K to search'

	return (
		<div className='flex-grow px-4'>
			<span className='sr-only'>Search</span>
			<div className='flex items-center rounded-full border px-3 py-2 focus-within:border-blue-400 dark:bg-gray-900 dark:bg-opacity-50'>
				<BsSearch className='dark:text-gray-50' />
				<input
					ref={searchRef}
					value={gameQueryParams.searchText}
					onChange={(event) =>
						setGameQueryParams({
							...gameQueryParams,
							searchText: event.target.value,
						})
					}
					type='text'
					name='search'
					placeholder={placeholder}
					className='flex-grow bg-transparent pl-2 focus:outline-none dark:text-stone-200'
				/>
			</div>
		</div>
	)
}
