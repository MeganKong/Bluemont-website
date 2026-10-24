"use client";
// Owner: Megan (shared; built by Adhya). Lets officers mark a submission
// "Approved" or "Needs changes", or clear it. Volunteers see the result.
import { useActionState } from "react";
import type { Submission } from "@/lib/types";
import { setStatus, type WorkState } from "@/lib/work/actions";
import { Message } from "./message";

// The chosen status is filled in and raised; the others are plain.
const pill =
  "inline-flex min-h-11 items-center justify-center rounded-full border-2 border-navy px-4 font-bold " +
  "text-navy transition disabled:cursor-wait focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold";

const choices = [
  { value: "approved", label: "✓ Approved", on: "bg-mint-pale" },
  { value: "needs_changes", label: "↻ Needs changes", on: "bg-pink-pale" },
  { value: "", label: "No status", on: "bg-sand" },
];

type StatusPickerProps = { submissionId: string; status: Submission["status"] };

export function StatusPicker({ submissionId, status }: StatusPickerProps) {
  const [state, formAction, pending] = useActionState(setStatus, {} as WorkState);
  const current = status ?? "";

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="submissionId" value={submissionId} />
      <fieldset className="flex flex-col gap-2" disabled={pending}>
        <legend className="mb-2 font-bold">Status</legend>
        <div className="flex flex-wrap gap-2">
          {choices.map((choice) => (
            <button
              key={choice.value}
              type="submit"
              name="status"
              value={choice.value}
              aria-pressed={current === choice.value}
              className={`${pill} ${
                current === choice.value ? `${choice.on} shadow-[0_3px_0_var(--color-navy)]` : "bg-card hover:bg-sand"
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </fieldset>
      {state.error && <Message kind="error">{state.error}</Message>}
    </form>
  );
}
