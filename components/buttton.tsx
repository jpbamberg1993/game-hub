import React, { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	className?: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	loading?: boolean
}

export function Buttton({
	children,
	className,
	onClick,
	type,
	disabled,
	loading,
	...props
}: Props) {
	return (
		<button
			{...props}
			className={`flex w-min items-center justify-center text-base font-medium shadow-sm ${
				className ?? ''
			}`}
			onClick={onClick}
			type={type}
			disabled={disabled || loading}
		>
			{loading ? (
				<svg
					className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
				>
					<circle
						className='opacity-25'
						cx='12'
						cy='12'
						r='10'
						stroke='currentColor'
						strokeWidth='4'
					></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
					></path>
				</svg>
			) : null}
			{children}
		</button>
	)
}
