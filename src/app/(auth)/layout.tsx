// Owner: Megan. Wraps the sign-in and sign-up pages with the visitor menu.
import { SiteHeader } from "@/components/site-header";
import { visitorLinks } from "@/components/menu-links";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader links={visitorLinks} />
      {children}
    </>
  );
}
