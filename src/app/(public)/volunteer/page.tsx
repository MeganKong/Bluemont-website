// Owner: Nika (approved by Megan). The Volunteer page at "/volunteer".
//
// What this page will do:
// - Explain how volunteering works and what volunteers get.
// - Say who can join, then send people to create an account.
// Done when: every <Tbd> is filled in and "Sign up" leads to a working
// sign-up.
//
// Signing up happens on the /sign-up page, so we don't collect anything
// here. Volunteers are mostly under 18: ask only for what we need.
import type { Metadata } from "next";
import Link from "next/link";
import { Closing } from "../_closing";
import yarn from "../_images/pink-yarn-and-hook.jpg";
import { PageTop } from "../_page-top";
import { Steps } from "../_steps";
import {
  buttonHoney,
  buttonNight,
  buttonOutlineOnNight,
  eyebrow,
  fact,
  factTitle,
  headingSmall,
  section,
  wrap,
} from "../_styles";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Learn to crochet for free and make plushies for children in shelters. No experience needed.",
};

const perks: { title: string; text: React.ReactNode }[] = [
  {
    title: "Free lessons",
    text: "Short videos you can pause and replay. Start with a simple ball, finish with a bunny.",
  },
  {
    title: "A free kit",
    text: (
      <>
        Yarn, a hook, stuffing and a tag. You keep the hook.
      </>
    ),
  },
  {
    title: "A chapter",
    text: "Meet other volunteers at Rosemead HS, Blair HS or Arcadia HS, or start one at your school.",
  },
  {
    title: "Service hours",
    text: "An officer can sign your school's service-hours form.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageTop
        eyebrow="Volunteer"
        title={
          <>
            Learn to crochet. <em>Make someone&apos;s night.</em>
          </>
        }
        lead="No experience needed. We teach you for free, send you the supplies, and deliver what you make to a child who needs it."
        photo={{ src: yarn, alt: "Pink yarn and a crochet hook" }}
      >
        <Link href="#join" className={buttonHoney}>
          Sign up
        </Link>
      </PageTop>

      <section className={`${wrap} ${section} flex flex-col gap-10`}>
        <h2 className={headingSmall}>How it works</h2>
        <Steps />
      </section>

      <section className="bg-tint">
        <div className={`${wrap} ${section} flex flex-col gap-9`}>
          <h2 className={headingSmall}>What you get</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk) => (
              <div key={perk.title} className="flex flex-col gap-3 rounded-3xl border border-rule bg-card p-7">
                <h3 className="text-xl font-bold">{perk.title}</h3>
                <p className="text-ink">{perk.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className={`${wrap} ${section} flex scroll-mt-6 flex-wrap items-start gap-14`}>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
          <p className={eyebrow}>Sign up</p>
          <h2 className={headingSmall}>Join Bluemont</h2>
          <p className="text-lg text-ink">
            It takes a minute. Make an account and your first lesson is waiting.
          </p>
          <Link href="/sign-up" className={`${buttonNight} self-start`}>
            Create your account
          </Link>
        </div>
        <div className="grid min-w-0 flex-[1_1_420px] gap-7">
          <div className={fact}>
            <h3 className={factTitle}>Who can join</h3>
            <p className="text-ink">
              Teens 13 and up. If you&apos;re under 18, a parent or guardian needs to say OK.
            </p>
          </div>
          <div className={fact}>
            <h3 className={factTitle}>Time</h3>
            <p className="text-ink">
              Most volunteers spend about 4 hours a week. A first plushie takes about 1 hour.
            </p>
          </div>
          <div className={fact}>
            <h3 className={factTitle}>Parents</h3>
            <p className="text-ink">
              Online video lessons, no chat between volunteers, and we never post a volunteer&apos;s
              photo without written consent.
            </p>
          </div>
        </div>
      </section>

      <Closing
        title="No chapter at your school?"
        text="Start one. We'll give you a starter guide and kits for your first meeting."
      >
        <Link href="/faq#contact" className={buttonHoney}>
          Start a chapter
        </Link>
        <Link href="/faq" className={buttonOutlineOnNight}>
          Read the FAQ
        </Link>
      </Closing>
    </>
  );
}
