// Owner: Nika. The big impact numbers, on a blue band, each in its own color.
import Link from "next/link";

// Impact numbers from Megan (October 2026). Update them here when Megan
// sends new ones.
const stats = [
  { value: "2", label: "school chapters", color: "text-gold" },
  { value: "90+", label: "volunteers crocheting", color: "text-pink-pale" },
  { value: "150+", label: "children reached", color: "text-mint-pale" },
];

export function Impact() {
  return (
    <section aria-labelledby="impact-title" className="rounded-3xl bg-blue px-6 py-8 text-card">
      <h2 id="impact-title" className="mb-6 font-display text-2xl font-extrabold">
        Our impact so far
      </h2>
      {/* One column on phones, three side by side on wider screens. */}
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <p className={`font-display text-5xl font-extrabold ${stat.color}`}>{stat.value}</p>
            <p className="font-bold">{stat.label}</p>
          </div>
        ))}
      </div>
      <Link
        href="/donations"
        className="mt-6 inline-block font-extrabold text-gold underline underline-offset-4 focus-visible:outline-4 focus-visible:outline-gold"
      >
        See who we&apos;ve donated to →
      </Link>
    </section>
  );
}
