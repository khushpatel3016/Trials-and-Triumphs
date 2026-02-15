'use client'

import { Character } from '@/types'
import LocalFont from 'next/font/local'
import Image from 'next/image'

const hylia = LocalFont({
	src: '../fonts/HyliaSerifPrototype-Regular.woff',
})

interface CharacterCardProps {
	character: Character
	isSelected?: boolean
	onSelect?: (character: Character) => void
	disabled?: boolean
	isUnavailable?: boolean
	level?: number
}

export default function CharacterCard({
	character,
	isSelected,
	onSelect,
	disabled,
	isUnavailable,
	level = 1,
}: CharacterCardProps) {
	const ultimateSkill =
		character.skills.find((s) => s.name.toLowerCase().includes('ultimate')) ||
		character.skills[character.skills.length - 1]
	const basicSkills = character.skills.filter((s) => s !== ultimateSkill)

	// Get stats for the current level
	const currentStats = character.levelStats?.find((s) => s.level === level) || {
		hp: character.hp,
		atk: character.atk,
		mana: character.mana,
		speed: character.speed,
	}

	const isClickable = !disabled && !isUnavailable

	return (
		<div
			onClick={() => isClickable && onSelect?.(character)}
			className={`relative w-[380px] aspect-[1/1.35] flex flex-col transition-all duration-300 group select-none ${
				isSelected ? 'scale-105 z-20' : 'hover:scale-[1.02] z-10'
			} ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'} ${
				isUnavailable ? 'opacity-40 grayscale blur-[1px]' : isSelected ? '' : disabled ? 'opacity-60 grayscale' : ''
			}`}
		>
			{/* Scroll Background */}
			<div className="absolute inset-0 z-0">
				<Image src="/team_details/croppedScroll.png" alt="" fill />
			</div>

			{isUnavailable && (
				<div className="absolute inset-0 z-30 flex items-center justify-center rotate-[-15deg]">
					<div className="bg-red-600/90 text-white px-4 py-2 border-4 border-white font-black text-2xl tracking-tighter shadow-2xl">
						ALREADY TAKEN
					</div>
				</div>
			)}

			{/* Card Content Wrapper */}
			<div className="relative z-10 flex flex-col h-full py-16  px-[48px] text-stone-900">
				{/* Top Section: Stage, Name, HP */}
				<div className="mb-2">
					<div className="flex justify-between items-center mb-1">
						<div className="bg-[#ffffff61] border border-stone-400 h-4 px-1.5 flex items-center rounded-sm shadow-sm">
							<span className="text-[6px] font-black tracking-tighter uppercase text-stone-800">
								LEVEL {level}
							</span>
						</div>
						<div className="flex items-center gap-0.5">
							<span className="text-[7px] font-black tracking-tighter text-stone-600">
								HP
							</span>
							<span
								className={`${hylia.className} text-xl font-black leading-none`}
							>
								{currentStats.hp}
							</span>
							<div className="w-3.5 h-3.5 rounded-full bg-[#ffffff4c] border border-stone-300 flex items-center justify-center ml-0.5">
								<span className="text-[7px]">★</span>
							</div>
						</div>
					</div>

					<div className="flex items-baseline gap-1">
						<h2
							className={`${hylia.className} text-xl font-black tracking-tight leading-none`}
						>
							{character.name}
						</h2>
						<span className="text-base font-black italic lowercase text-stone-600">
							ex
						</span>
					</div>
					<div className="h-[1.5px] w-full bg-stone-800/75 mt-1"></div>
				</div>

				{/* Illustration Area */}
				<div className="relative flex-1 flex items-center justify-center mb-2 min-h-0 overflow-hidden">
					{character.spriteUrl ? (
						<img
							src={character.spriteUrl}
							alt={character.name}
							className="max-h-full w-auto object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105"
						/>
					) : (
						<div className="text-xl opacity-10 font-bold italic">
							{character.name}
						</div>
					)}
				</div>

				{/* Middle Description Box (Full Info) */}
				<div className="bg-[#fcf8f0]/25 border border-stone-400/50 rounded-lg overflow-hidden shadow-sm mb-2">
					<div className="bg-gradient-to-r from-[#8b23239e] to-[#a62d2daa] text-white px-2 py-0.5 flex justify-between items-center">
						<h3 className="text-[8px] font-bold uppercase tracking-wider truncate mr-1">
							{character.class}{' '}
							<span className="text-[6px] opacity-70 italic font-normal">
								({character.strengthUtility})
							</span>
						</h3>
						<div className="flex gap-1.5 text-[6.5px] font-black opacity-90 whitespace-nowrap">
							<span>ATK {currentStats.atk}</span>
							<span>MP {currentStats.mana}</span>
							<span>SPD {currentStats.speed}</span>
						</div>
					</div>
					<div className="p-1.5 px-2 flex flex-col gap-1.5">
						<p className="text-[8px] leading-tight text-stone-800 font-medium italic border-b border-stone-200 pb-1">
							{character.shortDescription}
						</p>
						{/* Basic Skills */}
						<div className="space-y-1">
							{basicSkills.map((skill, idx) => (
								<div key={idx} className="flex flex-col">
									<span className="text-[7px] font-bold text-[#8b2323] uppercase leading-none">
										{skill.name}
									</span>
									<p className="text-[7px] leading-tight text-stone-600 italic">
										{skill.description}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Stat Buff Line */}
				<div className="flex items-center gap-2 px-1 mb-2">
					<div className="w-5 h-5 rounded-full bg-emerald-800/25 border border-stone-800/20 flex items-center justify-center text-[9px] text-white shadow-sm font-bold">
						{character.class[0]}
					</div>
					<span
						className={`${hylia.className} text-sm font-black tracking-tight text-stone-900`}
					>
						{character.primaryStatBuff}
					</span>
				</div>

				{/* Bottom exRule Box (Ultimate) */}
				<div className="bg-[#fcf8f0]/25 border border-[#b08d57]/30 rounded-lg overflow-hidden relative shadow-sm">
					<div className="bg-[#8b2323]/50 text-center py-0.5 border-b border-[#b08d57]/20">
						<span className="text-[8px] font-black italic uppercase tracking-[0.2em] text-[#8b2323]">
							eXRule
						</span>
					</div>
					<div className="p-2 px-3">
						<h4 className="text-[7.5px] font-bold text-[#8b2323] uppercase text-center mb-0.5">
							{ultimateSkill?.name}
						</h4>
						<p className="text-[7.5px] leading-snug text-stone-800 font-bold text-center italic">
							{ultimateSkill?.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
