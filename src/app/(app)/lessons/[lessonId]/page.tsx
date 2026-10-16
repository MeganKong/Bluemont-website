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
import { buttonMain, card, link, pageTitle, tag } from "../_styles";

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
      <Link href="/lessons" className={`${link} self-start text-sm`}>
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
      <div className="flex flex-col items-start gap-3">
        <span className={tag}>Lesson {lesson.order}</span>
        <h1 className={pageTitle}>{lesson.title}</h1>
      </div>
      <div className="flex aspect-video items-center justify-center rounded-3xl border-3 border-dashed border-navy bg-sand font-bold text-muted">
        Video coming soon
      </div>
      <div className={`${card} flex flex-col gap-3`}>
        <h2 className="font-display text-2xl font-extrabold">What you&apos;ll do</h2>
        <ol className="flex list-decimal flex-col gap-1 pl-6 text-lg text-ink marker:font-extrabold marker:text-terracotta">
          {lesson.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <button className={buttonMain}>Mark complete</button>
    </>
  );
}
