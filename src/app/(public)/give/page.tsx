// Owner: Nika (approved by Megan). The Give & Receive page at "/give".
//
// What this page will do:
// - Give: visitors sponsor a kit by picking an amount.
// - Receive: shelter staff ask Bluemont to donate plushies.
// Done when: online giving is connected and the shelter request form works.
//
// Payments and the shelter form aren't built yet, so their buttons say
// "coming soon". The shelter form will ask for contact information and what
// the organization does; more questions may come.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import { buttonSoon, card, eyebrow, pageHero, pageTitle } from "../_styles";
import { donationAmounts } from "./_placeholder";

export const metadata: Metadata = { title: "Give & Receive" };

export default function GivePage() {
  return (
    <div className="flex flex-col gap-12">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>Give &amp; Receive</p>
        <h1 className={pageTitle}>Every plushie starts with you</h1>
        <p className="max-w-2xl text-lg">
          Sponsor a kit so a volunteer can make a plushie. Or, if you work at a shelter, ask
          us to send plushies to the children you serve.
        </p>
      </section>

      {/* Side by side on wider screens, stacked on phones. */}
      <div className="grid items-start gap-6 md:grid-cols-2">
        <section id="sponsor" className={`${card} gap-4 bg-lilac`}>
          <p className="text-sm font-extrabold tracking-wider uppercase">Give · Sponsor a kit</p>
          <h2 className="font-display text-3xl font-extrabold">Give a child a friend</h2>
          <p>
            Every kit becomes a handmade plushie for a child in a shelter. Pick an amount to
            give.
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

        <section id="shelters" className={`${card} gap-4 bg-mint-pale`}>
          <p className={eyebrow}>Receive · For shelter staff</p>
          <h2 className="font-display text-3xl font-extrabold">Would your shelter like plushies?</h2>
          <p>
            If you work at a shelter or an organization that serves children, ask us to donate
            handmade plushies. The form will ask for:
          </p>
          <ul className="list-disc pl-5">
            <li>Your contact information</li>
            <li>What your organization does</li>
          </ul>
          <span className={buttonSoon}>Request form coming soon</span>
        </section>
      </div>
    </div>
  );
}
