// Owner: Nika (approved by Megan). The FAQ page at "/faq".
//
// What this page will do:
// - Answer common questions from volunteers, parents and partners.
// - Show how to contact us, our nonprofit status, privacy and terms.
// Done when: every question has an answer and the contact email is in.
//
// Questions open and close with <details>, so the page needs no
// JavaScript. The contact form is laid out but switched off until it has
// somewhere to send messages.
import type { Metadata } from "next";
import { ContactForm } from "../_forms/contact-form";
import { PageTop } from "../_page-top";
import { eyebrow, headingSmall, panel, section, wrap } from "../_styles";

export const metadata: Metadata = {
  title: "FAQ & contact",
  description: "Answers for volunteers, parents, donors and shelters, and how to reach Bluemont.",
};

type Question = { q: string; a: React.ReactNode };

const groups: { id: string; title: string; questions: Question[] }[] = [
  {
    id: "volunteers",
    title: "Volunteers",
    questions: [
      {
        q: "Do I need to know how to crochet?",
        a: "No. Our lessons start at the very first stitch. Most volunteers had never held a hook before joining.",
      },
      {
        q: "Does it cost anything?",
        a: (
          <>
            No. Lessons and kits are free, and you keep the hook.
          </>
        ),
      },
      {
        q: "Can I get volunteer hours?",
        a: "Yes. An officer can sign your school's service-hours form.",
      },
      {
        q: "My school doesn't have a chapter. Can I still help?",
        a: "Yes. Lessons are online, so you can join from any school, or start a chapter at yours. Email us to get started.",
      },
    ],
  },
  {
    id: "parents",
    title: "Parents",
    questions: [
      {
        q: "How old do volunteers have to be?",
        a: "Volunteers must be 13 or older. Under 18 needs a parent's OK.",
      },
      {
        q: "Is it safe?",
        a: "Lessons are online videos. We don't run chat between volunteers, and we never post a volunteer's photo without a parent's written OK.",
      },
      {
        q: "Who runs Bluemont?",
        a: (
          <>
            High school students, led by founder Megan.
          </>
        ),
      },
    ],
  },
  {
    id: "donors",
    title: "Donors & shelters",
    questions: [
      {
        q: "Where do the plushies go?",
        a: (
          <>
            To children staying in shelters, in hospitals or in foster care. To keep the kids
            safe, we don&apos;t share where those places are.
          </>
        ),
      },
      {
        q: "How do you make the plushies safe for small kids?",
        a: (
          "Safety eyes, tight stitches, new stuffing, and an officer checks every plushie before delivery."
        ),
      },
      {
        q: "Can I donate yarn or supplies?",
        a: "Yes! We accept new, unopened soft yarn and stuffing. Email us to arrange a drop-off.",
      },
      {
        q: "Is Bluemont a registered nonprofit?",
        a: (
          <>
            Yes. Bluemont Children Foundation is a 501(c)(3), so donations are tax-deductible. EIN{" "}
            99-3471914.
          </>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageTop
        eyebrow="FAQ & contact"
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
        lead="For volunteers, parents, donors and shelters. Can't find yours? Send us a note below."
      />

      <section className={`${wrap} ${section} flex flex-wrap items-start gap-12`}>
        <nav
          aria-label="FAQ sections"
          className="flex flex-[1_1_100%] flex-wrap gap-x-5 gap-y-2 font-bold text-ink md:sticky md:top-6 md:flex-[0_1_200px] md:flex-col"
        >
          {groups.map((group) => (
            <a key={group.id} href={`#${group.id}`} className="hover:text-blue">
              {group.title}
            </a>
          ))}
          <a href="#contact" className="hover:text-blue">
            Contact us
          </a>
        </nav>
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-10">
          {groups.map((group) => (
            <div key={group.id} id={group.id} className="flex scroll-mt-6 flex-col gap-3">
              <h2 className="font-serif text-4xl">{group.title}</h2>
              {group.questions.map((item) => (
                <details key={item.q} className="group rounded-2xl border border-rule bg-card px-5 py-4">
                  <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span aria-hidden="true" className="text-2xl leading-none text-blue group-open:hidden">
                      +
                    </span>
                    <span aria-hidden="true" className="hidden text-2xl leading-none text-blue group-open:inline">
                      –
                    </span>
                  </summary>
                  <p className="mt-2.5 text-ink">{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-6 bg-tint">
        <div className={`${wrap} ${section} flex flex-wrap items-start gap-14`}>
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
            <p className={eyebrow}>Contact us</p>
            <h2 className={headingSmall}>Say hello</h2>
            <div className={panel}>
              <b>Email</b>
              <span>
                support@bluemont-inc.com
              </span>
              <b>Instagram</b>
              <span>
                @bluemont.children.foundation
              </span>
            </div>
            <p className="text-sm text-ink">
              We&apos;re students, so we answer within 1–3 days.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
