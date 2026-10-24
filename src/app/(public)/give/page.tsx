// Owner: Nika (approved by Megan). The Give page at "/give".
//
// What this page will do:
// - Visitors sponsor a kit by picking an amount.
// Done when: online giving is connected.
//
// Payments aren't built yet, so the button says "coming soon". Shelter staff
// asking for plushies have their own page: For shelters ("/for-shelters").
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import pinkYarn from "../_images/pink-yarn-and-hook.jpg";
import { Photo } from "../_photo";
import { buttonSoon, card, eyebrow, pageHero, pageTitle } from "../_styles";
import { donationAmounts } from "./_placeholder";

export const metadata: Metadata = { title: "Give" };

export default function GivePage() {
  return (
    <div className="flex flex-col gap-12">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>Give</p>
        <h1 className={pageTitle}>Every plushie starts with you</h1>
        <p className="max-w-2xl text-lg">
          Sponsor a kit so a volunteer can make a plushie for a child in a shelter.
        </p>
      </section>

      {/* Side by side on wider screens, stacked on phones (photo first). */}
      <div className="grid items-center gap-8 md:grid-cols-2">
        <Photo
          src={pinkYarn}
          alt="A ball of pink yarn next to a pink crochet hook with the first few stitches on it."
          credit="Anete Lusina"
          href="https://www.pexels.com/photo/knitted-piece-and-yarn-with-hook-4792079/"
          className="aspect-[4/3]"
        />

        <section id="sponsor" className={`${card} gap-4 bg-lilac`}>
          <p className="text-sm font-extrabold tracking-wider uppercase">Sponsor a kit</p>
          <h2 className="font-display text-3xl font-extrabold">Give a child a friend</h2>
          <p>
            A kit is the yarn, hook and stuffing a volunteer needs. Every kit becomes a
            handmade plushie for a child in a shelter. Pick an amount to give.
          </p>

          {/* The amount choices are radio buttons styled as pills.
              "has-checked" colors the pill yellow when it's picked. */}
          <fieldset className="flex flex-col">
            <legend className="mb-3 font-bold">Choose an amount</legend>
            <div className="flex flex-wrap gap-3">
              {donationAmounts.map((amount) => (
                <label
                  key={amount}
                  className="cursor-pointer rounded-full border-2 border-navy bg-card px-5 py-2 text-lg font-extrabold has-checked:bg-gold has-checked:shadow-[0_3px_0_var(--color-navy)] has-focus-visible:outline-4 has-focus-visible:outline-blue"
                >
                  <input type="radio" name="amount" value={amount} className="sr-only" />
                  {amount}
                </label>
              ))}
              <label className="flex items-center gap-2 rounded-full border-2 border-navy bg-card px-4 py-1 font-bold has-focus-visible:outline-4 has-focus-visible:outline-blue">
                Other $
                <input
                  type="number"
                  name="other-amount"
                  min={1}
                  inputMode="numeric"
                  className="w-16 bg-transparent font-extrabold outline-none"
                />
              </label>
            </div>
          </fieldset>

          <span className={buttonSoon}>Online giving coming soon</span>
        </section>
      </div>
    </div>
  );
}
