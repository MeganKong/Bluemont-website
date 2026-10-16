// Owner: Sophia (shared). Wraps every signed-in page.
// To add your page to the menu, ask Sophia (links are in
// src/components/menu-links.ts).
import { SiteHeader } from "@/components/site-header";
import { volunteerLinks } from "@/components/menu-links";
import { signOut } from "../(auth)/actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader links={volunteerLinks} signOut={signOut} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">{children}</main>
    </>
  );
}
