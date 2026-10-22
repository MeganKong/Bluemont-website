// Owner: Nika (approved by Megan). The Our team page at "/team".
//
// What this page will do:
// - Show who runs Bluemont: first names and roles.
// Done when: the real team list is in, with everyone's OK to be shown.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import { card, eyebrow, pageHero, pageTitle, tints } from "../_styles";
import { team } from "./_placeholder";

export const metadata: Metadata = { title: "Our team" };


export default function TeamPage() {
  return (
    <div className="flex flex-col gap-12">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>Our team</p>
        <h1 className={pageTitle}>The people behind Bluemont</h1>
        <p className="max-w-2xl text-lg">
          Bluemont is run by students who love to crochet and want every child in a shelter
          to have a friend.
        </p>
      </section>

      {/* One column on phones, two on tablets, three on laptops. */}
      <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {team.map((person, index) => (
          <li key={person.id} className={`${card} ${tints[index % tints.length]}`}>
            {/* A round spot with the first letter, instead of a photo. */}
            <span
              aria-hidden="true"
              className="grid size-14 place-items-center rounded-full border-2 border-navy bg-card font-display text-2xl font-extrabold"
            >
              {person.name.startsWith("[") ? "?" : person.name[0]}
            </span>
            <h2 className="font-display text-2xl font-extrabold">{person.name}</h2>
            <p>{person.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
