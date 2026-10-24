// Owner: Megan (built by Adhya). One shared piece of work, at
// "/officer/work/<id>".
//
// What this page will do:
// - Show the full photo and the volunteer's note.
// - Officers write feedback, marked as a Tip or a Comment, and can edit or
//   delete feedback they wrote.
// - Officers mark the work "Approved" or "Needs changes".
// Done when: an officer can leave feedback and the volunteer sees it.
//
// Officers only: <OfficersOnly> checks on the server, and the database's
// privacy rules stop volunteers reading or writing anyone's feedback here.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOneWork } from "@/lib/work/data";
import { formatDate, lessonTitle } from "@/lib/work/format";
import { OfficersOnly } from "@/components/officers-only";
import { SampleNote } from "@/components/sample-note";
import { EditableFeedback } from "@/components/work/editable-feedback";
import { FeedbackCard } from "@/components/work/feedback-card";
import { FeedbackForm } from "@/components/work/feedback-form";
import { StatusPicker } from "@/components/work/status-picker";
import { sectionTitle } from "@/components/work/styles";
import { WorkPhoto } from "@/components/work/work-photo";
import { card, link, pageTitle, tag } from "../../../lessons/_styles";

export const metadata: Metadata = { title: "Shared work" };

type Params = PageProps<"/officer/work/[id]">["params"];

// Next.js builds the page's empty frame ahead of time from one example
// address. The officer content itself is checked and loaded on every visit.
export function generateStaticParams() {
  return [{ id: "sample-1" }];
}

export default function OneWorkPage({ params }: { params: Params }) {
  return (
    <OfficersOnly>
      <div className="flex flex-col gap-8">
        <Link href="/officer/work" className={`${link} self-start text-sm`}>
          ← All work
        </Link>
        <OneWork params={params} />
      </div>
    </OfficersOnly>
  );
}

async function OneWork({ params }: { params: Params }) {
  const { id } = await params;
  const { submission, sample, myId } = await getOneWork(id);
  if (!submission) notFound();
  const lesson = lessonTitle(submission.lessonId);

  return (
    <>
      {sample && <SampleNote />}

      {/* Phones: photo on top. Wider screens: photo left, details right. */}
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        <WorkPhoto
          src={submission.photoUrl}
          alt={`Crochet work shared by ${submission.volunteerName}`}
          className="max-h-[75vh] w-full rounded-3xl border-3 border-navy object-contain shadow-[5px_5px_0_var(--color-navy)]"
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            {lesson && <span className={tag}>{lesson}</span>}
            <h1 className={pageTitle}>{submission.volunteerName}&apos;s work</h1>
            <p className="text-lg text-ink">
              Shared <time dateTime={submission.createdAt}>{formatDate(submission.createdAt)}</time>
            </p>
          </div>
          <section aria-labelledby="note" className={`${card} flex flex-col gap-2`}>
            <h2 id="note" className={sectionTitle}>
              Their note
            </h2>
            <p className="text-lg whitespace-pre-line text-ink">
              {submission.note ?? "They didn't add a note."}
            </p>
          </section>
          <StatusPicker submissionId={submission.id} status={submission.status} />
        </div>
      </div>

      <section aria-labelledby="feedback" className="flex flex-col gap-4">
        <h2 id="feedback" className={sectionTitle}>
          Feedback {submission.feedback.length > 0 && `(${submission.feedback.length})`}
        </h2>
        {submission.feedback.length === 0 ? (
          <p className="text-lg text-ink">No feedback yet. You&apos;ll be the first!</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {submission.feedback.map((feedback) => {
              const footer = (
                <p className="flex flex-wrap gap-x-4 text-sm font-semibold text-ink">
                  <span>{feedback.seenAt ? "👀 Seen" : "Not seen yet"}</span>
                  {feedback.thankedAt && <span>💛 {submission.volunteerName} said thanks</span>}
                </p>
              );
              return (
                <li key={feedback.id}>
                  {feedback.officerId === myId ? (
                    <EditableFeedback feedback={feedback}>
                      <FeedbackCard feedback={feedback} from="you" footer={footer} />
                    </EditableFeedback>
                  ) : (
                    <FeedbackCard feedback={feedback} from={feedback.officerName} footer={footer} />
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <div className={`${card} flex flex-col gap-4`}>
          <h3 className={sectionTitle}>Add feedback</h3>
          <FeedbackForm submissionId={submission.id} />
        </div>
      </section>
    </>
  );
}
