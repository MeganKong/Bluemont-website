// Owner: Adhya. Kit requests for officers, at "/kits/requests".
//
// What this page will do:
// - List every kit request: waiting ones first, then ones ready for pickup,
//   then the latest pickups. Officers approve a request, then mark it
//   picked up when the volunteer collects it.
// Done when: officers approve real requests and volunteers see the change.
//
// Officers only: <OfficersOnly> keeps volunteers out, and the database only
// lets officers change a request.
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { KitRequest } from "@/lib/types";
import { setKitStatus } from "@/lib/portal/actions";
import { getKitRequests } from "@/lib/portal/data";
import { formatDate } from "@/lib/work/format";
import { ActionForm } from "@/components/action-form";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { buttonSecondary, card, eyebrow, rows, smallButton, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Kit requests" };

export default function KitRequestsPage() {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Officers"
        title="Kit requests"
        lead="Approve a request, then mark it picked up when the volunteer collects it."
        actions={
          <Link href="/kits/stock" className={buttonSecondary}>
            Stock
          </Link>
        }
      >
        <Suspense fallback={<div className={`${card} min-h-48`} />}>
          <Requests />
        </Suspense>
      </PortalPage>
    </OfficersOnly>
  );
}

async function Requests() {
  const { requests, sample } = await getKitRequests();
  const groups: { status: KitRequest["status"]; title: string; empty: string }[] = [
    { status: "pending", title: "Waiting for approval", empty: "No requests waiting." },
    { status: "approved", title: "Ready for pickup", empty: "Nothing waiting for pickup." },
    { status: "picked_up", title: "Picked up", empty: "No pickups yet." },
  ];

  return (
    <>
      {sample && <SampleNote />}
      {groups.map((group) => {
        // Only the latest 20 pickups, so the list doesn't grow forever.
        const items = requests.filter((r) => r.status === group.status);
        const shown = group.status === "picked_up" ? items.slice(-20).reverse() : items;
        return (
          <section key={group.status} aria-labelledby={group.status} className={`${card} flex flex-col gap-4`}>
            <h2 id={group.status} className={eyebrow}>
              {group.title} {items.length > 0 && `(${items.length})`}
            </h2>
            {shown.length === 0 ? (
              <p className="text-ink">{group.empty}</p>
            ) : (
              <ul className={rows}>
                {shown.map((request) => (
                  <li
                    key={request.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold">
                        {request.volunteerName} · <span className="capitalize">{request.kit}</span> kit
                      </p>
                      <p className="text-sm text-muted">Requested {formatDate(request.requestedAt)}</p>
                    </div>
                    {request.status !== "picked_up" && (
                      <ActionForm action={setKitStatus} className="flex flex-wrap gap-2">
                        <input type="hidden" name="id" value={request.id} />
                        {request.status === "pending" ? (
                          <button type="submit" name="status" value="approved" className={smallButtonMain}>
                            Approve
                          </button>
                        ) : (
                          <>
                            <button type="submit" name="status" value="picked_up" className={smallButtonMain}>
                              Mark picked up
                            </button>
                            <button type="submit" name="status" value="pending" className={smallButton}>
                              Undo approval
                            </button>
                          </>
                        )}
                      </ActionForm>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </>
  );
}
