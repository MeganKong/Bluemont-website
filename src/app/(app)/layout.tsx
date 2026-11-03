// Owner: Megan (shared). Wraps every signed-in page with the dark header.
// Each page sets its own width and dark top with <PortalPage>
// (src/components/portal-page.tsx).
// To add your page to the menu, ask Megan (links are in
// src/components/menu-links.ts).
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { officerLinks, volunteerLinks } from "@/components/menu-links";
import { getMyRole } from "@/lib/roles";
import { signOut } from "../(auth)/actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Checking the role happens per visit. Until then the menu is empty,
          so nobody sees links that aren't theirs. */}
      <Suspense fallback={<SiteHeader tone="night" links={[]} signOut={signOut} />}>
        <Header />
      </Suspense>
      <main className="flex w-full flex-1 flex-col">{children}</main>
    </>
  );
}

// Officers and volunteers each get their own menu. Hiding links is just
// tidiness; officer pages check the role themselves (<OfficersOnly>).
async function Header() {
  const links = (await getMyRole()) === "officer" ? officerLinks : volunteerLinks;
  return <SiteHeader tone="night" links={links} signOut={signOut} />;
}
