// Owner: Megan (built by Adhya). The frame around the sign-in, sign-up and
// new-password pages: the same dark blue top as the public pages (label,
// big heading, stars), with the white form card overlapping its bottom edge.
import { Stars } from "../(public)/_page-top";
import { eyebrowOnNight } from "../(public)/_styles";
import { card } from "./_styles";

type AuthPageProps = {
  eyebrow: string;
  // The heading. Wrap the words that should be honey in <em>.
  title: React.ReactNode;
  lead: React.ReactNode;
  // The form, inside the white card.
  children: React.ReactNode;
  // A line under the card, e.g. "New here? Create an account".
  below?: React.ReactNode;
};

export function AuthPage({ eyebrow, title, lead, children, below }: AuthPageProps) {
  return (
    <main className="flex w-full flex-1 flex-col">
      <section className="relative overflow-hidden bg-navy text-card">
        <Stars />
        <div className="relative mx-auto flex max-w-xl flex-col items-center gap-4 px-6 pt-8 pb-36 text-center sm:pt-12">
          <p className={eyebrowOnNight}>{eyebrow}</p>
          <h1 className="font-serif text-5xl leading-none text-balance sm:text-6xl [&_em]:text-gold">
            {title}
          </h1>
          <p className="text-lg text-soft">{lead}</p>
        </div>
      </section>
      <div className="relative mx-auto -mt-28 flex w-full max-w-md flex-col gap-6 px-4 pb-20 sm:pb-24">
        <div className={card}>{children}</div>
        {below && <p className="text-center text-ink">{below}</p>}
      </div>
    </main>
  );
}
