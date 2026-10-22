"use client";
// Owner: Megan (built by Adhya, assignment 1). The sign-in form. Runs in the
// browser so it can show errors without a reload.
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, type FormState } from "../actions";
import { PasswordInput } from "../password-input";
import { Spinner } from "../spinner";
import { ForgotPassword } from "./forgot-password";
import { errorBox, infoBox, input, label, submitButton, textLink } from "../_styles";

export function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, {} as FormState);
  const searchParams = useSearchParams();
  const emailRef = useRef<HTMLInputElement>(null);
  // The "Forgot password?" pop-up is open when this holds an email (or "").
  const [forgotEmail, setForgotEmail] = useState<string | null>(null);

  // Set by /auth/confirm when an email link is old or already used.
  const badLink = searchParams.get("error") === "link";
  // Set after someone saves a new password on /reset-password.
  const passwordReset = searchParams.get("reset") === "done";
  // Set by src/lib/supabase/proxy.ts when a signed-out visitor opens a private page.
  const next = searchParams.get("next") ?? "";
  const error =
    state.error ??
    (badLink ? "That email link didn't work. It may be old or already used. Try again." : undefined);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="next" value={next} />
        {error ? (
          <p role="alert" className={errorBox}>
            {error}{" "}
            {state.noAccount && (
              <Link href="/sign-up" className={textLink}>
                Create an account
              </Link>
            )}
          </p>
        ) : passwordReset ? (
          <p role="status" className={infoBox}>
            Your password is updated. Sign in with your new password.
          </p>
        ) : (
          next && (
            <p role="status" className={infoBox}>
              Please sign in to see that page.
            </p>
          )
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={label}>
            Email
          </label>
          {/* The email stays filled in after a wrong try. */}
          <input
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            required
            autoComplete="email"
            defaultValue={state.email}
            className={input}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between gap-3">
            <label htmlFor="password" className={label}>
              Password
            </label>
            <button
              type="button"
              onClick={() => setForgotEmail(emailRef.current?.value ?? "")}
              className={textLink}
            >
              Forgot password?
            </button>
          </div>
          <PasswordInput id="password" name="password" autoComplete="current-password" />
        </div>

        <button type="submit" disabled={pending} className={`${submitButton} mt-1`}>
          {pending ? (
            <>
              <Spinner /> Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      {/* Outside the form, because a form can't sit inside another form. */}
      {forgotEmail !== null && (
        <ForgotPassword startEmail={forgotEmail} onClose={() => setForgotEmail(null)} />
      )}
    </>
  );
}
