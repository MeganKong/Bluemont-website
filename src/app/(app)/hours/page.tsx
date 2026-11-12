// Owner: unassigned (built by Adhya). A volunteer's service hours at "/hours".
//
// What this page will do:
// - Volunteers log the hours they spent (what they did, how long, which day).
// - An officer approves them on the officer dashboard. Only approved hours
//   count toward the total.
// - "Print my hours" prints a clean record to hand in at school.
// Done when: a volunteer logs hours, an officer approves them, and the
// total goes up.
//
// Data and saving: src/lib/portal/data.ts and actions.ts (sample data until
// the database step is done).
import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import type { ServiceHoursEntry } from "@/lib/types";
import { deleteHours, logHours } from "@/lib/portal/actions";
import { getMyHours } from "@/lib/portal/data";
import { createClient } from "@/lib/supabase/server";
import { formatDay, formatHours, hoursLabel } from "@/lib/portal/format";
import { ActionForm } from "@/components/action-form";
import { PortalPage } from "@/components/portal-page";
import { bigNumber, card, eyebrow, field, label, rows, smallButton, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { PrintButton } from "./print-button";

export const metadata: Metadata = { title: "Hours" };

export default function HoursPage() {
  return (
    <PortalPage
      eyebrow="Hours"
      title="Service hours"
      lead="Log the time you spend. Once an officer approves it, it counts."
      width="narrow"
      actions={<PrintButton />}
    >
      <Suspense fallback={<div className={`${card} min-h-64`} />}>
        <Hours />
      </Suspense>
    </PortalPage>
  );
}

async function Hours() {
  const { entries, sample } = await getMyHours();
  const approved = entries.filter((e) => e.status === "approved");
  const total = approved.reduce((sum, e) => sum + e.hours, 0);
  const waiting = entries.filter((e) => e.status === "pending").reduce((sum, e) => sum + e.hours, 0);

  return (
    <>
      {sample && <SampleNote />}
      <PrintHeading total={total} />

      <section aria-labelledby="total" className={`${card} flex flex-col gap-2`}>
        <h2 id="total" className={eyebrow}>
          Approved hours
        </h2>
        <p className="flex items-baseline gap-2">
          <span className={bigNumber}>{formatHours(total)}</span>
          <span className="text-ink">{total === 1 ? "hour" : "hours"}</span>
        </p>
        {waiting > 0 && <p className="text-sm text-muted">{hoursLabel(waiting)} waiting for an officer.</p>}
      </section>

      <section aria-labelledby="log" className={`${card} flex flex-col gap-4 print:hidden`}>
        <h2 id="log" className={eyebrow}>
          Log hours
        </h2>
        <ActionForm action={logHours} done="Logged. An officer will approve it soon." className="flex flex-col gap-4">
          <label className={label}>
            What did you do?
            <input
              name="activity"
              required
              maxLength={100}
              placeholder="e.g. Crochet circle, making a plushie at home"
              className={field}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>
              Hours
              <input name="hours" type="number" required min={0.5} max={12} step={0.5} className={field} />
            </label>
            <label className={label}>
              Date
              <input name="workedOn" type="date" required className={field} />
            </label>
          </div>
          <button type="submit" className={`${smallButtonMain} self-start`}>
            Log hours
          </button>
        </ActionForm>
      </section>

      <section aria-labelledby="history" className={`${card} flex flex-col gap-4`}>
        <h2 id="history" className={eyebrow}>
          History
        </h2>
        {entries.length === 0 ? (
          <p className="text-ink">Nothing logged yet.</p>
        ) : (
          <ul className={rows}>
            {entries.map((entry) => (
              <Entry key={entry.id} entry={entry} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

// Only on paper: who this record is for, from whom, and when it was printed.
async function PrintHeading({ total }: { total: number }) {
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const name = data?.claims.user_metadata?.first_name;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="hidden flex-col gap-1 print:flex">
      <p className="font-serif text-3xl">Service hours record</p>
      <p>Bluemont Children Foundation · EIN 99-3471914</p>
      {name && <p>Volunteer: {name}</p>}
      <p>
        {hoursLabel(total)} approved by officers · printed {formatDay(today)}
      </p>
    </div>
  );
}

function Entry({ entry }: { entry: ServiceHoursEntry }) {
  return (
    // Only approved hours are part of the printed record.
    <li
      className={`flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0 ${
        entry.status === "approved" ? "" : "print:hidden"
      }`}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="font-bold">
          {entry.activity} · {hoursLabel(entry.hours)}
        </p>
        <p className="text-sm text-muted">
          <time dateTime={entry.workedOn}>{formatDay(entry.workedOn)}</time>
          {entry.status === "approved" && entry.reviewedBy && ` · approved by ${entry.reviewedBy}`}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <StatusLabel status={entry.status} />
        {entry.status === "pending" && (
          <ActionForm action={deleteHours} className="print:hidden">
            <input type="hidden" name="id" value={entry.id} />
            <button type="submit" className={smallButton} aria-label={`Delete ${entry.activity}`}>
              Delete
            </button>
          </ActionForm>
        )}
      </div>
    </li>
  );
}

function StatusLabel({ status }: { status: ServiceHoursEntry["status"] }) {
  const look = {
    approved: { text: "Approved", className: "bg-mint-pale" },
    pending: { text: "Waiting", className: "bg-gold-pale" },
    declined: { text: "Declined", className: "bg-pink-pale" },
  }[status];
  return <span className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold text-navy ${look.className}`}>{look.text}</span>;
}
