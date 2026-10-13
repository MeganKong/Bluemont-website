// Owner: Iris. Weekly officer check-ins at "/check-ins".
import type { Metadata } from "next";
import { checkIns } from "../news/_placeholder";

export const metadata: Metadata = { title: "Check-ins" };

export default function CheckInsPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-display text-4xl font-semibold">Officer check-ins</h1>
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
    </div>
  );
}
