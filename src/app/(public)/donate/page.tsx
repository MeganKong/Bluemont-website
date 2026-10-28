// Owner: unassigned (to be split). The Donate page at "/donate".
//
// What this page will do:
// - Ask people to sponsor kits, with three suggested amounts.
// - Show what a kit holds, that gifts are tax-deductible, and our supporters.
// Done when: the amounts, EIN and Givebutter link are in.
//
// Payments happen on Givebutter, not on our site. Paste the campaign link
// into donateUrl below and the button turns on.
import type { Metadata } from "next";
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import bunny from "../_images/crochet-bunny.jpg";
import { PageTop } from "../_page-top";
import { buttonHoney, buttonOff, eyebrow, headingSmall, moreLink, panel, section, wrap } from "../_styles";

export const metadata: Metadata = {
  title: "Donate",
  description: "Sponsor a crochet kit. Every kit becomes a handmade plushie for a child in a shelter.",
};

// To add: the Givebutter campaign link.
const donateUrl = "";

const amounts: { amount: React.ReactNode; text: string; popular?: boolean }[] = [
  { amount: <Tbd>$__</Tbd>, text: "Sponsors one kit: yarn, hook and stuffing for one plushie." },
  { amount: <Tbd>$__</Tbd>, text: "Sponsors five kits for a new volunteer group.", popular: true },
  { amount: <Tbd>$__</Tbd>, text: "Stocks a chapter for a month." },
  { amount: "Other", text: "Any amount helps. You choose." },
];

const kit: { item: string; note: React.ReactNode }[] = [
  { item: "Soft yarn", note: "Washable, kid-safe colors" },
  { item: "A crochet hook", note: "Sized for beginners" },
  { item: "New stuffing", note: "Never reused" },
  { item: "Safe eyes", note: <Tbd>Embroidered, no plastic parts?</Tbd> },
  { item: "A gift tag", note: "A note from the maker" },
];

export default function DonatePage() {
  return (
    <>
      <PageTop
        eyebrow="Donate"
        title={
          <>
            Sponsor a kit. <em>Give a child a friend.</em>
          </>
        }
        lead="A kit is everything one volunteer needs to make one plushie. Every kit you sponsor becomes a handmade friend for a child in a shelter."
        photo={{ src: bunny, alt: "A crocheted bunny plushie" }}
      />

      <section className={`${wrap} ${section} flex flex-col gap-8`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className={headingSmall}>Choose an amount</h2>
          <p className="text-sm text-ink">
            Card, Apple Pay or Google Pay through <Tbd>Givebutter</Tbd>
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {amounts.map((option) => (
            <li
              key={option.text}
              className={`flex flex-col gap-2 rounded-3xl border-[1.5px] bg-card p-6 ${
                option.popular ? "border-navy" : "border-rule"
              }`}
            >
              {option.popular && (
                <span className="self-start rounded-full bg-gold px-2.5 py-0.5 text-xs font-extrabold tracking-wider text-navy uppercase">
                  Most chosen
                </span>
              )}
              <b className="font-serif text-5xl leading-none font-normal">{option.amount}</b>
              <span className="text-ink">{option.text}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 rounded-3xl bg-navy px-7 py-6 text-soft">
          <p>
            <strong className="text-lg text-card">Give once or monthly.</strong> You&apos;ll get an
            emailed receipt for your taxes.
          </p>
          {donateUrl ? (
            <a href={donateUrl} className={buttonHoney}>
              Donate now
            </a>
          ) : (
            <span className={buttonOff}>
              Donate now <Tbd>[Givebutter link]</Tbd>
            </span>
          )}
        </div>
      </section>

      <section className="bg-tint">
        <div className={`${wrap} ${section} flex flex-col gap-8`}>
          <h2 className={headingSmall}>What&apos;s in a kit</h2>
          <ul className="grid gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {kit.map((thing) => (
              <li key={thing.item} className="flex flex-col gap-1 rounded-2xl border border-rule bg-card p-5">
                <b>{thing.item}</b>
                <span className="text-[15px] text-ink">{thing.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} ${section} flex flex-col gap-12`}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className={panel}>
            <p className={eyebrow}>Tax-deductible</p>
            <p>
              Bluemont Children Foundation is a 501(c)(3) nonprofit, EIN <Tbd>__-_______</Tbd>.
              Donations are tax-deductible as allowed by law.
            </p>
          </div>
          <div className={panel}>
            <p className={eyebrow}>Other ways to give</p>
            <p>
              Donate yarn <Tbd>[yes / not right now]</Tbd>, ask your employer to match your gift, or
              host a yarn drive at your school.
            </p>
            <Link href="/faq#contact" className={moreLink}>
              Get in touch →
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <p className={eyebrow}>Thank you to our supporters</p>
          <p className="self-start rounded-2xl border-[1.5px] border-dashed border-line px-6 py-3.5 font-bold text-ink">
            Smart &amp; Final <Tbd>OK to name?</Tbd>
          </p>
        </div>
      </section>
    </>
  );
}
