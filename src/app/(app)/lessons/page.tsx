// Owner: Nika. The list of lessons at "/lessons".
//
// What this page will do (month 1 build plan):
// - List the 3 starter lessons in order, showing which ones are done.
// Done when: volunteers see their lessons and their progress.
import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "./_placeholder";
import { SampleNote } from "@/components/sample-note";
import { card, pageTitle, tag } from "./_styles";
import { YarnBall } from "./_yarn-ball";

export const metadata: Metadata = { title: "Lessons" };

export default function LessonsPage() {
  return (
    <div className="flex flex-col gap-8">
      <SampleNote />
      <div className="flex items-center gap-4">
        <h1 className={pageTitle}>Lessons</h1>
        <YarnBall className="h-14 w-16 shrink-0" />
      </div>
      <ol className="flex flex-col gap-6">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            {/* The card tilts a little on hover, like picking up a plushie. */}
            <Link
              href={`/lessons/${lesson.id}`}
              className={`${card} flex flex-col items-start gap-2 transition hover:-rotate-1 focus-visible:outline-solid focus-visible:outline-gold`}
            >
              <span className={tag}>Lesson {lesson.order}</span>
              <span className="font-display text-2xl font-extrabold">{lesson.title}</span>
              <span className="text-ink">{lesson.summary}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
