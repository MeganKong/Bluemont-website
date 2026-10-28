// Owner: unassigned (to be split). The About page at "/about".
//
// What this page will do (month 1 build plan):
// - Tell Bluemont's story, the two chapters, and where plushies go.
// - Show the mission, values, team and our privacy promise.
// Done when: Home, About and Sign in look finished, and no <Tbd> is left.
//
// Team: first names and roles only. Officer photos only with a parent's
// written OK, and never a volunteer's last name.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import { Closing } from "../_closing";
import hands from "../_images/hands-crocheting.jpg";
import tiger from "../_images/crochet-tiger.jpg";
import { PageTop } from "../_page-top";
import {
  buttonHoney,
  buttonOutlineOnNight,
  eyebrow,
  fact,
  factTitle,
  headingSmall,
  moreLink,
  panel,
  section,
  wrap,
} from "../_styles";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bluemont Children Foundation is a student-led nonprofit. Teens learn to crochet for free and make plushies for children in shelters.",
};

const values = [
  { title: "Made by hand", text: "Every plushie is crocheted by a volunteer, one stitch at a time." },
  { title: "Free for everyone", text: "Lessons and kits cost volunteers nothing. Plushies cost shelters nothing." },
  {
    title: "Kids' safety first",
    text: "No children's faces, no shelter locations, and every plushie is checked before it's given.",
  },
  { title: "Run by students", text: "High school students lead every chapter, with adult support." },
];

// To fill in: first names once each officer (and a parent) says it's OK.
const team: { name: React.ReactNode; role: string; initial: string }[] = [
  { name: "Megan", role: "Founder and CEO", initial: "M" },
  { name: <Tbd>[First name]</Tbd>, role: "Lessons lead", initial: "·" },
  { name: <Tbd>[First name]</Tbd>, role: "Kits lead", initial: "·" },
  { name: <Tbd>[Advisor name]</Tbd>, role: "Adult advisor", initial: "·" },
];

export default function AboutPage() {
  return (
    <>
      <PageTop
        eyebrow="About us"
        title={
          <>
            Made by teens. <em>Held by kids.</em>
          </>
        }
        lead="Bluemont Children Foundation is a student-led 501(c)(3) nonprofit. We teach teens to crochet for free, give them the yarn and tools, and deliver every plushie they make to a child in a shelter."
        photo={{ src: hands, alt: "Hands crocheting with blue yarn" }}
      />

      <section className={`${wrap} ${section} flex flex-wrap items-center gap-14`}>
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4 text-lg text-ink">
          <p className={eyebrow}>Our story</p>
          <h2 className={`${headingSmall} text-navy`}>It started with one hook</h2>
          <p>
            Bluemont started in <Tbd>[year]</Tbd> when <Tbd>[Megan, then a sophomore at ___]</Tbd>{" "}
            <Tbd>[the moment that started it: a visit, a story, a plushie you made]</Tbd>.
          </p>
          <p>
            What began with one person and a crochet hook is now two school chapters, at Rosemead
            High School and Blair High School, with <Tbd>about 80</Tbd> volunteers.
          </p>
          <p>
            Every plushie goes to a child staying in{" "}
            <Tbd>[a family shelter / a children&apos;s hospital / foster care]</Tbd>. For the
            children&apos;s safety, we never share shelter locations or photos of the kids.
          </p>
        </div>
        <Image
          src={tiger}
          alt="A small crocheted tiger plushie"
          placeholder="blur"
          sizes="(min-width: 768px) 45vw, 90vw"
          className="h-80 min-w-0 flex-[1_1_320px] rounded-t-[200px] rounded-b-3xl object-cover sm:h-[440px]"
        />
      </section>

      <section className="bg-tint">
        <div className={`${wrap} ${section} grid gap-6 md:grid-cols-2`}>
          <div className={panel}>
            <p className={eyebrow}>Mission</p>
            <p className="font-serif text-3xl leading-tight">We give teens a skill and kids a friend.</p>
            <p className="text-ink">
              Bluemont volunteers learn to crochet for free, then make plushies for children living
              in shelters.
            </p>
          </div>
          <div className={panel}>
            <p className={eyebrow}>Vision</p>
            <p className="font-serif text-3xl leading-tight">
              Every child in a shelter has something soft to hold.
            </p>
            <p className="text-ink">And every teen knows their hands can help.</p>
          </div>
        </div>
      </section>

      <section className={`${wrap} ${section} flex flex-col gap-10`}>
        <h2 className={headingSmall}>What we stand for</h2>
        <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className={fact}>
              <h3 className={factTitle}>{value.title}</h3>
              <p className="text-ink">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className="scroll-mt-6 bg-card">
        <div className={`${wrap} ${section} flex flex-col gap-10`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className={headingSmall}>The team</h2>
            <p className="text-sm text-ink">Officer photos appear only with a parent&apos;s written OK.</p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <li key={person.role} className="flex flex-col items-start gap-1.5 rounded-3xl border border-rule bg-card p-6">
                <span
                  aria-hidden="true"
                  className="mb-2 grid size-16 place-items-center rounded-full bg-tint font-serif text-3xl text-blue"
                >
                  {person.initial}
                </span>
                <h3 className="text-lg font-bold">{person.name}</h3>
                <p className="text-[15px] text-ink">{person.role}</p>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink">
            Chapter leads at Rosemead HS and Blair HS: <Tbd>[first names, if you want them listed]</Tbd>
          </p>
        </div>
      </section>

      <section className={`${wrap} ${section} grid gap-6 md:grid-cols-2`}>
        <div className={panel}>
          <p className={eyebrow}>Our promise</p>
          <p>
            We keep volunteers&apos; information private, collect only what we need, and never show a
            child&apos;s face. <Tbd>[Adult advisor name and role]</Tbd> supports our student leaders.
          </p>
          <Link href="/faq#parents" className={moreLink}>
            Questions from parents →
          </Link>
        </div>
        <div className={panel}>
          <p className={eyebrow}>The details</p>
          <p>
            Bluemont Children Foundation · 501(c)(3) nonprofit · EIN <Tbd>__-_______</Tbd>
          </p>
          <p className="text-sm text-ink">
            Annual report and financials: <Tbd>[link when ready]</Tbd>
          </p>
        </div>
      </section>

      <Closing title="Want to be part of it?">
        <Link href="/volunteer" className={buttonHoney}>
          Volunteer
        </Link>
        <Link href="/donate" className={buttonOutlineOnNight}>
          Donate
        </Link>
      </Closing>
    </>
  );
}
