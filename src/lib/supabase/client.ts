'use client'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import { useMemo } from 'react'

let supabaseClient: SupabaseClient | null = null

export function createClient() {
	if (supabaseClient) return supabaseClient

	supabaseClient = createSupabaseClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	)
	return supabaseClient
}

export function useClient() {
	const supabaseClient = useMemo(() => createClient(), [])
	return supabaseClient
}
