// Owner: Megan (shared). The links in the header menu. Keep each menu to
// five links or fewer so it fits on one line on a laptop.
export type MenuLink = { href: string; label: string };

// Visitors who are not signed in (home, about, sign in and sign up pages).
export const visitorLinks: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Our team" },
  { href: "/community", label: "Community" },
  { href: "/give", label: "Give & Receive" },
  { href: "/faq", label: "FAQ" },
];

// Shown as a button at the end of the visitor menu.
export const signInLink: MenuLink = { href: "/sign-in", label: "Sign in" };

// Signed-in volunteers. Only pages volunteers can use.
export const volunteerLinks: MenuLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/lessons", label: "Lessons" },
  { href: "/kits", label: "Kits" },
  { href: "/news", label: "News" },
];

// Signed-in officers (see src/app/(app)/layout.tsx). "Dashboard" is their
// own officer dashboard.
export const officerLinks: MenuLink[] = [
  { href: "/officer", label: "Dashboard" },
  { href: "/lessons", label: "Lessons" },
  { href: "/kits", label: "Kits" },
  { href: "/news", label: "News" },
  { href: "/check-ins", label: "Check-ins" },
];
