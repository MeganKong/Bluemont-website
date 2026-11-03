"use client";
// Owner: Megan (built by Adhya, assignment 1). The sign-up form. Runs in the
// browser so it can show errors and "check your email" without a reload.
import { useActionState } from "react";
import { signUp, type FormState } from "../actions";
import { PasswordInput } from "../password-input";
import { Spinner } from "../spinner";
import { cardTitle, errorBox, hint, input, label, submitButton } from "../_styles";

export function SignUpForm() {
  const [state, formAction, pending] = useActionState(signUp, {} as FormState);

  if (state.sentTo) {
    return (
      <div role="status" className="flex flex-col gap-3">
        <h2 className={cardTitle}>Check your email</h2>
        <p className="text-ink">
          We sent a link to <strong className="break-all text-navy">{state.sentTo}</strong>. Click
          it to finish creating your account. If you don&apos;t see it, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.error && (
        <p role="alert" className={errorBox}>
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="firstName" className={label}>
          First name
        </label>
        <input
          id="firstName"
          name="firstName"
          required
          maxLength={50}
          autoComplete="given-name"
          className={input}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="school" className={label}>
          School
        </label>
        <input id="school" name="school" required maxLength={100} autoComplete="organization" className={input} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input id="email" type="email" name="email" required autoComplete="email" className={input} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className={label}>
          Password
        </label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          minLength={6}
          hintId="password-hint"
        />
        <span id="password-hint" className={hint}>
          At least 6 characters.
        </span>
      </div>

      <button type="submit" disabled={pending} className={`${submitButton} mt-1`}>
        {pending ? (
          <>
            <Spinner /> Creating account…
          </>
        ) : (
          "Create account"
        )}
      </button>
    </form>
  );
}
