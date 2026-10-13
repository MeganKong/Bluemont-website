// Owner: Iris. The About page at "/about".
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-display text-4xl font-semibold">About Bluemont</h1>
      <p className="text-lg text-ink">
        [Iris: our story, the chapters at Rosemead HS and Blair HS, and where the
        plushies go.]
      </p>
    </div>
  );
}
