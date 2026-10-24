// Owner: Nika (approved by Megan). The Volunteer page at "/volunteer".
// The homepage "Volunteer with us" button leads here.
//
// What this page will do:
// - Explain how a teen can join and start crocheting, then send them to
//   sign up.
// Done when: [To decide with Megan.]
import type { Metadata } from "next";
import Link from "next/link";
import { SampleNote } from "@/components/sample-note";
import handsCrocheting from "../_images/hands-crocheting.jpg";
import yarnBasket from "../_images/yarn-basket.jpg";
import { Photo } from "../_photo";
import { buttonMain, card, eyebrow, pageTitle, sectionTitle, tints } from "../_styles";

export const metadata: Metadata = { title: "Volunteer" };

const steps = [
  { title: "Sign up", text: "Make a free account. No crochet experience needed." },
  { title: "Learn", text: "Take short crochet lessons online, at your own pace." },
  { title: "Get a kit", text: "Request a free kit with yarn, a hook and stuffing." },
  { title: "Give", text: "Drop off your plushie at your chapter. We deliver it to a child." },
];

export default function VolunteerPage() {
  return (
    <div className="flex flex-col gap-14">
      <SampleNote />
      {/* Text and photo side by side on wider screens, stacked on phones. */}
      <section className="yarn-dots grid items-center gap-8 rounded-[2rem] p-6 sm:p-10 md:grid-cols-[3fr_2fr]">
        <div className="flex flex-col gap-4">
          <p className={eyebrow}>Volunteer</p>
          <h1 className={pageTitle}>Learn to crochet. Make a kid smile.</h1>
          <p className="max-w-2xl text-lg">
            Bluemont volunteers are students who learn to crochet for free, then make plushies
            for children in shelters.
          </p>
          <div>
            <Link href="/sign-up" className={buttonMain}>
              Sign up to volunteer
            </Link>
          </div>
        </div>
        <Photo
          src={handsCrocheting}
          alt="Two hands crocheting cream yarn with a purple crochet hook."
          credit="Castorly Stock"
          href="https://www.pexels.com/photo/person-holding-purple-crochet-hook-and-white-yarn-3945638/"
          className="aspect-[4/3]"
        />
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className={eyebrow}>How to join</p>
          <h2 className={sectionTitle}>Four steps to your first plushie</h2>
        </div>
        {/* One column on phones, two on tablets, four on laptops. */}
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className={`${card} ${tints[index % tints.length]}`}>
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-full border-2 border-navy bg-card font-display text-lg font-extrabold"
              >
                {index + 1}
              </span>
              <h3 className="font-display text-xl font-extrabold">{step.title}</h3>
              <p className="text-ink">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid items-center gap-8 md:grid-cols-2">
        <Photo
          src={yarnBasket}
          alt="A wicker basket full of soft yarn in blue, pink, cream and gray."
          credit="Surene Palvie"
          href="https://www.pexels.com/photo/assorted-color-yarns-on-brown-wicker-basket-2070676/"
          className="aspect-square"
        />
        <div className={`${card} bg-gold-pale`}>
          <h2 className="font-display text-2xl font-extrabold">Everything you need is free</h2>
          <p className="text-ink">
            Lessons and kits cost nothing. All you bring is a little time and the wish to
            make a child smile.
          </p>
          <p className="text-ink">
            Parents: see{" "}
            <Link href="/faq" className="font-bold text-blue underline">
              our FAQ
            </Link>{" "}
            for how Bluemont works and who runs it.
          </p>
        </div>
      </section>
    </div>
  );
}
