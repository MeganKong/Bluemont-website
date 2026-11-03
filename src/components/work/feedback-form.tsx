"use client";
// Owner: Megan (shared; built by Adhya). The form officers use to write
// feedback, or to edit feedback they wrote. Runs in the browser so it can
// show errors and "Saved" without a reload.
import { useActionState, useEffect, useState } from "react";
import type { Feedback } from "@/lib/types";
import { addFeedback, editFeedback, type WorkState } from "@/lib/work/actions";
import { buttonMain, field, hint, label, smallButton } from "@/components/portal-styles";
import { Message } from "./message";

const kinds = [
  { value: "tip", label: "Tip", hint: "Something to try", checked: "has-checked:border-gold has-checked:bg-gold-pale" },
  { value: "comment", label: "Comment", hint: "Praise or notes", checked: "has-checked:border-blue has-checked:bg-tint" },
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
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name={feedback ? "feedbackId" : "submissionId"} value={id} />

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-[15px] font-bold">This is a…</legend>
        <div className="grid grid-cols-2 gap-3">
          {kinds.map((kind) => (
            <label
              key={kind.value}
              className={`flex min-h-16 cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-line bg-card px-3 py-2 text-center transition hover:border-navy/40 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-blue ${kind.checked}`}
            >
              <input
                type="radio"
                name="kind"
                value={kind.value}
                required
                defaultChecked={(feedback?.kind ?? "tip") === kind.value}
                className="sr-only"
              />
              <span className="font-bold">{kind.label}</span>
              <span className="text-sm text-muted">{kind.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={label}>
        {feedback ? "Your feedback" : "Write your feedback"}
        <textarea
          name="body"
          required
          rows={4}
          maxLength={1000}
          defaultValue={feedback?.body}
          onChange={(event) => setLength(event.target.value.length)}
          className={field}
        />
        <span className={`${hint} self-end`}>{length}/1000</span>
      </label>

      {state.error && <Message kind="error">{state.error}</Message>}
      {state.done && !feedback && (
        <Message kind="success">Saved! The volunteer will see it next time they sign in.</Message>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={pending} className={buttonMain}>
          {pending ? "Saving…" : feedback ? "Save changes" : "Send feedback"}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className={`${smallButton} min-h-12`}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
