'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import LocalFont from 'next/font/local'
import { Cinzel } from 'next/font/google'
import CharacterCard from '@/components/CharacterCard'
import { CHARACTERS } from '@/lib/characters'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import Loading from '@/app/loading'

const hylia = LocalFont({
	src: '../../fonts/HyliaSerifPrototype-Regular.woff',
})

const cinzel = Cinzel({ subsets: ['latin'] })

export default function TeamStatusPage() {
	const router = useRouter()
	const { user, loading: authLoading } = useAuth()
	const supabase = createClient()

	const [team, setTeam] = useState<any>(null)
	const [players, setPlayers] = useState<any[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		if (!authLoading && !user) {
			router.push('/login')
			return
		}

		const fetchTeamStatus = async () => {
			if (!user || !supabase) return

			try {
				// Fetch the most recent team for the user
				const { data: teamData, error: teamError } = await supabase
					.from('teams')
					.select('*')
					.eq('user_id', user.id)
					.order('created_at', { ascending: false })
					.limit(1)
					.maybeSingle()

				if (teamError) throw teamError

				if (!teamData) {
					router.push('/register')
					return
				}

				if (teamData.current_step === 'SELECT') {
					router.push('/select-characters')
					return
				}

				setTeam(teamData)

				// Map flattened columns to players array including levels
				const playersData = [
					{
						id: 'p1',
						name: teamData.p1_name,
						character_key: teamData.p1_character,
						level: teamData.p1_level,
					},
					{
						id: 'p2',
						name: teamData.p2_name,
						character_key: teamData.p2_character,
						level: teamData.p2_level,
					},
					{
						id: 'p3',
						name: teamData.p3_name,
						character_key: teamData.p3_character,
						level: teamData.p3_level,
					},
				]
				setPlayers(playersData)
				console.log(playersData)
			} catch (error) {
				console.error('Error fetching team status:', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (user) {
			fetchTeamStatus()
		}
	}, [user, authLoading, router, supabase])

	// Real-time subscription
	useEffect(() => {
		if (!supabase || !team?.id) return

		const channel = supabase
			.channel('team_status_changes')
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'teams',
					filter: `id=eq.${team.id}`,
				},
				(payload) => {
					const newTeam = payload.new
					setTeam(newTeam)

					// Update players from the new team data
					const updatedPlayers = [
						{
							id: 'p1',
							name: newTeam.p1_name,
							character_key: newTeam.p1_character,
							level: newTeam.p1_level,
						},
						{
							id: 'p2',
							name: newTeam.p2_name,
							character_key: newTeam.p2_character,
							level: newTeam.p2_level,
						},
						{
							id: 'p3',
							name: newTeam.p3_name,
							character_key: newTeam.p3_character,
							level: newTeam.p3_level,
						},
					]
					setPlayers(updatedPlayers)
				},
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, team?.id])

	if (authLoading || isLoading) {
		return <Loading />
	}

	if (!team) {
		return (
			<main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#1a1a1a] text-center px-4">
				<h1 className={`${hylia.className} text-4xl text-amber-500 mb-4`}>
					No Team Found
				</h1>
				<p className="text-stone-400 mb-8">
					You haven&apos;t registered a team yet.
				</p>
				<button
					onClick={() => router.push('/register')}
					className={`${cinzel.className} px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded transition-colors`}
				>
					Register Team
				</button>
			</main>
		)
	}

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
				<div className="absolute inset-0 bg-black/60" />
			</div>

			{/* Main Content */}
			<div className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4">
				<div className="mb-16 text-center">
					<h2
						className={`${cinzel.className} text-amber-500 text-xl tracking-[0.3em] uppercase mb-2`}
					>
						Status of the Brave
					</h2>
					<h1
						className={
							'text-5xl sm:text-[70px] font-normal leading-tight tracking-[0.03em] bg-linear-to-b from-[#E6B758] via-[#977B44] to-[#4B3A18] bg-clip-text text-transparent' +
							' ' +
							hylia.className
						}
					>
						Team {team.name}
					</h1>
					<div className="h-1 w-64 bg-linear-to-r from-transparent via-amber-600/50 to-transparent mx-auto mt-4" />
				</div>

				{/* Players Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full justify-items-center">
					{players.map((player) => {
						const character = CHARACTERS.find(
							(c) => c.id === player.character_key,
						)

						return (
							<div
								key={player.id}
								className="flex flex-col items-center w-full"
							>
								<div className="mb-6 text-center">
									<h3
										className={`${cinzel.className} text-2xl text-amber-100 font-bold mb-1`}
									>
										{player.name}
									</h3>
									<div className="h-0.5 w-24 bg-amber-900/50 mx-auto" />
								</div>

								{character ? (
									<CharacterCard
										character={character}
										disabled={false}
										level={player.level}
										disableLevelCycling={true}
									/>
								) : (
									<div className="w-[380px] aspect-[1/1.35] flex items-center justify-center bg-black/40 border border-dashed border-amber-900/30 rounded-xl">
										<button
											onClick={() => router.push('/select-characters')}
											className="text-amber-700 hover:text-amber-500 transition-colors flex flex-col items-center"
										>
											<span className="text-4xl mb-2">?</span>
											<span className={`${cinzel.className} font-bold`}>
												Select Character
											</span>
										</button>
									</div>
								)}
							</div>
						)
					})}
				</div>

				<div className="mt-20">
					<button
						onClick={() => router.push('/')}
						className={`${cinzel.className} px-10 py-4 bg-black/40 hover:bg-black/60 text-amber-500 border border-amber-900/50 rounded-lg transition-all font-bold tracking-widest uppercase`}
					>
						Return to Camp
					</button>
				</div>
			</div>

			{/* Bottom vignette effect */}
			<div className="fixed bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-1 pointer-events-none" />
		</main>
	)
}
