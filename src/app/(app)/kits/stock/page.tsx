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
import { SampleNote } from "@/components/sample-note";

export const metadata: Metadata = { title: "Stock" };

export default function StockPage() {
  return (
    <OfficersOnly>
      <div className="flex flex-col gap-6">
        <SampleNote />
        <h1 className="font-display text-4xl font-semibold">Stock</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line text-muted">
                <th className="py-2 pr-4 font-semibold">Item</th>
                <th className="py-2 pr-4 font-semibold">On hand</th>
                <th className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => {
                const low = item.quantity <= item.lowStockAt;
                return (
                  <tr key={item.id} className="border-b border-line">
                    <td className="py-3 pr-4">{item.name}</td>
                    <td className="py-3 pr-4">{item.quantity}</td>
                    <td className={`py-3 font-semibold ${low ? "text-terracotta" : "text-ink"}`}>
                      {low ? "Low, reorder" : "OK"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </OfficersOnly>
  );
}
