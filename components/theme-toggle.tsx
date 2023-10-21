'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
	const [darkMode, setDarkMode] = useState(false)

	useEffect(() => {
		const currentTheme = localStorage.getItem('theme')
		if (currentTheme === 'dark') {
			document.documentElement.classList.add('dark')
			setDarkMode(true)
		}
	}, [])

	function toggleTheme() {
		if (darkMode) {
			localStorage.setItem('theme', 'light')
			document.documentElement.classList.remove('dark')
		} else {
			localStorage.setItem('theme', 'dark')
			document.documentElement.classList.add('dark')
		}
		setDarkMode(!darkMode)
	}

	return (
		<label className='relative inline-flex flex-none cursor-pointer items-center'>
			<input
				onChange={toggleTheme}
				checked={darkMode}
				type='checkbox'
				className='peer sr-only'
			/>
			<div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
			<span className='ml-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
				{darkMode ? 'Light' : 'Dark'}
			</span>
		</label>
	)
}
