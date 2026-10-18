// Owner: Megan (built by Adhya). The volunteer dashboard at "/dashboard".
//
// What this page will do:
// - Show the signed-in volunteer, in this order: their next lesson, their
//   service hours so far, recent announcements, and their kit status.
// Done when: it shows those for the real person.
//
// All the data comes from ./_data.ts, which is fake for now. Signed-out
// visitors are sent to sign in by src/lib/supabase/proxy.ts.
// Uses the "Stitched Plushie" look from the lesson pages (../lessons/_styles.ts).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { KitRequest } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { SampleNote } from "@/components/sample-note";
import { buttonMain, card, link, pageTitle, tag } from "../lessons/_styles";
import { YarnBall } from "../lessons/_yarn-ball";
import { lessons } from "../lessons/_placeholder";
import { getAnnouncements, getMyKit, getNextLesson, getServiceHours } from "./_data";

export const metadata: Metadata = { title: "Dashboard" };

const sectionTitle = "font-display text-2xl font-extrabold";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <SampleNote />
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          {/* Looking up who's signed in happens per visit, so it loads in a boundary. */}
          <Suspense fallback={<h1 className={pageTitle}>Welcome</h1>}>
            <Welcome />
          </Suspense>
          <p className="text-lg text-ink">Here&apos;s what&apos;s next for you.</p>
        </div>
        <YarnBall className="h-14 w-16 shrink-0 sm:h-20 sm:w-24" />
      </div>

      <NextLesson />

      {/* Phones: one column. Wider screens: hours on the left, news on the right. */}
      <div className="grid gap-8 md:grid-cols-5">
        <ServiceHoursCard />
        <Announcements />
      </div>

      <MyKit />
    </div>
  );
}

// "Welcome, [first name]", using the name saved at sign-up.
async function Welcome() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const firstName = data?.claims.user_metadata?.first_name;

  return <h1 className={pageTitle}>{firstName ? `Welcome, ${firstName}` : "Welcome"}</h1>;
}

// 1. The next lesson, with the page's one main button.
async function NextLesson() {
  const lesson = await getNextLesson();

  return (
    <section aria-labelledby="next-lesson" className={`${card} flex flex-col items-start gap-4`}>
      <h2 id="next-lesson" className="text-sm font-bold tracking-wide text-terracotta uppercase">
        Your next lesson
      </h2>
      {lesson ? (
        <>
          <span className={tag}>
            Lesson {lesson.order} of {lessons.length}
          </span>
          <p className="font-display text-3xl font-extrabold sm:text-4xl">{lesson.title}</p>
          <p className="max-w-2xl text-lg text-ink">{lesson.summary}</p>
          {/* text-cream! because buttonMain's text color currently comes out navy,
              which is hard to read on terracotta. Remove once _styles.ts is fixed. */}
          <Link href={`/lessons/${lesson.id}`} className={`${buttonMain} mt-2 text-cream!`}>
            Start lesson <span aria-hidden="true">&nbsp;→</span>
          </Link>
        </>
      ) : (
        <>
          <p className="font-display text-3xl font-extrabold sm:text-4xl">
            You&apos;ve finished every lesson!
          </p>
          <p className="text-lg text-ink">Amazing work. You&apos;re ready to make plushies.</p>
          <Link href="/lessons" className={link}>
            Review your lessons
          </Link>
        </>
      )}
    </section>
  );
}

// 2. Service hours so far, with a yarn-strand progress bar toward the goal.
async function ServiceHoursCard() {
  const { total, goal } = await getServiceHours();
  const percent = Math.min(100, (total / goal) * 100);
  const left = Math.max(0, goal - total);

  return (
    <section aria-labelledby="hours" className={`${card} flex flex-col gap-4 md:col-span-2`}>
      <h2 id="hours" className={sectionTitle}>
        Service hours
      </h2>
      {total === 0 ? (
        <p className="text-lg text-ink">Your hours will show here after your first event.</p>
      ) : (
        <>
          <p className="flex items-baseline gap-2">
            <span className="font-display text-5xl font-black">{formatHours(total)}</span>
            <span className="text-lg text-ink">{total === 1 ? "hour" : "hours"} so far</span>
          </p>
          <div
            role="progressbar"
            aria-label="Service hours toward your goal"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={total}
            aria-valuetext={`${formatHours(total)} of ${goal} hours`}
            className="h-7 w-full overflow-hidden rounded-full border-3 border-navy bg-sand"
          >
            {/* The diagonal stripes make the bar look like twisted yarn. */}
            <div
              className="h-full rounded-full bg-terracotta"
              style={{
                width: `${percent}%`,
                backgroundImage:
                  "repeating-linear-gradient(-45deg, transparent 0 7px, color-mix(in srgb, var(--color-cream) 28%, transparent) 7px 13px)",
              }}
            />
          </div>
          <p className="font-bold">
            {formatHours(total)} of {goal} hours
            <span className="block font-normal text-ink">
              {left > 0
                ? `${formatHours(left)} more to reach your goal.`
                : "You reached your goal. Thank you!"}
            </span>
          </p>
        </>
      )}
    </section>
  );
}

// 3. The newest announcements.
async function Announcements() {
  const posts = await getAnnouncements(3);

  return (
    <section aria-labelledby="news" className={`${card} flex flex-col gap-4 md:col-span-3`}>
      <h2 id="news" className={sectionTitle}>
        Recent announcements
      </h2>
      {posts.length === 0 ? (
        <p className="text-lg text-ink">No announcements yet. Check back soon.</p>
      ) : (
        <ul className="flex flex-col divide-y-2 divide-dashed divide-line">
          {posts.map((post) => (
            <li key={post.id} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
              <p className="text-lg font-bold">{post.title}</p>
              <time dateTime={post.postedAt} className="text-sm text-muted">
                {formatDate(post.postedAt)}
              </time>
              <p className="line-clamp-2 text-ink">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
      <Link href="/news" className={`${link} mt-auto self-start`}>
        See all news
      </Link>
    </section>
  );
}

// 4. A small kit status line.
async function MyKit() {
  const kit = await getMyKit();

  return (
    <section
      aria-labelledby="kit"
      className={`${card} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}
    >
      <div className="flex flex-col gap-1">
        <h2 id="kit" className={sectionTitle}>
          My kit
        </h2>
        <p className="text-lg text-ink">
          {kit ? `${kitNames[kit.kit]} · ${kitStatuses[kit.status]}` : "You haven't asked for a kit yet."}
        </p>
      </div>
      <Link href="/kits" className={`${link} self-start sm:self-auto`}>
        {kit ? "View my kit" : "Request a kit"}
      </Link>
    </section>
  );
}

const kitNames: Record<KitRequest["kit"], string> = {
  starter: "Starter kit",
  full: "Full kit",
};

const kitStatuses: Record<KitRequest["status"], string> = {
  pending: "Waiting for approval",
  approved: "Approved, ready to pick up",
  picked_up: "Picked up",
};

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
