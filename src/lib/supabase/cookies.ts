// Owner: Megan (shared; built by Adhya). Makes the sign-in cookie last only
// until the browser is closed, so people sign in again on each visit.
// Supabase normally keeps it for 400 days ("stay signed in").
// Used by ./server.ts and ./proxy.ts, the two places that save the cookie.
import type { CookieOptions } from "@supabase/ssr";

export function untilBrowserCloses(options: CookieOptions): CookieOptions {
  // maxAge 0 means "delete this cookie" (signing out), so keep that as is.
  if (options.maxAge === 0) return options;
  // With no end date, the browser forgets the cookie when it closes.
  return { ...options, maxAge: undefined, expires: undefined };
}
