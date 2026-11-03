// Owner: Megan (shared). The frame around every signed-in page: a short dark
// blue band with the page's label, heading and a line of text (like the top
// of the public pages, stars included), then the page's content below.
//
// <PortalPage eyebrow="Dashboard" title="Welcome back" lead="...">
//   ...cards...
// </PortalPage>
import Link from "next/link";
import { Stars } from "@/app/(public)/_page-top";
import { eyebrowOnNight } from "@/app/(public)/_styles";
import { focusRing } from "./portal-styles";

type PortalPageProps = {
  eyebrow: string;
  // The heading. Wrap words that should be honey in <em>.
  title: React.ReactNode;
  lead?: React.ReactNode;
  // A small "← Back" link above the label.
  back?: { href: string; label: string };
  // Buttons on the right of the band (under it on phones).
  actions?: React.ReactNode;
  // "narrow" for reading pages like one lesson or a form.
  width?: "wide" | "narrow";
  children?: React.ReactNode;
};

export function PortalPage({ eyebrow, title, lead, back, actions, width = "wide", children }: PortalPageProps) {
  // "wide" lines up with the header and footer.
  const maxWidth = width === "narrow" ? "max-w-3xl" : "max-w-6xl";

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-card">
        <Stars />
        <div
          className={`relative mx-auto flex ${maxWidth} flex-wrap items-end justify-between gap-x-8 gap-y-5 px-6 pt-6 pb-10 sm:pt-8 sm:pb-12`}
        >
          <div className="flex min-w-0 flex-col items-start gap-3">
            {back && (
              <Link href={back.href} className={`text-sm font-bold text-soft hover:text-gold ${focusRing}`}>
                ← {back.label}
              </Link>
            )}
            <p className={eyebrowOnNight}>{eyebrow}</p>
            <h1 className="font-serif text-4xl leading-none text-balance sm:text-5xl [&_em]:text-gold">{title}</h1>
            {lead && <p className="max-w-2xl text-lg text-soft">{lead}</p>}
          </div>
          {actions && <div className="flex w-full flex-wrap gap-3 sm:w-auto">{actions}</div>}
        </div>
      </section>
      {children && (
        <div className={`mx-auto flex w-full ${maxWidth} flex-col gap-8 px-6 py-10`}>{children}</div>
      )}
    </>
  );
}
