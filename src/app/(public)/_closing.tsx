// Owner: Nika. The blue band at the bottom of a page with a last nudge,
// e.g. "Want to be part of it?" and one or two buttons.
import { wrap } from "./_styles";

type ClosingProps = {
  title: string;
  text?: string;
  // The buttons.
  children: React.ReactNode;
};

export function Closing({ title, text, children }: ClosingProps) {
  return (
    <section className="bg-dusk text-card">
      <div className={`${wrap} flex flex-wrap items-center justify-between gap-6 py-16`}>
        <div className="flex max-w-xl flex-col gap-2">
          <h2 className="font-serif text-4xl leading-none text-balance sm:text-5xl">{title}</h2>
          {text && <p className="text-soft">{text}</p>}
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}
