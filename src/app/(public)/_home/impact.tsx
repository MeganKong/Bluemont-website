// Owner: Nika. The big impact numbers, on a navy band.
// Impact numbers from Megan (October 2026). Update them here when Megan
// sends new ones.
const stats = [
  { value: "2", label: "school chapters" },
  { value: "90+", label: "volunteers crocheting" },
  { value: "150+", label: "children reached" },
];

export function Impact() {
  return (
    <section aria-labelledby="impact-title" className="rounded-3xl bg-navy px-6 py-8 text-cream">
      <h2 id="impact-title" className="mb-6 font-display text-2xl font-semibold">
        Our impact so far
      </h2>
      {/* One column on phones, three side by side on wider screens. */}
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <p className="font-display text-5xl font-semibold text-gold">{stat.value}</p>
            <p className="font-semibold">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
