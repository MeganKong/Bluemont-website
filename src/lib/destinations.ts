// Owner: Megan (shared; built by Adhya). Where people go after signing in.
// The page guard (src/lib/supabase/proxy.ts), the sign-in form and the email
// links all use these, so everyone always lands on their own dashboard.
import type { Role } from "./types";

// Each person's own dashboard.
export function dashboardFor(role: Role | null) {
  return role === "officer" ? "/officer" : "/dashboard";
}

// Only go back to pages on our own site. "//evil.com" or "https://..." would
// let a trick link send people to another website after signing in.
export function safePath(path: string | null | undefined) {
  return path && path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\")
    ? path
    : null;
}

// After signing in: back to the page they were trying to open. Either
// dashboard is swapped for their own, so nobody has to pick one.
export function afterSignIn(role: Role | null, next: string | null | undefined) {
  const path = safePath(next);
  return path && path !== "/dashboard" && path !== "/officer" ? path : dashboardFor(role);
}
