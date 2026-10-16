// Owner: Sophia (built by Adhya, assignment 1). The sign-up page at "/sign-up".
//
// What this page will do (month 1 build plan):
// - Create an account; volunteers under 18 give a parent email for consent.
// Done when: sign-up takes under 3 minutes and consent is recorded.
//
// Assignment 1 asks only for first name, school, email and password. Parent
// consent is not built yet.
import type { Metadata } from "next";
import Link from "next/link";
import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = { title: "Sign up" };

export default function SignUpPage() {
  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-4 py-12">
      <h1 className="font-display text-3xl font-semibold">Become a volunteer</h1>
      <SignUpForm />
      <p className="text-ink">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-terracotta">
          Sign in
        </Link>
      </p>
    </main>
  );
}
