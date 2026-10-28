// Owner: Nika. The dark blue top of every public page except the homepage:
// a label, a big heading, a sentence or two, optional buttons and an
// optional round photo. A few stars twinkle in the background.
import Image, { type StaticImageData } from "next/image";
import { eyebrowOnNight, wrap } from "./_styles";

type PageTopProps = {
  eyebrow: string;
  // The heading. Wrap the words that should be honey in <em>.
  title: React.ReactNode;
  lead: React.ReactNode;
  // Buttons under the text.
  children?: React.ReactNode;
  // A round photo on the right. Leave it out to center the text.
  photo?: { src: StaticImageData; alt: string };
};

export function PageTop({ eyebrow, title, lead, children, photo }: PageTopProps) {
  return (
    <section className="relative overflow-hidden bg-navy text-card">
      <Stars />
      <div
        className={`${wrap} relative flex flex-wrap items-center gap-12 pt-10 pb-20 sm:pb-24 ${
          photo ? "" : "justify-center text-center"
        }`}
      >
        <div className={`flex min-w-0 flex-[1_1_480px] flex-col gap-5 ${photo ? "" : "max-w-3xl items-center"}`}>
          <p className={eyebrowOnNight}>{eyebrow}</p>
          <h1 className="font-serif text-5xl leading-none text-balance sm:text-6xl lg:text-7xl [&_em]:text-gold">
            {title}
          </h1>
          <p className="max-w-[32em] text-xl text-soft">{lead}</p>
          {children && <div className="flex flex-wrap gap-3">{children}</div>}
        </div>
        {photo && (
          <div className="mx-auto w-full max-w-[340px] min-w-0 flex-[0_1_340px]">
            <Image
              src={photo.src}
              alt={photo.alt}
              placeholder="blur"
              sizes="340px"
              className="glow aspect-square w-full rounded-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// Tiny white dots and two honey sparkles behind the dark page tops.
export function Stars() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1280 720"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <g fill="var(--color-card)" opacity=".55">
        <circle cx="90" cy="80" r="1.6" />
        <circle cx="240" cy="40" r="1.1" />
        <circle cx="420" cy="110" r="1.4" />
        <circle cx="610" cy="50" r="1" />
        <circle cx="760" cy="140" r="1.5" />
        <circle cx="980" cy="70" r="1.2" />
        <circle cx="1150" cy="120" r="1.6" />
        <circle cx="1220" cy="300" r="1.1" />
        <circle cx="60" cy="420" r="1.3" />
        <circle cx="530" cy="640" r="1.2" />
        <circle cx="880" cy="600" r="1.4" />
      </g>
      <g fill="var(--color-gold)">
        <path d="M1060 210 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" opacity=".9" />
        <path d="M180 560 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" opacity=".7" />
      </g>
    </svg>
  );
}
