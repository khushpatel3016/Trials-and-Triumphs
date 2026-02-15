'use client'

import Image from 'next/image'
import Link from 'next/link'
import LocalFont from 'next/font/local'
import { La_Belle_Aurore } from 'next/font/google'
import CharacterCard from '@/components/CharacterCard'
import { CHARACTERS } from '@/lib/characters'
import { useState } from 'react'
import { Character } from '@/types'

const hylia = LocalFont({
	src: '../../fonts/HyliaSerifPrototype-Regular.woff',
})

export default function LandingPage() {
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)

	return (
		<main className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-20 overflow-x-hidden">
			{/* Background Image */}
			<div className="fixed inset-0 z-0">
				<Image
					src="/assets/bg.png"
					alt="Fantasy Landscape Background"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/40" />
			</div>

			{/* Top Header Bar */}
			<div className="absolute top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-20">
				<div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 flex items-center border border-white/10 shadow-2xl">
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
			<div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl">
				<div className="mb-12 relative inline-block">
					<h1
						className={
							'text-5xl sm:text-[80px] font-normal leading-none tracking-[0.03em] text-center underline decoration-solid bg-linear-to-b from-[#E6B758] via-[#977B44] to-[#4B3A18] bg-clip-text text-transparent py-4' +
							' ' +
							hylia.className
						}
					>
						Choose Your Role
					</h1>
					<div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#C5A059]/50 to-transparent" />
					<div className="absolute bottom-0 left-0 w-full h-0.75 bg-linear-to-r from-transparent via-[#C5A059]/60 to-transparent" />
				</div>

				{/* Character Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 w-full justify-items-center mb-16">
					{CHARACTERS.map((char) => (
						<CharacterCard 
							key={char.id}
							character={char}
							isSelected={selectedCharacter?.id === char.id}
							onSelect={setSelectedCharacter}
						/>
					))}
				</div>

				<div className="mt-8">
					<Link 
						href={selectedCharacter ? "/register" : "#"} 
						className={`group relative inline-block transition-all duration-300 ${!selectedCharacter ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
					>
						<div className={`absolute inset-0 bg-[#C5A059] blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-lg ${!selectedCharacter ? 'hidden' : ''}`} />
						<button 
							disabled={!selectedCharacter}
							className="relative px-12 py-4 bg-[#3E2723] hover:bg-[#4E342E] text-white text-xl font-bold tracking-[0.2em] rounded-lg border-2 border-[#C5A059]/40 transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.5)] uppercase disabled:grayscale disabled:opacity-50"
						>
							{selectedCharacter ? `Confirm ${selectedCharacter.name}` : 'Select a Role'}
						</button>
					</Link>
				</div>
			</div>

			{/* Bottom vignette effect */}
			<div className="fixed bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/80 to-transparent z-1 pointer-events-none" />
		</main>
	)
}
