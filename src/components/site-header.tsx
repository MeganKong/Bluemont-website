"use client";
// Owner: Megan (shared). The header and menu at the top of every page.
// On wide screens the links sit in a row. On phones they hide behind a
// "Menu" button that opens and closes a list. "use client" is needed because
// the header has to remember whether that list is open.
//
// The public pages use the dark blue "night" header (tone="night"), so it
// runs straight into the dark top of each page. Signed-in pages use the
// white one.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import type { MenuLink } from "./menu-links";

type SiteHeaderProps = {
  links: MenuLink[];
  // Optional button at the end of the menu, e.g. "Donate".
  button?: MenuLink;
  // Optional quieter link before the button, e.g. "Sign in".
  quietLink?: MenuLink;
  // "night" for the dark blue header, "light" (the default) for white.
  tone?: "light" | "night";
  // Signed-in pages pass the sign-out action to show a "Sign out" button.
  signOut?: () => Promise<void>;
};

// Blue ring around whatever is reached with the Tab key.
const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

// The classes that change between the white and the night header.
const tones = {
  light: {
    header: "border-b-2 border-navy bg-card text-navy",
    link: "hover:text-blue",
    quiet: "text-muted hover:text-blue",
    // The current page's link gets a pink wavy underline, like a strand of yarn.
    current:
      "aria-[current=page]:font-extrabold aria-[current=page]:underline aria-[current=page]:decoration-pink " +
      "aria-[current=page]:decoration-wavy aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8",
    button: "border-2 border-navy bg-gold shadow-[0_3px_0_var(--color-navy)]",
    outline: "border-navy",
    divider: "border-sand",
  },
  night: {
    header: "bg-navy text-card",
    link: "hover:text-gold",
    quiet: "text-soft hover:text-gold",
    // The current page's link gets a honey underline.
    current:
      "aria-[current=page]:underline aria-[current=page]:decoration-gold " +
      "aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8",
    button: "bg-gold text-navy hover:brightness-105",
    outline: "border-night-line",
    divider: "border-night-line",
  },
};

export function SiteHeader({ links, button, quietLink, tone = "light", signOut }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  // The page we're on, so its menu link can be underlined.
  const pathname = usePathname();
  const t = tones[tone];

  return (
    <header className={t.header}>
      <nav aria-label="Main" className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between gap-6 py-5">
          <Link href="/" onClick={closeMenu} className={`rounded text-3xl ${focusRing}`}>
            <Logo />
          </Link>

          {/* Wide screens: links in a row. */}
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`rounded font-semibold ${t.link} ${t.current} ${focusRing}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {quietLink && (
              <li>
                <Link href={quietLink.href} className={`rounded font-semibold ${t.quiet} ${focusRing}`}>
                  {quietLink.label}
                </Link>
              </li>
            )}
            {button && (
              <li>
                <Link
                  href={button.href}
                  className={`rounded-full px-5 py-2.5 font-extrabold ${t.button} ${focusRing}`}
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
                    className={`rounded-full border-2 px-4 py-1.5 font-semibold ${t.outline} ${t.link} ${focusRing}`}
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
            className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 font-bold md:hidden ${t.outline} ${focusRing}`}
          >
            <span aria-hidden="true">{menuOpen ? "✕" : "☰"}</span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <ul id="phone-menu" className={`flex flex-col border-t-2 py-2 md:hidden ${t.divider}`}>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`block rounded py-3 text-lg font-semibold ${t.link} ${t.current} ${focusRing}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {quietLink && (
              <li>
                <Link
                  href={quietLink.href}
                  onClick={closeMenu}
                  className={`block rounded py-3 text-lg font-semibold ${t.quiet} ${focusRing}`}
                >
                  {quietLink.label}
                </Link>
              </li>
            )}
            {button && (
              <li className="pt-2 pb-2">
                <Link
                  href={button.href}
                  onClick={closeMenu}
                  className={`block rounded-full px-4 py-3 text-center font-extrabold ${t.button} ${focusRing}`}
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
                    className={`block w-full rounded-full border-2 px-4 py-3 font-semibold ${t.outline} ${focusRing}`}
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
