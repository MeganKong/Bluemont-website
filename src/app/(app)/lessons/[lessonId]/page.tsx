// Owner: Nika. One lesson, at "/lessons/<lesson id>".
//
// What this page will do (month 1 build plan):
// - Show the lesson video (unlisted YouTube, embedded), the steps, and "Mark complete".
// Done when: 10 real volunteers finish lesson 1 in the week 4 pilot.
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { lessons } from "../_placeholder";
import { PortalPage } from "@/components/portal-page";
import { buttonMain, card, eyebrow } from "@/components/portal-styles";
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

  return (
    <PortalPage
      eyebrow={`Lesson ${lesson.order}`}
      title={lesson.title}
      lead={lesson.summary}
      back={{ href: "/lessons", label: "All lessons" }}
      width="narrow"
    >
      <SampleNote />
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-rule bg-tint font-semibold text-muted">
        Video coming soon
      </div>
      <div className={`${card} flex flex-col gap-3`}>
        <h2 className={eyebrow}>What you&apos;ll do</h2>
        <ol className="flex list-decimal flex-col gap-2 pl-6 text-ink marker:font-bold marker:text-blue">
          {lesson.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <button className={`${buttonMain} sm:self-start`}>Mark complete</button>
    </PortalPage>
  );
}
