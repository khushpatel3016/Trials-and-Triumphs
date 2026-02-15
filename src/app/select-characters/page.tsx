'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LocalFont from 'next/font/local'
import CharacterCard from '@/components/CharacterCard'
import { CHARACTERS } from '@/lib/characters'
import { Character } from '@/types'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import Loading from '@/app/loading'

const hylia = LocalFont({
	src: '../../fonts/HyliaSerifPrototype-Regular.woff',
})

export default function SelectCharactersPage() {
	const router = useRouter()
	const { user, loading: authLoading } = useAuth()
	const supabase = createClient()

	const [team, setTeam] = useState<any>(null)
	const [players, setPlayers] = useState<any[]>([])
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
	const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
		null,
	)
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (!authLoading && !user) {
			router.push('/login')
			return
		}

		const fetchTeamData = async () => {
			if (!user || !supabase) return

			try {
				// Fetch the most recent team for the user
				const { data: teamData, error: teamError } = await supabase
					.from('teams')
					.select('*')
					.eq('user_id', user.id)
					.order('created_at', { ascending: false })
					.limit(1)
					.single()

				if (teamError) throw teamError
				setTeam(teamData)

				// Fetch players for that team
				const { data: playersData, error: playersError } = await supabase
					.from('players')
					.select('*')
					.eq('team_id', teamData.id)
					.order('slot_index', { ascending: true })

				if (playersError) throw playersError
				setPlayers(playersData)

				// Find the first player who hasn't selected a character
				const nextPlayerIndex = playersData.findIndex((p) => !p.character_key)
				if (nextPlayerIndex === -1) {
					// All players have selected characters
					router.push('/status')
				} else {
					setCurrentPlayerIndex(nextPlayerIndex)
				}
			} catch (error) {
				console.error('Error fetching team data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (user) {
			fetchTeamData()
		}
	}, [user, authLoading, router, supabase])

	const handleConfirm = async () => {
		if (!selectedCharacter || !players[currentPlayerIndex] || !supabase) return

		setIsSubmitting(true)
		try {
			const currentPlayer = players[currentPlayerIndex]
			const { error } = await supabase
				.from('players')
				.update({ character_key: selectedCharacter.id })
				.eq('id', currentPlayer.id)

			if (error) throw error

			// Update local state
			const updatedPlayers = [...players]
			updatedPlayers[currentPlayerIndex] = {
				...currentPlayer,
				character_key: selectedCharacter.id,
			}
			setPlayers(updatedPlayers)
			setSelectedCharacter(null)

			if (currentPlayerIndex < players.length - 1) {
				setCurrentPlayerIndex(currentPlayerIndex + 1)
			} else {
				// Update team step
				await supabase
					.from('teams')
					.update({ current_step: 'COMPLETED' })
					.eq('id', team.id)

				router.push('/status')
			}
		} catch (error) {
			console.error('Error saving character selection:', error)
			alert('Failed to save selection. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	if (authLoading || isLoading) {
		return <Loading />
	}

	const currentPlayer = players[currentPlayerIndex]

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
							{team?.name || 'Team Registration'}
						</span>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl">
				<div className="mb-12 relative inline-block">
					<h1
						className={
							'text-5xl sm:text-[60px] font-normal leading-tight tracking-[0.03em] text-center underline decoration-solid bg-linear-to-b from-[#E6B758] via-[#977B44] to-[#4B3A18] bg-clip-text text-transparent py-4' +
							' ' +
							hylia.className
						}
					>
						{currentPlayer?.name}, Choose Your Role
					</h1>
					<p className="text-amber-200/80 text-xl italic mt-2">
						Player {currentPlayerIndex + 1} of {players.length}
					</p>
					<div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-[#C5A059]/50 to-transparent" />
					<div className="absolute bottom-0 left-0 w-full h-0.75 bg-linear-to-r from-transparent via-[#C5A059]/60 to-transparent" />
				</div>

				{/* Character Grid */}
				<div className="flex flex-wrap items-center justify-center gap-8 w-full justify-items-center mb-16">
					{CHARACTERS.map((char) => {
						const isUnavailable = players.some(
							(p) => p.character_key === char.id,
						)
						return (
							<CharacterCard
								key={char.id}
								character={char}
								isSelected={selectedCharacter?.id === char.id}
								isUnavailable={isUnavailable}
								onSelect={setSelectedCharacter}
								disabled={isSubmitting}
							/>
						)
					})}
				</div>

				<div className="mt-8">
					<button
						onClick={handleConfirm}
						disabled={!selectedCharacter || isSubmitting}
						className={`group relative inline-block px-12 py-4 bg-[#3E2723] hover:bg-[#4E342E] text-white text-xl font-bold tracking-[0.2em] rounded-lg border-2 border-[#C5A059]/40 transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.5)] uppercase disabled:grayscale disabled:opacity-50 ${!selectedCharacter ? 'cursor-not-allowed' : 'hover:scale-105'}`}
					>
						<div
							className={`absolute inset-0 bg-[#C5A059] blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-lg ${!selectedCharacter ? 'hidden' : ''}`}
						/>
						<span className="relative">
							{isSubmitting
								? 'Confirming...'
								: selectedCharacter
									? `Confirm ${selectedCharacter.name}`
									: 'Select a Role'}
						</span>
					</button>
				</div>
			</div>

			{/* Bottom vignette effect */}
			<div className="fixed bottom-0 left-0 w-full h-32 bg-linear-to-t from-black/80 to-transparent z-1 pointer-events-none" />
		</main>
	)
}
