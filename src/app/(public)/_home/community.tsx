// Owner: Nika. A mock-up of the volunteer community space, where volunteers
// will share photos of plushies and talk to each other. Nothing here works
// yet; it only shows the idea. The posts come from _placeholder.ts.
import { communityPosts } from "../_placeholder";
import { buttonSoon, card, eyebrow, sectionTitle } from "./styles";

export function Community() {
  return (
    <section id="community" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Community</p>
        <h2 className={sectionTitle}>Crochet together</h2>
        <p className="max-w-2xl text-ink">
          Soon, volunteers will be able to share their plushies, swap tips and cheer each
          other on. Here&apos;s a preview.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {communityPosts.map((post) => (
          <article key={post.id} className={card}>
            {/* Empty spot where the volunteer's plushie photo would go. */}
            <div
              aria-hidden="true"
              className="grid aspect-[4/3] place-items-center rounded-2xl bg-sand text-sm text-muted"
            >
              Plushie photo
            </div>
            <p className="text-sm font-bold">{post.author}</p>
            <p className="flex-1 text-ink">{post.text}</p>
            <p className="text-sm text-muted">♥ {post.hearts}</p>
          </article>
        ))}
      </div>

      <span className={buttonSoon}>Community coming soon</span>
    </section>
  );
}
