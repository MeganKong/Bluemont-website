"use client";
// Owner: Megan (built by Adhya). The new-password form. Runs in the browser
// so it can show errors without a reload.
import { useActionState } from "react";
import { updatePassword, type FormState } from "../actions";
import { PasswordInput } from "../password-input";
import { Spinner } from "../spinner";
import { errorBox, label, submitButton } from "../_styles";

export function ResetPasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, {} as FormState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.error && (
        <p role="alert" className={errorBox}>
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className={label}>
          New password
        </label>
        <PasswordInput
          id="password"
          name="password"
          autoComplete="new-password"
          minLength={6}
          hintId="password-hint"
        />
        <span id="password-hint" className="text-sm text-muted">
          At least 6 characters.
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirm" className={label}>
          Type it again
        </label>
        <PasswordInput id="confirm" name="confirm" autoComplete="new-password" minLength={6} />
      </div>

      <button type="submit" disabled={pending} className={`${submitButton} mt-1`}>
        {pending ? (
          <>
            <Spinner /> Saving…
          </>
        ) : (
          "Save new password"
        )}
      </button>
    </form>
  );
}
