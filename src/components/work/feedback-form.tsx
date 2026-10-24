"use client";
// Owner: Megan (shared; built by Adhya). The form officers use to write
// feedback, or to edit feedback they wrote. Runs in the browser so it can
// show errors and "Saved" without a reload.
import { useActionState, useEffect, useState } from "react";
import type { Feedback } from "@/lib/types";
import { addFeedback, editFeedback, type WorkState } from "@/lib/work/actions";
import { buttonMain } from "@/app/(app)/lessons/_styles";
import { Message } from "./message";
import { field, smallButton } from "./styles";

const kinds = [
  { value: "tip", icon: "💡", label: "Tip", hint: "Something to try", checked: "has-checked:bg-gold-pale" },
  { value: "comment", icon: "💬", label: "Comment", hint: "Praise or notes", checked: "has-checked:bg-mint-pale" },
] as const;

type FeedbackFormProps =
  // Writing new feedback on a submission.
  | { submissionId: string; feedback?: undefined; onClose?: undefined }
  // Editing feedback the officer wrote.
  | { submissionId?: undefined; feedback: Feedback; onClose: () => void };

export function FeedbackForm({ submissionId, feedback, onClose }: FeedbackFormProps) {
  const [state, formAction, pending] = useActionState(feedback ? editFeedback : addFeedback, {} as WorkState);
  const [length, setLength] = useState(feedback?.body.length ?? 0);
  const [lastState, setLastState] = useState(state);
  const id = feedback?.id ?? submissionId;

  // After new feedback is saved, the box empties, so the count starts over.
  if (state !== lastState) {
    setLastState(state);
    if (state.done) setLength(0);
  }

  // After an edit is saved, the editor closes.
  useEffect(() => {
    if (state.done) onClose?.();
  }, [state, onClose]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name={feedback ? "feedbackId" : "submissionId"} value={id} />

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-bold">This is a…</legend>
        <div className="grid grid-cols-2 gap-3">
          {kinds.map((kind) => (
            <label
              key={kind.value}
              className={`flex min-h-[64px] cursor-pointer flex-col items-center justify-center rounded-2xl border-3 border-navy bg-card px-3 py-2 text-center has-checked:shadow-[0_4px_0_var(--color-navy)] has-focus-visible:outline-4 has-focus-visible:outline-offset-2 has-focus-visible:outline-gold ${kind.checked}`}
            >
              <input
                type="radio"
                name="kind"
                value={kind.value}
                required
                defaultChecked={(feedback?.kind ?? "tip") === kind.value}
                className="sr-only"
              />
              <span className="text-lg font-extrabold">
                <span aria-hidden="true">{kind.icon}</span> {kind.label}
              </span>
              <span className="text-sm text-muted">{kind.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-1.5 font-bold">
        {feedback ? "Your feedback" : "Write your feedback"}
        <textarea
          name="body"
          required
          rows={4}
          maxLength={1000}
          defaultValue={feedback?.body}
          onChange={(event) => setLength(event.target.value.length)}
          className={`${field} font-normal`}
        />
        <span className="self-end text-sm font-normal text-muted">{length}/1000</span>
      </label>

      {state.error && <Message kind="error">{state.error}</Message>}
      {state.done && !feedback && (
        <Message kind="success">Saved! The volunteer will see it next time they sign in.</Message>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {/* text-cream! because buttonMain's text color currently comes out navy. */}
        <button type="submit" disabled={pending} className={`${buttonMain} text-cream! disabled:opacity-70`}>
          {pending ? "Saving…" : feedback ? "Save changes" : "Send feedback"}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className={smallButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
