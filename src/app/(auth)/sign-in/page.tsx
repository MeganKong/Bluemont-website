// Owner: Megan (built by Adhya, assignment 1). The sign-in page at "/sign-in".
//
// What this page will do (month 1 build plan):
// - Volunteers and officers sign in with Supabase's built-in login.
// Done when: volunteers and officers can sign in.
//
// Everyone uses this one page. After signing in, officers go to /officer and
// volunteers to /dashboard (see src/lib/destinations.ts).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SignInForm } from "./sign-in-form";
import { card, pageHero, pageTitle, textLink } from "../_styles";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-10 sm:py-14">
      <div className={pageHero}>
        <h1 className={pageTitle}>Welcome back!</h1>
        <p className="text-lg font-semibold text-ink">
          Volunteers and officers both sign in here.
        </p>
      </div>
      <div className={card}>
        {/* The form reads the web address (for "that link didn't work"), so it loads in a boundary. */}
        <Suspense fallback={<div className="min-h-80" />}>
          <SignInForm />
        </Suspense>
      </div>
      <p className="text-center text-lg text-ink">
        New here?{" "}
        <Link href="/sign-up" className={textLink}>
          Create an account
        </Link>
      </p>
    </main>
  );
}
