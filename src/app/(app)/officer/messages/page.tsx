// Owner: Megan (built by Nika). Form messages, at "/officer/messages".
//
// What this page will do:
// - List plushie requests from shelters (For shelters page) and contact
//   messages (FAQ page), newest first, with a Delete button on each.
// Done when: officers can read every form sent and delete the ones they're
// done with.
//
// Officers only: <OfficersOnly> checks on the server, and the database's
// privacy rules only let officers read these anyway
// (supabase/migrations/*_contact_messages_and_plushie_requests.sql).
import type { Metadata } from "next";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card, eyebrow, link, rows } from "@/components/portal-styles";
import { DeleteButton } from "./delete-button";

export const metadata: Metadata = { title: "Messages" };

export default function MessagesPage() {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Messages"
        title="From the website"
        lead="Reply by email within 1–3 days, then delete them when you're done."
        back={{ href: "/officer", label: "Officer dashboard" }}
      >
        {/* Reading the database happens per visit, so it loads in a boundary. */}
        <Suspense fallback={<div className={`${card} min-h-40`} />}>
          <Requests />
          <ContactMessages />
        </Suspense>
      </PortalPage>
    </OfficersOnly>
  );
}

async function Requests() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("plushie_requests")
    .select("id, organization, name, email, children, ages, city, notes, created_at")
    .order("created_at", { ascending: false });

  return (
    <section aria-labelledby="requests" className={`${card} flex flex-col gap-4`}>
      <h2 id="requests" className={eyebrow}>
        Plushie requests
      </h2>
      {error ? (
        <p className="text-ink">These couldn&apos;t be loaded. Please refresh the page.</p>
      ) : data.length === 0 ? (
        <p className="text-ink">No requests yet.</p>
      ) : (
        <ul className={rows}>
          {data.map((r) => (
            <li key={r.id} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col">
                  <p className="font-bold">{r.organization}</p>
                  <p className="text-sm text-muted">{formatWhen(r.created_at)}</p>
                </div>
                <DeleteButton kind="request" id={r.id} what={`the request from ${r.organization}`} />
              </div>
              <p className="text-ink">
                {r.name} ·{" "}
                <a href={`mailto:${r.email}`} className={link}>
                  {r.email}
                </a>
              </p>
              <p className="text-ink">
                About {r.children} {r.children === 1 ? "child" : "children"} · Ages {r.ages} · {r.city}
              </p>
              {r.notes && <p className="whitespace-pre-line text-ink">{r.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

async function ContactMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, name, email, topic, message, created_at")
    .order("created_at", { ascending: false });

  return (
    <section aria-labelledby="contact" className={`${card} flex flex-col gap-4`}>
      <h2 id="contact" className={eyebrow}>
        Contact messages
      </h2>
      {error ? (
        <p className="text-ink">These couldn&apos;t be loaded. Please refresh the page.</p>
      ) : data.length === 0 ? (
        <p className="text-ink">No messages yet.</p>
      ) : (
        <ul className={rows}>
          {data.map((m) => (
            <li key={m.id} className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col">
                  <p className="font-bold">{m.topic}</p>
                  <p className="text-sm text-muted">{formatWhen(m.created_at)}</p>
                </div>
                <DeleteButton kind="message" id={m.id} what={`the message from ${m.name}`} />
              </div>
              <p className="text-ink">
                {m.name} ·{" "}
                <a href={`mailto:${m.email}`} className={link}>
                  {m.email}
                </a>
              </p>
              <p className="whitespace-pre-line text-ink">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// "2026-11-03T01:30:45Z" → "Nov 2, 2026, 6:30 PM" in California time.
function formatWhen(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Los_Angeles",
  }).format(new Date(timestamp));
}
