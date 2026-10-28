// Owner: Nika. A white strip of quick facts under the top of the homepage,
// then the mission in big centered letters, then the three steps.
import Link from "next/link";
import { Steps } from "../_steps";
import { eyebrow, heading, moreLink, wrap } from "../_styles";

const quickFacts = [
  "Chapters at Rosemead HS and Blair HS",
  "Free lessons, free kits",
  "No experience needed",
  "Kids' privacy always protected",
];

export function Mission() {
  return (
    <>
      <section aria-label="Bluemont at a glance" className="border-b border-rule bg-card">
        <ul className={`${wrap} flex flex-wrap justify-between gap-x-8 gap-y-3 py-5 font-semibold text-ink`}>
          {quickFacts.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-6 pt-24 pb-20 text-center">
        <p className={eyebrow}>Our mission</p>
        <p className="font-serif text-3xl leading-[1.18] text-balance sm:text-5xl">
          We give teens a skill and kids a friend. Every plushie our volunteers make goes to a
          child who needs something soft to hold.
        </p>
      </section>

      <section className={`${wrap} flex flex-col gap-10 pb-24`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={heading}>From first stitch to a child&apos;s arms</h2>
          <Link href="/volunteer" className={moreLink}>
            How volunteering works →
          </Link>
        </div>
        <Steps />
      </section>
    </>
  );
}
