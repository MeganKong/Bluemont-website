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
import { AuthPage } from "../auth-page";
import { SignInForm } from "./sign-in-form";
import { textLink } from "../_styles";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <AuthPage
      eyebrow="Members"
      title={
        <>
          Welcome <em>back.</em>
        </>
      }
      lead="Volunteers and officers both sign in here."
      below={
        <>
          New to Bluemont?{" "}
          <Link href="/sign-up" className={textLink}>
            Create an account →
          </Link>
        </>
      }
    >
      {/* The form reads the web address (for "that link didn't work"), so it loads in a boundary. */}
      <Suspense fallback={<div className="min-h-72" />}>
        <SignInForm />
      </Suspense>
    </AuthPage>
  );
}
