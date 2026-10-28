// Owner: Nika. The note on a form that doesn't send anything yet. The
// form's fields are turned off (<fieldset disabled>) until it's connected
// to the database or an inbox.
import { Tbd } from "@/components/tbd";

export function NotConnected() {
  return (
    <p className="text-sm text-ink">
      <Tbd>This form isn&apos;t connected yet.</Tbd> Until it is, please email{" "}
      <Tbd>hello@[our domain]</Tbd>.
    </p>
  );
}
