"use client";
// Owner: Sophia (shared). The header and menu at the top of every page.
// On wide screens the links sit in a row. On phones they hide behind a
// "Menu" button that opens and closes a list. "use client" is needed because
// the header has to remember whether that list is open.
import Link from "next/link";
import { useState } from "react";
import type { MenuLink } from "./menu-links";

type SiteHeaderProps = {
  links: MenuLink[];
  // Optional button at the end of the menu, e.g. "Sign in".
  button?: MenuLink;
  // Signed-in pages pass the sign-out action to show a "Sign out" button.
  signOut?: () => Promise<void>;
};

// Gold ring around whatever is reached with the Tab key.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export function SiteHeader({ links, button, signOut }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-navy text-cream">
      <nav aria-label="Main" className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className={`rounded font-display text-xl font-semibold ${focusRing}`}
          >
            Bluemont
          </Link>

          {/* Wide screens: links in a row. */}
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`rounded text-cream/80 hover:text-gold ${focusRing}`}>
                  {link.label}
                </Link>
              </li>
            ))}
            {button && (
              <li>
                <Link
                  href={button.href}
                  className={`rounded-lg bg-terracotta px-4 py-2 font-semibold text-cream ${focusRing}`}
                >
                  {button.label}
                </Link>
              </li>
            )}
            {signOut && (
              <li>
                <form action={signOut}>
                  <button
                    type="submit"
                    className={`rounded-lg border border-cream/40 px-3 py-1 hover:text-gold ${focusRing}`}
                  >
                    Sign out
                  </button>
                </form>
              </li>
            )}
          </ul>

          {/* Phones: a button that opens and closes the list below. */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="phone-menu"
            className={`flex items-center gap-2 rounded-lg border border-cream/40 px-3 py-2 font-semibold md:hidden ${focusRing}`}
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <ul id="phone-menu" className="flex flex-col border-t border-cream/20 py-2 md:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`block rounded py-3 text-lg text-cream/90 hover:text-gold ${focusRing}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {button && (
              <li className="pt-2 pb-2">
                <Link
                  href={button.href}
                  onClick={closeMenu}
                  className={`block rounded-lg bg-terracotta px-4 py-3 text-center font-semibold text-cream ${focusRing}`}
                >
                  {button.label}
                </Link>
              </li>
            )}
            {signOut && (
              <li className="pt-2 pb-2">
                <form action={signOut}>
                  <button
                    type="submit"
                    className={`block w-full rounded-lg border border-cream/40 px-4 py-3 font-semibold ${focusRing}`}
                  >
                    Sign out
                  </button>
                </form>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}
