// Owner: Megan (shared). The footer at the bottom of every page.
import Link from "next/link";
import { Logo } from "./logo";
import { Tbd } from "./tbd";

// To add: Bluemont's real accounts. Give each one an href when it exists,
// e.g. { label: "Instagram", href: "https://www.instagram.com/..." }.
const socialLinks: { label: string; href?: string }[] = [{ label: "Instagram" }];

const columns: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Get involved",
    links: [
      { href: "/volunteer", label: "Volunteer" },
      { href: "/donate", label: "Donate" },
      { href: "/for-shelters", label: "Request plushies" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/impact", label: "Impact" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

const footerLink =
  "rounded text-soft hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-soft">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-10 px-6 pt-16 pb-10 text-[15px]">
        <div className="flex max-w-sm flex-col gap-3">
          <Logo className="text-4xl text-card" />
          <p>
            Bluemont Children Foundation is a student-led 501(c)(3) nonprofit. EIN{" "}
            <Tbd>__-_______</Tbd>.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          {columns.map((column) => (
            <div key={column.title} className="flex flex-col gap-2">
              <h2 className="font-bold text-card">{column.title}</h2>
              {column.links.map((link) => (
                <Link key={link.href} href={link.href} className={footerLink}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-card">Contact</h2>
            <span>
              <Tbd>hello@[our domain]</Tbd>
            </span>
            <Link href="/faq#contact" className={footerLink}>
              Contact form
            </Link>
            {socialLinks.map((social) =>
              social.href ? (
                <a key={social.label} href={social.href} className={footerLink}>
                  {social.label}
                </a>
              ) : (
                <span key={social.label}>
                  {social.label} <Tbd>[link]</Tbd>
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-night-line/50">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-x-6 gap-y-2 px-6 py-6 text-sm">
          <span>© 2026 Bluemont Children Foundation</span>
          <span>
            Privacy policy · Child safety policy · Terms <Tbd>[pages to write]</Tbd>
          </span>
        </div>
      </div>
    </footer>
  );
}
