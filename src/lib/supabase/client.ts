"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient | null = null;

export function createClient() {
  if (typeof window === "undefined") {
    return null;
  }

  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  return supabaseClient;
}

export function getClient() {
  if (typeof window === "undefined") {
    return null;
  }
  return createClient();
}
