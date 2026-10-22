// Owner: Megan (built by Adhya, assignment 1). The links in the "confirm your
// email" and "reset your password" messages open "/auth/confirm". This checks
// the link with Supabase, signs the person in, and sends them on: to make a
// new password, or to their own dashboard.
import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { dashboardFor, safePath } from "@/lib/destinations";
import { roleOf } from "@/lib/roles";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const supabase = await createClient();

  // Supabase sends one of two kinds of link, depending on the email template.
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const code = searchParams.get("code");

  let userId: string | undefined;
  if (tokenHash && type) {
    userId = (await supabase.auth.verifyOtp({ token_hash: tokenHash, type })).data.user?.id;
  } else if (code) {
    userId = (await supabase.auth.exchangeCodeForSession(code)).data.user?.id;
  }

  if (!userId) return NextResponse.redirect(new URL("/sign-in?error=link", origin));

  // "next" is set by the password reset email (/reset-password).
  const next =
    safePath(searchParams.get("next")) ??
    (type === "recovery" ? "/reset-password" : dashboardFor(await roleOf(supabase, userId)));
  return NextResponse.redirect(new URL(next, origin));
}
