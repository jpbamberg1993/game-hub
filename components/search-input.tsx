'use client'

import { FormEvent, useRef } from 'react'

export function SearchInput() {
	const ref = useRef<HTMLInputElement | null>(null)

	async function onSearch(event: FormEvent) {
		event.preventDefault()
		console.log(`--> onSearch ${ref.current?.value}`)
	}

	return (
		<form onSubmit={onSearch}>
			<input
				ref={ref}
				type='text'
				name='search'
				placeholder='Search'
				className='w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none'
			/>
		</form>
	)
}
