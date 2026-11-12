// Owner: Megan (shared; built by Adhya). Reads what the signed-in pages show:
// lesson progress, kits, hours, news, and the officers' check-ins and stock.
// Only use this in server code. Shared work lives in src/lib/work/data.ts.
//
// The database's privacy rules decide what each person gets back (see
// supabase/migrations/*_volunteer_portal.sql): volunteers only ever receive
// their own progress, kit and hours, whatever this code asks for.
//
// Until the database step is done (npx supabase db push), the tables don't
// exist yet. Then these return the sample data from ./placeholder.ts with
// sample: true, the pages show "Sample page · fake data", and saving is off.
import type { PostgrestError } from "@supabase/supabase-js";
import { connection } from "next/server";
import type { CheckIn, KitRequest, MeetingRsvp, NewsPost, ServiceHoursEntry, StockItem } from "@/lib/types";
import { getMyRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";
import {
  sampleCheckIns,
  sampleDoneLessons,
  sampleHoursToApprove,
  sampleKitRequests,
  sampleMyHours,
  sampleMyKit,
  sampleNews,
  sampleRsvps,
  sampleStock,
} from "./placeholder";

// ── Volunteers ──────────────────────────────────────────────────────────

// The ids of the lessons they've marked complete.
export async function getMyLessons(): Promise<{ done: string[]; sample: boolean }> {
  const { supabase, myId } = await connect();
  if (!myId) return { done: [], sample: false };

  const { data, error } = await supabase.from("lesson_progress").select("lesson_id").eq("volunteer_id", myId);
  const { rows, sample } = settle(data, error, (row: { lesson_id: string }) => row.lesson_id, sampleDoneLessons, "lessons");
  return { done: rows, sample };
}

// Their newest kit request, or null if they haven't asked for one.
export async function getMyKit(): Promise<{ kit: KitRequest | null; sample: boolean }> {
  const { supabase, myId } = await connect();
  if (!myId) return { kit: null, sample: false };

  const { data, error } = await supabase
    .from("kit_requests")
    .select(kitColumns)
    .eq("volunteer_id", myId)
    .order("requested_at", { ascending: false })
    .limit(1);
  const { rows, sample } = settle(data, error, toKit, sampleMyKit ? [sampleMyKit] : [], "your kit");
  return { kit: rows[0] ?? null, sample };
}

// Every hour they've logged, newest first.
export async function getMyHours(): Promise<{ entries: ServiceHoursEntry[]; sample: boolean }> {
  const { supabase, myId } = await connect();
  if (!myId) return { entries: [], sample: false };

  const { data, error } = await supabase
    .from("service_hours")
    .select(hoursColumns)
    .eq("volunteer_id", myId)
    .order("worked_on", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(500);
  const { rows, sample } = settle(data, error, toHours, sampleMyHours(), "your hours");
  return { entries: rows, sample };
}

// News for everyone signed in, newest first.
export async function getNews(limit = 50): Promise<{ posts: NewsPost[]; sample: boolean }> {
  const { supabase, myId } = await connect();
  if (!myId) return { posts: [], sample: false };

  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, body, author_name, created_at, event_date")
    .order("created_at", { ascending: false })
    .limit(limit);
  const { rows, sample } = settle(data, error, toNews, sampleNews().slice(0, limit), "news");
  return { posts: rows, sample };
}

// Events from today on, soonest first (news posts with a date).
export async function getComingUp(limit = 3): Promise<{ events: NewsPost[]; sample: boolean }> {
  const { supabase, myId } = await connect();
  if (!myId) return { events: [], sample: false };

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, body, author_name, created_at, event_date")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(limit);
  const samples = sampleNews().filter((post) => post.eventDate && post.eventDate >= today);
  const { rows, sample } = settle(data, error, toNews, samples.slice(0, limit), "events");
  return { events: rows, sample };
}

// ── Officers ────────────────────────────────────────────────────────────

// Open requests (waiting or ready for pickup) first, then the latest pickups.
export async function getKitRequests(): Promise<{ requests: KitRequest[]; sample: boolean }> {
  const { supabase } = await officers();
  const { data, error } = await supabase
    .from("kit_requests")
    .select(kitColumns)
    .order("requested_at", { ascending: true })
    .limit(300);
  const { rows, sample } = settle(data, error, toKit, sampleKitRequests(), "kit requests");
  const order = { pending: 0, approved: 1, picked_up: 2 };
  return { requests: rows.sort((a, b) => order[a.status] - order[b.status]), sample };
}

// Hours still waiting for an officer, oldest first, so nobody waits too long.
export async function getHoursToApprove(): Promise<{ entries: ServiceHoursEntry[]; sample: boolean }> {
  const { supabase } = await officers();
  const { data, error } = await supabase
    .from("service_hours")
    .select(hoursColumns)
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(100);
  const { rows, sample } = settle(data, error, toHours, sampleHoursToApprove(), "hours");
  return { entries: rows, sample };
}

export async function getStock(): Promise<{ items: StockItem[]; sample: boolean }> {
  const { supabase } = await officers();
  const { data, error } = await supabase
    .from("stock_items")
    .select("id, name, quantity, low_stock_at")
    .order("name", { ascending: true });
  const { rows, sample } = settle(
    data,
    error,
    (row: { id: string; name: string; quantity: number; low_stock_at: number }) => ({
      id: row.id,
      name: row.name,
      quantity: row.quantity,
      lowStockAt: row.low_stock_at,
    }),
    sampleStock,
    "stock",
  );
  return { items: rows, sample };
}

// Check-ins, newest week first, and who's coming to this week's meeting.
export async function getCheckIns(): Promise<{
  checkIns: CheckIn[];
  rsvps: MeetingRsvp[];
  myId: string | null;
  sample: boolean;
}> {
  const { supabase, myId } = await officers();
  const thisWeek = mondayOfThisWeek();
  const [checkIns, rsvps] = await Promise.all([
    supabase
      .from("check_ins")
      .select("id, officer_id, officer_name, week_of, done, next")
      .order("week_of", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("meeting_rsvps").select("officer_id, officer_name, going").eq("week_of", thisWeek),
  ]);
  const done = settle(
    checkIns.data,
    checkIns.error,
    (row: { id: string; officer_id: string | null; officer_name: string; week_of: string; done: string; next: string }) => ({
      id: row.id,
      officerId: row.officer_id,
      officerName: row.officer_name,
      week: row.week_of,
      done: row.done,
      next: row.next,
    }),
    sampleCheckIns(),
    "check-ins",
  );
  const going = settle(
    rsvps.data,
    rsvps.error,
    (row: { officer_id: string; officer_name: string; going: boolean }) => ({
      officerId: row.officer_id,
      officerName: row.officer_name,
      going: row.going,
    }),
    sampleRsvps,
    "RSVPs",
  );
  return { checkIns: done.rows, rsvps: going.rows, myId, sample: done.sample || going.sample };
}

// The Monday that starts this week in California, "YYYY-MM-DD". Matches
// public.this_week() in the database.
export function mondayOfThisWeek() {
  const today = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const sinceMonday = (today.getDay() + 6) % 7;
  today.setDate(today.getDate() - sinceMonday);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

// ── Helpers ─────────────────────────────────────────────────────────────

// Everything here is per visit. connection() tells Next.js so, which lets
// these use today's date.
async function connect() {
  await connection();
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return { supabase, myId: data?.claims.sub ?? null };
}

async function officers() {
  if ((await getMyRole()) !== "officer") throw new Error("Officers only");
  return connect();
}

// The rows, or the sample rows if the tables aren't in the database yet.
function settle<Row, T>(
  data: unknown[] | null,
  error: PostgrestError | null,
  toItem: (row: Row) => T,
  sampleRows: T[],
  what: string,
): { rows: T[]; sample: boolean } {
  if (error) {
    if (tablesMissing(error)) return { rows: sampleRows, sample: true };
    throw new Error(`Couldn't load ${what}: ${error.message}`);
  }
  return { rows: ((data ?? []) as Row[]).map(toItem), sample: false };
}

// The tables aren't in the database yet (the migration hasn't been pushed).
export function tablesMissing(error: PostgrestError) {
  return error.code === "PGRST205" || error.code === "PGRST202" || error.code === "42P01";
}

const kitColumns = "id, volunteer_name, kit, status, requested_at";

function toKit(row: {
  id: string;
  volunteer_name: string;
  kit: KitRequest["kit"];
  status: KitRequest["status"];
  requested_at: string;
}): KitRequest {
  return {
    id: row.id,
    volunteerName: row.volunteer_name,
    kit: row.kit,
    status: row.status,
    requestedAt: row.requested_at,
  };
}

const hoursColumns = "id, volunteer_name, activity, hours, worked_on, status, reviewed_by";

function toHours(row: {
  id: string;
  volunteer_name: string;
  activity: string;
  hours: number | string;
  worked_on: string;
  status: ServiceHoursEntry["status"];
  reviewed_by: string | null;
}): ServiceHoursEntry {
  return {
    id: row.id,
    volunteerName: row.volunteer_name,
    activity: row.activity,
    hours: Number(row.hours),
    workedOn: row.worked_on,
    status: row.status,
    reviewedBy: row.reviewed_by,
  };
}

function toNews(row: {
  id: string;
  title: string;
  body: string;
  author_name: string;
  created_at: string;
  event_date: string | null;
}): NewsPost {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    author: row.author_name,
    postedAt: row.created_at,
    eventDate: row.event_date,
  };
}
