// Owner: Megan (shared). Menu for every signed-in page.
// To add your page to the menu, ask Megan.
import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/lessons", label: "Lessons" },
  { href: "/kits", label: "Kits" },
  { href: "/news", label: "News" },
  { href: "/check-ins", label: "Check-ins" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="bg-navy text-cream">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4">
          <Link href="/dashboard" className="font-display text-xl font-semibold">
            Bluemont
          </Link>
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-cream/80 hover:text-gold">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </>
  );
}
