// Owner: Nika. The "Blue Skies" look for the public pages (home, team,
// community, give & receive, FAQ), kept in one place so every page matches.

// Outlined card with a solid "sticker" shadow. Add a background color
// class after it to tint it, e.g. `${card} bg-pink-pale`.
export const card =
  "flex flex-col gap-3 rounded-3xl border-2 border-navy bg-card p-6 shadow-[4px_4px_0_var(--color-navy)]";

// Chunky pill buttons that lift on hover and squish down when pressed.
const button =
  "inline-flex min-h-[50px] w-full items-center justify-center rounded-full border-2 border-navy px-6 " +
  "font-extrabold text-navy shadow-[0_4px_0_var(--color-navy)] transition " +
  "hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_var(--color-navy)] " +
  "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue sm:w-auto";
export const buttonMain = `${button} bg-gold`;
export const buttonPink = `${button} bg-pink`;
export const buttonSecondary = `${button} bg-card`;

// For buttons whose page or form isn't built yet. Not clickable.
export const buttonSoon =
  "inline-flex min-h-[50px] w-full cursor-not-allowed items-center justify-center rounded-full " +
  "border-2 border-dashed border-navy px-6 font-bold text-navy sm:w-auto sm:self-start";

// Section headings, with a small label above them.
export const sectionTitle = "font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl";
export const eyebrow = "text-sm font-extrabold tracking-wider text-blue uppercase";

// The colorful box at the top of each page (not the homepage).
export const pageHero = "yarn-dots flex flex-col gap-3 rounded-[2rem] p-6 sm:p-10";
export const pageTitle = "font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl";

// Pale card colors, used in turn so a row of cards looks like a yarn basket.
export const tints = ["bg-pink-pale", "bg-sand", "bg-mint-pale", "bg-gold-pale", "bg-lilac-pale", "bg-peach-pale"];
