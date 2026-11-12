// Owner: unassigned (to be split). Weekly officer check-ins at "/check-ins".
//
// What this page will do (month 1 build plan):
// - Each officer fills in a short weekly check-in: what they did, what's next.
// - Officers RSVP to this week's meeting, and see who's coming.
// Done when: officers check in and RSVP, and everyone sees the history.
//
// Officers only: <OfficersOnly> keeps volunteers out, and the database only
// lets officers read or write these. Data and saving:
// src/lib/portal/data.ts and actions.ts.
import type { Metadata } from "next";
import { Suspense } from "react";
import { checkIn, deleteCheckIn, rsvp } from "@/lib/portal/actions";
import { getCheckIns, mondayOfThisWeek } from "@/lib/portal/data";
import { formatDay } from "@/lib/portal/format";
import { ActionForm } from "@/components/action-form";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card, eyebrow, field, label, smallButton, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

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
        <Suspense fallback={<div className={`${card} min-h-48`} />}>
          <CheckIns />
        </Suspense>
      </PortalPage>
    </OfficersOnly>
  );
}

async function CheckIns() {
  const { checkIns, rsvps, myId, sample } = await getCheckIns();
  const thisWeek = mondayOfThisWeek();
  const mine = checkIns.find((c) => c.week === thisWeek && c.officerId === myId);
  const myRsvp = rsvps.find((r) => r.officerId === myId);
  const going = rsvps.filter((r) => r.going).map((r) => r.officerName);

  return (
    <>
      {sample && <SampleNote />}

      <section
        aria-labelledby="meeting"
        className={`${card} flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`}
      >
        <div className="flex flex-col gap-1">
          <h2 id="meeting" className={eyebrow}>
            This week&apos;s meeting
          </h2>
          <p className="text-ink">{going.length === 0 ? "Nobody has said they're going yet." : `Going: ${going.join(", ")}`}</p>
        </div>
        <ActionForm action={rsvp} className="flex flex-wrap gap-2">
          <button
            type="submit"
            name="going"
            value="yes"
            aria-pressed={myRsvp?.going === true}
            className={myRsvp?.going === true ? smallButtonMain : smallButton}
          >
            {myRsvp?.going === true && <span aria-hidden="true">✓</span>} Going
          </button>
          <button
            type="submit"
            name="going"
            value="no"
            aria-pressed={myRsvp?.going === false}
            className={myRsvp?.going === false ? smallButtonMain : smallButton}
          >
            {myRsvp?.going === false && <span aria-hidden="true">✓</span>} Can&apos;t make it
          </button>
        </ActionForm>
      </section>

      {!mine && (
        <section aria-labelledby="this-week" className={`${card} flex flex-col gap-4`}>
          <h2 id="this-week" className={eyebrow}>
            This week&apos;s check-in
          </h2>
          <ActionForm action={checkIn} className="flex flex-col gap-4">
            <label className={label}>
              What did you get done?
              <textarea name="done" required rows={2} maxLength={500} className={field} />
            </label>
            <label className={label}>
              What&apos;s next?
              <textarea name="next" required rows={2} maxLength={500} className={field} />
            </label>
            <button type="submit" className={`${smallButtonMain} self-start`}>
              Submit
            </button>
          </ActionForm>
        </section>
      )}

      <section aria-labelledby="past" className="flex flex-col gap-4">
        <h2 id="past" className={eyebrow}>
          Check-ins
        </h2>
        {checkIns.length === 0 && <p className="text-ink">No check-ins yet.</p>}
        {checkIns.map((c) => (
          <article key={c.id} className={`${card} flex flex-col gap-2`}>
            <p className="font-bold">
              {c.officerName} <span className="font-normal text-muted">· week of {formatDay(c.week)}</span>
            </p>
            <p className="text-ink">
              <span className="font-semibold text-navy">Done:</span> {c.done}
            </p>
            <p className="text-ink">
              <span className="font-semibold text-navy">Next:</span> {c.next}
            </p>
            {c.officerId === myId && (
              <ActionForm action={deleteCheckIn} className="self-start">
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className={smallButton}>
                  Delete
                </button>
              </ActionForm>
            )}
          </article>
        ))}
      </section>
    </>
  );
}
