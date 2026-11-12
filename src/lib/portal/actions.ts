"use server";
// Owner: Megan (shared; built by Adhya). These run on the server when someone
// taps a button on a signed-in page: marking a lesson complete, asking for a
// kit, logging hours, and the officers' approvals, news, check-ins and stock.
// Each one checks who's asking, and the database's privacy rules check again
// (supabase/migrations/*_volunteer_portal.sql). Shared work is in
// src/lib/work/actions.ts.
import type { PostgrestError } from "@supabase/supabase-js";
import { refresh } from "next/cache";
import { getMyRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";
import { lessons } from "@/app/(app)/lessons/_placeholder";
import { tablesMissing } from "./data";

// What a form shows after a submit: an error, or that it worked.
export type ActionState = { error?: string; done?: boolean };

const sampleOnly = "This is sample data, so nothing is saved. Saving starts once the database is set up.";
const notReady = "This can't be saved yet: the database still needs its update (npx supabase db push).";
const tryAgain = "Something went wrong and it wasn't saved. Please try again in a minute.";
const officersOnly = "Only officers can do that.";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

// Sample rows (shown before the database is set up) have ids like "sample-2".
function isSample(id: string) {
  return id.startsWith("sample-");
}

function failed(error: PostgrestError): ActionState {
  return { error: tablesMissing(error) ? notReady : tryAgain };
}

function saved(): ActionState {
  refresh();
  return { done: true };
}

async function isOfficer() {
  return (await getMyRole()) === "officer";
}

// ── Lessons ─────────────────────────────────────────────────────────────

export async function completeLesson(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const lessonId = field(formData, "lessonId");
  if (!lessons.some((lesson) => lesson.id === lessonId)) return { error: tryAgain };

  // Who finished it is filled in by the database.
  const supabase = await createClient();
  const { error } = await supabase.from("lesson_progress").insert({ lesson_id: lessonId });
  // 23505: already marked complete, which is fine.
  if (error && error.code !== "23505") return failed(error);
  return saved();
}

export async function undoLesson(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const lessonId = field(formData, "lessonId");
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  const myId = auth?.claims.sub;
  if (!myId) return { error: "Please sign in again." };

  const { error } = await supabase
    .from("lesson_progress")
    .delete()
    .eq("volunteer_id", myId)
    .eq("lesson_id", lessonId);
  if (error) return failed(error);
  return saved();
}

// ── Kits ────────────────────────────────────────────────────────────────

export async function requestKit(): Promise<ActionState> {
  // Who asked, their name and the date are filled in by the database.
  const supabase = await createClient();
  const { error } = await supabase.from("kit_requests").insert({ kit: "starter" });
  if (error?.code === "23505") return { error: "You already have a kit request open." };
  // 42501: the database's rule that a lesson has to be finished first.
  if (error?.code === "42501") return { error: "Finish lesson 1 first, then you can ask for your kit." };
  if (error) return failed(error);
  return saved();
}

// Volunteers can cancel a request while it's still waiting.
export async function cancelKit(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };

  const supabase = await createClient();
  const { data, error } = await supabase.from("kit_requests").delete().eq("id", id).select("id");
  if (error) return failed(error);
  if (data.length === 0) return { error: "This request can't be cancelled anymore. An officer already approved it." };
  return saved();
}

// Officers: "approved" (ready for pickup) or "picked_up".
export async function setKitStatus(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };
  const status = field(formData, "status");
  if (status !== "pending" && status !== "approved" && status !== "picked_up") return { error: tryAgain };

  const supabase = await createClient();
  const { error } = await supabase.from("kit_requests").update({ status }).eq("id", id);
  if (error) return failed(error);
  return saved();
}

// ── Service hours ───────────────────────────────────────────────────────

export async function logHours(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const activity = field(formData, "activity");
  const hours = Number(field(formData, "hours"));
  const workedOn = field(formData, "workedOn");

  if (!activity) return { error: "Please say what you did." };
  if (activity.length > 100) return { error: "Please keep what you did under 100 characters." };
  if (!Number.isFinite(hours) || hours <= 0 || hours > 12) return { error: "Hours should be between 0.5 and 12." };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(workedOn)) return { error: "Please pick the date." };
  if (workedOn > tomorrow()) return { error: "Hours can't be logged for a future date." };

  // Who logged them and their name are filled in by the database.
  const supabase = await createClient();
  const { error } = await supabase
    .from("service_hours")
    .insert({ activity, hours: Math.round(hours * 10) / 10, worked_on: workedOn });
  if (error) return failed(error);
  return saved();
}

