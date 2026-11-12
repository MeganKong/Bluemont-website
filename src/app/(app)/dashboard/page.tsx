// Owner: Megan (built by Adhya). The volunteer home page at "/dashboard".
//
// What this page will do:
// - Show the signed-in volunteer one thing to do next, worked out from their
//   journey (Learn → Kit → Make → Send), with one main button.
// - Under it, three small tiles (lessons, hours, my work) and the latest
//   updates from officers. Nothing else, so it's quick to read.
// Done when: it shows those for the real person.
//
// Data comes from ./_data.ts and src/lib/portal/data.ts (sample data until
// the database step is done). Signed-out visitors are sent to sign in, and
// officers to their own dashboard, by src/lib/supabase/proxy.ts.
// Uses the portal look (src/components/portal-styles.ts).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { NewsPost } from "@/lib/types";
import { requestKit } from "@/lib/portal/actions";
import { getComingUp, getMyHours, getNews } from "@/lib/portal/data";
import { formatEventDay, hoursLabel } from "@/lib/portal/format";
import { formatDate } from "@/lib/work/format";
import { createClient } from "@/lib/supabase/server";
import { ActionForm } from "@/components/action-form";
import { DateBox } from "@/components/date-box";
import { PortalPage } from "@/components/portal-page";
import { buttonMain, buttonSecondary, card, cardLink, eyebrow, link, rows, tag } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { lessons } from "../lessons/_placeholder";
import { getProgress, type Progress } from "./_data";
import { Journey } from "./_journey";

export const metadata: Metadata = { title: "Home" };

export default function HomePage() {
  return (
    <PortalPage
      eyebrow="Home"
      title={
        // Looking up who's signed in happens per visit, so it loads in a boundary.
        <Suspense fallback="Hi there.">
          <Hello />
        </Suspense>
      }
    >
      <Suspense fallback={<div className={`${card} min-h-72`} />}>
        <Home />
      </Suspense>
    </PortalPage>
  );
}

// "Hi, [first name].", using the name saved at sign-up.
async function Hello() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const firstName = data?.claims.user_metadata?.first_name;

  return firstName ? (
    <>
      Hi, <em>{firstName}.</em>
    </>
  ) : (
    "Hi there."
  );
}

async function Home() {
  const [progress, hours, comingUp, news] = await Promise.all([
    getProgress(),
    getMyHours(),
    getComingUp(1),
    getNews(3),
  ]);
  const approved = hours.entries.filter((e) => e.status === "approved").reduce((sum, e) => sum + e.hours, 0);
  const waiting = hours.entries.filter((e) => e.status === "pending").length;
  const newFeedback = progress.work.reduce((sum, s) => sum + s.feedback.filter((f) => !f.seenAt).length, 0);
  const shared = progress.work.length;

  return (
    <>
      {(progress.sample || hours.sample || news.sample) && <SampleNote />}

      <NextStep progress={progress} event={comingUp.events[0] ?? null} />

      <ul className="grid gap-4 sm:grid-cols-3">
        <Tile
          href="/lessons"
          label="Lessons"
          value={`${progress.lessonsDone} of ${lessons.length}`}
          note={progress.lessonsDone === lessons.length ? "All done" : "lessons done"}
        />
        <Tile
          href="/hours"
          label="Hours"
          value={hoursLabel(approved)}
          note={waiting > 0 ? `${waiting} waiting for approval` : "approved so far"}
        />
        <Tile
          href="/dashboard/my-work"
          label="My work"
          value={newFeedback > 0 ? `${newFeedback} new` : shared > 0 ? `${shared} shared` : "Nothing yet"}
          note={newFeedback > 0 ? "feedback from officers" : shared > 0 ? "photos shared" : "Share a photo for tips"}
        />
      </ul>

      <Updates posts={news.posts} />
    </>
  );
}

// The one thing to do next, with the journey above it.
function NextStep({ progress, event }: { progress: Progress; event: NewsPost | null }) {
  const step = nextStep(progress, event);

  return (
    <section aria-labelledby="next-step" className={`${card} flex flex-col gap-6`}>
      <Journey steps={progress.steps} />
      <div className="flex flex-col items-start gap-3 border-t border-rule pt-6">
        <h2 id="next-step" className={eyebrow}>
          Your next step
        </h2>
        {step.tag && <span className={tag}>{step.tag}</span>}
        <p className="font-serif text-4xl leading-none text-balance">{step.title}</p>
        <p className="max-w-2xl text-ink">{step.text}</p>
        <div className="mt-2 w-full sm:w-auto">{step.action}</div>
        {step.extra}
      </div>
    </section>
  );
}

