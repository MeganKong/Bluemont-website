// Owner: Nika. The "True Blue & Honey" look for the public pages (home,
// about, volunteer, donate, for shelters, impact, FAQ), kept in one place so
// every page matches. Dark "night" blue at the top and bottom of each page,
// light in the middle, serif headings, honey buttons.

// Keeps a section's content to a readable width, with room at the sides on
// phones. Put it on a div inside a full-width colored section.
export const wrap = "mx-auto w-full max-w-6xl px-6";

// Space above and below a section.
export const section = "py-20 sm:py-24";

// Small capital label above a heading. Use the "onNight" one on navy or dusk.
export const eyebrow = "text-sm font-bold tracking-[0.14em] text-blue uppercase";
export const eyebrowOnNight = "text-sm font-bold tracking-[0.14em] text-gold uppercase";

// Section headings, and a smaller size for sections that sit side by side.
export const heading = "font-serif text-4xl leading-none text-balance sm:text-5xl lg:text-6xl";
export const headingSmall = "font-serif text-4xl leading-[1.05] text-balance sm:text-5xl";

// Body text that's a little softer than the headings.
export const body = "text-ink";

// Pill buttons. Honey for the main action, navy for a second one on light
// backgrounds, and outlines for the quieter choice.
const pill =
  "inline-flex min-h-12 items-center justify-center rounded-full px-7 py-3 text-[17px] font-bold transition " +
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-blue";
export const buttonHoney = `${pill} bg-gold text-navy hover:brightness-105`;
export const buttonNight = `${pill} bg-navy text-card hover:bg-dusk`;
export const buttonOutline = `${pill} border-[1.5px] border-line text-navy hover:border-navy`;
export const buttonOutlineOnNight = `${pill} border-[1.5px] border-night-line text-card hover:border-soft`;
// A button that can't be used yet (e.g. a link we don't have).
export const buttonOff = `${pill} cursor-not-allowed bg-rule text-muted`;

// "Read more →" style links.
export const moreLink = "font-bold text-blue hover:underline";
export const moreLinkOnNight = "font-bold text-gold hover:underline";

// A white box with a thin border, for text that sits apart.
export const panel = "flex flex-col gap-3 rounded-3xl border border-rule bg-card p-7 sm:p-10";

// A short fact with a dark line above it, used in rows of three or four.
export const fact = "flex flex-col gap-1.5 border-t-2 border-navy pt-4";
export const factTitle = "text-lg font-bold";

// Forms.
export const field = "flex flex-col gap-1.5";
export const label = "text-[15px] font-bold";
export const input =
  "w-full min-w-0 rounded-xl border-[1.5px] border-line bg-cream px-3.5 py-3 text-base text-navy " +
  "disabled:cursor-not-allowed disabled:opacity-70";

// ---------------------------------------------------------------------------
// The older "sticker" look. The sign-in pages (../(auth)/_styles.ts) and the
// Community page still use these. Move them to the new look when you can.

// Outlined card with a solid "sticker" shadow. Add a background color
// class after it to tint it, e.g. `${card} bg-pink-pale`.
export const card =
  "flex flex-col gap-3 rounded-3xl border-2 border-navy bg-card p-6 shadow-[4px_4px_0_var(--color-navy)]";

// For buttons whose page or form isn't built yet. Not clickable.
export const buttonSoon =
  "inline-flex min-h-[50px] w-full cursor-not-allowed items-center justify-center rounded-full " +
  "border-2 border-dashed border-navy px-6 font-bold text-navy sm:w-auto sm:self-start";

export const sectionTitle = "font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl";

// The colorful box at the top of a page.
export const pageHero = "yarn-dots flex flex-col gap-3 rounded-[2rem] p-6 sm:p-10";
export const pageTitle = "font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl";

// Pale card colors, used in turn so a row of cards looks like a yarn basket.
export const tints = ["bg-pink-pale", "bg-sand", "bg-mint-pale", "bg-gold-pale", "bg-lilac-pale", "bg-peach-pale"];
