import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

export const metadata = {
	title: `Vercel Postgres Demo with Drizzle`,
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
			<body className={inter.variable}>{children}</body>
		</html>
	)
}
