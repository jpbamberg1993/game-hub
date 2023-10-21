'use client'

import { FormEvent, useRef } from 'react'

export function SearchInput() {
	const ref = useRef<HTMLInputElement | null>(null)

	async function onSearch(event: FormEvent) {
		event.preventDefault()
		console.log(`--> onSearch ${ref.current?.value}`)
	}

	return (
		<form onSubmit={onSearch} className='flex-grow px-4'>
			<span className='sr-only'>Search</span>
			<input
				ref={ref}
				type='text'
				name='search'
				placeholder='Search'
				className='w-full rounded-full border border-gray-300 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none dark:bg-gray-800'
			/>
		</form>
	)
}