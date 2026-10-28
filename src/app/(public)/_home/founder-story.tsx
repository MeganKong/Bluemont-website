// Owner: Nika. A short note from Megan, next to an arched photo. Megan
// writes the quote; the highlighted bits are waiting for her words.
import Image from "next/image";
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import hands from "../_images/hands-crocheting.jpg";
import { eyebrow, moreLink, wrap } from "../_styles";

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
        <p className={eyebrow}>A note from our founder</p>
        <blockquote className="font-serif text-[27px] leading-snug">
          “
          <Tbd>
            Megan&apos;s own words: the moment that started Bluemont, and why a plushie matters to a
            child in a shelter.
          </Tbd>
          ”
        </blockquote>
        <p className="text-ink">
          Bluemont began in <Tbd>[year]</Tbd> with one student and a crochet hook. Today it&apos;s
          two school chapters, all run by students.
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
