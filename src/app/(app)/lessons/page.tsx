// Owner: Nika. The list of lessons at "/lessons".
//
// What this page will do (month 1 build plan):
// - List the 3 starter lessons in order, showing which ones are done.
// Done when: volunteers see their lessons and their progress.
import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "./_placeholder";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Lessons" };

export default function LessonsPage() {
  return (
    <div className="flex flex-col gap-6">
      <SampleNote />
      <h1 className="font-display text-4xl font-semibold">Lessons</h1>
      <ol className="flex flex-col gap-3">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link
              href={`/lessons/${lesson.id}`}
              className="flex flex-col gap-1 rounded-2xl border border-line bg-card p-5 hover:border-terracotta"
            >
              <span className="text-sm font-semibold text-terracotta">Lesson {lesson.order}</span>
              <span className="text-xl font-semibold">{lesson.title}</span>
              <span className="text-ink">{lesson.summary}</span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
