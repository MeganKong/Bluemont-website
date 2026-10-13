// Owner: unassigned (to be split). The About page at "/about".
//
// What this page will do (month 1 build plan):
// - Tell Bluemont's story, the two chapters, and where plushies go.
// Done when: Home, About and Sign in look finished.
import type { Metadata } from "next";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <SampleNote />
      <h1 className="font-display text-4xl font-semibold">About Bluemont</h1>
      <p className="text-lg text-ink">
        [To write: our story, the chapters at Rosemead HS and Blair HS, and where the
        plushies go.]
      </p>
    </div>
  );
}
