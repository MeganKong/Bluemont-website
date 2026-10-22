"use client";
// Owner: Megan (built by Adhya). The "Forgot password?" pop-up. It asks for
// the account's email; the server checks whether that account exists.
// - Account found: we email a link to make a new password (/reset-password).
// - No account: we say so, then take them to create one.
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset, type FormState } from "../actions";
import { Spinner } from "../spinner";
import { errorBox, input, label, secondaryButton, submitButton, textLink } from "../_styles";

type ForgotPasswordProps = {
  // Whatever was already typed in the sign-in email box.
  startEmail: string;
  onClose: () => void;
};

export function ForgotPassword({ startEmail, onClose }: ForgotPasswordProps) {
  const [state, formAction, pending] = useActionState(requestPasswordReset, {} as FormState);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const close = () => dialogRef.current?.close();

  // Open as a pop-up straight away. The browser keeps keyboard focus inside
  // it, and the Esc key closes it.
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // No account: show the message for a moment, then go to create one.
  useEffect(() => {
    if (!state.noAccount) return;
    const timer = setTimeout(() => router.push("/sign-up"), 3000);
    return () => clearTimeout(timer);
  }, [state, router]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      // Tapping the dark area around the pop-up closes it.
      onClick={(event) => event.target === dialogRef.current && close()}
      aria-labelledby="forgot-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border-2 border-navy bg-card p-6 text-navy shadow-[4px_4px_0_var(--color-navy)] backdrop:bg-navy/60 sm:p-8"
    >
      {state.sentTo ? (
        <div role="status" className="flex flex-col gap-4">
          <h2 id="forgot-title" className="font-display text-3xl font-extrabold">
            Check your email
          </h2>
          <p className="text-lg text-ink">
            Check your email for a link to reset your password. We sent it to{" "}
            <strong className="break-all text-navy">{state.sentTo}</strong>. If you don&apos;t
            see it in a few minutes, check your spam folder.
          </p>
          <button type="button" onClick={close} className={submitButton}>
            Done
          </button>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 id="forgot-title" className="font-display text-3xl font-extrabold">
              Forgot your password?
            </h2>
            <p className="text-lg text-ink">
              Type the email you signed up with. We&apos;ll send you a link to make a new password.
            </p>
          </div>

          {state.error && (
            <p role="alert" className={errorBox}>
              {state.error}{" "}
              {state.noAccount && (
                <>
                  Taking you to{" "}
                  <Link href="/sign-up" className={textLink}>
                    create an account
                  </Link>
                  …
                </>
              )}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="forgot-email" className={label}>
              Email
            </label>
            <input
              id="forgot-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              defaultValue={state.email ?? startEmail}
              className={input}
            />
          </div>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={pending || state.noAccount} className={submitButton}>
              {pending ? (
                <>
                  <Spinner /> Sending…
                </>
              ) : (
                "Send reset link"
              )}
            </button>
            <button type="button" onClick={close} className={secondaryButton}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </dialog>
  );
}
