// Owner: Nika (assigned by Megan). The public home page at "/".
//
// What this page will do (month 1 build plan):
// - Say what Bluemont is and send visitors to sign up.
// Done when: Home, About and Sign in look finished.
import Image from "next/image";
import Link from "next/link";
import crochetBunny from "./_images/crochet-bunny.jpg";

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

// Impact numbers from Megan (October 2026). Update them here when Megan
// sends new ones.
const stats = [
  { value: "2", label: "school chapters" },
  { value: "90+", label: "volunteers crocheting" },
  { value: "150+", label: "children reached" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-14">
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

        {/* Stock photo from Pexels (free to use, see pexels.com/license).
            The credit line underneath links back to it. Swap for a photo of
            our own plushies later, with no faces or names in it. */}
        <figure className="flex flex-col gap-2">
          {/* The photo is tall, so we crop it to a 4:5 shape and keep the
              top (the bunny's face and the child's hand). */}
          <Image
            src={crochetBunny}
            alt="A small child's hand resting next to a crocheted white bunny in a red dress."
            placeholder="blur"
            preload
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5] h-auto w-full rounded-2xl border border-line object-cover object-top"
          />
          <figcaption className="text-xs text-muted">
            Photo:{" "}
            <a
              href="https://www.pexels.com/photo/cute-crochet-rabbit-doll-with-child-s-hand-31454485/"
              className="underline hover:text-terracotta"
            >
              Büşra Şahin on Pexels
            </a>
          </figcaption>
        </figure>
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
              className="flex flex-col gap-1 rounded-2xl border border-line bg-card p-6"
            >
              <p className="font-display text-3xl font-semibold text-terracotta">
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
