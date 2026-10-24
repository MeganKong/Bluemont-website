"use server";
// Owner: Megan (shared; built by Adhya). These run on the server when someone
// shares work, writes feedback, or taps a button on it. Each one checks who's
// asking, and the database's privacy rules check again
// (supabase/migrations/*_submissions_and_feedback.sql).
import { refresh } from "next/cache";
import { getMyRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";
import { lessons } from "@/app/(app)/lessons/_placeholder";

// What a form shows after a submit: an error, or that it worked.
export type WorkState = { error?: string; done?: boolean };

const sampleOnly = "This is sample work, so nothing is saved. Real work can be saved once the database is set up.";
const tryAgain = "Something went wrong and it wasn't saved. Please try again in a minute.";
const officersOnly = "Only officers can do that.";

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

// Sample work (shown before the database is set up) has ids like "sample-2".
function isSample(id: string) {
  return id.startsWith("sample-");
}

// ── Volunteers ──────────────────────────────────────────────────────────

// Called by the "Share my work" form after the photo is uploaded to the
// volunteer's own folder in storage.
export async function shareWork(input: { photoPath: string; lessonId: string; note: string }): Promise<WorkState> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  const myId = auth?.claims.sub;
  if (!myId) return { error: "Please sign in again, then share your work." };

  const note = input.note.trim();
  const lessonId = lessons.some((lesson) => lesson.id === input.lessonId) ? input.lessonId : null;
  if (!input.photoPath.startsWith(`${myId}/`) || input.photoPath.length > 200) return { error: tryAgain };
  if (note.length > 500) return { error: "Your note is too long. Please keep it under 500 characters." };

  // Who shared it, their name and the date are filled in by the database.
  const { error } = await supabase
    .from("submissions")
    .insert({ photo_path: input.photoPath, lesson_id: lessonId, note: note || null });
  if (error) return { error: tryAgain };

  return { done: true };
}

// Opening "My work" marks all feedback on their own work as seen.
export async function markMyFeedbackSeen() {
  const supabase = await createClient();
  await supabase.rpc("mark_my_feedback_seen");
}

// "Thanks!" on a piece of feedback about their own work.
export async function sayThanks(_prev: WorkState, formData: FormData): Promise<WorkState> {
  const feedbackId = field(formData, "feedbackId");
  if (isSample(feedbackId)) return { error: sampleOnly };

  const supabase = await createClient();
  const { error } = await supabase.rpc("thank_for_feedback", { feedback_id: feedbackId });
  if (error) return { error: tryAgain };

  refresh();
  return { done: true };
}

// ── Officers ────────────────────────────────────────────────────────────

const kinds = ["tip", "comment"];

function checkFeedback(formData: FormData): { kind: string; body: string } | { error: string } {
  const kind = field(formData, "kind");
  const body = field(formData, "body");
  if (!kinds.includes(kind)) return { error: "Please choose Tip or Comment." };
  if (!body) return { error: "Please write your feedback first." };
  if (body.length > 1000) return { error: "That's a bit long. Please keep feedback under 1,000 characters." };
  return { kind, body };
}

export async function addFeedback(_prev: WorkState, formData: FormData): Promise<WorkState> {
  if ((await getMyRole()) !== "officer") return { error: officersOnly };
  const submissionId = field(formData, "submissionId");
  if (isSample(submissionId)) return { error: sampleOnly };
  const checked = checkFeedback(formData);
  if ("error" in checked) return checked;

  // Who wrote it and when are filled in by the database.
  const supabase = await createClient();
  const { error } = await supabase
    .from("feedback")
    .insert({ submission_id: submissionId, kind: checked.kind, body: checked.body });
  if (error) return { error: tryAgain };

  refresh();
  return { done: true };
}

export async function editFeedback(_prev: WorkState, formData: FormData): Promise<WorkState> {
  if ((await getMyRole()) !== "officer") return { error: officersOnly };
  const feedbackId = field(formData, "feedbackId");
  if (isSample(feedbackId)) return { error: sampleOnly };
  const checked = checkFeedback(formData);
  if ("error" in checked) return checked;

  // The database only lets officers change feedback they wrote.
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("feedback")
    .update({ kind: checked.kind, body: checked.body })
    .eq("id", feedbackId)
    .select("id");
  if (error) return { error: tryAgain };
  if (data.length === 0) return { error: "You can only edit feedback you wrote." };

  refresh();
  return { done: true };
}

export async function deleteFeedback(_prev: WorkState, formData: FormData): Promise<WorkState> {
  if ((await getMyRole()) !== "officer") return { error: officersOnly };
  const feedbackId = field(formData, "feedbackId");
  if (isSample(feedbackId)) return { error: sampleOnly };

  const supabase = await createClient();
  const { data, error } = await supabase.from("feedback").delete().eq("id", feedbackId).select("id");
  if (error) return { error: tryAgain };
  if (data.length === 0) return { error: "You can only delete feedback you wrote." };

  refresh();
  return { done: true };
}

// "Approved", "Needs changes", or "" to clear it.
export async function setStatus(_prev: WorkState, formData: FormData): Promise<WorkState> {
  if ((await getMyRole()) !== "officer") return { error: officersOnly };
  const submissionId = field(formData, "submissionId");
  if (isSample(submissionId)) return { error: sampleOnly };
  const status = field(formData, "status");
  if (status !== "approved" && status !== "needs_changes" && status !== "") return { error: tryAgain };

  const supabase = await createClient();
  const { error } = await supabase
    .from("submissions")
    .update({ status: status || null })
    .eq("id", submissionId);
  if (error) return { error: tryAgain };

  refresh();
  return { done: true };
}
