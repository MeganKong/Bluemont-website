// Owner: unassigned (to be split). Weekly officer check-ins at "/check-ins".
//
// What this page will do (month 1 build plan):
// - Each officer fills in a short weekly check-in: what they did, what's next.
// - Officers RSVP to the weekly meeting. RSVPs close 24 hours before.
// Done when: officers check in and RSVP, and everyone sees the history.
//
// Officers only: <OfficersOnly> keeps volunteers out.
import type { Metadata } from "next";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import {
  card,
  eyebrow,
  field,
  hint,
  label,
  smallButton,
  smallButtonMain,
} from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { checkIns } from "../news/_placeholder";

export const metadata: Metadata = { title: "Check-ins" };

export default function CheckInsPage() {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Officers"
        title="Weekly check-ins"
        lead="What you got done this week, and what's next."
        width="narrow"
      >
        <SampleNote />

        <section
          aria-labelledby="meeting"
          className={`${card} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="flex flex-col gap-1">
            <h2 id="meeting" className={eyebrow}>
              Weekly meeting
            </h2>
            <p className="font-bold">[day and time]</p>
            <p className="text-sm text-muted">RSVP closes 24 hours before.</p>
          </div>
          <div className="flex gap-2">
            <button disabled className={smallButtonMain}>
              Going
            </button>
            <button disabled className={smallButton}>
              Can&apos;t make it
            </button>
          </div>
        </section>

        <section aria-labelledby="this-week" className={`${card} flex flex-col gap-4`}>
          <h2 id="this-week" className={eyebrow}>
            This week&apos;s check-in
          </h2>
          <label className={label}>
            What did you get done?
            <textarea rows={2} className={field} />
          </label>
          <label className={label}>
            What&apos;s next?
            <textarea rows={2} className={field} />
          </label>
          <button disabled className={`${smallButtonMain} self-start`}>
            Submit
          </button>
          <p className={hint}>Check-ins and RSVPs start saving once they&apos;re in the database.</p>
        </section>

        <section aria-labelledby="past" className="flex flex-col gap-4">
          <h2 id="past" className={eyebrow}>
            Past check-ins
          </h2>
          {checkIns.map((checkIn) => (
            <article key={checkIn.id} className={`${card} flex flex-col gap-2`}>
              <p className="font-bold">
                {checkIn.officerName} <span className="font-normal text-muted">· week of {checkIn.week}</span>
              </p>
              <p className="text-ink">
                <span className="font-semibold text-navy">Done:</span> {checkIn.done}
              </p>
              <p className="text-ink">
                <span className="font-semibold text-navy">Next:</span> {checkIn.next}
              </p>
            </article>
          ))}
        </section>
      </PortalPage>
    </OfficersOnly>
  );
}
