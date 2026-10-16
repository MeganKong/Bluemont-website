// Owner: Megan (built by Adhya, assignment 1). The sign-in page at "/sign-in".
//
// What this page will do (month 1 build plan):
// - Volunteers and officers sign in with Supabase's built-in login.
// Done when: volunteers and officers can sign in.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-12">
      <h1 className="font-display text-3xl font-semibold">Sign in</h1>
      {/* The form reads the web address (for "that link didn't work"), so it loads in a boundary. */}
      <Suspense>
        <SignInForm />
      </Suspense>
      <p className="text-ink">
        New here?{" "}
        <Link href="/sign-up" className="font-semibold text-terracotta">
          Create an account
        </Link>
      </p>
    </main>
  );
}
