// Owner: Nika. The three "How it works" steps, right under the top of the
// page. On phones the steps stack, joined by a line down the left; from
// small screens up they sit in a row, joined by a line across.
const steps = [
  {
    color: "bg-gold",
    title: "Learn",
    text: "Take short crochet lessons online. No experience needed.",
  },
  {
    color: "bg-pink",
    title: "Make",
    text: "Request a free kit and crochet a plushie animal.",
  },
  {
    color: "bg-mint",
    title: "Give",
    text: "Drop off your plushie at a Bluemont chapter. We deliver it to a child in a shelter.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col gap-6 rounded-3xl border-2 border-navy bg-card p-6 sm:p-8"
    >
      <h2 className="font-display text-2xl font-extrabold sm:text-3xl">How it works</h2>
      <ol className="grid gap-7 sm:grid-cols-3 sm:gap-6">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <li key={step.title} className="relative flex gap-4 sm:flex-col sm:gap-3">
              {/* The dashed "yarn" line to the next step: down on phones,
                  across on wider screens. */}
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="absolute top-11 -bottom-7 left-[21px] border-l-2 border-dashed border-navy sm:top-[21px] sm:bottom-auto sm:left-11 sm:-right-6 sm:border-t-2 sm:border-l-0"
                />
              )}
              <span
                aria-hidden="true"
                className={`grid size-11 shrink-0 place-items-center rounded-full border-2 border-navy font-display text-lg font-extrabold text-navy ${step.color}`}
              >
                {index + 1}
              </span>
              <div className="pt-1.5 sm:pt-0">
                <h3 className="font-display text-xl font-extrabold">{step.title}</h3>
                <p className="text-ink">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
