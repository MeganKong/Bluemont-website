"use client";
// Owner: Nika. The plushie request form on the For shelters page. "use
// client" is needed to show "Sending...", errors and the thank-you note
// without leaving the page. Sending happens on the server (./actions.ts).
import { useActionState } from "react";
import { Message } from "@/components/work/message";
import { buttonNight, field, input, label } from "../_styles";
import { sendRequest, type FormState } from "./actions";
import { childAges } from "./options";
import { RobotTrap } from "./robot-trap";

const formBox = "flex min-w-0 flex-[1_1_420px] flex-col gap-4 rounded-3xl border border-rule bg-card p-6 sm:p-10";

export function RequestForm() {
  const [state, send, sending] = useActionState<FormState, FormData>(sendRequest, {});

  if (state.done) {
    return (
      <div className={formBox}>
        <Message kind="success">
          <p>Thank you! Your request was sent.</p>
          <p className="font-normal">
            An officer will email you within 1–3 days. Plushies usually arrive in 3–4 weeks.
          </p>
        </Message>
      </div>
    );
  }

  return (
    <form action={send} className={formBox}>
      <fieldset disabled={sending} className="flex flex-col gap-4">
        <legend className="sr-only">Plushie request</legend>
        <div className={field}>
          <label htmlFor="s-org" className={label}>
            Organization
          </label>
          <input id="s-org" name="organization" required maxLength={200} className={input} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={field}>
            <label htmlFor="s-name" className={label}>
              Your name
            </label>
            <input id="s-name" name="name" autoComplete="name" required maxLength={100} className={input} />
          </div>
          <div className={field}>
            <label htmlFor="s-email" className={label}>
              Work email
            </label>
            <input
              id="s-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              className={input}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={field}>
            <label htmlFor="s-count" className={label}>
              About how many children?
            </label>
            <input
              id="s-count"
              name="children"
              type="number"
              min={1}
              max={10000}
              inputMode="numeric"
              required
              className={input}
            />
          </div>
          <div className={field}>
            <label htmlFor="s-ages" className={label}>
              Ages
            </label>
            <select id="s-ages" name="ages" className={input}>
              {childAges.map((ages) => (
                <option key={ages}>{ages}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={field}>
          <label htmlFor="s-city" className={label}>
            City
          </label>
          <input id="s-city" name="city" required maxLength={100} className={input} />
          <small className="text-sm text-ink">Only our officers see this. It&apos;s never shown on the site.</small>
        </div>
        <div className={field}>
          <label htmlFor="s-notes" className={label}>
            Anything we should know?
          </label>
          <textarea id="s-notes" name="notes" rows={4} maxLength={2000} className={input} />
        </div>
        <RobotTrap />
        {state.error && <Message kind="error">{state.error}</Message>}
        <button type="submit" className={`${buttonNight} self-start disabled:cursor-wait disabled:opacity-60`}>
          {sending ? "Sending..." : "Send request"}
        </button>
      </fieldset>
    </form>
  );
}
