import { BiJoystick } from 'react-icons/bi'

type Props = {
	rating: number
}

export function Rating({ rating }: Props) {
	return (
		<div className='flex items-center pt-3'>
			{Array.from({ length: rating }).map((_, i) => (
				<BiJoystick key={i} className='dark:text-neon mr-1.5 text-gray-600' />
			))}
		</div>
	)
}
