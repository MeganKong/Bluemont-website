"use client";
// Owner: Megan (built by Nika). "Delete" asks first, because a deleted
// message can't be brought back. "use client" is needed for the question.
import { smallButton } from "@/components/portal-styles";
import { deleteForm } from "./actions";

export function DeleteButton({ kind, id, what }: { kind: "message" | "request"; id: string; what: string }) {
  return (
    <form
      action={deleteForm}
      onSubmit={(event) => {
        if (!confirm(`Delete ${what}? This can't be undone.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={`${smallButton} hover:border-pink hover:bg-pink-pale`}
      >
        Delete
      </button>
    </form>
  );
}
