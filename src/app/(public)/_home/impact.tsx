// Owner: Nika. The big impact numbers on a bright blue band. The same
// numbers are on the Impact page; change both together.
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import { eyebrowOnNight, heading, moreLinkOnNight, wrap } from "../_styles";

export const impactNumbers: { value: React.ReactNode; label: string }[] = [
  { value: "150+", label: "children reached" },
  { value: <Tbd>~80</Tbd>, label: "teen volunteers" },
  { value: "2", label: "school chapters" },
];

export function Impact() {
  return (
    <section className="bg-dusk text-card">
      <div className={`${wrap} flex flex-wrap items-center gap-12 py-20`}>
        <div className="flex min-w-0 flex-[1_1_280px] flex-col gap-3.5">
          <p className={eyebrowOnNight}>Our impact</p>
          <h2 className={heading}>Small hands, real results</h2>
          <Link href="/impact" className={moreLinkOnNight}>
            See where our plushies go →
          </Link>
        </div>
        <ImpactNumbers numbers={impactNumbers} />
      </div>
    </section>
  );
}

export function ImpactNumbers({ numbers }: { numbers: typeof impactNumbers }) {
  return (
    <dl className="grid min-w-0 flex-[2_1_540px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-y-6">
      {numbers.map((item) => (
        <div key={item.label} className="flex flex-col-reverse gap-0.5 border-l-[1.5px] border-night-line px-6">
          <dt className="font-semibold text-soft">{item.label}</dt>
          <dd className="font-serif text-6xl leading-none text-gold sm:text-7xl lg:text-8xl">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
