// Owner: Nika. Our story: why Megan started Bluemont. The words come from
// _placeholder.ts until Megan writes the real story.
import { founder } from "../_placeholder";
import { card, eyebrow, sectionTitle } from "../_styles";

export function FounderStory() {
  return (
    <section id="our-story" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Our story</p>
        <h2 className={sectionTitle}>Why Bluemont started</h2>
      </div>
      <div className={`${card} max-w-3xl`}>
        {founder.story.map((paragraph) => (
          <p key={paragraph} className="text-lg text-ink">
            {paragraph}
          </p>
        ))}
        <p className="font-display text-xl font-extrabold">
          {founder.name}, {founder.role}
        </p>
      </div>
    </section>
  );
}
