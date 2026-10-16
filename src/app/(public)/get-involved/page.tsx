// Owner: unassigned (to be split). The Get involved page at "/get-involved".
// Placeholder so the menu link works.
//
// What this page will do:
// - Explain how a teen can join a chapter and start crocheting.
// Done when: [To decide with Megan.]
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Get involved" };

export default function GetInvolvedPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <h1 className="font-display text-4xl font-semibold">Get involved</h1>
      <p className="text-lg text-ink">[To write: how to join a chapter and get started.]</p>
      <Link href="/sign-up" className="font-semibold text-terracotta underline">
        Sign up to volunteer
      </Link>
    </div>
  );
}
