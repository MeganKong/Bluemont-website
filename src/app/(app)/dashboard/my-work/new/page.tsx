// Owner: Megan (built by Adhya). Share a photo of your work, at
// "/dashboard/my-work/new".
//
// What this page will do:
// - A volunteer adds one photo of their crochet, picks a lesson (optional)
//   and writes a note (optional). Officers then see it and leave feedback.
// Done when: a volunteer can share a photo from their phone.
//
// The photo is shrunk in the browser first (which also removes hidden info
// like the location it was taken), then saved in the volunteer's own private
// folder. Only they and officers can see it.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getMyWork } from "@/lib/work/data";
import { lessonChoices } from "@/lib/work/format";
import { SampleNote } from "@/components/sample-note";
import { Message } from "@/components/work/message";
import { card, link, pageTitle } from "../../../lessons/_styles";
import { ShareForm } from "./share-form";

export const metadata: Metadata = { title: "Share my work" };

export default function ShareWorkPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <Link href="/dashboard/my-work" className={`${link} self-start text-sm`}>
        ← My work
      </Link>
      <div className="flex flex-col gap-1">
        <h1 className={pageTitle}>Share my work</h1>
        <p className="text-lg text-ink">Show officers what you made, and get tips to keep improving.</p>
      </div>
      <Suspense fallback={<p className="text-lg text-ink">Loading…</p>}>
        <ShareOrWait />
      </Suspense>
    </div>
  );
}

// Before the database is set up, there's nowhere to save photos yet.
async function ShareOrWait() {
  const { sample } = await getMyWork();
  if (sample) {
    return (
      <>
        <SampleNote />
        <Message kind="info">Sharing work opens soon. Check back in a few days!</Message>
      </>
    );
  }
  return (
    <div className={card}>
      <ShareForm lessons={lessonChoices} />
    </div>
  );
}
