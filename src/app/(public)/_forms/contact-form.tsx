"use client";
// Owner: Nika. The contact form on the FAQ page. "use client" is needed to
// show "Sending...", errors and the thank-you note without leaving the page.
// Sending happens on the server (./actions.ts).
import { useActionState } from "react";
import { Message } from "@/components/work/message";
import { buttonNight, field, input, label } from "../_styles";
import { sendContact, type FormState } from "./actions";
import { contactTopics } from "./options";
import { RobotTrap } from "./robot-trap";

const formBox = "flex min-w-0 flex-[1_1_420px] flex-col gap-4 rounded-3xl border border-rule bg-card p-6 sm:p-10";

export function ContactForm() {
  const [state, send, sending] = useActionState<FormState, FormData>(sendContact, {});

  if (state.done) {
    return (
      <div className={formBox}>
        <Message kind="success">
          <p>Thanks! Your message was sent.</p>
          <p className="font-normal">We&apos;re students, so we answer within 1–3 days.</p>
        </Message>
      </div>
    );
  }

  return (
    <form action={send} className={formBox}>
      <fieldset disabled={sending} className="flex flex-col gap-4">
        <legend className="sr-only">Contact form</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className={field}>
            <label htmlFor="c-name" className={label}>
              Name
            </label>
            <input id="c-name" name="name" autoComplete="name" required maxLength={100} className={input} />
          </div>
          <div className={field}>
            <label htmlFor="c-email" className={label}>
              Email
            </label>
            <input
              id="c-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              className={input}
            />
          </div>
        </div>
        <div className={field}>
          <label htmlFor="c-topic" className={label}>
            Topic
          </label>
          <select id="c-topic" name="topic" className={input}>
            {contactTopics.map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </div>
        <div className={field}>
          <label htmlFor="c-msg" className={label}>
            Message
          </label>
          <textarea id="c-msg" name="message" rows={5} required maxLength={2000} className={input} />
        </div>
        <RobotTrap />
        {state.error && <Message kind="error">{state.error}</Message>}
        <button type="submit" className={`${buttonNight} self-start disabled:cursor-wait disabled:opacity-60`}>
          {sending ? "Sending..." : "Send"}
        </button>
      </fieldset>
      <p className="text-sm text-ink">Only Bluemont officers read these messages.</p>
    </form>
  );
}
