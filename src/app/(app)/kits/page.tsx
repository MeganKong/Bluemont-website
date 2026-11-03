// Owner: Adhya. Kit requests at "/kits".
//
// What this page will do (month 1 build plan):
// - Volunteers request a starter kit. The button stays locked until lesson 1 is done.
// - Officers see every request and approve it.
// Done when: a kit unlocks after lesson 1 and an officer approves it.
import type { Metadata } from "next";
import Link from "next/link";
import { IfOfficer } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { buttonMain, card, eyebrow, hint, rows, sectionTitle, smallButtonMain } from "@/components/portal-styles";
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
    <PortalPage
      eyebrow="Kits"
      title="Your crochet kit"
      lead="Yarn, a hook and stuffing: everything you need to make your first plushie."
      actions={
        // Stock is an officer page, so only officers see the button.
        <IfOfficer>
          <Link href="/kits/stock" className={buttonMain}>
            Stock
          </Link>
        </IfOfficer>
      }
    >
      <SampleNote />

      <section aria-labelledby="my-kit" className={`${card} flex flex-col items-start gap-3`}>
        <h2 id="my-kit" className={eyebrow}>
          My starter kit
        </h2>
        <p className={sectionTitle}>Locked for now</p>
        <p className="text-ink">Finish lesson 1 to unlock your starter kit.</p>
        <button disabled className={`${buttonMain} disabled:cursor-not-allowed disabled:opacity-50`}>
          Request starter kit
        </button>
      </section>

      {/* Other volunteers' requests are for officers' eyes only. */}
      <IfOfficer>
        <section aria-labelledby="to-approve" className={`${card} flex flex-col gap-4`}>
          <h2 id="to-approve" className={eyebrow}>
            Requests to approve
          </h2>
          <ul className={rows}>
            {kitRequests.map((request) => (
              <li
                key={request.id}
                className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div>
                  <p className="font-bold">
                    {request.volunteerName} · <span className="capitalize">{request.kit}</span> kit
                  </p>
                  <p className="text-sm text-muted">
                    {statusLabel[request.status]} · requested {request.requestedAt}
                  </p>
                </div>
                {request.status === "pending" && (
                  <button disabled className={smallButtonMain}>
                    Approve
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className={hint}>Approving starts working once kit requests are saved in the database.</p>
        </section>
      </IfOfficer>
    </PortalPage>
  );
}
