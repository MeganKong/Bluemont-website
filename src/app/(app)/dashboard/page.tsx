// Owner: Sophia. The volunteer dashboard at "/dashboard":
// lesson progress, kit status and the latest news.
import type { Metadata } from "next";
import Link from "next/link";
import { lessons } from "../lessons/_placeholder";
import { kitRequests } from "../kits/_placeholder";
import { newsPosts } from "../news/_placeholder";

export const metadata: Metadata = { title: "Dashboard" };

// Placeholder until login works: pretend the volunteer finished 1 lesson
// and has the first kit request.
const lessonsDone = 1;
const myKit = kitRequests[0];

export default function DashboardPage() {
  const latestNews = newsPosts.at(-1);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-4xl font-semibold">Welcome back</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/lessons" className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-semibold text-terracotta">Lessons</p>
          <p className="font-display text-3xl font-semibold">
            {lessonsDone} of {lessons.length}
          </p>
          <p className="text-ink">complete</p>
        </Link>
        <Link href="/kits" className="rounded-2xl border border-line bg-card p-5">
          <p className="text-sm font-semibold text-terracotta">My kit</p>
          <p className="font-display text-3xl font-semibold capitalize">{myKit.kit}</p>
          <p className="text-ink">{myKit.status.replace("_", " ")}</p>
        </Link>
        {latestNews && (
          <Link href="/news" className="rounded-2xl border border-line bg-card p-5">
            <p className="text-sm font-semibold text-terracotta">Latest news</p>
            <p className="text-lg font-semibold">{latestNews.title}</p>
            <p className="text-ink">{latestNews.postedAt}</p>
          </Link>
        )}
      </div>
    </div>
  );
}
