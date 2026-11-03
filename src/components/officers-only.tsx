// Owner: Megan (shared; built by Adhya). Wrap an officer-only page in
// <OfficersOnly>...</OfficersOnly>. The server checks the role before sending
// anything, so volunteers never receive the officer content, not even hidden
// in the page's code. A volunteer who types the address sees a short note
// with a button back to their own dashboard.
import Link from "next/link";
import { Suspense } from "react";
import { getMyRole } from "@/lib/roles";
import { PortalPage } from "./portal-page";
import { buttonMain } from "./portal-styles";

export function OfficersOnly({ children }: { children: React.ReactNode }) {
  return (
    // Checking the role happens on every visit, so it loads in a boundary.
    <Suspense fallback={<PortalPage eyebrow="Officers" title="One moment…" lead="Checking your access." />}>
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
    <PortalPage
      eyebrow="Officers only"
      title="This page is for officers."
      lead="Everything you need is on your own dashboard."
      actions={
        <Link href="/dashboard" className={buttonMain}>
          Back to my dashboard
        </Link>
      }
    />
  );
}
