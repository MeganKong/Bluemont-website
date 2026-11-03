// Owner: Nika. A short note from Megan, next to an arched photo.
// To add: a quote in Megan's own words (the moment that started Bluemont, and
// why a plushie matters to a child in a shelter). Put it in founderQuote.
import Image from "next/image";
import Link from "next/link";
import hands from "../_images/hands-crocheting.jpg";
import { eyebrow, moreLink, wrap } from "../_styles";

const founderQuote = "";

export function FounderStory() {
  return (
    <section className={`${wrap} flex flex-wrap items-center gap-14 py-24`}>
      <Image
        src={hands}
        alt="Hands crocheting with blue yarn"
        placeholder="blur"
        sizes="(min-width: 768px) 45vw, 90vw"
        className="h-80 min-w-0 flex-[1_1_320px] rounded-t-[200px] rounded-b-3xl object-cover sm:h-[430px]"
      />
      <figure className="flex min-w-0 flex-[1_1_440px] flex-col gap-5 rounded-lg border border-rule bg-card p-7 shadow-[0_24px_50px_-36px_var(--color-navy)] sm:p-12">
        <p className={eyebrow}>{founderQuote ? "A note from our founder" : "Our founder"}</p>
        {founderQuote ? (
          <blockquote className="font-serif text-[27px] leading-snug">“{founderQuote}”</blockquote>
        ) : (
          <p className="font-serif text-[27px] leading-snug">
            Every plushie starts with a teen learning a new stitch, and ends with a child in a
            shelter getting a friend of their own.
          </p>
        )}
        <p className="text-ink">
          Bluemont began in 2024 with one student and a crochet hook. Today it&apos;s
          three school chapters, all run by students.
        </p>
        <figcaption className="flex flex-wrap items-baseline justify-between gap-3">
          <span>
            <em className="font-serif text-3xl text-blue">Megan</em>
            <span className="text-[15px] text-ink"> · Founder and CEO</span>
          </span>
          <Link href="/about" className={moreLink}>
            Read our story →
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}
