"use client";
// Owner: Megan (shared; built by Adhya). A form that runs one of the actions
// in src/lib/portal/actions.ts and shows what happened under it. While it
// saves, its buttons are greyed out so nobody taps twice.
//
// <ActionForm action={requestKit} done="Requested!">
//   <button className={buttonMain}>Request my kit</button>
// </ActionForm>
import { useActionState } from "react";
import type { ActionState } from "@/lib/portal/actions";
import { Message } from "./work/message";

type ActionFormProps = {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  // A message to show after it worked. Leave out when the page change says enough.
  done?: string;
  className?: string;
  children: React.ReactNode;
};

export function ActionForm({ action, done, className, children }: ActionFormProps) {
  const [state, formAction, pending] = useActionState(action, {});

  return (
    <form action={formAction} className={className}>
      <fieldset disabled={pending} className="contents">
        {children}
      </fieldset>
      {state.error && (
        <div className="w-full">
          <Message kind="error">{state.error}</Message>
        </div>
      )}
      {state.done && done && (
        <div className="w-full">
          <Message kind="success">{done}</Message>
        </div>
      )}
    </form>
  );
}
