// Owner: Nika. The list of lessons at "/lessons".
//
// What this page will do (month 1 build plan):
// - List the 3 starter lessons in order, showing which ones are done.
// Done when: volunteers see their lessons and their progress.
import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "./_placeholder";
import { PortalPage } from "@/components/portal-page";
import { cardLink, eyebrow } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Lessons" };

export default function LessonsPage() {
  return (
    <PortalPage
      eyebrow="Lessons"
      title="Learn to crochet, one step at a time."
      lead="Short video lessons that take you from your first loop to your first plushie."
    >
      <SampleNote />
      <ol className="grid gap-6 md:grid-cols-3">
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link href={`/lessons/${lesson.id}`} className={`${cardLink} flex h-full flex-col items-start gap-3`}>
              <span className={eyebrow}>Lesson {lesson.order}</span>
              <span className="font-serif text-3xl leading-tight">{lesson.title}</span>
              <span className="text-ink">{lesson.summary}</span>
              <span className="mt-auto pt-2 font-bold text-blue">
                Open lesson <span aria-hidden="true">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </PortalPage>
  );
}
