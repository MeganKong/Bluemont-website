// Owner: Nika. What parents need to know, in four short facts.
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import { eyebrow, fact, factTitle, headingSmall, moreLink, wrap } from "../_styles";

export function Parents() {
  return (
    <section className={`${wrap} flex flex-wrap gap-12 py-24`}>
      <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-3.5">
        <p className={eyebrow}>For parents</p>
        <h2 className={headingSmall}>Safe, simple and run with care</h2>
        <Link href="/faq#parents" className={moreLink}>
          Read the parent FAQ →
        </Link>
      </div>
      <div className="grid min-w-0 flex-[2_1_540px] gap-x-10 gap-y-7 sm:grid-cols-2">
        <div className={fact}>
          <h3 className={factTitle}>Online lessons</h3>
          <p className="text-ink">Video lessons, no chat between volunteers.</p>
        </div>
        <div className={fact}>
          <h3 className={factTitle}>Privacy first</h3>
          <p className="text-ink">
            We collect only what we need and never post a volunteer&apos;s photo without a
            parent&apos;s OK.
          </p>
        </div>
        <div className={fact}>
          <h3 className={factTitle}>Adult support</h3>
          <p className="text-ink">
            <Tbd>[Advisor name]</Tbd> supports our student leaders.
          </p>
        </div>
        <div className={fact}>
          <h3 className={factTitle}>Flexible time</h3>
          <p className="text-ink">
            Most volunteers spend about <Tbd>[_ hours]</Tbd> a week.
          </p>
        </div>
      </div>
    </section>
  );
}
