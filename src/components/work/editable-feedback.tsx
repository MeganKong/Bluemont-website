"use client";
// Owner: Megan (shared; built by Adhya). Wraps feedback an officer wrote
// themselves with Edit and Delete buttons. The database also checks that only
// the officer who wrote it can change it.
import { useActionState, useState } from "react";
import type { Feedback } from "@/lib/types";
import { deleteFeedback, type WorkState } from "@/lib/work/actions";
import { FeedbackForm } from "./feedback-form";
import { Message } from "./message";
import { smallButton } from "./styles";

type EditableFeedbackProps = {
  feedback: Feedback;
  // The feedback card itself, shown when not editing.
  children: React.ReactNode;
};

export function EditableFeedback({ feedback, children }: EditableFeedbackProps) {
  const [editing, setEditing] = useState(false);
  const [state, deleteAction, deleting] = useActionState(deleteFeedback, {} as WorkState);

  if (editing) {
    return (
      <div className="rounded-2xl border-3 border-dashed border-navy bg-card p-4">
        <FeedbackForm feedback={feedback} onClose={() => setEditing(false)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {children}
      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => setEditing(true)} className={smallButton}>
          <span aria-hidden="true">✏️</span> Edit
        </button>
        <form
          action={deleteAction}
          onSubmit={(event) => {
            if (!window.confirm("Delete this feedback? This can't be undone.")) event.preventDefault();
          }}
        >
          <input type="hidden" name="feedbackId" value={feedback.id} />
          <button type="submit" disabled={deleting} className={smallButton}>
            <span aria-hidden="true">🗑️</span> {deleting ? "Deleting…" : "Delete"}
          </button>
        </form>
      </div>
      {state.error && <Message kind="error">{state.error}</Message>}
    </div>
  );
}
