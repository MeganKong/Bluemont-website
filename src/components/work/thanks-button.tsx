"use client";
// Owner: Megan (shared; built by Adhya). Lets a volunteer say "Thanks!" for a
// piece of feedback, with one tap. It can't be undone or typed into.
import { useActionState } from "react";
import { sayThanks, type WorkState } from "@/lib/work/actions";
import { Message } from "./message";
import { smallButton } from "@/components/portal-styles";

export function ThanksButton({ feedbackId, thanked }: { feedbackId: string; thanked: boolean }) {
  const [state, formAction, pending] = useActionState(sayThanks, {} as WorkState);

  if (thanked || state.done) {
    return (
      <p className="text-sm font-semibold text-muted">
        <span aria-hidden="true">✓</span> You said thanks
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col items-start gap-2">
      <input type="hidden" name="feedbackId" value={feedbackId} />
      <button type="submit" disabled={pending} className={smallButton}>
        {pending ? "Sending…" : "Say thanks"}
      </button>
      {state.error && <Message kind="error">{state.error}</Message>}
    </form>
  );
}
