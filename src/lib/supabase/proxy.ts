// Owner: Sophia (shared). Runs before every page load and keeps the person's
// Supabase sign-in fresh. Copied from Supabase's official Next.js guide.
// Also decides which pages need a sign-in (added by Adhya, assignment 1).
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  // Supabase's guide: run nothing between createServerClient and getClaims(),
  // or people get signed out at random.
  const { data } = await supabase.auth.getClaims();
  const signedIn = Boolean(data?.claims);

  // Signed-in pages send signed-out visitors to sign in, and the sign-in
  // pages send signed-in people to their dashboard.
  const path = request.nextUrl.pathname;
  const needsSignIn = membersOnly.some((p) => path === p || path.startsWith(`${p}/`));
  if (needsSignIn && !signedIn) return redirectKeepingCookies("/sign-in", request, supabaseResponse);
  if (signedIn && (path === "/sign-in" || path === "/sign-up")) {
    return redirectKeepingCookies("/dashboard", request, supabaseResponse);
  }

  return supabaseResponse;
}

// The pages in src/app/(app). Add new signed-in pages here.
const membersOnly = ["/dashboard", "/lessons", "/kits", "/news", "/check-ins"];

// A redirect has to carry the refreshed sign-in cookies, or people get signed out.
function redirectKeepingCookies(path: string, request: NextRequest, from: NextResponse) {
  const response = NextResponse.redirect(new URL(path, request.url));
  from.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  return response;
}
