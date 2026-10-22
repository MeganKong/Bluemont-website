// Owner: Nika. A teaser for the free lessons, linking to the Lessons page.
// Visitors who aren't signed in are sent to sign in first, then to Lessons.
import Link from "next/link";
import { buttonMain, card, eyebrow } from "./styles";

export function FreeLessons() {
  return (
    <section id="free-lessons" className={`${card} gap-4 sm:flex-row sm:items-center sm:justify-between`}>
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Free lessons</p>
        <h2 className="font-display text-3xl font-semibold">Never crocheted before? Start here.</h2>
        <p className="max-w-xl text-ink">
          Short video lessons take you from your first stitch to a finished plushie. Free
          for every volunteer.
        </p>
      </div>
      <Link href="/lessons" className={`${buttonMain} shrink-0`}>
        See the lessons
      </Link>
    </section>
  );
}
