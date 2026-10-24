// Owner: Megan (shared; built by Adhya). Little labels for shared work.
// Each has an icon and words, so the meaning never depends on color alone.
import type { Feedback, Submission } from "@/lib/types";

const badge =
  "inline-flex items-center gap-1 rounded-full border-2 border-navy px-3 py-0.5 text-sm font-bold text-navy";

// 💡 Tip (something to try) or 💬 Comment (praise or notes).
export function KindBadge({ kind }: { kind: Feedback["kind"] }) {
  return (
    <span className={`${badge} bg-card`}>
      <span aria-hidden="true">{kind === "tip" ? "💡" : "💬"}</span>
      {kind === "tip" ? "Tip" : "Comment"}
    </span>
  );
}

// ✓ Approved or ↻ Needs changes, set by an officer. Nothing if not set.
export function StatusBadge({ status }: { status: Submission["status"] }) {
  if (!status) return null;
  return status === "approved" ? (
    <span className={`${badge} bg-mint-pale`}>
      <span aria-hidden="true">✓</span> Approved
    </span>
  ) : (
    <span className={`${badge} bg-pink-pale`}>
      <span aria-hidden="true">↻</span> Needs changes
    </span>
  );
}

// For officers: has anyone left feedback yet?
export function FeedbackCountBadge({ count }: { count: number }) {
  return count === 0 ? (
    <span className={`${badge} bg-gold`}>
      <span aria-hidden="true">●</span> Needs feedback
    </span>
  ) : (
    <span className={`${badge} bg-sand`}>
      <span aria-hidden="true">✓</span> Feedback given ({count})
    </span>
  );
}

// For volunteers: feedback they haven't seen yet.
export function NewBadge({ label = "New feedback" }: { label?: string }) {
  return (
    <span className={`${badge} bg-gold`}>
      <span aria-hidden="true">✨</span> {label}
    </span>
  );
}
