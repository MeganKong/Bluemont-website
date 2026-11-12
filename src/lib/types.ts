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

// A volunteer asking for a crochet kit (table: kit_requests).
export type KitRequest = {
  id: string;
  volunteerName: string; // first name only
  kit: "starter" | "full";
  status: "pending" | "approved" | "picked_up";
  requestedAt: string; // date and time
};

// Hours a volunteer logged, waiting for or approved by an officer
// (table: service_hours).
export type ServiceHoursEntry = {
  id: string;
  volunteerName: string; // first name only
  activity: string;
  hours: number;
  workedOn: string; // "YYYY-MM-DD"
  status: "pending" | "approved" | "declined";
  reviewedBy: string | null; // the officer's first name
};

export type StockItem = {
  id: string;
  name: string;
  quantity: number;
  lowStockAt: number;
};

// An update from officers (table: news_posts). Events have a date, so they
// also show under "Coming up".
export type NewsPost = {
  id: string;
  title: string;
  body: string;
  author: string; // first name only
  postedAt: string; // date and time
  eventDate: string | null; // "YYYY-MM-DD"
};

// An officer's weekly check-in (table: check_ins).
export type CheckIn = {
  id: string;
  officerId: string | null;
  officerName: string;
  week: string; // the Monday of that week, "YYYY-MM-DD"
  done: string;
  next: string;
};

// An officer's answer for this week's meeting (table: meeting_rsvps).
export type MeetingRsvp = {
  officerId: string;
  officerName: string;
  going: boolean;
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
