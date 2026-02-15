'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import localFont from 'next/font/local'
import { Cinzel, Ballet } from 'next/font/google'

import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import Loading from '@/app/loading'

const hand = Ballet({ weight: '400' })
const cinzel = Cinzel()
const hylia = localFont({
	src: '../../fonts/HyliaSerifPrototype-Regular.woff',
})

export default function RegisterPage() {
	const router = useRouter()
	const { user, loading } = useAuth()
	const supabase = createClient()

	const [teamName, setTeamName] = useState('')
	const [player1Name, setPlayer1Name] = useState('')
	const [player2Name, setPlayer2Name] = useState('')
	const [player3Name, setPlayer3Name] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!loading && !user) {
			router.push('/login')
		}
	}, [user, loading, router])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!user || !supabase) return

		setIsSubmitting(true)

		try {
			// Insert team
			const { data: teamData, error: teamError } = await supabase
				.from('teams')
				.insert([
					{
						user_id: user.id,
						name: teamName,
						current_step: 'SELECT',
					},
				])
				.select()
				.single()

			if (teamError) throw teamError

			// Insert players
			const { error: playersError } = await supabase.from('players').insert([
				{ team_id: teamData.id, name: player1Name, slot_index: 0 },
				{ team_id: teamData.id, name: player2Name, slot_index: 1 },
				{ team_id: teamData.id, name: player3Name, slot_index: 2 },
			])

			if (playersError) throw playersError

			router.push('/select-characters')
		} catch (error) {
			console.error('Error registering team:', error)
			alert('Failed to register team. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (loading) {
		return <Loading />
	}

	if (!user) return null

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
						value={teamName}
						onChange={(e) => setTeamName(e.target.value)}
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className} text-4xl font-bold text-amber-950 text-center `}
						required
						disabled={isSubmitting}
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
						value={player1Name}
						onChange={(e) => setPlayer1Name(e.target.value)}
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className}  text-4xl font-bold text-amber-950 text-center `}
						required
						disabled={isSubmitting}
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
						value={player2Name}
						onChange={(e) => setPlayer2Name(e.target.value)}
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className}  text-4xl font-bold text-amber-950 text-center `}
						required
						disabled={isSubmitting}
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
						value={player3Name}
						onChange={(e) => setPlayer3Name(e.target.value)}
						className={`w-full p-2 bg-transparent border-2 border-transparent border-b-amber-950 outline-none ${hand.className}  text-4xl font-bold text-amber-950 text-center `}
						required
						disabled={isSubmitting}
					/>
				</div>
				<button
					type="submit"
					disabled={isSubmitting}
					className={`${cinzel.className} p-2 py-3 bg-[#260D05] font-bold font-normal tracking-wide disabled:opacity-50`}
				>
					{isSubmitting ? 'Registering...' : 'We shall attend \u2192'}
				</button>
			</form>
		</main>
	)
}
