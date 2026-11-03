// Owner: Adhya. Supplies on hand at "/kits/stock".
//
// What this page will do (month 1 build plan):
// - One table of supplies. Each approved kit lowers the count.
// Done when: the low-stock flag shows when a supply runs low.
//
// Officers only: <OfficersOnly> keeps volunteers out.
import type { Metadata } from "next";
import { stock } from "../_placeholder";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Stock" };

export default function StockPage() {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Kits"
        title="Stock"
        lead="Supplies on hand. Each approved kit lowers the count."
        back={{ href: "/kits", label: "Kits" }}
      >
        <SampleNote />
        <div className={`${card} overflow-x-auto p-0!`}>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-rule text-xs tracking-[0.14em] text-muted uppercase">
                <th className="px-6 py-4 font-bold">Item</th>
                <th className="px-6 py-4 font-bold">On hand</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {stock.map((item) => {
                const low = item.quantity <= item.lowStockAt;
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 font-semibold">{item.name}</td>
                    <td className="px-6 py-4 font-serif text-2xl">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[13px] font-bold ${
                          low ? "bg-pink-pale text-navy" : "bg-mint-pale text-navy"
                        }`}
                      >
                        {low ? "Low, reorder" : "OK"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </PortalPage>
    </OfficersOnly>
  );
}
