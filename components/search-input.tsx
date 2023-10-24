'use client'

import { FormEvent, useRef } from 'react'
import { BsSearch } from 'react-icons/bs'

export function SearchInput() {
	const ref = useRef<HTMLInputElement | null>(null)

	async function onSearch(event: FormEvent) {
		event.preventDefault()
		console.log(`--> onSearch ${ref.current?.value}`)
	}

	return (
		<form onSubmit={onSearch} className='flex-grow px-4'>
			<span className='sr-only'>Search</span>
			<div className='flex items-center rounded-full border px-3 py-2 focus-within:border-blue-400 dark:bg-gray-900 dark:bg-opacity-50'>
				<BsSearch className='dark:text-gray-50' />
				<input
					ref={ref}
					type='text'
					name='search'
					placeholder='Search'
					className='flex-grow bg-transparent pl-2 focus:outline-none dark:text-stone-200'
				/>
			</div>
		</form>
	)
}
