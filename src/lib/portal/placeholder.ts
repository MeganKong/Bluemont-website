// Owner: Megan (shared; built by Adhya). SAMPLE DATA for the signed-in pages,
// shown only until the database step is done (npx supabase db push, see
// supabase/migrations/*_volunteer_portal.sql). After that, ./data.ts reads
// the real tables and this file is no longer used; it can be deleted.
// Dates are worked out on each visit, counted from today, so they never go
// stale. No real names. Sample ids start with "sample-", so nothing tries to save them.
import type { CheckIn, KitRequest, MeetingRsvp, NewsPost, ServiceHoursEntry, StockItem } from "@/lib/types";

// "YYYY-MM-DD", some days from today.
function daysFromNow(days: number) {
  return new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
}

// The volunteer has finished lesson 1 and hasn't asked for a kit yet.
export const sampleDoneLessons = ["slip-knot-and-chain"];
export const sampleMyKit: KitRequest | null = null;

export const sampleMyHours = (): ServiceHoursEntry[] => [
  {
    id: "sample-h3",
    volunteerName: "Volunteer A",
    activity: "Practice swatches at home",
    hours: 1.5,
    workedOn: daysFromNow(-2),
    status: "pending",
    reviewedBy: null,
  },
  {
    id: "sample-h2",
    volunteerName: "Volunteer A",
    activity: "Plushie making day",
    hours: 3,
    workedOn: daysFromNow(-9),
    status: "approved",
    reviewedBy: "Officer A",
  },
  {
    id: "sample-h1",
    volunteerName: "Volunteer A",
    activity: "Crochet circle",
    hours: 2,
    workedOn: daysFromNow(-16),
    status: "approved",
    reviewedBy: "Officer A",
  },
];

export const sampleNews = (): NewsPost[] => [
  {
    id: "sample-n2",
    title: "Kit pickup at the park",
    body: "Approved starter kits can be picked up at the park, 10am to noon.",
    author: "Officer A",
    postedAt: `${daysFromNow(-1)}T17:00:00Z`,
    eventDate: daysFromNow(3),
  },
  {
    id: "sample-n1",
    title: "Welcome to the new Bluemont site",
    body: "Start with lesson 1. Your starter kit unlocks when you finish it.",
    author: "Officer B",
    postedAt: `${daysFromNow(-8)}T17:00:00Z`,
    eventDate: null,
  },
];

// ── Officers ────────────────────────────────────────────────────────────

export const sampleKitRequests = (): KitRequest[] => [
  { id: "sample-k1", volunteerName: "Volunteer A", kit: "starter", status: "pending", requestedAt: `${daysFromNow(-1)}T18:00:00Z` },
  { id: "sample-k2", volunteerName: "Volunteer B", kit: "starter", status: "approved", requestedAt: `${daysFromNow(-3)}T18:00:00Z` },
  { id: "sample-k3", volunteerName: "Volunteer C", kit: "starter", status: "picked_up", requestedAt: `${daysFromNow(-9)}T18:00:00Z` },
];

export const sampleHoursToApprove = (): ServiceHoursEntry[] => [
  { id: "sample-a1", volunteerName: "Volunteer A", activity: "Crochet circle", hours: 2, workedOn: daysFromNow(-4), status: "pending", reviewedBy: null },
  { id: "sample-a2", volunteerName: "Volunteer B", activity: "Plushie making day", hours: 3, workedOn: daysFromNow(-3), status: "pending", reviewedBy: null },
];

export const sampleStock: StockItem[] = [
  { id: "sample-s1", name: "Yarn skeins (worsted)", quantity: 42, lowStockAt: 20 },
  { id: "sample-s2", name: "Crochet hooks (5 mm)", quantity: 8, lowStockAt: 10 },
  { id: "sample-s3", name: "Safety eyes (pairs)", quantity: 60, lowStockAt: 25 },
  { id: "sample-s4", name: "Stuffing (bags)", quantity: 3, lowStockAt: 5 },
];

export const sampleCheckIns = (): CheckIn[] => [
  {
    id: "sample-c1",
    officerId: null,
    officerName: "Officer A",
    week: daysFromNow(-7),
    done: "Set up my pages with placeholder data",
    next: "Connect my page to the database",
  },
];

export const sampleRsvps: MeetingRsvp[] = [{ officerId: "sample-o1", officerName: "Officer A", going: true }];
