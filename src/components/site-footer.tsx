// Owner: Megan (shared). The footer at the bottom of every page.

// To add: Bluemont's real accounts. Give each one an href when it exists,
// e.g. { label: "Instagram", href: "https://www.instagram.com/..." }.
const socialLinks: { label: string; href?: string }[] = [
  { label: "Instagram" },
  { label: "TikTok" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-cream">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 text-sm md:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="font-display text-xl font-extrabold">Bluemont</p>
          <p>
            A student-led 501(c)(3). Teens learn to crochet and make plushies for children in
            shelters.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-gold">Contact</h2>
          <p>[To add: Bluemont&apos;s email address]</p>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-gold">Follow us</h2>
          <ul className="flex flex-wrap gap-4">
            {socialLinks.map((social) => (
              <li key={social.label}>
                {social.href ? (
                  <a
                    href={social.href}
                    className="rounded font-semibold underline decoration-wavy hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {social.label}
                  </a>
                ) : (
                  <span className="text-cornflower">{social.label} (coming soon)</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
