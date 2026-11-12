// Owner: Nika. One lesson, at "/lessons/<lesson id>".
//
// What this page will do (month 1 build plan):
// - Show the lesson video (unlisted YouTube, embedded), the steps, and "Mark complete".
// Done when: 10 real volunteers finish lesson 1 in the week 4 pilot.
//
// "Mark complete" saves through src/lib/portal/actions.ts. To add a video,
// paste its YouTube link into videoUrl in ../_placeholder.ts.
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Lesson as LessonType } from "@/lib/types";
import { lessons } from "../_placeholder";
import { completeLesson, undoLesson } from "@/lib/portal/actions";
import { getMyLessons } from "@/lib/portal/data";
import { ActionForm } from "@/components/action-form";
import { PortalPage } from "@/components/portal-page";
import { buttonMain, card, eyebrow, focusRing, link } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

// Tells Next.js which lesson pages exist, so it can build them ahead of time.
export function generateStaticParams() {
  return lessons.map((lesson) => ({ lessonId: lesson.id }));
}

type Params = PageProps<"/lessons/[lessonId]">["params"];

// The page shows instantly; the lesson fills in once its id is read.
export default function LessonPage({ params }: { params: Params }) {
  return (
    <Suspense
      fallback={<PortalPage eyebrow="Lesson" title="Loading lesson…" back={{ href: "/lessons", label: "All lessons" }} />}
    >
      <Lesson params={params} />
    </Suspense>
  );
}

async function Lesson({ params }: { params: Params }) {
  const { lessonId } = await params;
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();
  const video = embedUrl(lesson.videoUrl);

  return (
    <PortalPage
      eyebrow={`Lesson ${lesson.order} of ${lessons.length}`}
      title={lesson.title}
      lead={lesson.summary}
      back={{ href: "/lessons", label: "All lessons" }}
      width="narrow"
    >
      {video ? (
        <iframe
          src={video}
          title={`Video: ${lesson.title}`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className="aspect-video w-full rounded-2xl border border-rule bg-tint"
        />
      ) : (
        <div className="flex aspect-video items-center justify-center rounded-2xl border border-rule bg-tint font-semibold text-muted">
          Video coming soon
        </div>
      )}
      <div className={`${card} flex flex-col gap-3`}>
        <h2 className={eyebrow}>What you&apos;ll do</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-6 text-ink marker:font-bold marker:text-blue">
          {lesson.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      {/* Whether they finished it is looked up per visit, so it loads in a boundary. */}
      <Suspense fallback={<div className="min-h-12" />}>
        <Finish lesson={lesson} />
      </Suspense>
    </PortalPage>
  );
}

// "Mark complete", or once it's done, a link to the next lesson.
async function Finish({ lesson }: { lesson: LessonType }) {
  const { done, sample } = await getMyLessons();
  const next = lessons.find((l) => l.order === lesson.order + 1);

  if (!done.includes(lesson.id)) {
    return (
      <>
        {sample && <SampleNote />}
        <ActionForm action={completeLesson} className="flex flex-col items-start gap-3">
          <input type="hidden" name="lessonId" value={lesson.id} />
          <button type="submit" className={buttonMain}>
            Mark complete
          </button>
        </ActionForm>
      </>
    );
  }

  return (
    <div className={`${card} flex flex-col items-start gap-3`}>
      <p className="flex items-center gap-2 font-bold">
        <span aria-hidden="true" className="grid size-6 place-items-center rounded-full bg-blue text-sm text-card">
          ✓
        </span>
        You finished this lesson.
      </p>
      {lesson.order === 1 && (
        <p className="text-ink">
          Your starter kit is unlocked.{" "}
          <Link href="/kits" className={link}>
            My kit →
          </Link>
        </p>
      )}
      <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3">
        <Link href={next ? `/lessons/${next.id}` : "/dashboard"} className={buttonMain}>
          {next ? "Next lesson" : "Back to home"} <span aria-hidden="true">→</span>
        </Link>
        <ActionForm action={undoLesson}>
          <input type="hidden" name="lessonId" value={lesson.id} />
          <button type="submit" className={`rounded text-sm font-semibold text-muted underline-offset-4 hover:text-navy hover:underline ${focusRing}`}>
            Mark as not done
          </button>
        </ActionForm>
      </div>
    </div>
  );
}

// A YouTube link → the privacy-friendly embed address. Anything else → null.
function embedUrl(url: string) {
  const id = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)?.[1];
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
