// Owner: Megan (built by Nika). The journey tracker at the top of the
// volunteer home page: Learn → Kit → Make → Send, in one short row.
// A finished step is a filled blue circle with a check, the step they're on
// has a honey ring, and the rest are empty circles.
import type { JourneyStep } from "./_data";

export function Journey({ steps }: { steps: JourneyStep[] }) {
  // The step they're on: the first one that isn't done.
  const currentId = steps.find((step) => !step.done)?.id;

  return (
    <ol aria-label="Your journey" className="relative flex">
      {/* One line behind the whole row, from the first circle to the last. */}
      <span aria-hidden="true" className="absolute top-[13px] right-[12.5%] left-[12.5%] h-0.5 bg-rule" />
      {steps.map((step) => {
        const isCurrent = step.id === currentId;
        return (
          <li key={step.id} className="relative z-10 flex flex-1 flex-col items-center gap-1.5">
            <StepDot done={step.done} isCurrent={isCurrent} />
            <span className={`text-sm ${isCurrent ? "font-bold" : "font-semibold text-muted"}`}>
              {step.label}
              {/* Screen readers can't see the circles, so they hear this instead. */}
              <span className="sr-only">{step.done ? " (done)" : isCurrent ? " (you're here)" : ""}</span>
            </span>
          </li>
        );
      })}
    </ol>
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
