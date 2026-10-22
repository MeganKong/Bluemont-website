// Owner: Megan (shared; built by Adhya). Wrap an officer-only page in
// <OfficersOnly>...</OfficersOnly>. The server checks the role before sending
// anything, so volunteers never receive the officer content, not even hidden
// in the page's code. A volunteer who types the address sees a friendly note
// with a button back to their own dashboard.
import Link from "next/link";
import { Suspense } from "react";
import { getMyRole } from "@/lib/roles";

export function OfficersOnly({ children }: { children: React.ReactNode }) {
  return (
    // Checking the role happens on every visit, so it loads in a boundary.
    <Suspense fallback={<p className="text-ink">Checking your access…</p>}>
      <RoleCheck otherwise={<NoAccess />}>{children}</RoleCheck>
    </Suspense>
  );
}

// For a small officer-only part of a shared page, like a link to an officer
// page. Volunteers get nothing at all.
export function IfOfficer({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <RoleCheck otherwise={null}>{children}</RoleCheck>
    </Suspense>
  );
}

async function RoleCheck({ children, otherwise }: { children: React.ReactNode; otherwise: React.ReactNode }) {
  return (await getMyRole()) === "officer" ? children : otherwise;
}

function NoAccess() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 rounded-3xl border-3 border-navy bg-card p-8 text-center shadow-[5px_5px_0_var(--color-navy)] sm:p-10">
      <span className="rounded-full border-2 border-navy bg-gold px-3 py-0.5 text-sm font-bold">
        Officers only
      </span>
      <h1 className="font-display text-3xl font-black text-balance sm:text-4xl">
        This page is just for officers
      </h1>
      <p className="text-lg text-ink">
        No worries! Everything you need is waiting on your own dashboard.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex min-h-[54px] w-full items-center justify-center rounded-full border-3 border-navy bg-gold px-7 text-lg font-extrabold shadow-[0_5px_0_var(--color-navy)] transition hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_var(--color-navy)] focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue sm:w-auto"
      >
        Back to my dashboard
      </Link>
    </section>
  );
}
