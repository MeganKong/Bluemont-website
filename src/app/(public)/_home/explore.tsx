// Owner: Nika. Links to the public pages that aren't in the menu, at the
// bottom of the homepage.
import Link from "next/link";
import { card, eyebrow, sectionTitle } from "../_styles";

const pages = [
  {
    href: "/volunteer",
    title: "Volunteer",
    text: "Learn to crochet for free and make plushies for kids in shelters.",
    link: "Start volunteering",
    color: "bg-gold-pale",
  },
  {
    href: "/community",
    title: "Community",
    text: "Photos of plushies and posts from our volunteers.",
    link: "See the community",
    color: "bg-lilac-pale",
  },
  {
    href: "/faq",
    title: "FAQ",
    text: "Answers to common questions, plus how to reach us.",
    link: "Read the FAQ",
    color: "bg-sand",
  },
];

export function Explore() {
  return (
    <section aria-labelledby="explore-title" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Explore</p>
        <h2 id="explore-title" className={sectionTitle}>
          There&apos;s more to see
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {pages.map((page) => (
          // The whole card is the link. It lifts a little on hover.
          <Link
            key={page.href}
            href={page.href}
            className={`${card} ${page.color} transition hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue`}
          >
            <h3 className="font-display text-2xl font-extrabold">{page.title}</h3>
            <p className="flex-1 text-ink">{page.text}</p>
            <span className="font-extrabold text-blue">{page.link} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
