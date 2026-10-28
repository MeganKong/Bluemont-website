// Owner: Nika. Three cards: volunteer, sponsor a kit, request plushies.
import Link from "next/link";
import { Tbd } from "@/components/tbd";
import { buttonHoney, buttonNight, buttonOutline, heading, section, wrap } from "../_styles";

export function WaysToHelp() {
  return (
    <section className="bg-tint">
      <div className={`${wrap} ${section} flex flex-col gap-9`}>
        <h2 className={heading}>Three ways to help</h2>
        <div className="grid gap-5 md:grid-cols-3">
          <Card
            title="Volunteer"
            text={
              <>
                For teens <Tbd>13 and up</Tbd>. Learn to crochet for free and make plushies on your
                own schedule.
              </>
            }
          >
            <Link href="/volunteer" className={buttonNight}>
              Sign up
            </Link>
          </Card>
          <Card
            title="Sponsor a kit"
            text={
              <>
                <Tbd>$__</Tbd> buys one kit: yarn, a hook and stuffing for one plushie. Donations are
                tax-deductible.
              </>
            }
          >
            <Link href="/donate" className={buttonHoney}>
              Give now
            </Link>
          </Card>
          <Card
            title="Request plushies"
            text="Work at a shelter or a program for children? We'll send handmade plushies, free."
          >
            <Link href="/for-shelters" className={buttonOutline}>
              Ask for a donation
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Card({ title, text, children }: { title: string; text: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-3.5 rounded-3xl border border-rule bg-card p-8">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="grow text-ink">{text}</p>
      {children}
    </div>
  );
}
