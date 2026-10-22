// Owner: Nika. Sponsor a kit: visitors pick an amount to give. Payments
// aren't connected yet, so the button says "coming soon". The amounts live
// in _placeholder.ts until we decide the kit price.
import { donationAmounts } from "../_placeholder";
import { buttonSoon, eyebrow, sectionTitle } from "./styles";

export function SponsorKit() {
  return (
    <section
      id="sponsor"
      className="flex flex-col gap-5 rounded-3xl border-2 border-navy bg-sand p-6 shadow-[4px_4px_0_var(--color-navy)]"
    >
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Sponsor a kit</p>
        <h2 className={sectionTitle}>Give a child a friend</h2>
        <p className="max-w-xl text-ink">
          Every kit becomes a handmade plushie for a child in a shelter. Pick an amount to
          give.
        </p>
      </div>

      {/* The amount choices are radio buttons styled as pills. "has-checked"
          colors the pill gold when its radio button is picked. */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 font-semibold">Choose an amount</legend>
        <div className="flex flex-wrap gap-3">
          {donationAmounts.map((amount) => (
            <label
              key={amount}
              className="cursor-pointer rounded-full border-2 border-navy bg-card px-5 py-2 font-extrabold has-checked:bg-gold has-focus-visible:outline-4 has-focus-visible:outline-gold"
            >
              <input type="radio" name="amount" value={amount} className="sr-only" />
              {amount}
            </label>
          ))}
          <label className="flex items-center gap-2 rounded-full border-2 border-navy bg-card px-4 py-1 font-semibold has-focus-visible:outline-4 has-focus-visible:outline-gold">
            Other $
            <input
              type="number"
              name="other-amount"
              min={1}
              inputMode="numeric"
              className="w-20 bg-transparent font-extrabold outline-none"
            />
          </label>
        </div>
      </fieldset>

      <span className={buttonSoon}>Online giving coming soon</span>
    </section>
  );
}
