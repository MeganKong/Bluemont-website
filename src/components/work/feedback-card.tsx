// Owner: Megan (shared; built by Adhya). One piece of feedback: tips on a
// pale gold card, comments on a pale mint card, with who wrote it and when.
// Officers and volunteers both see it; `footer` holds the buttons for each.
import type { Feedback } from "@/lib/types";
import { formatDate } from "@/lib/work/format";
import { KindBadge, NewBadge } from "./badges";

type FeedbackCardProps = {
  feedback: Feedback;
  // "Officer A", or "you" for an officer's own feedback.
  from: string;
  isNew?: boolean;
  footer?: React.ReactNode;
};

export function FeedbackCard({ feedback, from, isNew = false, footer }: FeedbackCardProps) {
  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border-2 border-navy p-4 ${
        feedback.kind === "tip" ? "bg-gold-pale" : "bg-mint-pale"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <KindBadge kind={feedback.kind} />
        {isNew && <NewBadge label="New" />}
      </div>
      <p className="text-lg whitespace-pre-line">{feedback.body}</p>
      <p className="text-sm text-muted">
        From <strong className="text-navy">{from}</strong> ·{" "}
        <time dateTime={feedback.createdAt}>{formatDate(feedback.createdAt)}</time>
        {feedback.editedAt && " · edited"}
      </p>
      {footer}
    </article>
  );
}
