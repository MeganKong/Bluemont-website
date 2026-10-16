// Owner: Sophia (shared). Menu for every signed-in page.
// To add your page to the menu, ask Sophia.
import Link from "next/link";
import { Suspense } from "react";
import { getMyRole } from "@/lib/roles";
import { signOut } from "../(auth)/actions";

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
          {/* Hiding the link is just tidiness; /officer checks the role itself. */}
          <Suspense>
            <OfficerLink />
          </Suspense>
          <form action={signOut} className="ml-auto">
            <button type="submit" className="rounded-lg border border-cream/40 px-3 py-1 hover:text-gold">
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </>
  );
}

// Shown only to officers.
async function OfficerLink() {
  if ((await getMyRole()) !== "officer") return null;
  return (
    <Link href="/officer" className="text-cream/80 hover:text-gold">
      Officer
    </Link>
  );
}
