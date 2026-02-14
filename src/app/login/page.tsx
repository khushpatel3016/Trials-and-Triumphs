'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useClient } from '@/lib/supabase/client'

export default function LoginPage() {
	const router = useRouter()
	const supabaseClient = useClient()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSignUp, setIsSignUp] = useState(false)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		const { error } = isSignUp
			? await supabaseClient.auth.signUp({ email, password })
			: await supabaseClient.auth.signInWithPassword({ email, password })

		setLoading(false)

		if (error) {
			setError(error.message)
			return
		}

		router.push('/')
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center p-8">
			<div className="w-full max-w-md p-8 bg-gray-900 border border-gray-800 rounded-lg shadow-xl">
				<h1 className="text-3xl font-bold mb-2 text-center text-blue-400">
					{isSignUp ? 'Create Account' : 'Join the Trials'}
				</h1>

				<p className="text-gray-400 mb-8 text-center">
					{isSignUp
						? 'Create an account to begin your journey.'
						: 'Sign in to begin or resume your adventure.'}
				</p>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					<input
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>

					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-bold transition-colors disabled:opacity-50"
					>
						{loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
					</button>
				</form>

				<button
					onClick={() => setIsSignUp(!isSignUp)}
					className="mt-6 w-full text-sm text-gray-400 hover:text-blue-400 transition-colors"
				>
					{isSignUp
						? 'Already have an account? Sign in'
						: 'New here? Create an account'}
				</button>
			</div>
		</main>
	)
}
