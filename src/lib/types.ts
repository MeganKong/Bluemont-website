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
