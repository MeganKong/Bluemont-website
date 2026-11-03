// Owner: Megan (built by Adhya). Work volunteers shared, at "/officer/work".
//
// What this page will do:
// - List every photo volunteers shared, newest first, with their first name,
//   the date, and whether it has feedback yet.
// - Filter to work that still needs feedback, or needs changes.
// Done when: officers can find work that needs feedback and open it.
//
// Officers only: <OfficersOnly> checks on the server, and the database's
// privacy rules only give volunteers their own work anyway.
import type { Metadata } from "next";
import Link from "next/link";
import type { Submission } from "@/lib/types";
import { getAllWork } from "@/lib/work/data";
import { formatDate, lessonTitle } from "@/lib/work/format";
import { OfficersOnly } from "@/components/officers-only";
import { PortalPage } from "@/components/portal-page";
import { card, cardLink, focusRing, sectionTitle } from "@/components/portal-styles";
import { SampleNote } from "@/components/sample-note";
import { FeedbackCountBadge, StatusBadge } from "@/components/work/badges";
import { WorkPhoto } from "@/components/work/work-photo";

export const metadata: Metadata = { title: "Work to review" };

type SearchParams = PageProps<"/officer/work">["searchParams"];

const filters = [
  { value: "all", label: "All", keep: () => true },
  { value: "needs-feedback", label: "Needs feedback", keep: (s: Submission) => s.feedback.length === 0 },
  { value: "needs-changes", label: "Needs changes", keep: (s: Submission) => s.status === "needs_changes" },
];

export default function WorkPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <OfficersOnly>
      <PortalPage
        eyebrow="Work to review"
        title="Shared work"
        lead="Photos volunteers shared, newest first."
        back={{ href: "/officer", label: "Officer dashboard" }}
      >
        <WorkList searchParams={searchParams} />
      </PortalPage>
    </OfficersOnly>
  );
}

async function WorkList({ searchParams }: { searchParams: SearchParams }) {
  const { show } = await searchParams;
  const filter = filters.find((f) => f.value === show) ?? filters[0];
  const { submissions, sample } = await getAllWork();
  const shown = submissions.filter(filter.keep);

  return (
    <>
      {sample && <SampleNote />}
      {/* Filter buttons. They're links, so the filter stays when you go back. */}
      <nav aria-label="Filter work" className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const isCurrent = f === filter;
          return (
            <Link
              key={f.value}
              href={f.value === "all" ? "/officer/work" : `/officer/work?show=${f.value}`}
              aria-current={isCurrent ? "page" : undefined}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border-[1.5px] px-4 text-[15px] font-bold transition ${focusRing} ${
                isCurrent ? "border-navy bg-navy text-card" : "border-line bg-card text-navy hover:border-navy"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-2 text-[13px] ${isCurrent ? "bg-card/15 text-card" : "bg-tint text-blue"}`}
              >
                {submissions.filter(f.keep).length}
              </span>
            </Link>
          );
        })}
      </nav>

      {shown.length === 0 ? (
        <div className={`${card} flex flex-col items-center gap-2 text-center`}>
          <p className={sectionTitle}>{filter.value === "all" ? "No work shared yet" : "All caught up"}</p>
          <p className="text-ink">
            {filter.value === "all"
              ? "When volunteers share photos of their crochet, they'll show up here."
              : "Nothing here right now."}
          </p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((submission) => (
            <li key={submission.id}>
              <WorkCard submission={submission} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// One submission in the list. The whole card opens it.
function WorkCard({ submission }: { submission: Submission }) {
  const lesson = lessonTitle(submission.lessonId);

  return (
    <Link href={`/officer/work/${submission.id}`} className={`${cardLink} flex h-full flex-col gap-3 p-4!`}>
      <WorkPhoto
        src={submission.photoUrl}
        alt={`Crochet work shared by ${submission.volunteerName}`}
        className="aspect-square w-full rounded-xl object-cover"
      />
      <div className="flex flex-wrap gap-2">
        <FeedbackCountBadge count={submission.feedback.length} />
        <StatusBadge status={submission.status} />
      </div>
      <p className="text-lg font-bold">{submission.volunteerName}</p>
      <p className="text-sm text-muted">
        <time dateTime={submission.createdAt}>{formatDate(submission.createdAt)}</time>
        {lesson && ` · ${lesson}`}
      </p>
    </Link>
  );
}
