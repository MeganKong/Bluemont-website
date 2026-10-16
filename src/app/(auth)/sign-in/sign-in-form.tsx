"use client";
// Owner: Megan (built by Adhya, assignment 1). The sign-in form. Runs in the
// browser so it can show errors without a reload.
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, type FormState } from "../actions";

const input = "rounded-lg border border-line bg-card px-3 py-2";

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, {} as FormState);
  const searchParams = useSearchParams();
  // Set by /auth/confirm when an email link is old or already used.
  const badLink = searchParams.get("error") === "link";
  // Set by src/lib/supabase/proxy.ts when a signed-out visitor opens a private page.
  const next = searchParams.get("next") ?? "";
  const error =
    state.error ??
    (badLink ? "That email link didn't work. It may be old or already used. Try signing in." : undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      {error ? (
        <p role="alert" className="rounded-lg border border-terracotta px-3 py-2 text-terracotta">
          {error}
        </p>
      ) : (
        next && (
          <p role="status" className="rounded-lg border border-line bg-card px-3 py-2 text-ink">
            Please sign in to see that page.
          </p>
        )
      )}
      <label className="flex flex-col gap-1">
        Email
        <input type="email" name="email" required autoComplete="email" className={input} />
      </label>
      <label className="flex flex-col gap-1">
        Password
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className={input}
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-navy px-4 py-2 font-semibold text-cream disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
