// Owner: Iris. Announcements at "/news".
import type { Metadata } from "next";
import { newsPosts } from "./_placeholder";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-display text-4xl font-semibold">News</h1>
      {newsPosts.map((post) => (
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
