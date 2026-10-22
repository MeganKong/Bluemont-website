// Owner: Megan (built by Adhya). PLACEHOLDER DATA: swap these for Supabase.
//
// Everything the officer dashboard shows comes from the four functions below.
// Today they return fake data. To connect real data, rewrite the inside of
// each function to ask Supabase (see the "Real data" note on each). The page
// itself won't need to change.
//
// Each function checks the role first, so officer data is only ever read for
// officers, even if someone reuses a function on another page.
// The "_" at the start of the file name keeps it from becoming a web page.
import type { KitRequest, NewsPost, StockItem } from "@/lib/types";
import { getMyRole } from "@/lib/roles";
import { newsPosts } from "../news/_placeholder";
import { kitRequests, stock } from "../kits/_placeholder";

async function officersOnly() {
  if ((await getMyRole()) !== "officer") throw new Error("Officers only");
}

// Megan can move these shapes into src/lib/types.ts when the real tables are made.
export type HoursToApprove = {
  id: string;
  volunteerName: string;
  activity: string;
  hours: number;
  loggedAt: string; // "YYYY-MM-DD"
};

export type UpcomingItem = {
  id: string;
  kind: "Lesson" | "Event";
  title: string;
  date: string; // "YYYY-MM-DD"
};

// FAKE: made-up hours waiting for an officer to approve. No real names.
const fakeHours: HoursToApprove[] = [
  { id: "a1", volunteerName: "Volunteer A", activity: "Crochet circle", hours: 2, loggedAt: "2026-10-18" },
  { id: "a2", volunteerName: "Volunteer B", activity: "Plushie making day", hours: 3, loggedAt: "2026-10-19" },
  { id: "a3", volunteerName: "Volunteer C", activity: "Practice swatches at home", hours: 1.5, loggedAt: "2026-10-20" },
];

// Oldest first, so nobody waits too long.
// Real data: read service hours that are still waiting for approval.
export async function getHoursToApprove(): Promise<HoursToApprove[]> {
  await officersOnly();
  return [...fakeHours].sort((a, b) => a.loggedAt.localeCompare(b.loggedAt));
}

// FAKE: made-up dates.
const fakeUpcoming: UpcomingItem[] = [
  { id: "u1", kind: "Lesson", title: "Single crochet", date: "2026-10-24" },
  { id: "u2", kind: "Event", title: "Kit pickup at the park", date: "2026-10-25" },
  { id: "u3", kind: "Lesson", title: "Magic ring", date: "2026-10-31" },
  { id: "u4", kind: "Event", title: "Plushie making day", date: "2026-11-08" },
];

// Soonest first. Real data: read upcoming lessons and events from Supabase.
export async function getUpcoming(limit = 4): Promise<UpcomingItem[]> {
  await officersOnly();
  return [...fakeUpcoming].sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
}

// Kit requests still waiting, and supplies that are running low.
// Real data: read pending kit requests and the stock table.
export async function getKitsAndStock(): Promise<{ waiting: KitRequest[]; lowStock: StockItem[] }> {
  await officersOnly();
  return {
    waiting: kitRequests.filter((request) => request.status === "pending"),
    lowStock: stock.filter((item) => item.quantity <= item.lowStockAt),
  };
}

// Newest first. Real data: read the latest posts from the news table.
export async function getLatestAnnouncements(limit = 2): Promise<NewsPost[]> {
  await officersOnly();
  return [...newsPosts].sort((a, b) => b.postedAt.localeCompare(a.postedAt)).slice(0, limit);
}
