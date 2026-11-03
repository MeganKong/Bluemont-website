"use client";
// Owner: Megan (built by Nika). "Delete" asks first, because a deleted
// message can't be brought back. "use client" is needed for the question.
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
        className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-navy px-4 font-bold hover:bg-pink-pale focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        Delete
      </button>
    </form>
  );
}
