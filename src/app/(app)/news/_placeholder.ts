// Owner: Iris. Fake news posts and officer check-ins until the database is ready.
import type { CheckIn, NewsPost } from "@/lib/types";

export const newsPosts: NewsPost[] = [
  {
    id: "n1",
    title: "Welcome to the new Bluemont site",
    body: "Start with lesson 1. Your starter kit unlocks when you finish it.",
    author: "Megan",
    postedAt: "2026-10-19",
  },
  {
    id: "n2",
    title: "Pickup this Saturday",
    body: "Approved starter kits can be picked up at the park, 10am to noon.",
    author: "Adhya",
    postedAt: "2026-10-22",
  },
];

export const checkIns: CheckIn[] = [
  {
    id: "c1",
    officerName: "Officer A",
    week: "Oct 19",
    done: "Set up my pages with placeholder data",
    next: "Connect my page to the database",
  },
];
