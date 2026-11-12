// Owner: Megan (built by Adhya). The officer dashboard at "/officer".
//
// What this page will do:
// - Show officers what needs them: counts for work to review, hours to
//   approve, kit requests and messages (each a link), then the hours list
//   with Approve and Decline, and what's coming up.
// Done when: only officers can see it (even by typing the address), and it
// shows real data.
//
// Data: src/lib/work/data.ts and src/lib/portal/data.ts (sample data until
// the database step is done). Signed-out visitors are sent to sign in by
// src/lib/supabase/proxy.ts; <OfficersOnly> keeps volunteers out.
// Uses the portal look (src/components/portal-styles.ts), like the volunteer pages.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { reviewHours } from "@/lib/portal/actions";
import { getComingUp, getHoursToApprove, getKitRequests, getStock } from "@/lib/portal/data";
import { formatDay, formatEventDay, hoursLabel } from "@/lib/portal/format";
import { getAllWork } from "@/lib/work/data";
import { ActionForm } from "@/components/action-form";
import { DateBox } from "@/components/date-box";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { buttonMain, card, cardLink, eyebrow, link, rows, smallButton, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Officer dashboard" };

export default function OfficerPage() {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Officer dashboard"
        title={
          <Suspense fallback="Welcome.">
            <Welcome />
          </Suspense>
        }
        lead="Here's what needs you."
        actions={
          <Link href="/news" className={buttonMain}>
            Post an update
          </Link>
        }
      >
        <Suspense fallback={<div className={`${card} min-h-72`} />}>
          <Dashboard />
        </Suspense>
      </PortalPage>
    </OfficersOnly>
  );
}

// "Welcome, [first name].", using the name saved at sign-up.
async function Welcome() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const firstName = data?.claims.user_metadata?.first_name;

  return firstName ? (
    <>
      Welcome, <em>{firstName}.</em>
    </>
  ) : (
    "Welcome."
  );
}

async function Dashboard() {
  const [work, hours, kits, stock, comingUp] = await Promise.all([
    getAllWork(),
    getHoursToApprove(),
    getKitRequests(),
    getStock(),
    getComingUp(4),
  ]);
  const toReview = work.submissions.filter((s) => s.feedback.length === 0).length;
  const kitsWaiting = kits.requests.filter((r) => r.status === "pending").length;
  const lowStock = stock.items.filter((item) => item.quantity <= item.lowStockAt);
  const sample = work.sample || hours.sample || kits.sample || stock.sample || comingUp.sample;

  return (
    <>
      {sample && <SampleNote />}

      <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Count href="/officer/work" label="Work to review" count={toReview} note="waiting for feedback" />
        <Count href="#hours" label="Hours" count={hours.entries.length} note="waiting for approval" />
        <Count
          href="/kits/requests"
          label="Kit requests"
          count={kitsWaiting}
          note={lowStock.length > 0 ? `${lowStock.length} ${lowStock.length === 1 ? "supply" : "supplies"} low` : "waiting"}
        />
        <Count href="/officer/messages" label="Messages" note="From the website" />
      </ul>

      <div className="grid gap-6 md:grid-cols-5 md:items-start">
        <section id="hours" aria-labelledby="approve" className={`${card} flex scroll-mt-6 flex-col gap-4 md:col-span-3`}>
          <h2 id="approve" className={eyebrow}>
            Hours to approve
          </h2>
          {hours.entries.length === 0 ? (
            <p className="text-ink">All caught up. No hours are waiting.</p>
          ) : (
            <ul className={rows}>
              {hours.entries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-bold">
                      {entry.volunteerName} · {hoursLabel(entry.hours)}
                    </p>
                    <p className="text-sm text-muted">
                      {entry.activity} · <time dateTime={entry.workedOn}>{formatDay(entry.workedOn)}</time>
                    </p>
                  </div>
                  <ActionForm action={reviewHours} className="flex flex-wrap gap-2">
                    <input type="hidden" name="id" value={entry.id} />
                    <button type="submit" name="status" value="approved" className={smallButtonMain}>
                      Approve
                    </button>
                    <button type="submit" name="status" value="declined" className={smallButton}>
                      Decline
                    </button>
                  </ActionForm>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="upcoming" className={`${card} flex flex-col gap-4 md:col-span-2`}>
          <h2 id="upcoming" className={eyebrow}>
            Coming up
          </h2>
          {comingUp.events.length === 0 ? (
            <p className="text-ink">Nothing planned. Add an event date when you post an update.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {comingUp.events.map((event) => (
                <li key={event.id} className="flex items-center gap-3">
                  <DateBox date={event.eventDate!} />
                  <div className="flex flex-col">
                    <p className="font-bold">{event.title}</p>
                    <p className="text-sm text-muted">{formatEventDay(event.eventDate!)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link href="/news" className={`${link} self-start`}>
            All updates →
          </Link>
        </section>
      </div>
    </>
  );
}

// A small tile with a count, linking to where the work is.
function Count({ href, label, count, note }: { href: string; label: string; count?: number; note: string }) {
  return (
    <li>
      <Link href={href} className={`${cardLink} flex h-full flex-col gap-1 p-5!`}>
        <span className={eyebrow}>{label}</span>
        {count !== undefined ? (
          <span className="font-serif text-4xl leading-tight">{count}</span>
        ) : (
          <span className="font-serif text-3xl leading-tight">Read →</span>
        )}
        <span className="text-sm text-muted">{note}</span>
      </Link>
    </li>
  );
}
