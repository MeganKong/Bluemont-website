// Owner: Nika. Trust: FAQ, contact, nonprofit status, privacy and terms.
// The FAQ comes from _placeholder.ts. Privacy and terms will be their own
// pages later (ask Megan, since public pages are unassigned).
import { faqs } from "../_placeholder";
import { card, eyebrow, sectionTitle } from "./styles";

export function Trust() {
  return (
    <section id="faq" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Questions and trust</p>
        <h2 className={sectionTitle}>Good to know</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-[3fr_2fr]">
        {/* FAQ: each question opens to show its answer when tapped. */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border-2 border-navy bg-card px-5 py-4"
            >
              <summary className="cursor-pointer font-bold">{faq.question}</summary>
              <p className="mt-2 text-ink">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className={card}>
          <h3 className="font-display text-xl font-semibold">Contact us</h3>
          <p className="text-ink">[To write: Bluemont&apos;s contact email.]</p>
          <h3 className="font-display text-xl font-semibold">Nonprofit status</h3>
          <p className="text-ink">[To write: nonprofit status, e.g. 501(c)(3), and tax ID.]</p>
          <h3 className="font-display text-xl font-semibold">Privacy and terms</h3>
          <p className="text-ink">Our privacy policy and terms of use are coming soon.</p>
        </div>
      </div>
    </section>
  );
}
