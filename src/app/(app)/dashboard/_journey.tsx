// Owner: Megan (built by Nika). The journey tracker on the dashboard:
// Learn → Kit → Make → Send. A finished step is a filled blue circle with a
// check, the step they're on has a honey ring, and the rest are empty circles.
// Each step's name links to its page (Send has no page yet).
// "panel" is the tall list in the desktop side panel, "bar" the short row
// at the top of the page on phones.
import Link from "next/link";
import { eyebrow, focusRing } from "@/components/portal-styles";
import type { JourneyStep } from "./_data";

const pages: Record<JourneyStep["id"], string | null> = {
  learn: "/lessons",
  kit: "/kits",
  make: "/dashboard/my-work",
  send: null,
};

export function Journey({ steps, variant }: { steps: JourneyStep[]; variant: "panel" | "bar" }) {
  // The step they're on: the first one that isn't done.
  const currentId = steps.find((step) => !step.done)?.id;
  const lastDone = steps.findLast((step) => step.done);

  const items = steps.map((step, i) => {
    const href = pages[step.id];
    const isCurrent = step.id === currentId;
    // Screen readers can't see the circles, so they hear this instead.
    const status = step.done ? " (done)" : isCurrent ? " (you're here)" : "";
    const name = (
      <>
        {step.label}
        <span className="sr-only">{status}</span>
      </>
    );

    return (
      <li
        key={step.id}
        className={
          variant === "panel"
            ? "relative flex items-center gap-3 pb-5 last:pb-0"
            : "relative z-10 flex flex-1 flex-col items-center gap-1.5"
        }
      >
        {/* The line joining this step to the next one (desktop list only). */}
        {variant === "panel" && i < steps.length - 1 && (
          <span aria-hidden="true" className="absolute top-8 bottom-0 left-[13px] w-0.5 bg-rule" />
        )}
        <StepDot done={step.done} isCurrent={isCurrent} />
        <span className={isCurrent ? "font-bold" : "font-semibold text-ink"}>
          {href ? (
            <Link href={href} className={`rounded hover:text-blue hover:underline ${focusRing}`}>
              {name}
            </Link>
          ) : (
            name
          )}
        </span>
      </li>
    );
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className={eyebrow}>Your journey</h2>
      {variant === "panel" ? (
        <ol className="flex flex-col">{items}</ol>
      ) : (
        <ol className="relative flex">
          {/* One line behind the whole row, from the first circle to the last. */}
          <span aria-hidden="true" className="absolute top-[13px] right-[12.5%] left-[12.5%] h-0.5 bg-rule" />
          {items}
        </ol>
      )}
      {/* A short note for the newest finished step. */}
      {lastDone && (
        <p className="rounded-xl bg-tint px-4 py-3 text-[15px] font-semibold">
          You finished {lastDone.label}.{" "}
          {currentId ? "On to the next step." : "That's the whole journey. Thank you!"}
        </p>
      )}
    </div>
  );
}

// Filled with a check when done, a honey ring for the current step, empty otherwise.
function StepDot({ done, isCurrent }: { done: boolean; isCurrent: boolean }) {
  if (done) {
    return (
      <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-blue text-card">
        <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className={`grid size-7 shrink-0 place-items-center rounded-full border-2 bg-card ${
        isCurrent ? "border-gold" : "border-line"
      }`}
    >
      {isCurrent && <span className="size-2.5 rounded-full bg-gold" />}
    </span>
  );
}