// Volunteers can delete hours while they're still waiting.
export async function deleteHours(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };

  const supabase = await createClient();
  const { data, error } = await supabase.from("service_hours").delete().eq("id", id).select("id");
  if (error) return failed(error);
  if (data.length === 0) return { error: "These hours were already reviewed, so they can't be deleted." };
  return saved();
}

// Officers: "approved" or "declined".
export async function reviewHours(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };
  const status = field(formData, "status");
  if (status !== "approved" && status !== "declined") return { error: tryAgain };

  const supabase = await createClient();
  const { error } = await supabase.from("service_hours").update({ status }).eq("id", id);
  if (error) return failed(error);
  return saved();
}

// ── News (officers) ─────────────────────────────────────────────────────

export async function postNews(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const title = field(formData, "title");
  const body = field(formData, "body");
  const eventDate = field(formData, "eventDate");

  if (!title || !body) return { error: "Please add a title and a message." };
  if (title.length > 80) return { error: "Please keep the title under 80 characters." };
  if (body.length > 1000) return { error: "Please keep the message under 1,000 characters." };
  if (eventDate && !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) return { error: "Please pick a date, or leave it empty." };

  // Who posted it and when are filled in by the database.
  const supabase = await createClient();
  const { error } = await supabase.from("news_posts").insert({ title, body, event_date: eventDate || null });
  if (error) return failed(error);
  return saved();
}

export async function deleteNews(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };

  const supabase = await createClient();
  const { error } = await supabase.from("news_posts").delete().eq("id", id);
  if (error) return failed(error);
  return saved();
}

// ── Check-ins and RSVPs (officers) ──────────────────────────────────────

export async function checkIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const done = field(formData, "done");
  const next = field(formData, "next");
  if (!done || !next) return { error: "Please fill in both boxes." };
  if (done.length > 500 || next.length > 500) return { error: "Please keep each box under 500 characters." };

  // Who, their name and the week are filled in by the database.
  const supabase = await createClient();
  const { error } = await supabase.from("check_ins").insert({ done, next });
  if (error?.code === "23505") return { error: "You already checked in this week. Delete it below to redo it." };
  if (error) return failed(error);
  return saved();
}

export async function deleteCheckIn(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };

  const supabase = await createClient();
  const { data, error } = await supabase.from("check_ins").delete().eq("id", id).select("id");
  if (error) return failed(error);
  if (data.length === 0) return { error: "You can only delete your own check-ins." };
  return saved();
}

// "Going" or "Can't make it" for this week's meeting.
export async function rsvp(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const going = field(formData, "going");
  if (going !== "yes" && going !== "no") return { error: tryAgain };

  const supabase = await createClient();
  const { error } = await supabase.rpc("rsvp_this_week", { is_going: going === "yes" });
  if (error) return failed(error);
  return saved();
}

// ── Stock (officers) ────────────────────────────────────────────────────

export async function updateStock(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };
  const quantity = wholeNumber(field(formData, "quantity"));
  if (quantity === null) return { error: "Please enter a whole number, 0 or more." };

  const supabase = await createClient();
  const { error } = await supabase.from("stock_items").update({ quantity }).eq("id", id);
  if (error) return failed(error);
  return saved();
}

export async function addStock(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const name = field(formData, "name");
  const quantity = wholeNumber(field(formData, "quantity"));
  const lowStockAt = wholeNumber(field(formData, "lowStockAt"));
  if (!name || name.length > 80) return { error: "Please name the supply (under 80 characters)." };
  if (quantity === null || lowStockAt === null) return { error: "Please enter whole numbers, 0 or more." };

  const supabase = await createClient();
  const { error } = await supabase.from("stock_items").insert({ name, quantity, low_stock_at: lowStockAt });
  if (error?.code === "23505") return { error: "That supply is already on the list." };
  if (error) return failed(error);
  return saved();
}

export async function removeStock(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!(await isOfficer())) return { error: officersOnly };
  const id = field(formData, "id");
  if (isSample(id)) return { error: sampleOnly };

  const supabase = await createClient();
  const { error } = await supabase.from("stock_items").delete().eq("id", id);
  if (error) return failed(error);
  return saved();
}

// "12" → 12. Anything else (blank, negative, decimals, huge) → null.
function wholeNumber(value: string) {
  if (!/^\d{1,6}$/.test(value)) return null;
  const n = Number(value);
  return n <= 100_000 ? n : null;
}

// Tomorrow as "YYYY-MM-DD", so time zones never block today's hours.
function tomorrow() {
  return new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
}
