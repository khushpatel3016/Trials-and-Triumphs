'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import localFont from 'next/font/local'
import { Cinzel, Ballet } from 'next/font/google'

import { useAuth } from '@/components/AuthProvider'
import { useEffect } from 'react'

const hand = Ballet({ weight: '400' })
const cinzel = Cinzel()
const hylia = localFont({
	src: '../../fonts/HyliaSerifPrototype-Regular.woff',
})

export default function RegisterPage() {
	const router = useRouter()
	const { user, loading } = useAuth()

	useEffect(() => {
		if (!loading && !user) {
			router.push('/login')
		}
	}, [user, loading, router])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Logic to store team data in local state/context will go here
		router.push('/select-characters')
	}

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
				Loading...
			</div>
		)
	}

	if (!user) {
		return null
	}

	return (
		<main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 -z-10">
				<Image
					src="/assets/bg.png"
					alt="Fantasy Landscape Background"
					fill
					className="object-cover"
				/>
			</div>
			<div className="absolute top-1/2 left-1/2 h-262 w-7xl -translate-x-1/2 -translate-y-1/2 -z-10">
				<Image
					src="/team_details/scroll.png"
					alt="Fantasy Landscape Background"
					fill
				/>
			</div>
			<h1
				className={`mb-8 text-4xl font-normal leading-none tracking-[0.03em] text-center underline decoration-solid bg-linear-to-b from-[#E6B758] via-[#977B44] to-[#4B3A18] bg-clip-text text-transparent ${hylia.className}`}
			>
				Team Registration
			</h1>
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md space-y-6 flex items-center flex-col"
			>
				<div className="w-full">
					<label
						className={`block mb-2 ${cinzel.className} text-2xl text-center text-amber-950 font-bold`}
					>
						Team Name
					</label>
					<input
						type="text"
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className} text-4xl font-bold text-amber-950 text-center `}
						required
					/>
				</div>
				<div className="w-full">
					<label
						className={`block mb-2 ${cinzel.className} text-2xl text-center text-amber-950 font-bold`}
					>
						Player 1 Name
					</label>
					<input
						type="text"
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className}  text-4xl font-bold text-amber-950 text-center `}
						required
					/>
				</div>
				<div className="w-full">
					<label
						className={`block mb-2 ${cinzel.className} text-2xl text-center text-amber-950 font-bold`}
					>
						Player 2 Name
					</label>
					<input
						type="text"
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className}  text-4xl font-bold text-amber-950 text-center `}
						required
					/>
				</div>
				<div className="w-full">
					<label
						className={`block mb-2 ${cinzel.className} text-2xl text-center text-amber-950 font-bold`}
					>
						Player 3 Name
					</label>
					<input
						type="text"
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className}  text-4xl font-bold text-amber-950 text-center `}
						required
					/>
				</div>
				<button
					type="submit"
					className={`${cinzel.className} p-2 py-3 bg-[#260D05] font-bold font-normal tracking-wide`}
				>
					We shall attend &rarr;
				</button>
			</form>
		</main>
	)
}
