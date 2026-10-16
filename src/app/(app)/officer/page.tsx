// Owner: Sophia (built by Adhya, assignment 2). The officer page at "/officer".
//
// What this page will do:
// - A placeholder for officer tools (for example kit approvals, check-ins).
// Done when: only officers can see it, even by typing the address.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getMyRole } from "@/lib/roles";

export const metadata: Metadata = { title: "Officers" };

export default function OfficerPage() {
  return (
    // Checking the role happens on every visit, so it loads in a boundary.
    <Suspense fallback={<p className="text-ink">Checking your access…</p>}>
      <OfficersOnly />
    </Suspense>
  );
}

// The server checks the role before sending anything. Volunteers never
// receive the officer content, not even hidden in the page's code.
async function OfficersOnly() {
  const role = await getMyRole();

  if (role !== "officer") {
    return (
      <div className="flex max-w-xl flex-col gap-4">
        <h1 className="font-display text-4xl font-semibold">Officers only</h1>
        <p className="text-ink">
          This page is for officers. If you think you should have access, ask Megan.
        </p>
        <Link href="/dashboard" className="font-semibold text-terracotta">
          Back to your dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-4xl font-semibold">Officer page</h1>
      <p className="text-ink">Officer tools will go here.</p>
    </div>
  );
}
