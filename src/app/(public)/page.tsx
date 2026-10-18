// Owner: Nika (assigned by Megan). The public home page at "/".
//
// What this page will do (month 1 build plan):
// - Say what Bluemont is and send visitors to sign up.
// Done when: Home, About and Sign in look finished.
import Link from "next/link";
import { SampleNote } from "@/components/sample-note";

// The three "How it works" steps, shown top to bottom as a timeline.
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

// Placeholder numbers until Megan gives the real ones. "—" means we don't
// have a number yet. Each box shows a "Placeholder" tag.
const stats = [
  { value: "—", label: "plushies made" },
  { value: "~80", label: "volunteers crocheting" },
  { value: "—", label: "children reached" },
];

// Small label that marks anything fake on this page.
function PlaceholderTag() {
  return (
    <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted">
      Placeholder
    </span>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col gap-14">
      <SampleNote />

      {/* Top section: headline, mission, buttons, and the photo spot.
          On phones everything stacks; from medium screens up, the photo
          sits to the right of the text. */}
      <section className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-4xl font-semibold leading-tight text-balance md:text-5xl">
            Teens learn to crochet. <span className="text-terracotta">Kids get a friend.</span>
          </h1>
          <p className="max-w-2xl text-lg text-ink">
            Bluemont volunteers learn to crochet online, then make plushies for children
            in shelters.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign-up"
              className="rounded-lg bg-navy px-5 py-3 font-semibold text-cream"
            >
              Become a volunteer
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-navy px-5 py-3 font-semibold"
            >
              Learn about us
            </Link>
          </div>
        </div>

        {/* Placeholder photo. Swap for a real <Image> once we have a photo
            with no faces or names in it. */}
        <div
          role="img"
          aria-label="Placeholder for a photo of plushies made by volunteers"
          className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-sand p-4 text-center text-muted"
        >
          <PlaceholderTag />
          <span>Photo: plushies made by volunteers</span>
        </div>
      </section>

      {/* How it works: numbered circles joined by a line. */}
      <section>
        <h2 className="mb-6 font-display text-3xl font-semibold">How it works</h2>
        <ol className="flex max-w-2xl flex-col">
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li key={step.title} className={`relative flex gap-4 ${isLast ? "" : "pb-7"}`}>
                {/* The line down to the next step. */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute top-11 bottom-0 left-[21px] w-0.5 bg-line"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-terracotta bg-card font-display text-lg font-semibold text-terracotta"
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

      {/* Impact numbers: one column on phones, three side by side on wider screens. */}
      <section>
        <h2 className="mb-6 font-display text-3xl font-semibold">Our impact so far</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-1 rounded-2xl border border-line bg-card p-6"
            >
              <PlaceholderTag />
              <p className="mt-2 font-display text-3xl font-semibold text-terracotta">
                {stat.value}
              </p>
              <p className="text-ink">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
