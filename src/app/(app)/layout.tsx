// Owner: Megan (shared). Wraps every signed-in page.
// To add your page to the menu, ask Megan (links are in
// src/components/menu-links.ts).
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { officerLink, volunteerLinks } from "@/components/menu-links";
import { getMyRole } from "@/lib/roles";
import { signOut } from "../(auth)/actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Checking the role happens per visit, so the volunteer menu shows first. */}
      <Suspense fallback={<SiteHeader links={volunteerLinks} signOut={signOut} />}>
        <Header />
      </Suspense>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </>
  );
}

// Officers also get an "Officer" link. Hiding the link is just tidiness;
// /officer checks the role itself.
async function Header() {
  const links = (await getMyRole()) === "officer" ? [...volunteerLinks, officerLink] : volunteerLinks;
  return <SiteHeader links={links} signOut={signOut} />;
}
