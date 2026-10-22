"use client";
// Owner: Megan (shared). The header and menu at the top of every page.
// On wide screens the links sit in a row. On phones they hide behind a
// "Menu" button that opens and closes a list. "use client" is needed because
// the header has to remember whether that list is open.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { MenuLink } from "./menu-links";

type SiteHeaderProps = {
  links: MenuLink[];
  // Optional button at the end of the menu, e.g. "Sign in".
  button?: MenuLink;
  // Signed-in pages pass the sign-out action to show a "Sign out" button.
  signOut?: () => Promise<void>;
};

// Blue ring around whatever is reached with the Tab key.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

// The current page's link gets a pink wavy underline, like a strand of yarn.
const currentLink =
  "aria-[current=page]:font-extrabold aria-[current=page]:underline aria-[current=page]:decoration-pink " +
  "aria-[current=page]:decoration-wavy aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8";

export function SiteHeader({ links, button, signOut }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  // The page we're on, so its menu link can be underlined.
  const pathname = usePathname();

  return (
    <header className="border-b-2 border-navy bg-card text-navy">
      <nav aria-label="Main" className="mx-auto max-w-5xl px-4">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link
            href="/"
            onClick={closeMenu}
            className={`rounded font-display text-2xl font-extrabold tracking-tight ${focusRing}`}
          >
            Bluemont
          </Link>

          {/* Wide screens: links in a row. */}
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`rounded font-semibold hover:text-blue ${currentLink} ${focusRing}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {button && (
              <li>
                <Link
                  href={button.href}
                  className={`rounded-full border-2 border-navy bg-gold px-5 py-2 font-extrabold shadow-[0_3px_0_var(--color-navy)] ${focusRing}`}
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
                    className={`rounded-full border-2 border-navy px-4 py-1.5 font-semibold hover:text-blue ${focusRing}`}
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
            className={`flex items-center gap-2 rounded-full border-2 border-navy px-4 py-2 font-bold md:hidden ${focusRing}`}
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <ul id="phone-menu" className="flex flex-col border-t-2 border-sand py-2 md:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`block rounded py-3 text-lg font-semibold hover:text-blue ${currentLink} ${focusRing}`}
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
                  className={`block rounded-full border-2 border-navy bg-gold px-4 py-3 text-center font-extrabold ${focusRing}`}
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
                    className={`block w-full rounded-full border-2 border-navy px-4 py-3 font-semibold ${focusRing}`}
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
