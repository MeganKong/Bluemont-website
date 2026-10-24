"use client";
// Owner: Megan (shared; built by Adhya). Put on "My work": once the page
// opens, it marks the volunteer's feedback as seen. The "New" labels stay for
// this visit, and are gone from the dashboard next time.
import { useEffect } from "react";
import { markMyFeedbackSeen } from "@/lib/work/actions";

export function MarkSeen() {
  useEffect(() => {
    markMyFeedbackSeen();
  }, []);
  return null;
}
