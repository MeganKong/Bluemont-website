// Owner: Nika. Three ways to join: volunteer, start a chapter, partner with us.
// The chapter and partner forms aren't built yet. People will sign in before
// filling them out; the questions are still being decided.
import Link from "next/link";
import { buttonMain, buttonSoon, card, eyebrow, sectionTitle } from "../_styles";

const ways = [
  {
    title: "Become a volunteer",
    color: "bg-pink-pale",
    text: "Learn to crochet for free and make plushies for kids in shelters.",
    href: "/sign-up",
    button: "Sign up",
  },
  {
    title: "Start a chapter",
    color: "bg-mint-pale",
    text: "Bring Bluemont to your school or club. You'll sign in first, then fill out a short form.",
    href: null,
    button: "Form coming soon",
  },
  {
    title: "Partner with us",
    color: "bg-peach-pale",
    text: "Organizations and businesses can team up with Bluemont. You'll sign in first, then tell us about your group.",
    href: null,
    button: "Form coming soon",
  },
];

export function GetInvolved() {
  return (
    <section id="get-involved" className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className={eyebrow}>Get involved</p>
        <h2 className={sectionTitle}>Join the Bluemont family</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {ways.map((way) => (
          <div key={way.title} className={`${card} ${way.color}`}>
            <h3 className="font-display text-2xl font-extrabold">{way.title}</h3>
            <p className="flex-1 text-ink">{way.text}</p>
            {way.href ? (
              <Link href={way.href} className={buttonMain}>
                {way.button}
              </Link>
            ) : (
              <span className={buttonSoon}>{way.button}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
