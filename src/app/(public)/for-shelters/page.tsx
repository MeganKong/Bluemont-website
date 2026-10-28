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
import { Tbd } from "@/components/tbd";
import child from "../_images/child-with-bunny.jpg";
import { NotConnected } from "../_not-connected";
import { PageTop } from "../_page-top";
import {
  buttonHoney,
  buttonNight,
  eyebrow,
  fact,
  factTitle,
  field,
  headingSmall,
  input,
  label,
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
        We set aside plushies and agree on a drop-off time. <Tbd>[About _ weeks]</Tbd>
      </>
    ),
  },
  {
    title: "3 · We deliver",
    text: (
      <>
        An officer <Tbd>[and adult advisor]</Tbd> drops them off, or we mail them.
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
              We serve <Tbd>[Los Angeles County / Southern California / anywhere we can mail]</Tbd>.
            </p>
            <div className={panel}>
              <p className={eyebrow}>Our safety standards</p>
              <p className="text-[15px] text-ink">
                New materials only · Tight stitches, no loose parts · <Tbd>Embroidered eyes</Tbd> ·
                Every plushie checked by an officer · Sealed in a clean bag
              </p>
            </div>
          </div>

          <form className="flex min-w-0 flex-[1_1_420px] flex-col gap-4 rounded-3xl border border-rule bg-card p-6 sm:p-10">
            <fieldset disabled className="flex flex-col gap-4">
              <legend className="sr-only">Plushie request</legend>
              <div className={field}>
                <label htmlFor="s-org" className={label}>
                  Organization
                </label>
                <input id="s-org" name="organization" className={input} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={field}>
                  <label htmlFor="s-name" className={label}>
                    Your name
                  </label>
                  <input id="s-name" name="name" autoComplete="name" className={input} />
                </div>
                <div className={field}>
                  <label htmlFor="s-email" className={label}>
                    Work email
                  </label>
                  <input id="s-email" name="email" type="email" autoComplete="email" className={input} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className={field}>
                  <label htmlFor="s-count" className={label}>
                    About how many children?
                  </label>
                  <input id="s-count" name="children" inputMode="numeric" className={input} />
                </div>
                <div className={field}>
                  <label htmlFor="s-ages" className={label}>
                    Ages
                  </label>
                  <select id="s-ages" name="ages" className={input}>
                    <option>Under 3</option>
                    <option>3–7</option>
                    <option>8–12</option>
                    <option>Mixed ages</option>
                  </select>
                </div>
              </div>
              <div className={field}>
                <label htmlFor="s-city" className={label}>
                  City
                </label>
                <input id="s-city" name="city" className={input} />
                <small className="text-sm text-ink">Only our officers see this. It&apos;s never shown on the site.</small>
              </div>
              <div className={field}>
                <label htmlFor="s-notes" className={label}>
                  Anything we should know?
                </label>
                <textarea id="s-notes" name="notes" rows={4} className={input} />
              </div>
              <button type="submit" className={`${buttonNight} self-start disabled:cursor-not-allowed disabled:opacity-60`}>
                Send request
              </button>
            </fieldset>
            <NotConnected />
          </form>
        </div>
      </section>
    </>
  );
}
