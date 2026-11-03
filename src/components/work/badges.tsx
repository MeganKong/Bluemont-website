// Owner: Megan (shared; built by Adhya). Little labels for shared work.
// Each one says what it means in words, so the meaning never depends on
// color alone.
import type { Feedback, Submission } from "@/lib/types";

const badge = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[13px] font-bold";

// Tip (something to try) or Comment (praise or notes).
export function KindBadge({ kind }: { kind: Feedback["kind"] }) {
  return kind === "tip" ? (
    <span className={`${badge} bg-gold-pale text-navy`}>Tip</span>
  ) : (
    <span className={`${badge} bg-tint text-blue`}>Comment</span>
  );
}

// Approved or Needs changes, set by an officer. Nothing if not set.
export function StatusBadge({ status }: { status: Submission["status"] }) {
  if (!status) return null;
  return status === "approved" ? (
    <span className={`${badge} bg-mint-pale text-navy`}>
      <span aria-hidden="true">✓</span> Approved
    </span>
  ) : (
    <span className={`${badge} bg-pink-pale text-navy`}>Needs changes</span>
  );
}

// For officers: has anyone left feedback yet?
export function FeedbackCountBadge({ count }: { count: number }) {
  return count === 0 ? (
    <span className={`${badge} bg-gold-pale text-navy`}>Needs feedback</span>
  ) : (
    <span className={`${badge} bg-tint text-blue`}>Feedback given ({count})</span>
  );
}

// For volunteers: feedback they haven't seen yet.
export function NewBadge({ label = "New feedback" }: { label?: string }) {
  return <span className={`${badge} bg-gold text-navy`}>{label}</span>;
}
