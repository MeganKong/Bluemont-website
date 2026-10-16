// Owner: Sophia (shared). The links in the header menu. Keep each menu to
// five links or fewer so it fits on one line on a laptop.
export type MenuLink = { href: string; label: string };

// Visitors who are not signed in (home, about, sign in and sign up pages).
export const visitorLinks: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-involved", label: "Get involved" },
];

// Shown as a button at the end of the visitor menu.
export const signInLink: MenuLink = { href: "/sign-in", label: "Sign in" };

// Signed-in volunteers.
export const volunteerLinks: MenuLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/lessons", label: "Lessons" },
  { href: "/kits", label: "Kits" },
  { href: "/news", label: "News" },
  { href: "/check-ins", label: "Check-ins" },
];
