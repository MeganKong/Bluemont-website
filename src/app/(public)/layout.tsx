// Owner: unassigned (to be split). Wraps the public pages (home, about, ...).
// The header and menu links live in src/components/; the footer comes from
// src/app/layout.tsx. Each page sets its own width, because most sections
// run edge to edge (see `wrap` in _styles.ts).
import { SiteHeader } from "@/components/site-header";
import { donateLink, signInLink, visitorLinks } from "@/components/menu-links";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader tone="night" links={visitorLinks} quietLink={signInLink} button={donateLink} />
      <main className="w-full flex-1">{children}</main>
    </>
  );
}
