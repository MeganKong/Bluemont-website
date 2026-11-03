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
// Uses the portal look (src/components/portal-styles.ts).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { KitRequest } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";
import { getMyWork } from "@/lib/work/data";
import { PortalPage } from "@/components/portal-page";
import { bigNumber, buttonMain, card, eyebrow, link, sectionTitle, tag } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { NewBadge } from "@/components/work/badges";
import { lessons } from "../lessons/_placeholder";
import { getJourney, getMyKit, getNextDeadline, getNextLesson, getServiceHours } from "./_data";
import { Journey } from "./_journey";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <PortalPage
      eyebrow="Dashboard"
      title={
        // Looking up who's signed in happens per visit, so it loads in a boundary.
        <Suspense fallback="Welcome.">
          <Welcome />
        </Suspense>
      }
      lead="Here's what's next for you."
    >
      <SampleNote />

      {/* Phones and tablets: the journey as a short bar at the top. */}
      <div className={`${card} lg:hidden`}>
        <JourneyTracker variant="bar" />
      </div>

      {/* Laptops: main column (2/3) and side panel (1/3). Smaller: one column. */}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <NextLesson />
          <ServiceHoursCard />
          {/* Looking up their work happens per visit, so it loads in a boundary. */}
          <Suspense fallback={<div className={`${card} min-h-28`} />}>
            <MyWork />
          </Suspense>
        </div>

        <aside aria-label="Your progress" className="flex flex-col gap-6">
          <div className={`${card} hidden lg:block`}>
            <JourneyTracker variant="panel" />
          </div>
          <MyKit />
          <NextDeadline />
        </aside>
      </div>
    </PortalPage>
  );
}

async function JourneyTracker({ variant }: { variant: "panel" | "bar" }) {
  return <Journey steps={await getJourney()} variant={variant} />;
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

// 1. The next lesson, with the page's one main button.
async function NextLesson() {
  const lesson = await getNextLesson();

  return (
    <section aria-labelledby="next-lesson" className={`${card} flex flex-col items-start gap-3`}>
      <h2 id="next-lesson" className={eyebrow}>
        Your next lesson
      </h2>
      {lesson ? (
        <>
          <span className={tag}>
            Lesson {lesson.order} of {lessons.length}
          </span>
          <p className="font-serif text-4xl leading-none">{lesson.title}</p>
          <p className="max-w-2xl text-ink">{lesson.summary}</p>
          <Link href={`/lessons/${lesson.id}`} className={`${buttonMain} mt-2`}>
            Start lesson <span aria-hidden="true">→</span>
          </Link>
        </>
      ) : (
        <>
          <p className="font-serif text-4xl leading-none">You&apos;ve finished every lesson.</p>
          <p className="text-ink">Great work. You&apos;re ready to make plushies.</p>
          <Link href="/lessons" className={link}>
            Review your lessons →
          </Link>
        </>
      )}
    </section>
  );
}

// 2. Service hours so far, with a progress bar toward the goal.
async function ServiceHoursCard() {
  const { total, goal } = await getServiceHours();
  const percent = Math.min(100, (total / goal) * 100);
  const left = Math.max(0, goal - total);

  return (
    <section aria-labelledby="hours" className={`${card} flex flex-col gap-4`}>
      <h2 id="hours" className={eyebrow}>
        Service hours
      </h2>
      {total === 0 ? (
        <p className="text-ink">Your hours will show here after your first event.</p>
      ) : (
        <>
          <p className="flex items-baseline gap-2">
            <span className={bigNumber}>{formatHours(total)}</span>
            <span className="text-ink">
              of {goal} {goal === 1 ? "hour" : "hours"}
            </span>
          </p>
          <div
            role="progressbar"
            aria-label="Service hours toward your goal"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={total}
            aria-valuetext={`${formatHours(total)} of ${goal} hours`}
            className="h-2 w-full overflow-hidden rounded-full bg-tint"
          >
            <div className="h-full rounded-full bg-blue" style={{ width: `${percent}%` }} />
          </div>
          <p className="text-sm text-muted">
            {left > 0 ? `${formatHours(left)} more to reach your goal.` : "You reached your goal. Thank you!"}
          </p>
        </>
      )}
    </section>
  );
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
        <p className="text-ink">
          {shared === 0
            ? "Share a photo of your crochet to get tips from officers."
            : newCount > 0
              ? "An officer left you feedback."
              : `You've shared ${shared} ${shared === 1 ? "photo" : "photos"}.`}
        </p>
      </div>
      <Link
        href={shared === 0 ? "/dashboard/my-work/new" : "/dashboard/my-work"}
        className={`${link} shrink-0 self-start sm:self-auto`}
      >
        {shared === 0 ? "Share my work →" : "See my work →"}
      </Link>
    </section>
  );
}

// Side panel: kit status. Stacked, so it fits the narrow panel.
async function MyKit() {
  const kit = await getMyKit();

  return (
    <section aria-labelledby="kit" className={`${card} flex flex-col items-start gap-2`}>
      <h2 id="kit" className={eyebrow}>
        My kit
      </h2>
      <p className="text-lg font-bold">{kit ? kitNames[kit.kit] : "No kit yet"}</p>
      <p className="text-ink">{kit ? kitStatuses[kit.status] : "You haven't asked for a kit yet."}</p>
      <Link href="/kits" className={link}>
        {kit ? "View my kit →" : "Request a kit →"}
      </Link>
    </section>
  );
}

// Side panel: the next date they need to know about.
async function NextDeadline() {
  const deadline = await getNextDeadline();

  return (
    <section aria-labelledby="deadline" className={`${card} flex flex-col gap-2`}>
      <h2 id="deadline" className={eyebrow}>
        Next deadline
      </h2>
      {deadline ? (
        <p className="flex flex-col gap-1">
          <time dateTime={deadline.due} className="font-serif text-3xl leading-none">
            {formatDate(deadline.due)}
          </time>
          <span className="text-ink">{deadline.what}</span>
        </p>
      ) : (
        <p className="text-ink">Nothing due right now.</p>
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
