"use client";
// Owner: Sophia (built by Adhya, assignment 1). The sign-up form. Runs in the
// browser so it can show errors and "check your email" without a reload.
import { useActionState } from "react";
import { signUp, type FormState } from "../actions";

const input = "rounded-lg border border-line bg-card px-3 py-2";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, {} as FormState);

  if (state.sentTo) {
    return (
      <div role="status" className="flex flex-col gap-2 rounded-2xl border border-line bg-card p-5">
        <h2 className="font-display text-2xl font-semibold">Check your email</h2>
        <p className="text-ink">
          We sent a link to <strong className="break-all">{state.sentTo}</strong>. Click it to
          finish creating your account. If you don&apos;t see it, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.error && (
        <p role="alert" className="rounded-lg border border-terracotta px-3 py-2 text-terracotta">
          {state.error}
        </p>
      )}
      <label className="flex flex-col gap-1">
        First name
        <input name="firstName" required maxLength={50} autoComplete="given-name" className={input} />
      </label>
      <label className="flex flex-col gap-1">
        School
        <input name="school" required maxLength={100} autoComplete="organization" className={input} />
      </label>
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
          minLength={6}
          autoComplete="new-password"
          className={input}
        />
        <span className="text-sm text-muted">At least 6 characters.</span>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-navy px-4 py-2 font-semibold text-cream disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
