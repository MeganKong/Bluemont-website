// Owner: Nika. What parents need to know. The text comes from
// _placeholder.ts; more topics may be added later.
import { parentInfo } from "../_placeholder";
import { card, eyebrow, sectionTitle, tints } from "../_styles";

export function Parents() {
  return (
    <section id="parents" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>For parents</p>
        <h2 className={sectionTitle}>What parents should know</h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {parentInfo.map((item, index) => (
          <div key={item.title} className={`${card} ${tints[index % tints.length]}`}>
            <h3 className="font-display text-xl font-extrabold">{item.title}</h3>
            <p className="text-ink">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
