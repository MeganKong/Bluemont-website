// Owner: Megan (built by Adhya). PLACEHOLDER DATA: swap these for Supabase.
//
// Everything the dashboard shows comes from the four functions below. Today
// they return fake data. To connect real data, rewrite the inside of each
// function to ask Supabase for the signed-in volunteer's rows (see the "Real
// data" note on each). The page itself won't need to change.
// The "_" at the start of the file name keeps it from becoming a web page.
import type { KitRequest, Lesson, NewsPost } from "@/lib/types";
import { lessons } from "../lessons/_placeholder";
import { newsPosts } from "../news/_placeholder";
import { kitRequests } from "../kits/_placeholder";

// The shape of service hours. Megan can move it into src/lib/types.ts when the
// real table is made.
export type ServiceHoursEntry = {
  id: string;
  activity: string;
  hours: number;
  loggedAt: string; // "YYYY-MM-DD"
};

export type ServiceHours = {
  total: number;
  goal: number;
  entries: ServiceHoursEntry[];
};

// FAKE: pretend this volunteer has finished lesson 1.
const completedLessonIds = ["slip-knot-and-chain"];

// The first lesson (in order) they haven't finished, or null if they've done them all.
// Real data: read the volunteer's finished lessons from Supabase.
export async function getNextLesson(): Promise<Lesson | null> {
  const inOrder = [...lessons].sort((a, b) => a.order - b.order);
  return inOrder.find((lesson) => !completedLessonIds.includes(lesson.id)) ?? null;
}

// FAKE: made-up hours. The goal of 10 is a placeholder for Megan to set.
const fakeEntries: ServiceHoursEntry[] = [
  { id: "h1", activity: "Crochet circle", hours: 2, loggedAt: "2026-10-05" },
  { id: "h2", activity: "Practice swatches at home", hours: 1.5, loggedAt: "2026-10-09" },
  { id: "h3", activity: "Plushie making day", hours: 3, loggedAt: "2026-10-12" },
];

// Real data: sum the volunteer's logged hours from Supabase.
export async function getServiceHours(): Promise<ServiceHours> {
  const total = fakeEntries.reduce((sum, entry) => sum + entry.hours, 0);
  return { total, goal: 10, entries: fakeEntries };
}

// Newest first. Real data: read the latest posts from the news table.
export async function getAnnouncements(limit = 3): Promise<NewsPost[]> {
  return [...newsPosts].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, limit);
}

// FAKE: pretend this volunteer's kit request is the approved one.
// Real data: read the signed-in volunteer's latest kit request.
export async function getMyKit(): Promise<KitRequest | null> {
  return kitRequests.find((request) => request.status === "approved") ?? null;
}

// The four steps of a volunteer's journey, in order. The officer check-in
// happens between Make and Send, but isn't shown as a step.
export type JourneyStep = {
  id: "learn" | "kit" | "make" | "send";
  label: string;
  done: boolean;
};

// Learn is done once every lesson is finished, Kit once it's picked up.
// FAKE: Make and Send are never done yet. Real data: Make is done when an
// officer approves their plushie, Send when it's delivered to a shelter.
export async function getJourney(): Promise<JourneyStep[]> {
  const [nextLesson, kit] = await Promise.all([getNextLesson(), getMyKit()]);
  return [
    { id: "learn", label: "Learn", done: nextLesson === null },
    { id: "kit", label: "Kit", done: kit?.status === "picked_up" },
    { id: "make", label: "Make", done: false },
    { id: "send", label: "Send", done: false },
  ];
}

// FAKE: a made-up due date. Real data: the volunteer's next due date, set
// by an officer.
export async function getNextDeadline(): Promise<{ what: string; due: string } | null> {
  return { what: "Plushie due", due: "2026-11-09" };
}
