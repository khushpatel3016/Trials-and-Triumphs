import LocalFont from 'next/font/local'

const hylia = LocalFont({
	src: '../fonts/HyliaSerifPrototype-Regular.woff',
})

export default function Loading() {
	return (
		<main className="relative min-h-screen w-full flex items-center justify-center bg-[#1a1a1a]">
			<div
				className={`${hylia.className} text-3xl text-amber-500 animate-pulse`}
			>
				Loading...
			</div>
		</main>
	)
}
