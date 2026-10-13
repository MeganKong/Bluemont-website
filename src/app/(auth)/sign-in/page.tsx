// Owner: Sophia. The sign-in page at "/sign-in". Not connected yet.
//
// What this page will do (month 1 build plan):
// - Volunteers and officers sign in with Supabase's built-in login.
// Done when: volunteers and officers can sign in.
import type { Metadata } from "next";
import Link from "next/link";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Sign in" };

export default function SignInPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-12">
      <SampleNote />
      <h1 className="font-display text-3xl font-semibold">Sign in</h1>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Email
          <input type="email" name="email" required className="rounded-lg border border-line bg-card px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input type="password" name="password" required className="rounded-lg border border-line bg-card px-3 py-2" />
        </label>
        <button type="submit" className="rounded-lg bg-navy px-4 py-2 font-semibold text-cream">
          Sign in
        </button>
      </form>
      <p className="text-ink">
        New here?{" "}
        <Link href="/sign-up" className="font-semibold text-terracotta">
          Create an account
        </Link>
      </p>
      {/* Until login works, this link lets everyone preview the signed-in pages. */}
      <Link href="/dashboard" className="text-sm text-muted underline">
        Preview the dashboard
      </Link>
    </main>
  );
}