type Step = { tag?: string; title: string; text: string; action: React.ReactNode; extra?: React.ReactNode };

function nextStep({ current, nextLesson, kit, kitUnlocked, work }: Progress, event: NewsPost | null): Step {
  const when = event ? `${event.title}, ${formatEventDay(event.eventDate!)}` : null;

  if (current === "learn" && nextLesson) {
    return {
      tag: `Lesson ${nextLesson.order} of ${lessons.length}`,
      title: nextLesson.title,
      text: nextLesson.summary,
      action: (
        <Link href={`/lessons/${nextLesson.id}`} className={buttonMain}>
          Start lesson <span aria-hidden="true">→</span>
        </Link>
      ),
      // Lesson 1 unlocks the kit, so they can ask for it while they keep learning.
      extra: kitUnlocked && !kit && (
        <p className="text-[15px] text-ink">
          Your starter kit is unlocked.{" "}
          <Link href="/kits" className={link}>
            Request it →
          </Link>
        </p>
      ),
    };
  }

  if (current === "kit") {
    if (!kit) {
      return {
        title: "Get your starter kit",
        text: "Yarn, a hook, stuffing and safety eyes: everything for your first plushie. It's free.",
        action: (
          <ActionForm action={requestKit}>
            <button type="submit" className={buttonMain}>
              Request my kit
            </button>
          </ActionForm>
        ),
      };
    }
    if (kit.status === "pending") {
      return {
        title: "Your kit request is in",
        text: `You asked on ${formatDate(kit.requestedAt)}. An officer will approve it soon, then you can pick it up.`,
        action: (
          <Link href="/kits" className={buttonSecondary}>
            View my kit
          </Link>
        ),
      };
    }
    return {
      title: "Your kit is ready to pick up",
      text: when ? `Pick it up at ${when}.` : "Officers will post the pickup time under Updates.",
      action: (
        <Link href="/kits" className={buttonMain}>
          View my kit
        </Link>
      ),
    };
  }

  if (current === "make") {
    const needsChanges = work.some((s) => s.status === "needs_changes");
    return needsChanges
      ? {
          title: "An officer left you feedback",
          text: "Take a look at their tips, then share a new photo when you're ready.",
          action: (
            <Link href="/dashboard/my-work" className={buttonMain}>
              See feedback
            </Link>
          ),
        }
      : {
          title: "Make your plushie",
          text: "Use your kit to make a plushie, then share a photo. An officer checks it before it goes to a shelter.",
          action: (
            <Link href="/dashboard/my-work/new" className={buttonMain}>
              Share my work
            </Link>
          ),
        };
  }

  return {
    title: "Bring your plushie in",
    text: when
      ? `Bring it to ${when}, and we'll deliver it to a child in a shelter.`
      : "Bring it to the next event, and we'll deliver it to a child in a shelter. The date will be under Updates.",
    action: (
      <Link href="/news" className={buttonMain}>
        See updates
      </Link>
    ),
  };
}

function Tile({ href, label, value, note }: { href: string; label: string; value: string; note: string }) {
  return (
    <li>
      <Link href={href} className={`${cardLink} flex h-full flex-col gap-1 p-5!`}>
        <span className={eyebrow}>{label}</span>
        <span className="font-serif text-3xl leading-tight">{value}</span>
        <span className="text-sm text-muted">{note}</span>
      </Link>
    </li>
  );
}

// The latest posts from officers. Events show their date.
function Updates({ posts }: { posts: NewsPost[] }) {
  return (
    <section aria-labelledby="updates" className={`${card} flex flex-col gap-4`}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="updates" className={eyebrow}>
          Updates
        </h2>
        <Link href="/news" className={link}>
          All updates →
        </Link>
      </div>
      {posts.length === 0 ? (
        <p className="text-ink">No updates yet.</p>
      ) : (
        <ul className={rows}>
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              {post.eventDate && <DateBox date={post.eventDate} />}
              <div className="flex min-w-0 flex-col gap-0.5">
                <p className="font-bold">{post.title}</p>
                <p className="line-clamp-1 text-[15px] text-ink">{post.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
