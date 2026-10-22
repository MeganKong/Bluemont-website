// Owner: Adhya. Kit requests at "/kits".
//
// What this page will do (month 1 build plan):
// - Volunteers request a starter kit. The button stays locked until lesson 1 is done.
// - Officers see every request and approve it.
// Done when: a kit unlocks after lesson 1 and an officer approves it.
import type { Metadata } from "next";
import Link from "next/link";
import { IfOfficer } from "@/components/officers-only";
import { SampleNote } from "@/components/sample-note";
import { kitRequests } from "./_placeholder";

export const metadata: Metadata = { title: "Kits" };

const statusLabel = {
  pending: "Waiting for approval",
  approved: "Approved, ready for pickup",
  picked_up: "Picked up",
};

export default function KitsPage() {
  return (
    <div className="flex flex-col gap-8">
      <SampleNote />
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold">Kits</h1>
        {/* Stock is an officer page, so only officers see the link. */}
        <IfOfficer>
          <Link href="/kits/stock" className="font-semibold text-terracotta">
            Stock →
          </Link>
        </IfOfficer>
      </div>

      <section className="flex flex-col gap-3 rounded-2xl border border-line bg-card p-5">
        <h2 className="text-xl font-semibold">My starter kit</h2>
        <p className="text-ink">Finish lesson 1 to unlock your starter kit.</p>
        <button disabled className="self-start rounded-lg bg-navy px-5 py-3 font-semibold text-cream opacity-50">
          Request starter kit (locked)
        </button>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Requests to approve (officers)</h2>
        <ul className="flex flex-col gap-3">
          {kitRequests.map((request) => (
            <li key={request.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-card p-5">
              <div>
                <p className="font-semibold">
                  {request.volunteerName} · {request.kit} kit
                </p>
                <p className="text-ink">
                  {statusLabel[request.status]} · requested {request.requestedAt}
                </p>
              </div>
              {request.status === "pending" && (
                <button className="rounded-lg bg-terracotta px-4 py-2 font-semibold text-cream">
                  Approve
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
