// Owner: Sophia. Sign-up form with parent consent. Not connected yet.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-12">
      <h1 className="font-display text-3xl font-semibold">Become a volunteer</h1>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Name
          <input name="name" required className="rounded-lg border border-line bg-card px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          Email
          <input type="email" name="email" required className="rounded-lg border border-line bg-card px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1">
          Password
          <input type="password" name="password" required className="rounded-lg border border-line bg-card px-3 py-2" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="under18" />
          I am under 18
        </label>
        <label className="flex flex-col gap-1">
          Parent or guardian email (if under 18)
          <input type="email" name="parentEmail" className="rounded-lg border border-line bg-card px-3 py-2" />
        </label>
        <button type="submit" className="rounded-lg bg-navy px-4 py-2 font-semibold text-cream">
          Create account
        </button>
      </form>
      <p className="text-ink">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-terracotta">
          Sign in
        </Link>
      </p>
    </main>
  );
}
