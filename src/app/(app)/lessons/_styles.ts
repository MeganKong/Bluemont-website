// Owner: Nika. The "Stitched Plushie" look for the lesson pages, kept in one
// place so every lesson page matches. Uses only the brand colors.

// Thick navy outline + solid "sticker" shadow, with a stitched line inside.
export const card =
  "rounded-3xl border-3 border-navy bg-card p-6 shadow-[5px_5px_0_var(--color-navy)] " +
  "outline-2 outline-dashed outline-line -outline-offset-[10px]";

// Chunky pill buttons that lift on hover and squish down when pressed.
const button =
  "inline-flex min-h-[54px] w-full items-center justify-center rounded-full border-3 border-navy px-7 " +
  "text-lg font-extrabold text-navy shadow-[0_5px_0_var(--color-navy)] transition " +
  "hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_var(--color-navy)] " +
  "focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto";
export const buttonMain = `${button} bg-terracotta text-cream`;

// Small rounded tag, like "Lesson 3".
export const tag = "rounded-full border-2 border-navy bg-gold px-3 py-0.5 text-sm font-bold text-navy";

// Links get a wavy underline, like a strand of yarn.
export const link =
  "font-bold text-terracotta underline decoration-wavy decoration-2 underline-offset-4";

export const pageTitle = "font-display text-4xl font-black sm:text-5xl";
