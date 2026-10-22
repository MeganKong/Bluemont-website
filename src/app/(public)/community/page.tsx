// Owner: Nika (approved by Megan). The Community page at "/community".
//
// What this page will do:
// - Show a gallery of plushies our volunteers made.
// - Later: let signed-in volunteers post photos and messages.
// Done when: the gallery has real photos and posting is planned with Megan.
//
// Gallery photos: plushies and hands are fine, but no children's faces,
// names, or anything that shows which shelter they're at.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";
import { buttonSoon, card, eyebrow, pageHero, pageTitle, sectionTitle, tints } from "../_styles";
import { communityPosts, galleryPhotos } from "./_placeholder";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <div className="flex flex-col gap-14">
      <SampleNote />
      <section className={pageHero}>
        <p className={eyebrow}>Community</p>
        <h1 className={pageTitle}>Crochet together</h1>
        <p className="max-w-2xl text-lg">
          See what our volunteers are making, swap tips and cheer each other on.
        </p>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className={eyebrow}>Gallery</p>
          <h2 className={sectionTitle}>Made by our volunteers</h2>
        </div>
        {/* Two photos per row on phones, three on wider screens. */}
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryPhotos.map((photo, index) => (
            <li
              key={photo.id}
              className={`grid aspect-square place-items-center rounded-3xl border-2 border-dashed border-navy p-3 text-center text-sm text-muted ${tints[index % tints.length]}`}
            >
              {photo.label} coming soon
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className={eyebrow}>Volunteer posts</p>
          <h2 className={sectionTitle}>What volunteers are sharing</h2>
          <p className="max-w-2xl text-ink">
            A preview of what posts could look like. These are made up.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {communityPosts.map((post, index) => (
            <article key={post.id} className={card}>
              {/* Empty spot where the volunteer's plushie photo would go. */}
              <div
                aria-hidden="true"
                className={`grid aspect-[4/3] place-items-center rounded-2xl text-sm text-muted ${tints[index % tints.length]}`}
              >
                Plushie photo
              </div>
              <p className="text-sm font-extrabold">{post.author}</p>
              <p className="flex-1 text-ink">{post.text}</p>
              <p className="text-sm font-bold text-blue">♥ {post.hearts}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${card} bg-lilac-pale sm:flex-row sm:items-center sm:justify-between`}>
        <div className="flex flex-col gap-1">
          <h2 className="font-display text-2xl font-extrabold">Made a plushie?</h2>
          <p className="text-ink">Volunteers will sign in to post photos and messages.</p>
        </div>
        <span className={buttonSoon}>Posting coming soon</span>
      </section>
    </div>
  );
}
