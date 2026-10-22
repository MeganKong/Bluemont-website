// Owner: Nika. Stories from partners and team members. The stories come from
// _placeholder.ts until we collect real ones (with permission to share).
import { partnerStories } from "../_placeholder";
import { card, eyebrow, sectionTitle } from "./styles";

export function PartnerStories() {
  return (
    <section id="stories" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Partner stories</p>
        <h2 className={sectionTitle}>What our partners say</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {partnerStories.map((story, index) => (
          <figure key={index} className={card}>
            <blockquote className="flex-1 text-lg text-ink">“{story.quote}”</blockquote>
            <figcaption>
              <p className="font-bold">{story.name}</p>
              <p className="text-sm text-muted">{story.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
