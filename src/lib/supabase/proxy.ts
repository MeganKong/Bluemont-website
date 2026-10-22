// Owner: Megan (shared). Runs before every page load and keeps the person's
// Supabase sign-in fresh. Copied from Supabase's official Next.js guide.
// Also decides which pages need a sign-in (added by Adhya, assignment 1).
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { dashboardFor } from "@/lib/destinations";
import { roleOf } from "@/lib/roles";
import { untilBrowserCloses } from "./cookies";

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
            supabaseResponse.cookies.set(name, value, untilBrowserCloses(options)),
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
  const userId = data?.claims.sub;

  // Signed-in pages send signed-out visitors to sign in.
  const path = request.nextUrl.pathname;
  const needsSignIn = membersOnly.some((p) => path === p || path.startsWith(`${p}/`));
  if (needsSignIn && !userId) {
    // "next" tells the sign-in page where to go back to afterwards.
    return redirectKeepingCookies(`/sign-in?next=${encodeURIComponent(path)}`, request, supabaseResponse);
  }
  // The new-password page only works from the link in the reset email.
  if (path === "/reset-password" && !userId) {
    return redirectKeepingCookies("/sign-in?error=link", request, supabaseResponse);
  }
  // Signed-in people skip the sign-in pages, and officers skip the volunteer
  // dashboard, so everyone lands on their own dashboard.
  if (userId && (path === "/sign-in" || path === "/sign-up" || path === "/dashboard")) {
    const home = dashboardFor(await roleOf(supabase, userId));
    if (home !== path) return redirectKeepingCookies(home, request, supabaseResponse);
  }

  return supabaseResponse;
}

// The pages in src/app/(app). Add new signed-in pages here.
// Officer-only pages also check the role themselves, with <OfficersOnly>
// (see src/components/officers-only.tsx).
const membersOnly = ["/dashboard", "/lessons", "/kits", "/news", "/check-ins", "/officer"];

// A redirect has to carry the refreshed sign-in cookies, or people get signed out.
function redirectKeepingCookies(path: string, request: NextRequest, from: NextResponse) {
  const response = NextResponse.redirect(new URL(path, request.url));
  from.cookies.getAll().forEach((cookie) => response.cookies.set(cookie));
  return response;
}
