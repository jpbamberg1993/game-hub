type Props = {
	score: number
}
export function CriticScore({ score }: Props) {
	let color = 'bg-red-500'
	if (score >= 50) color = 'bg-yellow-500'
	if (score >= 75) color = 'bg-green-500'

	return (
		<span
			className={`${color} rounded bg-opacity-60 px-2 py-0.5 text-xs text-white dark:bg-opacity-30`}
		>
			{score}
		</span>
	)
}
