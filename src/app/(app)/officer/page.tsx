// Owner: Megan (built by Adhya). The officer dashboard at "/officer".
//
// What this page will do:
// - Show officers what needs them, in this order: shared work to review,
//   volunteer hours to approve, upcoming lessons and events, kit requests and
//   low stock, and posting an announcement.
// Done when: only officers can see it (even by typing the address), and it
// shows real data.
//
// "Work to review" comes from src/lib/work/data.ts (real once the database is
// set up). The rest comes from ./_data.ts, which is fake for now. The buttons
// don't save anything yet. Signed-out visitors are sent to sign in by
// src/lib/supabase/proxy.ts; <OfficersOnly> keeps volunteers out.
// Uses the portal look (src/components/portal-styles.ts), like the volunteer dashboard.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import {
  bigNumber,
  card,
  eyebrow,
  field,
  focusRing,
  hint,
  label,
  link,
  rows,
  smallButton,
  smallButtonMain,
} from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { FeedbackCountBadge } from "@/components/work/badges";
import { WorkPhoto } from "@/components/work/work-photo";
import { getAllWork } from "@/lib/work/data";
import { getHoursToApprove, getKitsAndStock, getLatestAnnouncements, getUpcoming } from "./_data";

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
        lead="Here's what needs you this week."
      >
        <SampleNote />

        <WorkToReview />

        {/* The website's forms (plushie requests and contact messages). */}
        <section
          aria-labelledby="messages"
          className={`${card} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="flex flex-col gap-1">
            <h2 id="messages" className={eyebrow}>
              Messages
            </h2>
            <p className="text-ink">Plushie requests and contact messages from the website.</p>
          </div>
          <Link href="/officer/messages" className={`${link} shrink-0 self-start sm:self-auto`}>
            Read messages →
          </Link>
        </section>

        {/* Phones: one column. Wider screens: two columns. */}
        <div className="grid gap-6 md:grid-cols-5">
          <HoursToApprove />
          <Upcoming />
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <KitsAndStock />
          <PostAnnouncement />
        </div>
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

// Shared work: how many still need feedback, and the newest three.
async function WorkToReview() {
  const { submissions } = await getAllWork();
  const waiting = submissions.filter((s) => s.feedback.length === 0).length;

  return (
    <section aria-labelledby="work" className={`${card} flex flex-col gap-5`}>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="flex flex-col gap-2">
          <h2 id="work" className={eyebrow}>
            Work to review
          </h2>
          <p className="flex items-baseline gap-2">
            <span className={bigNumber}>{waiting}</span>
            <span className="text-ink">waiting for feedback</span>
          </p>
        </div>
        <Link href="/officer/work" className={link}>
          Review all work →
        </Link>
      </div>
      {submissions.length === 0 ? (
        <p className="text-ink">No work shared yet.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-3 sm:gap-5">
          {submissions.slice(0, 3).map((s) => (
            <li key={s.id}>
              <Link href={`/officer/work/${s.id}`} className={`group flex flex-col gap-2 rounded-xl ${focusRing}`}>
                <WorkPhoto
                  src={s.photoUrl}
                  alt={`Crochet work shared by ${s.volunteerName}`}
                  className="aspect-square w-full rounded-xl object-cover transition group-hover:opacity-90"
                />
                <span className="truncate font-bold group-hover:text-blue">{s.volunteerName}</span>
                <span className="hidden sm:block">
                  <FeedbackCountBadge count={s.feedback.length} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// 1. Volunteer hours waiting for approval.
async function HoursToApprove() {
  const entries = await getHoursToApprove();

  return (
    <section aria-labelledby="approve" className={`${card} flex flex-col gap-4 md:col-span-3`}>
      <h2 id="approve" className={eyebrow}>
        Hours to approve {entries.length > 0 && `(${entries.length})`}
      </h2>
      {entries.length === 0 ? (
        <p className="text-ink">All caught up. No hours are waiting.</p>
      ) : (
        <ul className={rows}>
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <p className="font-bold">
                  {entry.volunteerName} · {formatHours(entry.hours)} {entry.hours === 1 ? "hour" : "hours"}
                </p>
                <p className="text-sm text-muted">
                  {entry.activity} · <time dateTime={entry.loggedAt}>{formatDate(entry.loggedAt)}</time>
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" disabled className={smallButtonMain}>
                  Approve
                </button>
                <button type="button" disabled className={smallButton}>
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className={hint}>The buttons start working once hours are saved in the database.</p>
    </section>
  );
}

// 2. The next lessons and events.
async function Upcoming() {
  const items = await getUpcoming();

  return (
    <section aria-labelledby="upcoming" className={`${card} flex flex-col gap-4 md:col-span-2`}>
      <h2 id="upcoming" className={eyebrow}>
        Coming up
      </h2>
      {items.length === 0 ? (
        <p className="text-ink">Nothing planned yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <time
                dateTime={item.date}
                className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-tint py-1.5 leading-none text-blue"
              >
                <span className="text-[11px] font-bold tracking-wider uppercase">{formatMonth(item.date)}</span>
                <span className="font-serif text-2xl">{formatDayNumber(item.date)}</span>
              </time>
              <div className="flex flex-col">
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-muted">
                  {formatWeekday(item.date)} · {item.kind}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link href="/lessons" className={`${link} mt-auto self-start`}>
        See all lessons →
      </Link>
    </section>
  );
}

// 3. Kit requests waiting, and supplies running low.
async function KitsAndStock() {
  const { waiting, lowStock } = await getKitsAndStock();

  return (
    <section aria-labelledby="kits" className={`${card} flex flex-col gap-4`}>
      <h2 id="kits" className={eyebrow}>
        Kits and supplies
      </h2>
      <p className="flex items-baseline gap-2">
        <span className={bigNumber}>{waiting.length}</span>
        <span className="text-ink">kit {waiting.length === 1 ? "request" : "requests"} waiting</span>
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-bold">Running low</h3>
        {lowStock.length === 0 ? (
          <p className="text-ink">Every supply is stocked up.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {lowStock.map((item) => (
              <li key={item.id} className="rounded-full bg-pink-pale px-3 py-1 text-sm font-semibold">
                {item.name}: {item.quantity} left
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/kits" className={link}>
          Kit requests →
        </Link>
        <Link href="/kits/stock" className={link}>
          Stock →
        </Link>
      </div>
    </section>
  );
}

// 4. Post an announcement, with the latest posts under it.
async function PostAnnouncement() {
  const posts = await getLatestAnnouncements();

  return (
    <section aria-labelledby="post" className={`${card} flex flex-col gap-4`}>
      <h2 id="post" className={eyebrow}>
        Post an announcement
      </h2>
      <form className="flex flex-col gap-4">
        <label className={label}>
          Title
          <input name="title" maxLength={80} className={field} />
        </label>
        <label className={label}>
          Message
          <textarea name="body" rows={3} maxLength={500} className={field} />
        </label>
        <button type="submit" disabled className={`${smallButtonMain} self-start`}>
          Post
        </button>
        <p className={hint}>Posting starts working once news is saved in the database.</p>
      </form>
      {posts.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-rule pt-4">
          <h3 className="text-[15px] font-bold">Latest posts</h3>
          <ul className="flex flex-col gap-1">
            {posts.map((post) => (
              <li key={post.id} className="text-ink">
                {post.title} ·{" "}
                <time dateTime={post.postedAt} className="text-sm text-muted">
                  {formatDate(post.postedAt)}
                </time>
              </li>
            ))}
          </ul>
          <Link href="/news" className={`${link} self-start`}>
            See all news →
          </Link>
        </div>
      )}
    </section>
  );
}

// 6.5 → "6.5", 6 → "6".
function formatHours(hours: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(hours);
}

// Dates are read as UTC, which stops them showing a day early for people
// west of London.
function formatPart(date: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

// "2026-10-22" → "Oct 22, 2026".
function formatDate(date: string) {
  return formatPart(date, { month: "short", day: "numeric", year: "numeric" });
}

// "2026-10-24" → "Oct", "24" and "Saturday", for the little date boxes.
function formatMonth(date: string) {
  return formatPart(date, { month: "short" });
}
function formatDayNumber(date: string) {
  return formatPart(date, { day: "numeric" });
}
function formatWeekday(date: string) {
  return formatPart(date, { weekday: "long" });
}
