// Owner: Nika. One lesson, at "/lessons/<lesson id>".
//
// What this page will do (month 1 build plan):
// - Show the lesson video (unlisted YouTube, embedded), the steps, and "Mark complete".
// Done when: 10 real volunteers finish lesson 1 in the week 4 pilot.
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { lessons } from "../_placeholder";
import { SampleNote } from "@/components/sample-note";

// Tells Next.js which lesson pages exist, so it can build them ahead of time.
export function generateStaticParams() {
  return lessons.map((lesson) => ({ lessonId: lesson.id }));
}

type Params = PageProps<"/lessons/[lessonId]">["params"];

// The page shows instantly; the lesson fills in once its id is read.
export default function LessonPage({ params }: { params: Params }) {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <SampleNote />
      <Link href="/lessons" className="text-sm text-muted">
        ← All lessons
      </Link>
      <Suspense fallback={<p className="text-muted">Loading lesson…</p>}>
        <Lesson params={params} />
      </Suspense>
    </div>
  );
}

async function Lesson({ params }: { params: Params }) {
  const { lessonId } = await params;
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();

  return (
    <>
      <h1 className="font-display text-4xl font-semibold">{lesson.title}</h1>
      <div className="flex aspect-video items-center justify-center rounded-2xl bg-sand text-muted">
        Video coming soon
      </div>
      <ol className="list-decimal pl-6 text-lg text-ink">
        {lesson.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <button className="self-start rounded-lg bg-terracotta px-5 py-3 font-semibold text-cream">
        Mark complete
      </button>
    </>
  );
}
