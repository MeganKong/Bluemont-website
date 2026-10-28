// Owner: Megan (shared). The links in the header menu. Keep each menu to
// five links or fewer so it fits on one line on a laptop.
export type MenuLink = { href: string; label: string };

// Visitors who are not signed in (home, about, sign in and sign up pages).
// The logo links home, so Home isn't in the list.
export const visitorLinks: MenuLink[] = [
  { href: "/about", label: "About" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/impact", label: "Impact" },
  { href: "/for-shelters", label: "For shelters" },
  { href: "/faq", label: "FAQ" },
];

// A quiet link before the button in the visitor menu.
export const signInLink: MenuLink = { href: "/sign-in", label: "Sign in" };

// The bright button at the end of the visitor menu.
export const donateLink: MenuLink = { href: "/donate", label: "Donate" };

// Signed-in volunteers. Only pages volunteers can use.
export const volunteerLinks: MenuLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/lessons", label: "Lessons" },
  { href: "/kits", label: "Kits" },
  { href: "/news", label: "News" },
  { href: "/dashboard/my-work", label: "My work" },
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
