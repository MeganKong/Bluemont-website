// Owner: Megan (built by Adhya). The "Blue Skies" look for the sign-in and
// new-password pages, kept in one place so they match each other and the
// public pages (see ../(public)/_styles.ts).
export { card, pageHero, pageTitle } from "../(public)/_styles";

// Blue ring around whatever is reached with the Tab key.
const focusRing = "focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue";

// Big, easy-to-tap boxes. text-base (16px) stops iPhones zooming in.
export const input = `min-h-[52px] w-full rounded-2xl border-2 border-navy bg-card px-4 text-base text-navy ${focusRing}`;
export const label = "font-bold";

// The page's main button: full width, chunky gold pill like the public pages.
// It stays pressed down while it's busy.
export const submitButton =
  "inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full border-2 border-navy bg-gold px-6 " +
  "text-lg font-extrabold text-navy shadow-[0_4px_0_var(--color-navy)] transition " +
  "hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_var(--color-navy)] " +
  "disabled:translate-y-1 disabled:cursor-wait disabled:shadow-[0_1px_0_var(--color-navy)] " +
  "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue";

// Outlined white button for "Cancel" and "Done".
export const secondaryButton =
  "inline-flex min-h-[54px] w-full items-center justify-center rounded-full border-2 border-navy bg-card px-6 " +
  `text-lg font-bold text-navy hover:bg-sand ${focusRing}`;

// Messages above a form: pink for problems, mint for good news.
export const errorBox = "rounded-2xl border-2 border-navy bg-pink-pale px-4 py-3 font-semibold";
export const infoBox = "rounded-2xl border-2 border-navy bg-mint-pale px-4 py-3 font-semibold";

// Links get a wavy underline, like a strand of yarn.
export const textLink =
  "rounded font-bold text-blue underline decoration-wavy decoration-2 underline-offset-4 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";
