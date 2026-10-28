// Owner: Megan (built by Nika). The journey tracker on the dashboard:
// Learn → Kit → Make → Send. A finished step is a colored ball of yarn, the
// step they're on gets a honey ring, and the rest are empty dashed circles.
// Each step's name links to its page (Send has no page yet).
// "panel" is the tall list in the desktop side panel, "bar" the short row
// at the top of the page on phones.
import Link from "next/link";
import type { JourneyStep } from "./_data";

const pages: Record<JourneyStep["id"], string | null> = {
  learn: "/lessons",
  kit: "/kits",
  make: "/dashboard/my-work",
  send: null,
};

// Written out in full so Tailwind can find the class names.
const yarnColors: Record<JourneyStep["id"], string> = {
  learn: "fill-pink",
  kit: "fill-mint",
  make: "fill-lilac",
  send: "fill-cornflower",
};

const focusRing = "rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

export function Journey({ steps, variant }: { steps: JourneyStep[]; variant: "panel" | "bar" }) {
  // The step they're on: the first one that isn't done.
  const currentId = steps.find((step) => !step.done)?.id;
  const lastDone = steps.findLast((step) => step.done);

  const items = steps.map((step, i) => {
    const href = pages[step.id];
    const isCurrent = step.id === currentId;
    // Screen readers can't see the yarn balls, so they hear this instead.
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
            : "relative z-10 flex flex-1 flex-col items-center gap-1"
        }
      >
        {/* The strand joining this step to the next one (desktop list only). */}
        {variant === "panel" && i < steps.length - 1 && (
          <span aria-hidden="true" className="absolute top-10 bottom-0 left-[19px] w-0.5 bg-line" />
        )}
        <StepBall step={step} isCurrent={isCurrent} />
        <span className={isCurrent ? "font-extrabold" : "font-semibold text-ink"}>
          {href ? (
            <Link href={href} className={`hover:text-blue hover:underline ${focusRing}`}>
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
      <h2 className="text-sm font-bold tracking-wide text-terracotta uppercase">Your journey</h2>
      {variant === "panel" ? (
        <ol className="flex flex-col">{items}</ol>
      ) : (
        <ol className="relative flex">
          {/* One strand behind the whole row, from the first ball to the last. */}
          <span aria-hidden="true" className="absolute top-5 right-[12.5%] left-[12.5%] h-0.5 bg-line" />
          {items}
        </ol>
      )}
      {/* A small celebration for the newest finished step. */}
      {lastDone && (
        <p className="rounded-2xl bg-gold-pale px-4 py-3 font-semibold">
          <span aria-hidden="true">🎉 </span>
          You finished {lastDone.label}!{" "}
          {currentId ? "On to the next step." : "That's the whole journey. Thank you!"}
        </p>
      )}
    </div>
  );
}

// A ball of yarn when done, an empty dashed circle when not.
function StepBall({ step, isCurrent }: { step: JourneyStep; isCurrent: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className={`h-10 w-10 shrink-0 rounded-full bg-card ${isCurrent ? "ring-4 ring-gold" : ""}`}
    >
      {step.done ? (
        <>
          <circle cx="20" cy="20" r="17" className={yarnColors[step.id]} />
          {/* Strands wrapped around the ball */}
          <g fill="none" strokeWidth="1.5" strokeLinecap="round" className="stroke-navy">
            <path d="M8 13 Q20 25 31 8" />
            <path d="M5 20 Q19 32 35 14" />
            <path d="M7 27 Q20 37 35 22" />
          </g>
          <circle cx="20" cy="20" r="17" fill="none" strokeWidth="2.5" className="stroke-navy" />
        </>
      ) : (
        <circle
          cx="20"
          cy="20"
          r="17"
          fill="none"
          strokeWidth="2.5"
          strokeDasharray={isCurrent ? undefined : "4 4"}
          className={isCurrent ? "stroke-navy" : "stroke-muted"}
        />
      )}
    </svg>
  );
}
