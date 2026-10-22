// Owner: Nika. The homepage look (A2 "Blue Skies", Handful version), kept in
// one place so every section matches. Uses only the brand colors for now;
// the new fun colors (pink, mint, tangerine, lilac) come once Megan adds them
// to globals.css.

// Outlined card with a solid "sticker" shadow.
export const card =
  "flex flex-col gap-3 rounded-3xl border-2 border-navy bg-card p-6 shadow-[4px_4px_0_var(--color-navy)]";

// Chunky pill buttons that lift on hover and squish down when pressed.
const button =
  "inline-flex min-h-[50px] w-full items-center justify-center rounded-full border-2 border-navy px-6 " +
  "font-extrabold text-navy shadow-[0_4px_0_var(--color-navy)] transition " +
  "hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_var(--color-navy)] " +
  "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto";
export const buttonMain = `${button} bg-gold`;
export const buttonSecondary = `${button} bg-card`;

// For buttons whose page or form isn't built yet. Not clickable.
export const buttonSoon =
  "inline-flex min-h-[50px] w-full cursor-not-allowed items-center justify-center rounded-full " +
  "border-2 border-dashed border-muted px-6 font-bold text-muted sm:w-auto sm:self-start";

// Section headings, with a small label above them.
export const sectionTitle = "font-display text-3xl font-semibold text-balance sm:text-4xl";
export const eyebrow = "text-sm font-bold tracking-wider text-terracotta uppercase";
