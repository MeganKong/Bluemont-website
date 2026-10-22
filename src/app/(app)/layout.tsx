// Owner: Megan (shared). Wraps every signed-in page.
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
      <Suspense fallback={<SiteHeader links={[]} signOut={signOut} />}>
        <Header />
      </Suspense>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </>
  );
}

// Officers and volunteers each get their own menu. Hiding links is just
// tidiness; officer pages check the role themselves (<OfficersOnly>).
async function Header() {
  const links = (await getMyRole()) === "officer" ? officerLinks : volunteerLinks;
  return <SiteHeader links={links} signOut={signOut} />;
}
