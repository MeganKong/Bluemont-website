// Owner: Megan (shared; built by Adhya). Reads shared work and its feedback,
// for the officer pages (/officer/work) and the volunteer's "My work" page.
// Only use this in server code.
//
// The database's privacy rules decide what each person gets back (see
// supabase/migrations/*_submissions_and_feedback.sql): volunteers only ever
// receive their own work, whatever this code asks for.
//
// Until the database step is done (npx supabase db push), the tables don't
// exist yet. Then these return the sample data from ./placeholder.ts with
// sample: true, the pages show "Sample page · fake data", and saving is off.
import type { PostgrestError } from "@supabase/supabase-js";
import type { Feedback, Submission } from "@/lib/types";
import { getMyRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase/server";
import { PHOTO_BUCKET } from "./bucket";
import { SAMPLE_ME, sampleMyWork, sampleSubmissions } from "./placeholder";

export type Work = {
  submissions: Submission[];
  sample: boolean;
  // The signed-in person, so pages can show "You" on their own feedback.
  myId: string | null;
};

// Every submission, newest first. Officers only.
export async function getAllWork(): Promise<Work> {
  await officersOnly();
  return readWork({});
}

// One submission, or null if there's no such submission. Officers only.
export async function getOneWork(id: string): Promise<Work & { submission: Submission | null }> {
  await officersOnly();
  const work = await readWork({ id });
  return { ...work, submission: work.submissions[0] ?? null };
}

// The signed-in volunteer's own work, newest first.
export async function getMyWork(): Promise<Work> {
  return readWork({ mine: true });
}

async function officersOnly() {
  if ((await getMyRole()) !== "officer") throw new Error("Officers only");
}

const columns =
  "id, volunteer_name, lesson_id, photo_path, note, status, created_at, " +
  "feedback (id, officer_id, officer_name, kind, body, created_at, edited_at, seen_at, thanked_at)";

type FeedbackRow = {
  id: string;
  officer_id: string | null;
  officer_name: string;
  kind: Feedback["kind"];
  body: string;
  created_at: string;
  edited_at: string | null;
  seen_at: string | null;
  thanked_at: string | null;
};

type SubmissionRow = {
  id: string;
  volunteer_name: string;
  lesson_id: string | null;
  photo_path: string;
  note: string | null;
  status: Submission["status"];
  created_at: string;
  feedback: FeedbackRow[];
};

// Submission ids look like "3f2a…-…". Anything else can't match one.
const idPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const noSuchId = "00000000-0000-0000-0000-000000000000";

async function readWork({ id, mine }: { id?: string; mine?: boolean }): Promise<Work> {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  const myId = auth?.claims.sub ?? null;
  if (!myId) return { submissions: [], sample: false, myId };

  let query = supabase
    .from("submissions")
    .select(columns)
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "feedback", ascending: true })
    .limit(200);
  if (id !== undefined) query = query.eq("id", idPattern.test(id) ? id : noSuchId);
  if (mine) query = query.eq("volunteer_id", myId);

  const { data, error } = await query;
  if (error) {
    if (tablesMissing(error)) return sampleWork({ id, mine });
    throw new Error(`Couldn't load shared work: ${error.message}`);
  }
  const rows = (data ?? []) as unknown as SubmissionRow[];

  // Photos are private, so each one gets a link that works for one hour.
  const photoUrls = new Map<string, string>();
  if (rows.length > 0) {
    const { data: links } = await supabase.storage
      .from(PHOTO_BUCKET)
      .createSignedUrls(
        rows.map((row) => row.photo_path),
        60 * 60,
      );
    links?.forEach((link) => link.path && link.signedUrl && photoUrls.set(link.path, link.signedUrl));
  }

  return {
    submissions: rows.map((row) => toSubmission(row, photoUrls.get(row.photo_path) ?? null)),
    sample: false,
    myId,
  };
}

// The tables aren't in the database yet (the migration hasn't been pushed).
function tablesMissing(error: PostgrestError) {
  return error.code === "PGRST205" || error.code === "42P01";
}

function sampleWork({ id, mine }: { id?: string; mine?: boolean }): Work {
  const all = mine ? sampleMyWork : sampleSubmissions;
  return {
    submissions: id === undefined ? all : all.filter((submission) => submission.id === id),
    sample: true,
    myId: SAMPLE_ME,
  };
}

function toSubmission(row: SubmissionRow, photoUrl: string | null): Submission {
  return {
    id: row.id,
    volunteerName: row.volunteer_name,
    lessonId: row.lesson_id,
    photoUrl,
    note: row.note,
    status: row.status,
    createdAt: row.created_at,
    feedback: row.feedback.map((item) => ({
      id: item.id,
      officerId: item.officer_id,
      officerName: item.officer_name,
      kind: item.kind,
      body: item.body,
      createdAt: item.created_at,
      editedAt: item.edited_at,
      seenAt: item.seen_at,
      thankedAt: item.thanked_at,
    })),
  };
}
