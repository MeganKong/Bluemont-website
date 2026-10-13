// Owner: Adhya. Kit requests at "/kits". A kit unlocks after lesson 1.
import type { Metadata } from "next";
import Link from "next/link";
import { kitRequests } from "./_placeholder";

export const metadata: Metadata = { title: "Kits" };

const statusLabel = {
  pending: "Waiting for approval",
  approved: "Approved, ready for pickup",
  picked_up: "Picked up",
};

export default function KitsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold">Kit requests</h1>
        <Link href="/kits/stock" className="font-semibold text-terracotta">
          Stock →
        </Link>
      </div>
      <ul className="flex flex-col gap-3">
        {kitRequests.map((request) => (
          <li key={request.id} className="rounded-2xl border border-line bg-card p-5">
            <p className="font-semibold">
              {request.volunteerName} · {request.kit} kit
            </p>
            <p className="text-ink">
              {statusLabel[request.status]} · requested {request.requestedAt}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
