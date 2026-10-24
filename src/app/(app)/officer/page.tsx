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
// Uses the "Stitched Plushie" look, like the volunteer dashboard.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { OfficersOnly } from "@/components/officers-only";
import { SampleNote } from "@/components/sample-note";
import { WorkPhoto } from "@/components/work/work-photo";
import { getAllWork } from "@/lib/work/data";
import { card, link, pageTitle, tag } from "../lessons/_styles";
import { YarnBall } from "../lessons/_yarn-ball";
import { getHoursToApprove, getKitsAndStock, getLatestAnnouncements, getUpcoming } from "./_data";

export const metadata: Metadata = { title: "Officer dashboard" };

const sectionTitle = "font-display text-2xl font-extrabold";
// Small pill buttons for the lists. Disabled until real data is connected.
const smallButton =
  "inline-flex min-h-11 items-center justify-center rounded-full border-2 border-navy px-4 font-bold " +
  "disabled:cursor-not-allowed disabled:opacity-60";
const field = "min-h-[50px] w-full rounded-2xl border-2 border-navy bg-card px-4 py-3 text-base";

export default function OfficerPage() {
  return (
    <OfficersOnly>
      <div className="flex flex-col gap-8">
        <SampleNote />
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-start gap-2">
            <span className={tag}>Officer dashboard</span>
            <Suspense fallback={<h1 className={pageTitle}>Welcome</h1>}>
              <Welcome />
            </Suspense>
            <p className="text-lg text-ink">Here&apos;s what needs you this week.</p>
          </div>
          <YarnBall className="h-14 w-16 shrink-0 sm:h-20 sm:w-24" />
        </div>

        <WorkToReview />

        {/* Phones: one column. Wider screens: two columns. */}
        <div className="grid gap-8 md:grid-cols-5">
          <HoursToApprove />
          <Upcoming />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <KitsAndStock />
          <PostAnnouncement />
        </div>
      </div>
    </OfficersOnly>
  );
}

// "Welcome, [first name]", using the name saved at sign-up.
async function Welcome() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const firstName = data?.claims.user_metadata?.first_name;

  return <h1 className={pageTitle}>{firstName ? `Welcome, ${firstName}` : "Welcome"}</h1>;
}

// Shared work: how many still need feedback, and the newest three.
async function WorkToReview() {
  const { submissions } = await getAllWork();
  const waiting = submissions.filter((s) => s.feedback.length === 0).length;

  return (
    <section aria-labelledby="work" className={`${card} flex flex-col gap-4`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="work" className={sectionTitle}>
          Work to review
        </h2>
        <p className="text-lg text-ink">
          <span className="font-display text-3xl font-black text-navy">{waiting}</span> waiting for feedback
        </p>
      </div>
      {submissions.length === 0 ? (
        <p className="text-lg text-ink">No work shared yet.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-3 sm:gap-5">
          {submissions.slice(0, 3).map((s) => (
            <li key={s.id}>
              <Link
                href={`/officer/work/${s.id}`}
                className="flex flex-col gap-1 rounded-2xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <WorkPhoto
                  src={s.photoUrl}
                  alt={`Crochet work shared by ${s.volunteerName}`}
                  className="aspect-square w-full rounded-2xl border-2 border-navy object-cover"
                />
                <span className="truncate font-bold">{s.volunteerName}</span>
                <span className="text-sm text-muted">
                  {s.feedback.length === 0 ? "● Needs feedback" : "✓ Has feedback"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href="/officer/work" className={`${link} self-start`}>
        Review all work
      </Link>
    </section>
  );
}

// 1. Volunteer hours waiting for approval.
async function HoursToApprove() {
  const entries = await getHoursToApprove();

  return (
    <section aria-labelledby="approve" className={`${card} flex flex-col gap-4 md:col-span-3`}>
      <h2 id="approve" className={sectionTitle}>
        Hours to approve{" "}
        {entries.length > 0 && <span className="text-terracotta">({entries.length})</span>}
      </h2>
      {entries.length === 0 ? (
        <p className="text-lg text-ink">All caught up. No hours are waiting.</p>
      ) : (
        <ul className="flex flex-col divide-y-2 divide-dashed divide-line">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-0.5">
                <p className="text-lg font-bold">
                  {entry.volunteerName} · {formatHours(entry.hours)}{" "}
                  {entry.hours === 1 ? "hour" : "hours"}
                </p>
                <p className="text-ink">
                  {entry.activity} ·{" "}
                  <time dateTime={entry.loggedAt}>{formatDate(entry.loggedAt)}</time>
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" disabled className={`${smallButton} bg-gold`}>
                  Approve
                </button>
                <button type="button" disabled className={`${smallButton} bg-card`}>
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-sm text-muted">The buttons start working once hours are saved in the database.</p>
    </section>
  );
}

// 2. The next lessons and events.
async function Upcoming() {
  const items = await getUpcoming();

  return (
    <section aria-labelledby="upcoming" className={`${card} flex flex-col gap-4 md:col-span-2`}>
      <h2 id="upcoming" className={sectionTitle}>
        Coming up
      </h2>
      {items.length === 0 ? (
        <p className="text-lg text-ink">Nothing planned yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.id} className="flex items-start gap-3">
              <time
                dateTime={item.date}
                className="w-16 shrink-0 rounded-2xl border-2 border-navy bg-sand py-1 text-center text-sm leading-tight font-bold"
              >
                {formatDay(item.date)}
              </time>
              <div className="flex flex-col">
                <p className="font-bold">{item.title}</p>
                <p className="text-sm text-muted">{item.kind}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Link href="/lessons" className={`${link} mt-auto self-start`}>
        See all lessons
      </Link>
    </section>
  );
}

// 3. Kit requests waiting, and supplies running low.
async function KitsAndStock() {
  const { waiting, lowStock } = await getKitsAndStock();

  return (
    <section aria-labelledby="kits" className={`${card} flex flex-col gap-4`}>
      <h2 id="kits" className={sectionTitle}>
        Kits and supplies
      </h2>
      <p className="flex items-baseline gap-2">
        <span className="font-display text-5xl font-black">{waiting.length}</span>
        <span className="text-lg text-ink">
          kit {waiting.length === 1 ? "request" : "requests"} waiting
        </span>
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Running low</h3>
        {lowStock.length === 0 ? (
          <p className="text-ink">Every supply is stocked up.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {lowStock.map((item) => (
              <li
                key={item.id}
                className="rounded-full border-2 border-navy bg-pink-pale px-3 py-1 text-sm font-bold"
              >
                {item.name}: {item.quantity} left
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2">
        <Link href="/kits" className={link}>
          Kit requests
        </Link>
        <Link href="/kits/stock" className={link}>
          Stock
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
      <h2 id="post" className={sectionTitle}>
        Post an announcement
      </h2>
      <form className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5 font-bold">
          Title
          <input name="title" maxLength={80} className={field} />
        </label>
        <label className="flex flex-col gap-1.5 font-bold">
          Message
          <textarea name="body" rows={3} maxLength={500} className={field} />
        </label>
        <button type="submit" disabled className={`${smallButton} self-start bg-gold`}>
          Post
        </button>
        <p className="text-sm text-muted">Posting starts working once news is saved in the database.</p>
      </form>
      {posts.length > 0 && (
        <div className="flex flex-col gap-2 border-t-2 border-dashed border-line pt-4">
          <h3 className="font-bold">Latest posts</h3>
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
            See all news
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

// "2026-10-22" → "Oct 22, 2026". Reading it as UTC stops it showing a day
// early for people west of London.
function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

// "2026-10-24" → "Sat Oct 24", for the little date boxes.
function formatDay(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
