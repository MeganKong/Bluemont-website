// Owner: unassigned (to be split). Wraps the public pages (home, about, ...).
// The header and menu links live in src/components/; the footer comes from
// src/app/layout.tsx.
import { SiteHeader } from "@/components/site-header";
import { signInLink, visitorLinks } from "@/components/menu-links";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader links={visitorLinks} button={signInLink} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">{children}</main>
    </>
  );
}
