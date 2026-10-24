// Owner: Megan (shared). The shapes of Bluemont's data.
// Placeholder data and, later, the Supabase tables follow these shapes,
// so ask Megan before changing them.

export type Role = "volunteer" | "officer" | "partner" | "admin";

export type Lesson = {
  id: string;
  order: number;
  title: string;
  summary: string;
  videoUrl: string;
  steps: string[];
};

export type KitRequest = {
  id: string;
  volunteerName: string;
  kit: "starter" | "full";
  status: "pending" | "approved" | "picked_up";
  requestedAt: string;
};

export type StockItem = {
  id: string;
  name: string;
  quantity: number;
  lowStockAt: number;
};

export type NewsPost = {
  id: string;
  title: string;
  body: string;
  author: string;
  postedAt: string;
};

export type CheckIn = {
  id: string;
  officerName: string;
  week: string;
  done: string;
  next: string;
};

// A photo of a volunteer's crochet, shared for feedback (table: submissions).
export type Submission = {
  id: string;
  volunteerName: string; // first name only
  lessonId: string | null;
  photoUrl: string | null; // a private link that works for one hour
  note: string | null;
  status: "approved" | "needs_changes" | null;
  createdAt: string; // date and time, e.g. "2026-10-23T18:20:00Z"
  feedback: Feedback[]; // oldest first
};

// A tip or comment from an officer on a submission (table: feedback).
export type Feedback = {
  id: string;
  officerId: string | null;
  officerName: string; // first name only
  kind: "tip" | "comment";
  body: string;
  createdAt: string;
  editedAt: string | null;
  seenAt: string | null; // empty until the volunteer sees it ("New feedback")
  thankedAt: string | null; // when the volunteer tapped "Thanks!"
};
