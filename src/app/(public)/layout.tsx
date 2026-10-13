// Owner: unassigned (to be split). Header and footer for the public pages.
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-line">
        <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-6 px-4 py-4">
          <Link href="/" className="font-display text-xl font-semibold">
            Bluemont
          </Link>
          <div className="flex flex-1 gap-4 text-ink">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-navy">
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/sign-in"
            className="rounded-lg bg-terracotta px-4 py-2 font-semibold text-cream"
          >
            Sign in
          </Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">{children}</main>
      <footer className="border-t border-line px-4 py-6 text-center text-sm text-muted">
        Bluemont Children Foundation · a student-led 501(c)(3)
      </footer>
    </>
  );
}
