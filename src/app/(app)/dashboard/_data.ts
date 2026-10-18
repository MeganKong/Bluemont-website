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
