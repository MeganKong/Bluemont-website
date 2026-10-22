// Owner: Nika. The three "How it works" steps, shown top to bottom as a
// timeline: numbered circles joined by a line.
import { eyebrow, sectionTitle } from "./styles";

const steps = [
  {
    title: "Learn",
    text: "Take short crochet lessons online. No experience needed.",
  },
  {
    title: "Make",
    text: "Request a free kit and crochet a plushie animal.",
  },
  {
    title: "Give",
    text: "Drop off your plushie at a Bluemont chapter. We deliver it to a child in a shelter.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>How it works</p>
        <h2 className={sectionTitle}>From yarn to a new friend</h2>
      </div>
      <ol className="flex max-w-2xl flex-col">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={step.title} className={`relative flex gap-4 ${isLast ? "" : "pb-7"}`}>
              {/* The line down to the next step. */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-11 bottom-0 left-[21px] w-0.5 bg-navy"
                />
              )}
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-navy bg-gold font-display text-lg font-semibold text-navy"
              >
                {index + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="text-ink">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
