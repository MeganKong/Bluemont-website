// Owner: unassigned (to be split). The Impact page at "/impact".
//
// What this page will do:
// - Show what volunteers have made so far and where it went.
// - Tell the story so far, and share quotes from partners and volunteers.
// Done when: the numbers are real, the dates are in, and the quotes are
// used with permission.
//
// Never name the shelters we deliver to or show where they are.
import type { Metadata } from "next";
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import { Closing } from "../_closing";
import { ImpactNumbers, impactNumbers } from "../_home/impact";
import { PageTop } from "../_page-top";
import { buttonHoney, buttonOutlineOnNight, eyebrow, headingSmall, section, wrap } from "../_styles";

export const metadata: Metadata = {
  title: "Impact",
  description: "How many plushies Bluemont volunteers have made, and where they go.",
};

const timeline: { when: React.ReactNode; title: string; text: string }[] = [
  { when: <Tbd>[Year]</Tbd>, title: "Bluemont begins", text: "One student, one hook, one plushie." },
  { when: <Tbd>[Year]</Tbd>, title: "First chapters", text: "Rosemead High School and Blair High School." },
  { when: "May 2025", title: "First grant", text: "$300 from Smart & Final for kits." },
  { when: <Tbd>[Date]</Tbd>, title: "150 plushies given", text: "And counting." },
];

const quotes: { quote: React.ReactNode; who: React.ReactNode }[] = [
  {
    quote: <Tbd>A short quote from a shelter partner, used with permission.</Tbd>,
    who: (
      <>
        Shelter staff member, <Tbd>[city]</Tbd>
      </>
    ),
  },
  {
    quote: <Tbd>A short quote from a volunteer about finishing their first plushie.</Tbd>,
    who: "Volunteer, Rosemead HS chapter",
  },
];

export default function ImpactPage() {
  return (
    <>
      <PageTop
        eyebrow="Our impact"
        title={
          <>
            Every number is <em>a child with a friend.</em>
          </>
        }
        lead="What our volunteers have made so far, and where it went."
      />

      <section className="bg-dusk text-card">
        <div className={`${wrap} flex py-20`}>
          <ImpactNumbers
            numbers={[...impactNumbers, { value: <Tbd>___</Tbd>, label: "hours of stitching" }]}
          />
        </div>
      </section>

      <section className={`${wrap} ${section} flex flex-wrap items-start gap-14`}>
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <p className={eyebrow}>Where plushies go</p>
          <h2 className={headingSmall}>To children who need comfort most</h2>
          <p className="text-lg text-ink">
            Our plushies go to{" "}
            <Tbd>
              [family shelters, domestic violence shelters, children&apos;s hospitals, foster care
              programs]
            </Tbd>
            .
          </p>
          <p className="text-[15px] text-ink">
            To keep children safe, we don&apos;t name the places we deliver to or share their
            locations.
          </p>
        </div>
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-5">
          <p className={eyebrow}>Our story so far</p>
          <ol className="ml-2 border-l-2 border-rule">
            {timeline.map((moment) => (
              <li key={moment.title} className="relative flex flex-col gap-1 pb-8 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[9px] size-4 rounded-full border-[3px] border-cream bg-gold ring-[1.5px] ring-navy"
                />
                <b className="text-sm tracking-widest text-blue uppercase">{moment.when}</b>
                <h3 className="text-xl font-bold">{moment.title}</h3>
                <p className="text-ink">{moment.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-tint">
        <div className={`${wrap} ${section} flex flex-col gap-9`}>
          <h2 className={headingSmall}>In their words</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {quotes.map((item, i) => (
              <figure key={i} className="flex flex-col gap-3.5 rounded-3xl border border-rule bg-card p-8">
                <blockquote className="font-serif text-[26px] leading-snug">“{item.quote}”</blockquote>
                <figcaption className="text-[15px] font-semibold text-ink">{item.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Closing title="Help us reach the next 150">
        <Link href="/donate" className={buttonHoney}>
          Sponsor a kit
        </Link>
        <Link href="/volunteer" className={buttonOutlineOnNight}>
          Volunteer
        </Link>
      </Closing>
    </>
  );
}
