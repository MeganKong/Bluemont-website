// Owner: Megan (built by Adhya). The volunteer dashboard at "/dashboard".
//
// What this page will do:
// - Show the signed-in volunteer, in this order: their next lesson, their
//   service hours so far, and their shared work (with a "New feedback"
//   badge). Beside them, a side panel with their journey (Learn → Kit →
//   Make → Send), their kit status and their next deadline.
// - News is only on the News page.
// Done when: it shows those for the real person.
//
// Layout (approved by Megan, October 2026): on laptops, the main column on
// the left and the side panel on the right. On phones and tablets, a short
// journey bar at the top, then everything in one column, panel last.
//
// Most data comes from ./_data.ts, which is fake for now. "My work" comes
// from src/lib/work/data.ts (real once the database is set up). Signed-out
// visitors are sent to sign in by src/lib/supabase/proxy.ts.
// Uses the "Stitched Plushie" look from the lesson pages (../lessons/_styles.ts).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { KitRequest } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { getMyWork } from "@/lib/work/data";
import { SampleNote } from "@/components/sample-note";
import { NewBadge } from "@/components/work/badges";
import { buttonMain, card, link, pageTitle, tag } from "../lessons/_styles";
import { YarnBall } from "../lessons/_yarn-ball";
import { lessons } from "../lessons/_placeholder";
import { getJourney, getMyKit, getNextDeadline, getNextLesson, getServiceHours } from "./_data";
import { Journey } from "./_journey";

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

      {/* Phones and tablets: the journey as a short bar at the top. */}
      <div className={`${card} lg:hidden`}>
        <JourneyTracker variant="bar" />
      </div>

      {/* Laptops: main column (2/3) and side panel (1/3). Smaller: one column. */}
      <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col gap-8 lg:col-span-2">
          <NextLesson />
          <ServiceHoursCard />
          {/* Looking up their work happens per visit, so it loads in a boundary. */}
          <Suspense fallback={<div className={`${card} min-h-28`} />}>
            <MyWork />
          </Suspense>
        </div>

        <aside aria-label="Your progress" className="flex flex-col gap-8">
          <div className={`${card} hidden lg:block`}>
            <JourneyTracker variant="panel" />
          </div>
          <MyKit />
          <NextDeadline />
        </aside>
      </div>
    </div>
  );
}

async function JourneyTracker({ variant }: { variant: "panel" | "bar" }) {
  return <Journey steps={await getJourney()} variant={variant} />;
}

// 3. Their shared work, with a "New feedback" badge when an officer has left
// something they haven't seen yet.
async function MyWork() {
  const { submissions } = await getMyWork();
  const newCount = submissions.reduce((sum, s) => sum + s.feedback.filter((f) => !f.seenAt).length, 0);
  const shared = submissions.length;

  return (
    <section
      aria-labelledby="my-work"
      className={`${card} flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="my-work" className={sectionTitle}>
            My work
          </h2>
          {newCount > 0 && <NewBadge label={newCount === 1 ? "New feedback" : `${newCount} new feedback`} />}
        </div>
        <p className="text-lg text-ink">
          {shared === 0
            ? "Share a photo of your crochet to get tips from officers."
            : newCount > 0
              ? "An officer left you feedback. Take a look!"
              : `You've shared ${shared} ${shared === 1 ? "photo" : "photos"}.`}
        </p>
      </div>
      <Link
        href={shared === 0 ? "/dashboard/my-work/new" : "/dashboard/my-work"}
        className={`${link} self-start sm:self-auto`}
      >
        {shared === 0 ? "Share my work" : "See my work"}
      </Link>
    </section>
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
    <section aria-labelledby="hours" className={`${card} flex flex-col gap-4`}>
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

// Side panel: kit status. Stacked, so it fits the narrow panel.
async function MyKit() {
  const kit = await getMyKit();

  return (
    <section aria-labelledby="kit" className={`${card} flex flex-col items-start gap-2`}>
      <h2 id="kit" className={sectionTitle}>
        My kit
      </h2>
      <p className="text-lg text-ink">
        {kit ? `${kitNames[kit.kit]} · ${kitStatuses[kit.status]}` : "You haven't asked for a kit yet."}
      </p>
      <Link href="/kits" className={link}>
        {kit ? "View my kit" : "Request a kit"}
      </Link>
    </section>
  );
}

// Side panel: the next date they need to know about.
async function NextDeadline() {
  const deadline = await getNextDeadline();

  return (
    <section aria-labelledby="deadline" className={`${card} flex flex-col gap-2`}>
      <h2 id="deadline" className={sectionTitle}>
        Next deadline
      </h2>
      {deadline ? (
        <p className="flex flex-col">
          <span className="text-lg text-ink">{deadline.what}</span>
          <time dateTime={deadline.due} className="font-display text-3xl font-extrabold">
            {formatDate(deadline.due)}
          </time>
        </p>
      ) : (
        <p className="text-lg text-ink">Nothing due right now.</p>
      )}
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
