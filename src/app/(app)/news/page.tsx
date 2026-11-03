// Owner: unassigned (to be split). Announcements at "/news".
//
// What this page will do (month 1 build plan):
// - Officers post news. Everyone signed in reads it, newest first.
// Done when: officers can post news and volunteers see it.
import type { Metadata } from "next";
import { IfOfficer } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card, eyebrow, field, hint, label, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { newsPosts } from "./_placeholder";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <PortalPage eyebrow="News" title="Announcements" lead="The latest from Bluemont's officers." width="narrow">
      <SampleNote />

      {/* Only officers post news. */}
      <IfOfficer>
        <section aria-labelledby="post" className={`${card} flex flex-col gap-4`}>
          <h2 id="post" className={eyebrow}>
            Post news
          </h2>
          <label className={label}>
            Title
            <input name="title" maxLength={80} className={field} />
          </label>
          <label className={label}>
            Message
            <textarea name="body" rows={3} maxLength={500} className={field} />
          </label>
          <button disabled className={`${smallButtonMain} self-start`}>
            Post
          </button>
          <p className={hint}>Posting starts working once news is saved in the database.</p>
        </section>
      </IfOfficer>

      <ul className="flex flex-col gap-4">
        {[...newsPosts].reverse().map((post) => (
          <li key={post.id}>
            <article className={`${card} flex flex-col gap-2`}>
              <p className="text-sm text-muted">
                {post.postedAt} · {post.author}
              </p>
              <h2 className="font-serif text-3xl leading-tight">{post.title}</h2>
              <p className="text-ink">{post.body}</p>
            </article>
          </li>
        ))}
      </ul>
    </PortalPage>
  );
}
