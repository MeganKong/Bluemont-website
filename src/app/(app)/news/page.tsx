// Owner: unassigned (to be split). Announcements at "/news".
//
// What this page will do (month 1 build plan):
// - Officers post news. Everyone signed in reads it, newest first.
// Done when: officers can post news and volunteers see it.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import { newsPosts } from "./_placeholder";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <SampleNote />
      <h1 className="font-display text-4xl font-semibold">News</h1>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl font-semibold">Post news (officers)</h2>
        <input placeholder="Title" className="rounded-lg border border-line bg-cream px-3 py-2" />
        <textarea placeholder="What's happening?" rows={3} className="rounded-lg border border-line bg-cream px-3 py-2" />
        <button className="self-start rounded-lg bg-navy px-5 py-2 font-semibold text-cream">Post</button>
      </section>

      {[...newsPosts].reverse().map((post) => (
        <article key={post.id} className="flex flex-col gap-2 rounded-2xl border border-line bg-card p-5">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-ink">{post.body}</p>
          <p className="text-sm text-muted">
            {post.author} · {post.postedAt}
          </p>
        </article>
      ))}
    </div>
  );
}
