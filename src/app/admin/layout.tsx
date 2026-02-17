'use client'

import React, { useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loading'

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading) {
			if (!user) {
				router.push('/login')
			} else if (user.email !== 'admin123@123.123.com') {
				// Only allow the specific admin user to access this area
				router.push('/')
			}
		}
	}, [user, loading, router])

	if (loading) return <Loading />
	if (!user) return null

	return (
		<div className="min-h-screen bg-[#0a0a0a] text-stone-200">
			{/* Main Content */}
			<main className="w-full overflow-auto p-8">
				{children}
			</main>
		</div>
	)
}
