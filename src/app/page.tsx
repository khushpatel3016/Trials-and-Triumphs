import Image from 'next/image'
import Link from 'next/link'
import LocalFont from 'next/font/local'
import { La_Belle_Aurore } from 'next/font/google'

const hand = La_Belle_Aurore({
	weight: '400',
	style: 'normal',
})
const hylia = LocalFont({
	src: '../fonts/HyliaSerifPrototype-Regular.woff',
})
export default function LandingPage() {
	return (
		<main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/assets/bg.png"
					alt="Fantasy Landscape Background"
					fill
					className="object-cover"
				/>
			</div>

			{/* Top Header Bar */}
			<div className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-20">
				<div className="bg-black/60 backdrop-blur-sm rounded-2xl p-4 flex items-center border border-white/10 shadow-2xl">
					<div className="flex items-center gap-4">
						<Image
							src="/assets/gdgLogo.svg"
							alt="GDG Logo"
							width={86}
							height={44}
							className="object-contain h-8 md:h-10 w-auto"
						/>
						<span className="text-white/90 text-sm md:text-lg font-medium tracking-tight">
							Google Developer Groups, VIT Chennai
						</span>
					</div>
				</div>
			</div>

			{/* Main Hero Content */}
			<div
				className={`relative z-10 flex flex-col items-center text-center px-4 max-w-5xl`}
			>
				<div className="mb-2 relative">
					<h1
						className={
							'text-5xl sm:text-[100px] font-normal leading-none tracking-[0.03em] text-center underline decoration-solid bg-linear-to-b from-[#E6B758] via-[#977B44] to-[#4B3A18] bg-clip-text text-transparent' +
							' ' +
							hylia.className
						}
					>
						Trials and Triumphs
					</h1>
					<div className="absolute -top-2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#C5A059]/50 to-transparent" />
					<div className="absolute -bottom-2 left-0 w-full h-0.75 bg-linear-to-r from-transparent via-[#C5A059]/60 to-transparent" />
				</div>
				<p
					className={
						'mt-8 text-lg md:text-2xl text-white/90 font-medium tracking-[0.2em] italic drop-shadow-lg max-w-3xl' +
						' ' +
						hand.className
					}
				>
					A Fantasy Adventure & Battle Event by GDG VITC
				</p>
				<div className="mt-20">
					<Link href="/register" className="group relative inline-block">
						<div className="absolute inset-0 bg-[#C5A059] blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-lg" />
						<button className="relative px-12 py-4 bg-[#3E2723] hover:bg-[#4E342E] text-white text-xl font-bold tracking-[0.2em] rounded-lg border-2 border-[#C5A059]/40 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.5)] uppercase">
							Register Here
						</button>
					</Link>
				</div>
			</div>

			{/* Bottom vignette effect */}
			<div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/60 to-transparent z-1" />
		</main>
	)
}
