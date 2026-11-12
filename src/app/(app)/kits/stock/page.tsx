// Owner: Adhya. Supplies on hand at "/kits/stock".
//
// What this page will do (month 1 build plan):
// - One table of supplies. Officers update the counts after each pickup.
// Done when: the low-stock flag shows when a supply runs low.
//
// Officers only: <OfficersOnly> keeps volunteers out, and the database only
// lets officers read or change stock.
import type { Metadata } from "next";
import { Suspense } from "react";
import type { StockItem } from "@/lib/types";
import { addStock, removeStock, updateStock } from "@/lib/portal/actions";
import { getStock } from "@/lib/portal/data";
import { ActionForm } from "@/components/action-form";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card, eyebrow, field, label, rows, smallButton, smallButtonMain } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Stock" };

export default function StockPage() {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Officers"
        title="Stock"
        lead="Supplies on hand. Update the counts after each pickup."
        back={{ href: "/kits/requests", label: "Kit requests" }}
        width="narrow"
      >
        <Suspense fallback={<div className={`${card} min-h-48`} />}>
          <Stock />
        </Suspense>
      </PortalPage>
    </OfficersOnly>
  );
}

async function Stock() {
  const { items, sample } = await getStock();

  return (
    <>
      {sample && <SampleNote />}
      <section aria-labelledby="supplies" className={`${card} flex flex-col gap-4`}>
        <h2 id="supplies" className={eyebrow}>
          Supplies
        </h2>
        {items.length === 0 ? (
          <p className="text-ink">No supplies yet. Add one below.</p>
        ) : (
          <ul className={rows}>
            {items.map((item) => (
              <Supply key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>

      <details className={`${card} group`}>
        <summary className="cursor-pointer list-none font-bold text-blue">+ Add a supply</summary>
        <ActionForm action={addStock} done="Added." className="mt-4 flex flex-col gap-4">
          <label className={label}>
            Name
            <input name="name" required maxLength={80} className={field} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className={label}>
              On hand
              <input name="quantity" type="number" required min={0} step={1} defaultValue={0} className={field} />
            </label>
            <label className={label}>
              Low at
              <input name="lowStockAt" type="number" required min={0} step={1} defaultValue={0} className={field} />
            </label>
          </div>
          <button type="submit" className={`${smallButtonMain} self-start`}>
            Add
          </button>
        </ActionForm>
      </details>
    </>
  );
}

// One supply: its name, a low-stock flag, and a box to change the count.
function Supply({ item }: { item: StockItem }) {
  const low = item.quantity <= item.lowStockAt;

  return (
    <li className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-bold">{item.name}</p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold text-navy ${low ? "bg-pink-pale" : "bg-mint-pale"}`}
          >
            {low ? "Low, reorder" : "OK"}
          </span>
          Low at {item.lowStockAt}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* The key resets the box when the saved count changes. */}
        <ActionForm key={item.quantity} action={updateStock} className="flex items-center gap-2">
          <input type="hidden" name="id" value={item.id} />
          <input
            name="quantity"
            type="number"
            required
            min={0}
            step={1}
            defaultValue={item.quantity}
            aria-label={`${item.name} on hand`}
            className={`${field} max-w-28`}
          />
          <button type="submit" className={smallButtonMain}>
            Save
          </button>
        </ActionForm>
        <ActionForm action={removeStock}>
          <input type="hidden" name="id" value={item.id} />
          <button type="submit" className={smallButton} aria-label={`Remove ${item.name}`}>
            Remove
          </button>
        </ActionForm>
      </div>
    </li>
  );
}
