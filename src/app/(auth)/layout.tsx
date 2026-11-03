// Owner: Megan. Wraps the sign-in and sign-up pages with the same dark
// header as the public pages, so they run straight into each page's dark top.
import { SiteHeader } from "@/components/site-header";
import { donateLink, signInLink, visitorLinks } from "@/components/menu-links";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader tone="night" links={visitorLinks} quietLink={signInLink} button={donateLink} />
      {children}
    </>
  );
}
