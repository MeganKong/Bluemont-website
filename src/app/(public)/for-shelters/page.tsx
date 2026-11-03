// Owner: Nika (approved by Megan). The For shelters page at "/for-shelters".
//
// What this page will do:
// - Shelter staff ask Bluemont to donate plushies.
// Done when: the shelter request form works.
//
// The form is laid out but switched off: it needs somewhere to send
// requests (the officer dashboard or an email inbox). The city stays
// private: it's never shown on the site.
import type { Metadata } from "next";
import Link from "next/link";
import child from "../_images/child-with-bunny.jpg";
import { RequestForm } from "../_forms/request-form";
import { PageTop } from "../_page-top";
import {
  buttonHoney,
  eyebrow,
  fact,
  factTitle,
  headingSmall,
  panel,
  section,
  wrap,
} from "../_styles";

export const metadata: Metadata = {
  title: "For shelters",
  description:
    "Free handmade plushies for children in shelters and children's programs. Request a donation.",
};

const howItWorks: { title: string; text: React.ReactNode }[] = [
  { title: "1 · Ask", text: "Tell us roughly how many children and their ages." },
  {
    title: "2 · We match",
    text: (
      <>
        We set aside plushies and agree on a drop-off time. It usually takes 3–4 weeks.
      </>
    ),
  },
  {
    title: "3 · We deliver",
    text: (
      <>
        An officer drops them off, or we mail them.
      </>
    ),
  },
  {
    title: "Always private",
    text: "We never publish your organization's name or location without your written OK.",
  },
];

export default function ForSheltersPage() {
  return (
    <>
      <PageTop
        eyebrow="For shelters and children's programs"
        title={
          <>
            Free handmade plushies for <em>the kids you serve.</em>
          </>
        }
        lead="Every plushie is new, made by hand by a teen volunteer, and checked before it leaves. There's no cost and no paperwork beyond a short form."
        photo={{ src: child, alt: "A child holding a soft pink bunny, face not shown" }}
      >
        <Link href="#request" className={buttonHoney}>
          Request plushies
        </Link>
      </PageTop>

      <section className={`${wrap} ${section} flex flex-col gap-10`}>
        <h2 className={headingSmall}>How it works</h2>
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step) => (
            <div key={step.title} className={fact}>
              <h3 className={factTitle}>{step.title}</h3>
              <p className="text-ink">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="request" className="scroll-mt-6 bg-tint">
        <div className={`${wrap} ${section} flex flex-wrap items-start gap-14`}>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
            <p className={eyebrow}>Request form</p>
            <h2 className={headingSmall}>Ask for a donation</h2>
            <p className="text-lg text-ink">
              We serve Los Angeles County.
            </p>
            <div className={panel}>
              <p className={eyebrow}>Our safety standards</p>
              <p className="text-[15px] text-ink">
                New materials only · Tight stitches, no loose parts · Safety eyes ·
                Every plushie checked by an officer · Sealed in a clean bag
              </p>
            </div>
          </div>

          <RequestForm />
        </div>
      </section>
    </>
  );
}
