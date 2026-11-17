// Owner: Megan (shared; built by Adhya). Reads what the signed-in pages show:
// lesson progress, kits, hours, news, and the officers' check-ins and stock.
// Only use this in server code. Shared work lives in src/lib/work/data.ts.
//
// The database's privacy rules decide what each person gets back (see
// supabase/migrations/*_volunteer_portal.sql): volunteers only ever receive
// their own progress, kit and hours, whatever this code asks for.
//
// If a table isn't in the database yet (npx supabase db push not run), these
// return nothing, so pages show their empty state instead of breaking.
import type { PostgrestError } from "@supabase/supabase-js";
import { connection } from "next/server";
import type { CheckIn, KitRequest, MeetingRsvp, NewsPost, ServiceHoursEntry, StockItem } from "@/lib/types";
import { getMyRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";

// ── Volunteers ──────────────────────────────────────────────────────────

// The ids of the lessons they've marked complete.
export async function getMyLessons(): Promise<{ done: string[]}> {
  const { supabase, myId } = await connect();
  if (!myId) return { done: [] };

  const { data, error } = await supabase.from("lesson_progress").select("lesson_id").eq("volunteer_id", myId);
  const rows = settle(data, error, (row: { lesson_id: string }) => row.lesson_id, "lessons");
  return { done: rows };
}

// Their newest kit request, or null if they haven't asked for one.
export async function getMyKit(): Promise<{ kit: KitRequest | null}> {
  const { supabase, myId } = await connect();
  if (!myId) return { kit: null };

  const { data, error } = await supabase
    .from("kit_requests")
    .select(kitColumns)
    .eq("volunteer_id", myId)
    .order("requested_at", { ascending: false })
    .limit(1);
  const rows = settle(data, error, toKit, "your kit");
  return { kit: rows[0] ?? null };
}

// Every hour they've logged, newest first.
export async function getMyHours(): Promise<{ entries: ServiceHoursEntry[]}> {
  const { supabase, myId } = await connect();
  if (!myId) return { entries: [] };

  const { data, error } = await supabase
    .from("service_hours")
    .select(hoursColumns)
    .eq("volunteer_id", myId)
    .order("worked_on", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(500);
  const rows = settle(data, error, toHours, "your hours");
  return { entries: rows };
}

// News for everyone signed in, newest first.
export async function getNews(limit = 50): Promise<{ posts: NewsPost[]}> {
  const { supabase, myId } = await connect();
  if (!myId) return { posts: [] };

  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, body, author_name, created_at, event_date")
    .order("created_at", { ascending: false })
    .limit(limit);
  const rows = settle(data, error, toNews, "news");
  return { posts: rows };
}

// Events from today on, soonest first (news posts with a date).
export async function getComingUp(limit = 3): Promise<{ events: NewsPost[]}> {
  const { supabase, myId } = await connect();
  if (!myId) return { events: [] };

  const today = new Date().toISOString().slice(0, 10);
  const { data, error } = await supabase
    .from("news_posts")
    .select("id, title, body, author_name, created_at, event_date")
    .gte("event_date", today)
    .order("event_date", { ascending: true })
    .limit(limit);
  const rows = settle(data, error, toNews, "events");
  return { events: rows };
}

// ── Officers ────────────────────────────────────────────────────────────

// Open requests (waiting or ready for pickup) first, then the latest pickups.
export async function getKitRequests(): Promise<{ requests: KitRequest[]}> {
  const { supabase } = await officers();
  const { data, error } = await supabase
    .from("kit_requests")
    .select(kitColumns)
    .order("requested_at", { ascending: true })
    .limit(300);
  const rows = settle(data, error, toKit, "kit requests");
  const order = { pending: 0, approved: 1, picked_up: 2 };
  return { requests: rows.sort((a, b) => order[a.status] - order[b.status]) };
}

// Hours still waiting for an officer, oldest first, so nobody waits too long.
export async function getHoursToApprove(): Promise<{ entries: ServiceHoursEntry[]}> {
  const { supabase } = await officers();
  const { data, error } = await supabase
    .from("service_hours")
    .select(hoursColumns)
    .eq("status", "pending")
    .order("created_at", { ascending: true })
    .limit(100);
  const rows = settle(data, error, toHours, "hours");
  return { entries: rows };
}

export async function getStock(): Promise<{ items: StockItem[]}> {
  const { supabase } = await officers();
  const { data, error } = await supabase
    .from("stock_items")
    .select("id, name, quantity, low_stock_at")
    .order("name", { ascending: true });
  const rows = settle(
    data,
    error,
    (row: { id: string; name: string; quantity: number; low_stock_at: number }) => ({
      id: row.id,
      name: row.name,
      quantity: row.quantity,
      lowStockAt: row.low_stock_at,
    }),
    "stock",
  );
  return { items: rows };
}

// Check-ins, newest week first, and who's coming to this week's meeting.
export async function getCheckIns(): Promise<{
  checkIns: CheckIn[];
  rsvps: MeetingRsvp[];
  myId: string | null;
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
  const checkInRows = settle(
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
    "check-ins",
  );
  const rsvpRows = settle(
    rsvps.data,
    rsvps.error,
    (row: { officer_id: string; officer_name: string; going: boolean }) => ({
      officerId: row.officer_id,
      officerName: row.officer_name,
      going: row.going,
    }),
    "RSVPs",
  );
  return { checkIns: checkInRows, rsvps: rsvpRows, myId };
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

// The rows, or none if the table isn't in the database yet.
function settle<Row, T>(data: unknown[] | null, error: PostgrestError | null, toItem: (row: Row) => T, what: string): T[] {
  if (error) {
    if (tablesMissing(error)) return [];
    throw new Error(`Couldn't load ${what}: ${error.message}`);
  }
  return ((data ?? []) as Row[]).map(toItem);
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
