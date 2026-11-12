"use client";
// Owner: unassigned (built by Adhya). Opens the browser's print window, so a
// volunteer can print or save their hours as a PDF for school.
import { buttonSecondary } from "@/components/portal-styles";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={`${buttonSecondary} print:hidden`}>
      Print my hours
    </button>
  );
}
