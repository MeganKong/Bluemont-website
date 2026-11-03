// Owner: Megan (shared). The look for every signed-in page (dashboards,
// lessons, kits, my work, officer pages), kept in one place so they all
// match each other and the "True Blue & Honey" public pages: white cards
// with thin borders, serif headings, honey pill buttons, plain blue links.
// To change the look, change it here once.

// Blue ring around whatever is reached with the Tab key.
export const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

// A white card with a thin border and a soft shadow.
export const card = "rounded-2xl border border-rule bg-card p-6 shadow-[0_18px_40px_-34px_var(--color-navy)] sm:p-7";

// A card that is itself a link: the border darkens on hover.
export const cardLink = `${card} transition hover:border-line hover:shadow-[0_22px_44px_-28px_var(--color-navy)] ${focusRing}`;

// Small capital label above a heading, e.g. "YOUR NEXT LESSON".
export const eyebrow = "text-xs font-bold tracking-[0.14em] text-blue uppercase";

// Headings inside a page, and big numbers (hours, counts).
export const sectionTitle = "font-serif text-[28px] leading-tight text-balance";
export const bigNumber = "font-serif text-5xl leading-none";

// Pill buttons. Honey for the page's main action, outlined for a second one.
const pill =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-[17px] font-bold " +
  "transition disabled:cursor-wait disabled:opacity-70 sm:w-auto " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue";
export const buttonMain = `${pill} bg-gold text-navy hover:brightness-105`;
export const buttonSecondary = `${pill} border-[1.5px] border-line bg-card text-navy hover:border-navy`;

// Smaller buttons inside a card (Edit, Delete, Approve, Thanks).
const small =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 text-[15px] font-bold text-navy " +
  `transition disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`;
export const smallButton = `${small} border-[1.5px] border-line bg-card hover:border-navy`;
export const smallButtonMain = `${small} bg-gold hover:brightness-105`;

// Small rounded label, like "Lesson 3".
export const tag = "inline-flex items-center gap-1 rounded-full bg-tint px-2.5 py-0.5 text-[13px] font-bold text-blue";

// "See my work →" style links.
export const link = `rounded font-bold text-blue underline-offset-4 hover:underline ${focusRing}`;

// Forms. text-base (16px) stops iPhones zooming in.
export const label = "flex flex-col gap-1.5 text-[15px] font-bold";
export const field =
  "w-full min-w-0 rounded-xl border-[1.5px] border-line bg-cream px-3.5 py-3 text-base font-normal text-navy " +
  `transition hover:border-navy/40 ${focusRing}`;
export const hint = "text-sm font-normal text-muted";

// A list with thin lines between the rows.
export const rows = "flex flex-col divide-y divide-rule";
