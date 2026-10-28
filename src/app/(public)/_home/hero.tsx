// Owner: Nika. The top of the homepage: headline, two main buttons, and an
// arched photo with a "150+" card. Dark blue with a few stars, running
// straight on from the header.
import Image from "next/image";
import Link from "next/link";
import crochetBunny from "../_images/crochet-bunny.jpg";
import { Stars } from "../_page-top";
import { buttonHoney, buttonOutlineOnNight, eyebrowOnNight, wrap } from "../_styles";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-card">
      <Stars />
      {/* On phones everything stacks; on wide screens the photo sits to the right. */}
      <div className={`${wrap} relative flex flex-wrap items-center gap-14 pt-8 pb-24 sm:pb-28`}>
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
          <p className={eyebrowOnNight}>Student-led nonprofit · 501(c)(3)</p>
          <h1 className="font-serif text-6xl leading-[0.97] tracking-tight text-balance sm:text-7xl lg:text-8xl">
            Teens learn to crochet. Kids get a <em className="text-gold">friend.</em>
          </h1>
          <p className="max-w-[32em] text-xl text-soft">
            Bluemont volunteers learn to crochet for free, then make handmade plushies for children
            staying in shelters. Something soft for hard nights.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/volunteer" className={buttonHoney}>
              Become a volunteer
            </Link>
            <Link href="/donate" className={buttonOutlineOnNight}>
              Sponsor a kit
            </Link>
          </div>
        </div>

        <div className="relative flex min-w-0 flex-[1_1_360px] justify-center">
          <Image
            src={crochetBunny}
            alt="A crocheted white bunny in a red dress beside a small child's hand"
            placeholder="blur"
            priority
            sizes="(min-width: 768px) 390px, 90vw"
            className="glow aspect-[4/5] w-full max-w-[390px] rounded-t-[200px] rounded-b-[28px] object-cover"
          />
          <div className="absolute bottom-6 left-0 flex max-w-[210px] flex-col rounded-2xl bg-card px-5 py-3.5 text-navy shadow-[0_18px_40px_-16px_rgb(0_0_0/0.5)]">
            <b className="font-serif text-4xl leading-none font-normal text-blue">150+</b>
            <span className="text-[15px] text-ink">children have a handmade friend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
