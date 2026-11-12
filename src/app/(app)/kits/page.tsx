// Owner: Adhya. A volunteer's kit at "/kits".
//
// What this page will do (month 1 build plan):
// - Volunteers request a starter kit. The button stays locked until lesson 1 is done.
// - Officers approve requests on their own page (/kits/requests).
// Done when: a kit unlocks after lesson 1 and an officer approves it.
//
// Data and saving: src/lib/portal/data.ts and actions.ts (sample data until
// the database step is done).
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { KitRequest } from "@/lib/types";
import { cancelKit, requestKit } from "@/lib/portal/actions";
import { getComingUp, getMyKit, getMyLessons } from "@/lib/portal/data";
import { formatEventDay } from "@/lib/portal/format";
import { formatDate } from "@/lib/work/format";
import { ActionForm } from "@/components/action-form";
import { IfOfficer } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { buttonMain, buttonSecondary, card, eyebrow, sectionTitle, smallButton } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { lessons } from "../lessons/_placeholder";

export const metadata: Metadata = { title: "My kit" };

const inside = ["Yarn", "A crochet hook", "Stuffing", "Safety eyes"];

export default function KitsPage() {
  return (
    <PortalPage
      eyebrow="My kit"
      title="Your crochet kit"
      lead="Everything you need for your first plushie, free."
      width="narrow"
      actions={
        // Approving kits is on the officers' own page.
        <IfOfficer>
          <Link href="/kits/requests" className={buttonMain}>
            Kit requests
          </Link>
        </IfOfficer>
      }
    >
      {/* Their kit is looked up per visit, so it loads in a boundary. */}
      <Suspense fallback={<div className={`${card} min-h-64`} />}>
        <MyKit />
      </Suspense>
    </PortalPage>
  );
}

async function MyKit() {
  const [{ done, sample: s1 }, { kit, sample: s2 }, { events }] = await Promise.all([
    getMyLessons(),
    getMyKit(),
    getComingUp(1),
  ]);
  const firstLesson = [...lessons].sort((a, b) => a.order - b.order)[0];
  const unlocked = firstLesson ? done.includes(firstLesson.id) : false;
  const event = events[0];

  return (
    <>
      {(s1 || s2) && <SampleNote />}
      <section aria-labelledby="kit" className={`${card} flex flex-col items-start gap-4`}>
        <h2 id="kit" className={eyebrow}>
          Starter kit
        </h2>

        {kit && kit.status !== "picked_up" ? (
          <>
            <p className={sectionTitle}>
              {kit.status === "pending" ? "Waiting for an officer to approve it" : "Ready to pick up"}
            </p>
            <Timeline status={kit.status} />
            <p className="text-ink">
              {kit.status === "pending"
                ? `You asked on ${formatDate(kit.requestedAt)}. You'll see it here as soon as it's approved.`
                : event
                  ? `Pick it up at ${event.title}, ${formatEventDay(event.eventDate!)}.`
                  : "Officers will post the pickup time under Updates."}
            </p>
            {kit.status === "pending" && (
              <ActionForm action={cancelKit}>
                <input type="hidden" name="id" value={kit.id} />
                <button type="submit" className={smallButton}>
                  Cancel request
                </button>
              </ActionForm>
            )}
          </>
        ) : kit ? (
          <>
            <p className={sectionTitle}>You have your kit</p>
            <Timeline status={kit.status} />
            <p className="text-ink">Next: make your plushie, then share a photo so an officer can check it.</p>
            <Link href="/dashboard/my-work/new" className={buttonMain}>
              Share my work
            </Link>
          </>
        ) : (
          <>
            <p className={sectionTitle}>{unlocked ? "Your kit is unlocked" : "Locked for now"}</p>
            <ul className="grid w-full gap-2 text-ink sm:grid-cols-2">
              {inside.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-blue" />
                  {item}
                </li>
              ))}
            </ul>
            {unlocked ? (
              <ActionForm action={requestKit} className="flex w-full flex-col items-start gap-3">
                <button type="submit" className={`${buttonMain} mt-2`}>
                  Request my kit
                </button>
              </ActionForm>
            ) : (
              <>
                <p className="text-ink">Finish lesson 1 to unlock your starter kit.</p>
                {firstLesson && (
                  <Link href={`/lessons/${firstLesson.id}`} className={buttonSecondary}>
                    Go to lesson 1
                  </Link>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  );
}

// Requested → Approved → Picked up, with the finished ones checked.
function Timeline({ status }: { status: KitRequest["status"] }) {
  const reached = { pending: 1, approved: 2, picked_up: 3 }[status];
  const stages = ["Requested", "Approved", "Picked up"];

  return (
    <ol className="flex w-full flex-wrap gap-x-6 gap-y-2">
      {stages.map((stage, i) => {
        const done = i < reached;
        return (
          <li key={stage} className={`flex items-center gap-2 text-[15px] ${done ? "font-bold" : "text-muted"}`}>
            <span
              aria-hidden="true"
              className={`grid size-5 place-items-center rounded-full text-[11px] ${
                done ? "bg-blue text-card" : "border-2 border-line"
              }`}
            >
              {done && "✓"}
            </span>
            {stage}
            <span className="sr-only">{done ? " (done)" : ""}</span>
          </li>
        );
      })}
    </ol>
  );
}
