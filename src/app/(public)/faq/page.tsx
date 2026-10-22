// Owner: Nika (approved by Megan). The FAQ page at "/faq".
//
// What this page will do:
// - Answer common questions from volunteers, parents and partners.
// - Show how to contact us, our nonprofit status, privacy and terms.
// Done when: every question has an answer and the contact email is in.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import { card, eyebrow, pageHero, pageTitle } from "../_styles";
import { faqs } from "./_placeholder";

export const metadata: Metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <div className="flex flex-col gap-12">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>FAQ</p>
        <h1 className={pageTitle}>Questions? We&apos;ve got answers.</h1>
        <p className="max-w-2xl text-lg">
          Common questions from volunteers, parents and partners, plus how to reach us.
        </p>
      </section>

      <div className="grid items-start gap-6 md:grid-cols-[3fr_2fr]">
        {/* Each question opens to show its answer when tapped. */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border-2 border-navy bg-card px-5 py-4 open:bg-sand"
            >
              <summary className="cursor-pointer font-extrabold focus-visible:outline-4 focus-visible:outline-blue">
                {faq.question}
              </summary>
              <p className="mt-2 text-ink">{faq.answer}</p>
            </details>
          ))}
        </div>

        <div className={`${card} bg-gold-pale`}>
          <h2 className="font-display text-xl font-extrabold">Contact us</h2>
          <p className="text-ink">[To write: Bluemont&apos;s contact email.]</p>
          <h2 className="font-display text-xl font-extrabold">Nonprofit status</h2>
          <p className="text-ink">
            Bluemont is a student-led 501(c)(3). [To add: tax ID (EIN).]
          </p>
          <h2 className="font-display text-xl font-extrabold">Privacy and terms</h2>
          <p className="text-ink">Our privacy policy and terms of use are coming soon.</p>
        </div>
      </div>
    </div>
  );
}
