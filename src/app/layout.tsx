// Owner: Megan (shared). Wraps every page on the site.
import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

// Body text.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

// Headings (font-display).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bluemont Children Foundation",
    template: "%s · Bluemont",
  },
  description:
    "Student volunteers learn to crochet and make plushies for children in shelters.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
