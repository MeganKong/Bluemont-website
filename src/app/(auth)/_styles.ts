// Owner: Megan (built by Adhya). The look for the sign-in, sign-up and
// new-password pages, kept in one place so they match each other and the
// "True Blue & Honey" public pages (see ../(public)/_styles.ts): thin borders,
// honey pill buttons, plain blue links.

// Blue ring around whatever is reached with the Tab key.
const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

// The white card that holds the form. It overlaps the dark top of the page.
export const card =
  "flex flex-col gap-5 rounded-3xl border border-rule bg-card p-6 " +
  "shadow-[0_24px_50px_-30px_var(--color-navy)] sm:p-9";

// Card and pop-up headings.
export const cardTitle = "font-serif text-4xl leading-none text-balance";

// Tall, easy-to-tap boxes. text-base (16px) stops iPhones zooming in.
export const input =
  "min-h-12 w-full min-w-0 rounded-xl border-[1.5px] border-line bg-cream px-3.5 text-base text-navy " +
  `transition hover:border-navy/40 ${focusRing}`;
export const label = "text-[15px] font-bold";
export const hint = "text-sm text-muted";

// The page's main button: a full-width honey pill.
export const submitButton =
  "inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-gold px-7 py-3 " +
  "text-[17px] font-bold text-navy transition hover:brightness-105 disabled:cursor-wait disabled:opacity-80 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-blue";

// Outlined button for "Cancel".
export const secondaryButton =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full border-[1.5px] border-line bg-card px-7 py-3 " +
  `text-[17px] font-bold text-navy transition hover:border-navy ${focusRing}`;

// Messages above a form: pink for problems, soft blue for good news.
export const errorBox = "rounded-xl border border-pink bg-pink-pale px-4 py-3 text-[15px] font-semibold";
export const infoBox = "rounded-xl border border-line bg-tint px-4 py-3 text-[15px] font-semibold";

export const textLink = `rounded font-bold text-blue underline-offset-4 hover:underline ${focusRing}`;
