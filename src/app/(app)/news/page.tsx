// Owner: unassigned (to be split). Updates at "/news".
//
// What this page will do (month 1 build plan):
// - Officers post news. Everyone signed in reads it, newest first.
// - A post can have an event date (a pickup, a making day). Those also show
//   under "Coming up" on the dashboards.
// Done when: officers can post news and volunteers see it.
//
// Data and saving: src/lib/portal/data.ts and actions.ts (sample data until
// the database step is done). Only officers see the post form and Delete,
// and the database only lets officers post or delete.
import type { Metadata } from "next";
import { Suspense } from "react";
import { getMyRole } from "@/lib/roles";
import { deleteNews, postNews } from "@/lib/portal/actions";
import { getNews } from "@/lib/portal/data";
import { formatEventDay } from "@/lib/portal/format";
import { formatDate } from "@/lib/work/format";
import { ActionForm } from "@/components/action-form";
import { DateBox } from "@/components/date-box";
import { PortalPage } from "@/components/portal-page";
import { card, field, hint, label, smallButton, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Updates" };

export default function NewsPage() {
  return (
    <PortalPage eyebrow="Updates" title="News and events" lead="The latest from Bluemont's officers." width="narrow">
      <Suspense fallback={<div className={`${card} min-h-48`} />}>
        <News />
      </Suspense>
    </PortalPage>
  );
}

async function News() {
  const [{ posts, sample }, role] = await Promise.all([getNews(), getMyRole()]);
  const isOfficer = role === "officer";

  return (
    <>
      {sample && <SampleNote />}
      {isOfficer && <PostForm />}

      {posts.length === 0 ? (
        <p className="text-ink">No updates yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id}>
              <article className={`${card} flex items-start gap-4`}>
                {post.eventDate && <DateBox date={post.eventDate} />}
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h2 className="font-serif text-3xl leading-tight">{post.title}</h2>
                  {post.eventDate && <p className="font-bold text-blue">{formatEventDay(post.eventDate)}</p>}
                  <p className="whitespace-pre-line text-ink">{post.body}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted">
                      {post.author} · <time dateTime={post.postedAt}>{formatDate(post.postedAt)}</time>
                    </p>
                    {isOfficer && (
                      <ActionForm action={deleteNews}>
                        <input type="hidden" name="id" value={post.id} />
                        <button type="submit" className={smallButton} aria-label={`Delete "${post.title}"`}>
                          Delete
                        </button>
                      </ActionForm>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// Officers only. Folded shut until they open it, so the page stays tidy.
function PostForm() {
  return (
    <details className={`${card} group`}>
      <summary className="cursor-pointer list-none font-bold text-blue">
        <span className="group-open:hidden">+ Post an update</span>
        <span className="hidden group-open:inline">Post an update</span>
      </summary>
      <ActionForm action={postNews} done="Posted." className="mt-4 flex flex-col gap-4">
        <label className={label}>
          Title
          <input name="title" required maxLength={80} className={field} />
        </label>
        <label className={label}>
          Message
          <textarea name="body" required rows={3} maxLength={1000} className={field} />
        </label>
        <label className={label}>
          Event date (optional)
          <input name="eventDate" type="date" className={`${field} sm:max-w-60`} />
          <span className={hint}>For pickups and making days. It shows under &ldquo;Coming up&rdquo;.</span>
        </label>
        <button type="submit" className={`${smallButtonMain} self-start`}>
          Post
        </button>
      </ActionForm>
    </details>
  );
}
