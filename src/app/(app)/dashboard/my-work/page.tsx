// Owner: Megan (built by Adhya). A volunteer's shared work, at
// "/dashboard/my-work".
//
// What this page will do:
// - Show the photos this volunteer shared, newest first, and the tips and
//   comments officers left on each, with who left them and when.
// - "New" marks feedback they haven't seen yet. Opening the page marks it seen.
// - A "Thanks!" button on each piece of feedback.
// Done when: a volunteer sees officers' feedback on their own work.
//
// Private: the database only ever gives a volunteer their own work and its
// feedback, even if someone changes the web address.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { Submission } from "@/lib/types";
import { getMyWork } from "@/lib/work/data";
import { formatDate, lessonTitle } from "@/lib/work/format";
import { SampleNote } from "@/components/sample-note";
import { NewBadge, StatusBadge } from "@/components/work/badges";
import { FeedbackCard } from "@/components/work/feedback-card";
import { MarkSeen } from "@/components/work/mark-seen";
import { Message } from "@/components/work/message";
import { sectionTitle } from "@/components/work/styles";
import { ThanksButton } from "@/components/work/thanks-button";
import { WorkPhoto } from "@/components/work/work-photo";
import { buttonMain, card, pageTitle, tag } from "../../lessons/_styles";
import { YarnBall } from "../../lessons/_yarn-ball";

export const metadata: Metadata = { title: "My work" };

type SearchParams = PageProps<"/dashboard/my-work">["searchParams"];

export default function MyWorkPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className={pageTitle}>My work</h1>
          <p className="text-lg text-ink">Photos you&apos;ve shared, and tips and comments from officers.</p>
        </div>
        <YarnBall className="h-14 w-16 shrink-0 sm:h-20 sm:w-24" />
      </div>
      {/* text-cream! because buttonMain's text color currently comes out navy. */}
      <Link href="/dashboard/my-work/new" className={`${buttonMain} text-cream! sm:self-start`}>
        <span aria-hidden="true">📷</span>&nbsp;Share my work
      </Link>
      {/* Looking up their work happens per visit, so it loads in a boundary. */}
      <Suspense fallback={<p className="text-lg text-ink">Loading your work…</p>}>
        <JustShared searchParams={searchParams} />
        <MyWork />
      </Suspense>
    </div>
  );
}

// After sharing, the form comes back here with "?shared=1".
async function JustShared({ searchParams }: { searchParams: SearchParams }) {
  const { shared } = await searchParams;
  if (shared !== "1") return null;
  return <Message kind="success">Thanks for sharing! An officer will take a look soon.</Message>;
}

async function MyWork() {
  const { submissions, sample } = await getMyWork();
  const hasNew = submissions.some((s) => s.feedback.some((f) => !f.seenAt));

  return (
    <>
      {sample && <SampleNote />}
      {!sample && hasNew && <MarkSeen />}
      {submissions.length === 0 ? (
        <div className={`${card} flex flex-col items-center gap-3 text-center`}>
          <p className="font-display text-2xl font-extrabold">You haven&apos;t shared any work yet</p>
          <p className="text-lg text-ink">
            Share a photo of your crochet, and officers will send you tips and comments.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-8">
          {submissions.map((submission) => (
            <li key={submission.id}>
              <MySubmission submission={submission} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function MySubmission({ submission }: { submission: Submission }) {
  const lesson = lessonTitle(submission.lessonId);
  const newCount = submission.feedback.filter((f) => !f.seenAt).length;

  return (
    // Phones: photo on top. Wider screens: photo left, feedback right.
    <article className={`${card} grid gap-6 md:grid-cols-5`}>
      <WorkPhoto
        src={submission.photoUrl}
        alt="Your crochet work"
        className="aspect-square w-full rounded-2xl border-2 border-navy object-cover md:col-span-2"
      />
      <div className="flex flex-col gap-4 md:col-span-3">
        <div className="flex flex-wrap items-center gap-2">
          {lesson && <span className={tag}>{lesson}</span>}
          <StatusBadge status={submission.status} />
          {newCount > 0 && <NewBadge label={newCount === 1 ? "New feedback" : `${newCount} new`} />}
        </div>
        <p className="text-ink">
          Shared <time dateTime={submission.createdAt}>{formatDate(submission.createdAt)}</time>
        </p>
        {submission.note && <p className="text-lg whitespace-pre-line">“{submission.note}”</p>}

        <h2 className={sectionTitle}>Feedback</h2>
        {submission.feedback.length === 0 ? (
          <p className="text-lg text-ink">No feedback yet. An officer will take a look soon.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {submission.feedback.map((feedback) => (
              <li key={feedback.id}>
                <FeedbackCard
                  feedback={feedback}
                  from={feedback.officerName}
                  isNew={!feedback.seenAt}
                  footer={<ThanksButton feedbackId={feedback.id} thanked={Boolean(feedback.thankedAt)} />}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
