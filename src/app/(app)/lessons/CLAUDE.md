# Lesson pages design rules

Owner: Nika. These rules apply to every page in `src/app/(app)/lessons/`.
They add to the project rules in the main `CLAUDE.md`; they don't replace them.

Since November 2026 every signed-in page (lessons, dashboards, kits, my work,
officer pages) uses one shared "portal" look that matches the public "True
Blue & Honey" pages. It replaced the older "Stitched Plushie" look (thick
outlines, sticker shadows, wavy links, emojis), which read as too childish.

## Use the shared pieces

- Wrap each page in `<PortalPage>` from `@/components/portal-page`: the dark
  navy band with the page's label, serif heading and a line of text.
- Take card, button, tag, link and heading styles from
  `@/components/portal-styles` (`card`, `cardLink`, `buttonMain`,
  `buttonSecondary`, `tag`, `link`, `eyebrow`, `sectionTitle`). Don't copy
  their class lists into pages. To change the look, change that file once.
- If a new kind of piece is needed, add it to `portal-styles.ts` first.

## The look

- **Cards:** white, thin light border (`border-rule`), soft shadow, `rounded-2xl`.
- **Buttons:** honey pill (`buttonMain`) for the one main action; outlined
  pill (`buttonSecondary`) for a second one. No lifting or squishing.
- **Headings:** `font-serif` (one weight only, so no `font-bold`). Small
  capital labels (`eyebrow`) above sections.
- **Links:** blue and bold, underline on hover. End "go somewhere" links with →.
- **Tags:** small pale-blue pill, e.g. "Lesson 3".
- **No emojis or cartoon decorations.** Icons, if needed, are simple line icons.
- **Gold:** only behind navy text, never as text on light backgrounds.

## Messages

Every success, warning or error message (`@/components/work/message`) has an
icon in a small circle and says what to do next, so the meaning never depends
on color alone.

## Phones and access

- One column on phones. Main buttons stretch full width (built into `buttonMain`).
- Nothing scrolls sideways; keep 16px space at the screen edges.
- Everything you can click shows a blue focus ring when reached with the Tab key.
- Decorations get `aria-hidden="true"`.
