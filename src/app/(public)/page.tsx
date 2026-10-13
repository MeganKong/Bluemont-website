// Owner: Iris. The home page at "/".
import Link from "next/link";

const stats = [
  { value: "2", label: "school chapters" },
  { value: "~80", label: "volunteers crocheting" },
  { value: "501(c)(3)", label: "student-led nonprofit" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <h1 className="font-display text-5xl font-semibold leading-tight">
          Teens learn to crochet. <span className="text-terracotta">Kids get a friend.</span>
        </h1>
        <p className="max-w-2xl text-lg text-ink">
          Bluemont volunteers learn to crochet online, then make plushies for children
          in shelters.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/sign-up"
            className="rounded-lg bg-navy px-5 py-3 font-semibold text-cream"
          >
            Become a volunteer
          </Link>
          <Link
            href="/about"
            className="rounded-lg border border-navy px-5 py-3 font-semibold"
          >
            Learn about us
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-line bg-card p-6">
            <p className="font-display text-3xl font-semibold text-terracotta">
              {stat.value}
            </p>
            <p className="text-ink">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
