// Owner: Nika (approved by Megan). The For shelters page at "/for-shelters".
//
// What this page will do:
// - Shelter staff ask Bluemont to donate plushies.
// Done when: the shelter request form works.
//
// The form isn't built yet, so its button says "coming soon". It will ask
// for contact information and what the organization does; more questions
// may come.
import type { Metadata } from "next";
import Link from "next/link";
import { SampleNote } from "@/components/sample-note";
import childWithBunny from "../_images/child-with-bunny.jpg";
import { Photo } from "../_photo";
import { buttonSoon, card, eyebrow, pageHero, pageTitle } from "../_styles";

export const metadata: Metadata = { title: "For shelters" };

export default function ForSheltersPage() {
  return (
    <div className="flex flex-col gap-12">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>For shelters</p>
        <h1 className={pageTitle}>Would your shelter like plushies?</h1>
        <p className="max-w-2xl text-lg">
          If you work at a shelter or an organization that serves children, we&apos;d love to
          send handmade plushies to the kids you care for. It&apos;s free.
        </p>
      </section>

      {/* Side by side on wider screens, stacked on phones (photo first). */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* The child's face isn't in the photo, on purpose: no children's
            faces on the site. */}
        <Photo
          src={childWithBunny}
          alt="A child sitting by a window, holding a soft pink bunny plushie."
          credit="La Miko"
          href="https://www.pexels.com/photo/close-up-photo-of-kid-holding-a-stuff-toy-5088937/"
          className="aspect-[4/3]"
        />

        <section className={`${card} gap-4 bg-mint-pale`}>
          <h2 className="font-display text-3xl font-extrabold">Ask for a donation</h2>
          <p>The request form will ask for:</p>
          <ul className="list-disc pl-5">
            <li>Your contact information</li>
            <li>What your organization does</li>
          </ul>
          <span className={buttonSoon}>Request form coming soon</span>
          <p className="text-sm text-ink">
            Curious where plushies have gone so far?{" "}
            <Link href="/donations" className="font-bold text-blue underline">
              See our donations
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
