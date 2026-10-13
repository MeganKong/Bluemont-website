// Owner: Adhya. Fake kit requests and stock until the database is ready.
import type { KitRequest, StockItem } from "@/lib/types";

export const kitRequests: KitRequest[] = [
  { id: "r1", volunteerName: "Volunteer A", kit: "starter", status: "pending", requestedAt: "2026-10-20" },
  { id: "r2", volunteerName: "Volunteer B", kit: "starter", status: "approved", requestedAt: "2026-10-18" },
  { id: "r3", volunteerName: "Volunteer C", kit: "full", status: "picked_up", requestedAt: "2026-10-15" },
];

export const stock: StockItem[] = [
  { id: "s1", name: "Yarn skeins (worsted)", quantity: 42, lowStockAt: 20 },
  { id: "s2", name: "Crochet hooks (5 mm)", quantity: 8, lowStockAt: 10 },
  { id: "s3", name: "Safety eyes (pairs)", quantity: 60, lowStockAt: 25 },
  { id: "s4", name: "Stuffing (bags)", quantity: 3, lowStockAt: 5 },
];
