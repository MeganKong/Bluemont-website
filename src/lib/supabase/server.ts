// Owner: Megan (shared). Supabase connection for code that runs on the server
// (pages, server actions, route handlers). Uses the signed-in person's cookies,
// so the database's row rules apply to them.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from a page, which can't set cookies. Safe to ignore:
            // src/proxy.ts refreshes the session on every request.
          }
        },
      },
    },
  );
}
