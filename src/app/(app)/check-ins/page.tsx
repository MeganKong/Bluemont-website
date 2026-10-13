// Owner: unassigned (to be split). Weekly officer check-ins at "/check-ins".
//
// What this page will do (month 1 build plan):
// - Each officer fills in a short weekly check-in: what they did, what's next.
// - Officers RSVP to the weekly meeting. RSVPs close 24 hours before.
// Done when: officers check in and RSVP, and everyone sees the history.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import { checkIns } from "../news/_placeholder";

export const metadata: Metadata = { title: "Check-ins" };

const inputClass = "rounded-lg border border-line bg-cream px-3 py-2";

export default function CheckInsPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <SampleNote />
      <h1 className="font-display text-4xl font-semibold">Officer check-ins</h1>

      <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy p-5 text-cream">
        <div>
          <p className="font-semibold">Weekly meeting · [day and time]</p>
          <p className="text-cream/80">RSVP closes 24 hours before</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-lg bg-gold px-4 py-2 font-semibold text-navy">Going</button>
          <button className="rounded-lg border border-cream/60 px-4 py-2 font-semibold">Can&apos;t make it</button>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl font-semibold">This week&apos;s check-in</h2>
        <textarea placeholder="What did you get done?" rows={2} className={inputClass} />
        <textarea placeholder="What's next?" rows={2} className={inputClass} />
        <button className="self-start rounded-lg bg-navy px-5 py-2 font-semibold text-cream">Submit</button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Past check-ins</h2>
        {checkIns.map((checkIn) => (
          <article key={checkIn.id} className="flex flex-col gap-2 rounded-2xl border border-line bg-card p-5">
            <p className="font-semibold">
              {checkIn.officerName} · week of {checkIn.week}
            </p>
            <p className="text-ink">
              <span className="font-semibold">Done:</span> {checkIn.done}
            </p>
            <p className="text-ink">
              <span className="font-semibold">Next:</span> {checkIn.next}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}
