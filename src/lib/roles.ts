// Owner: Megan (shared; built by Adhya, assignment 2). Looks up the signed-in
// person's role in the user_roles table. Only use this in server code.
// If anything goes wrong it answers "volunteer", so a mistake never gives
// someone officer access.
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Role } from "./types";
import { createClient } from "./supabase/server";

export async function getMyRole(): Promise<Role | null> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims.sub;
  if (!userId) return null; // signed out

  return roleOf(supabase, userId);
}

// The same lookup, for code that already has a Supabase connection and knows
// who just signed in (the page guard, the sign-in form, the email links).
export async function roleOf(supabase: SupabaseClient, userId: string): Promise<Role> {
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();

  return data?.role === "officer" ? "officer" : "volunteer";
}
