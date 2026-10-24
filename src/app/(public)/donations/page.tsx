// Owner: Nika (approved by Megan). The Our donations page at "/donations".
//
// What this page will do:
// - Show how many plushies we've donated, with a number that counts up.
// - List the shelters and organizations we've donated to.
// - Share stories from partners and team members.
// Done when: the real total and the list of places (with their OK to be
// named) are in.
import type { Metadata } from "next";
import Link from "next/link";
import { SampleNote } from "@/components/sample-note";
import crochetTiger from "../_images/crochet-tiger.jpg";
import { Photo } from "../_photo";
import { buttonMain, card, eyebrow, pageHero, pageTitle, sectionTitle, tints } from "../_styles";
import { CountUp } from "./_count-up";
import { PartnerStories } from "./_partner-stories";
import { donations, plushiesDonated } from "./_placeholder";

export const metadata: Metadata = { title: "Our donations" };

export default function DonationsPage() {
  return (
    <div className="flex flex-col gap-14">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>Our donations</p>
        <h1 className={pageTitle}>Where our plushies go</h1>
        <p className="max-w-2xl text-lg">
          Every plushie our volunteers make goes to a child who could use a friend.
        </p>
      </section>

      {/* The big counter, with the photo beside it on wider screens. */}
      <div className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
        <section
          aria-labelledby="counter-title"
          className="flex flex-col gap-2 rounded-3xl bg-blue px-6 py-10 text-card"
        >
          <p className="font-display text-7xl font-extrabold text-gold sm:text-8xl">
            <CountUp to={plushiesDonated} />
          </p>
          <h2 id="counter-title" className="font-display text-2xl font-extrabold">
            handmade plushies donated so far
          </h2>
          <p>And counting! This number grows every time we deliver.</p>
        </section>
        <Photo
          src={crochetTiger}
          alt="A crocheted tiger plushie wearing a blue sweater, brown overalls and a yellow scarf."
          credit="Татьяна Контеева"
          href="https://www.pexels.com/photo/a-knitted-teddy-bear-with-a-scarf-10585144/"
          className="aspect-[4/5]"
        />
      </div>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className={eyebrow}>Thank you</p>
          <h2 className={sectionTitle}>Who we&apos;ve donated to</h2>
        </div>
        {/* One column on phones, three side by side on wider screens. */}
        <ul className="grid gap-5 md:grid-cols-3">
          {donations.map((donation, index) => (
            <li key={donation.id} className={`${card} ${tints[index % tints.length]}`}>
              <h3 className="font-display text-2xl font-extrabold">{donation.place}</h3>
              <p className="flex-1 text-ink">{donation.kind}</p>
              <p className="font-extrabold text-blue">{donation.plushies} plushies</p>
            </li>
          ))}
        </ul>
      </section>

      <PartnerStories />

      <section className={`${card} bg-gold-pale sm:flex-row sm:items-center sm:justify-between`}>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-extrabold">Work at a shelter?</h2>
          <p className="text-ink">Ask us to send plushies to the children you serve.</p>
        </div>
        <Link href="/for-shelters" className={buttonMain}>
          Request plushies
        </Link>
      </section>
    </div>
  );
}
