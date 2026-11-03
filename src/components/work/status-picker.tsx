"use client";
// Owner: Megan (shared; built by Adhya). Lets officers mark a submission
// "Approved" or "Needs changes", or clear it. Volunteers see the result.
import { useActionState } from "react";
import type { Submission } from "@/lib/types";
import { setStatus, type WorkState } from "@/lib/work/actions";
import { focusRing } from "@/components/portal-styles";
import { Message } from "./message";

// The chosen status is filled in; the others are plain.
const pill =
  "inline-flex min-h-10 items-center justify-center rounded-full border-[1.5px] px-4 text-[15px] font-bold " +
  `text-navy transition disabled:cursor-wait ${focusRing}`;

const choices = [
  { value: "approved", label: "Approved", on: "border-mint bg-mint-pale" },
  { value: "needs_changes", label: "Needs changes", on: "border-pink bg-pink-pale" },
  { value: "", label: "No status", on: "border-line bg-tint" },
];

type StatusPickerProps = { submissionId: string; status: Submission["status"] };

export function StatusPicker({ submissionId, status }: StatusPickerProps) {
  const [state, formAction, pending] = useActionState(setStatus, {} as WorkState);
  const current = status ?? "";

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input type="hidden" name="submissionId" value={submissionId} />
      <fieldset className="flex flex-col gap-2" disabled={pending}>
        <legend className="mb-2 text-[15px] font-bold">Status</legend>
        <div className="flex flex-wrap gap-2">
          {choices.map((choice) => (
            <button
              key={choice.value}
              type="submit"
              name="status"
              value={choice.value}
              aria-pressed={current === choice.value}
              className={`${pill} ${
                current === choice.value ? choice.on : "border-line bg-card hover:border-navy"
              }`}
            >
              {current === choice.value && <span aria-hidden="true">✓&nbsp;</span>}
              {choice.label}
            </button>
          ))}
        </div>
      </fieldset>
      {state.error && <Message kind="error">{state.error}</Message>}
    </form>
  );
}
