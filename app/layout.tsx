import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import { GameQueryParamsProvider } from '@/providers/game-query-params-provider'

export const metadata = {
	title: `RAWG Clone`,
	description: `A simple Next.js app with Vercel Postgres as the database and Drizzle as the ORM`,
}

const inter = Inter({
	variable: '--font-inter',
	subsets: ['latin'],
	display: 'swap',
})

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} bg-white dark:bg-gray-800`}>
				<GameQueryParamsProvider>
					<ReactQueryProvider>
						<div className='px-4 sm:px-6 lg:px-8'>
							{children}
							<Analytics />
						</div>
					</ReactQueryProvider>
				</GameQueryParamsProvider>
			</body>
		</html>
	)
}
