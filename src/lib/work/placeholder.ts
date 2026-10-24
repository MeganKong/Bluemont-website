// Owner: Megan (shared; built by Adhya). SAMPLE DATA for shared work and
// feedback, shown only until the database step is done
// (npx supabase db push). After that, ./data.ts reads the real tables and
// this file is no longer used; it can be deleted.
// The photos are the free stock photos from the public pages. No real names.
import crochetBunny from "@/app/(public)/_images/crochet-bunny.jpg";
import crochetTiger from "@/app/(public)/_images/crochet-tiger.jpg";
import yarnAndHook from "@/app/(public)/_images/pink-yarn-and-hook.jpg";
import yarnBasket from "@/app/(public)/_images/yarn-basket.jpg";
import type { Submission } from "@/lib/types";

// Sample feedback written by "you", so officers can see Edit and Delete.
export const SAMPLE_ME = "sample-you";

export const sampleSubmissions: Submission[] = [
  {
    id: "sample-1",
    volunteerName: "Volunteer A",
    lessonId: "magic-ring",
    photoUrl: crochetBunny.src,
    note: "My first bunny! The ears came out a bit floppy.",
    status: null,
    createdAt: "2026-10-23T18:20:00Z",
    feedback: [],
  },
  {
    id: "sample-2",
    volunteerName: "Volunteer B",
    lessonId: "single-crochet",
    photoUrl: crochetTiger.src,
    note: "I tried stripes this time.",
    status: "approved",
    createdAt: "2026-10-22T16:05:00Z",
    feedback: [
      {
        id: "sample-f1",
        officerId: "sample-officer",
        officerName: "Officer A",
        kind: "comment",
        body: "The stripes look amazing, and your stitches are nice and even. A child is going to love this!",
        createdAt: "2026-10-22T20:10:00Z",
        editedAt: null,
        seenAt: "2026-10-23T15:00:00Z",
        thankedAt: "2026-10-23T15:01:00Z",
      },
      {
        id: "sample-f2",
        officerId: SAMPLE_ME,
        officerName: "Officer B",
        kind: "tip",
        body: "Next time, try stuffing a little more firmly so it keeps its shape after lots of hugs.",
        createdAt: "2026-10-23T09:30:00Z",
        editedAt: null,
        seenAt: null,
        thankedAt: null,
      },
    ],
  },
  {
    id: "sample-3",
    volunteerName: "Volunteer C",
    lessonId: "slip-knot-and-chain",
    photoUrl: yarnAndHook.src,
    note: null,
    status: "needs_changes",
    createdAt: "2026-10-21T19:45:00Z",
    feedback: [
      {
        id: "sample-f3",
        officerId: "sample-officer",
        officerName: "Officer A",
        kind: "tip",
        body: "Great start! Your chain is a little tight. Try holding the yarn more loosely and share another photo.",
        createdAt: "2026-10-22T08:15:00Z",
        editedAt: null,
        seenAt: null,
        thankedAt: null,
      },
    ],
  },
  {
    id: "sample-4",
    volunteerName: "Volunteer A",
    lessonId: null,
    photoUrl: yarnBasket.src,
    note: "Practice swatches from this week.",
    status: null,
    createdAt: "2026-10-20T14:00:00Z",
    feedback: [],
  },
];

// What a sample volunteer sees on "My work".
export const sampleMyWork = sampleSubmissions.filter(
  (submission) => submission.id === "sample-2" || submission.id === "sample-3",
);
