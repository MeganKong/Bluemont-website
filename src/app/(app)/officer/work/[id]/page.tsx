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
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getOneWork } from "@/lib/work/data";
import { formatDate, lessonTitle } from "@/lib/work/format";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card, eyebrow, sectionTitle } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { EditableFeedback } from "@/components/work/editable-feedback";
import { FeedbackCard } from "@/components/work/feedback-card";
import { FeedbackForm } from "@/components/work/feedback-form";
import { StatusPicker } from "@/components/work/status-picker";
import { WorkPhoto } from "@/components/work/work-photo";

export const metadata: Metadata = { title: "Shared work" };

type Params = PageProps<"/officer/work/[id]">["params"];

const back = { href: "/officer/work", label: "All work" };

// Next.js builds the page's empty frame ahead of time from one example
// address. The officer content itself is checked and loaded on every visit.
export function generateStaticParams() {
  return [{ id: "sample-1" }];
}

export default function OneWorkPage({ params }: { params: Params }) {
  return (
    <OfficersOnly>
      <Suspense fallback={<PortalPage eyebrow="Shared work" title="Loading…" back={back} />}>
        <OneWork params={params} />
      </Suspense>
    </OfficersOnly>
  );
}

async function OneWork({ params }: { params: Params }) {
  const { id } = await params;
  const { submission, sample, myId } = await getOneWork(id);
  if (!submission) notFound();
  const lesson = lessonTitle(submission.lessonId);

  return (
    <PortalPage
      eyebrow={lesson ? `Shared work · ${lesson}` : "Shared work"}
      title={`${submission.volunteerName}'s work`}
      lead={`Shared ${formatDate(submission.createdAt)}`}
      back={back}
    >
      {sample && <SampleNote />}

      {/* Phones: photo on top. Wider screens: photo left, details right. */}
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <WorkPhoto
          src={submission.photoUrl}
          alt={`Crochet work shared by ${submission.volunteerName}`}
          className="max-h-[75vh] w-full rounded-2xl border border-rule object-contain"
        />
        <div className="flex flex-col gap-6">
          <section aria-labelledby="note" className={`${card} flex flex-col gap-2`}>
            <h2 id="note" className={eyebrow}>
              Their note
            </h2>
            <p className="font-serif text-2xl leading-snug whitespace-pre-line">
              {submission.note ? `“${submission.note}”` : "They didn't add a note."}
            </p>
          </section>
          <div className={card}>
            <StatusPicker submissionId={submission.id} status={submission.status} />
          </div>
        </div>
      </div>

      <section aria-labelledby="feedback" className="flex flex-col gap-4">
        <h2 id="feedback" className={sectionTitle}>
          Feedback {submission.feedback.length > 0 && `(${submission.feedback.length})`}
        </h2>
        {submission.feedback.length === 0 ? (
          <p className="text-ink">No feedback yet. You&apos;ll be the first.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {submission.feedback.map((feedback) => {
              const footer = (
                <p className="flex flex-wrap gap-x-4 text-sm font-semibold text-muted">
                  <span>{feedback.seenAt ? "Seen" : "Not seen yet"}</span>
                  {feedback.thankedAt && <span>{submission.volunteerName} said thanks</span>}
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
          <h3 className={eyebrow}>Add feedback</h3>
          <FeedbackForm submissionId={submission.id} />
        </div>
      </section>
    </PortalPage>
  );
}
