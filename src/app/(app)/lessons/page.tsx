// Owner: Nika. The list of lessons at "/lessons".
//
// What this page will do (month 1 build plan):
// - List the 3 starter lessons in order, showing which ones are done.
// Done when: volunteers see their lessons and their progress.
//
// Which lessons are done comes from src/lib/portal/data.ts (sample data
// until the database step is done).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { lessons } from "./_placeholder";
import { getMyLessons } from "@/lib/portal/data";
import { PortalPage } from "@/components/portal-page";
import { card, rows } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Lessons" };

const inOrder = [...lessons].sort((a, b) => a.order - b.order);

export default function LessonsPage() {
  return (
    <PortalPage
      eyebrow="Lessons"
      title="Learn to crochet."
      lead="Short video lessons, from your first loop to your first plushie."
      width="narrow"
    >
      {/* Their progress is looked up per visit, so it loads in a boundary. */}
      <Suspense fallback={<div className={`${card} min-h-64`} />}>
        <LessonList />
      </Suspense>
    </PortalPage>
  );
}

async function LessonList() {
  const { done, sample } = await getMyLessons();
  const finished = inOrder.filter((lesson) => done.includes(lesson.id)).length;
  const nextId = inOrder.find((lesson) => !done.includes(lesson.id))?.id;

  return (
    <>
      {sample && <SampleNote />}
      <div className="flex flex-col gap-2">
        <p className="font-bold">
          {finished} of {inOrder.length} done
        </p>
        <div
          role="progressbar"
          aria-label="Lessons done"
          aria-valuemin={0}
          aria-valuemax={inOrder.length}
          aria-valuenow={finished}
          className="h-2 w-full overflow-hidden rounded-full bg-tint"
        >
          <div className="h-full rounded-full bg-blue" style={{ width: `${(finished / inOrder.length) * 100}%` }} />
        </div>
      </div>

      <ol className={`${card} overflow-hidden p-0! ${rows}`}>
        {inOrder.map((lesson) => {
          const isDone = done.includes(lesson.id);
          const isNext = lesson.id === nextId;
          return (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className="flex items-center gap-4 px-6 py-5 transition hover:bg-cream focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue sm:px-7"
              >
                <Mark done={isDone} order={lesson.order} />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-serif text-2xl leading-tight">{lesson.title}</span>
                  <span className="text-[15px] text-ink">{lesson.summary}</span>
                </span>
                <span className={`hidden shrink-0 text-sm font-bold sm:block ${isNext ? "text-blue" : "text-muted"}`}>
                  {isDone ? "Done" : isNext ? "Start →" : "Open →"}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
}

// A blue check for a finished lesson, otherwise its number.
function Mark({ done, order }: { done: boolean; order: number }) {
  return done ? (
    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-blue text-card">
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">Done:</span>
    </span>
  ) : (
    <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-line font-bold text-navy">
      {order}
    </span>
  );
}
