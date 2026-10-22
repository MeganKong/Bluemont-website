// Owner: Nika. The top of the homepage: headline, two main buttons, photo.
import Image from "next/image";
import Link from "next/link";
import crochetBunny from "../_images/crochet-bunny.jpg";
import { buttonMain, buttonSecondary } from "./styles";

export function Hero() {
  return (
    // On phones everything stacks; from medium screens up, the photo sits
    // to the right of the text.
    <section className="grid items-center gap-8 md:grid-cols-[3fr_2fr]">
      <div className="flex flex-col gap-6">
        <h1 className="font-display text-4xl font-semibold leading-tight text-balance md:text-5xl">
          Teens learn to crochet. <span className="text-terracotta">Kids get a friend.</span>
        </h1>
        <p className="max-w-2xl text-lg text-ink">
          Bluemont volunteers learn to crochet online, then make plushies for children in
          shelters.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/sign-up" className={buttonMain}>
            Become a volunteer
          </Link>
          {/* "#get-involved" jumps down to that section on this page. */}
          <Link href="#get-involved" className={buttonSecondary}>
            Partner with us
          </Link>
        </div>
      </div>

      {/* Stock photo from Pexels (free to use, see pexels.com/license).
          The credit line underneath links back to it. Swap for a photo of
          our own plushies later, with no faces or names in it. */}
      <figure className="flex flex-col gap-2">
        {/* An arch shape (round top), a nod to the "mont" (mountain) in
            Bluemont. The dashed border looks like stitches. */}
        <Image
          src={crochetBunny}
          alt="A small child's hand resting next to a crocheted white bunny in a red dress."
          placeholder="blur"
          preload
          sizes="(min-width: 768px) 40vw, 100vw"
          className="aspect-[4/5] h-auto w-full rounded-t-full rounded-b-3xl border-4 border-dashed border-navy object-cover object-top"
        />
        <figcaption className="text-xs text-muted">
          Photo:{" "}
          <a
            href="https://www.pexels.com/photo/cute-crochet-rabbit-doll-with-child-s-hand-31454485/"
            className="underline hover:text-terracotta"
          >
            Büşra Şahin on Pexels
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
