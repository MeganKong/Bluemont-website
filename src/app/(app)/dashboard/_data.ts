// Owner: Megan (built by Adhya). Works out where a volunteer is in their
// journey (Learn → Kit → Make → Send), from their real lessons, kit and
// shared work (src/lib/portal/data.ts and src/lib/work/data.ts).
// The "_" at the start of the file name keeps it from becoming a web page.
import type { KitRequest, Lesson, Submission } from "@/lib/types";
import { getMyKit, getMyLessons } from "@/lib/portal/data";
import { getMyWork } from "@/lib/work/data";
import { lessons } from "../lessons/_placeholder";

export type JourneyStep = {
  id: "learn" | "kit" | "make" | "send";
  label: string;
  done: boolean;
};

export type Progress = {
  steps: JourneyStep[];
  // The first step that isn't done, or null when they've done them all.
  current: JourneyStep["id"] | null;
  lessonsDone: number;
  nextLesson: Lesson | null;
  // Kits unlock after lesson 1.
  kitUnlocked: boolean;
  kit: KitRequest | null;
  work: Submission[];
  sample: boolean;
};

const inOrder = [...lessons].sort((a, b) => a.order - b.order);

export async function getProgress(): Promise<Progress> {
  const [myLessons, myKit, myWork] = await Promise.all([getMyLessons(), getMyKit(), getMyWork()]);
  const done = new Set(myLessons.done);
  const nextLesson = inOrder.find((lesson) => !done.has(lesson.id)) ?? null;
  const kit = myKit.kit;
  const pickedUp = kit?.status === "picked_up";

  // Learn: every lesson finished. Kit: picked up. Make: an officer approved
  // something they shared, once they have their kit. Send has no tracking
  // yet, so it's never done.
  const steps: JourneyStep[] = [
    { id: "learn", label: "Learn", done: nextLesson === null },
    { id: "kit", label: "Kit", done: pickedUp },
    { id: "make", label: "Make", done: pickedUp && myWork.submissions.some((s) => s.status === "approved") },
    { id: "send", label: "Send", done: false },
  ];

  return {
    steps,
    current: steps.find((step) => !step.done)?.id ?? null,
    lessonsDone: inOrder.filter((lesson) => done.has(lesson.id)).length,
    nextLesson,
    kitUnlocked: inOrder.length > 0 && done.has(inOrder[0].id),
    kit,
    work: myWork.submissions,
    sample: myLessons.sample || myKit.sample || myWork.sample,
  };
}
