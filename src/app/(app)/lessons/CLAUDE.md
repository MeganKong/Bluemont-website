# Lesson pages design rules ("Stitched Plushie")

Owner: Nika. These rules apply to every page in `src/app/(app)/lessons/`.
They add to the project rules in the main `CLAUDE.md`; they don't replace them.
Since October 2026 the whole site uses the "Blue Skies" colors and fonts
(see `globals.css`): old color names like `terracotta` now show blue, and
`font-display` is Bricolage Grotesque.

The look: bold and squishy like a plushie (mostly direction C, "Playful
Plushie"), with the stitched card edge from direction A, "Cozy Craft Room".
Preview of the full style: https://claude.ai/artifact/QPHKeSf5UDy8vzTpnijCVX

## Use the shared styles

- Take card, button, tag, link and title styles from `_styles.ts`
  (`card`, `buttonMain`, `tag`, `link`, `pageTitle`). Don't copy their class
  lists into pages. To change the look, change `_styles.ts` once.
- If a new kind of piece is needed (e.g. a secondary button), add it to
  `_styles.ts` first, then use it.
- The yarn ball decoration is `<YarnBall />` from `_yarn-ball.tsx`: navy ball,
  gold strands, loose tail. Use it sparingly (page headings, empty states).
  Never make it orange, which looks like a basketball.

## The look

- **Outlines:** thick navy outlines (`border-3 border-navy`) on cards, buttons
  and inputs.
- **Shadows:** solid navy "sticker" shadows, never soft blurry ones.
- **Cards:** rounded (`rounded-3xl`) with a dashed stitched line just inside
  the edge. They may tilt slightly on hover.
- **Buttons:** pill-shaped, at least 54px tall, extra-bold text. They lift on
  hover and squish down when pressed. Main button: terracotta (now blue) with cream text,
  one per screen. Secondary button: gold with navy text.
- **Tags:** gold pill with a navy outline, e.g. "Lesson 3".
- **Links:** terracotta, bold, wavy underline.
- **Headings:** `font-display` (Bricolage Grotesque), extra bold or black.
  Body text is Figtree at 16px or more.
- **Gold:** only behind navy text, never as text on cream.

## Colors

Use only the brand colors from `globals.css`. These colors were chosen but
are **not in `globals.css` yet**, so don't use them until Megan adds them:

| Use                   | Text      | Background |
| --------------------- | --------- | ---------- |
| Success (sage)        | `#3d6b47` | `#e3eedd`  |
| Warning (amber)       | `#8a5a00` | `#fbeccb`  |
| Error (rosewood)      | `#9e3a3a` | `#f6e1dc`  |
| Link hover (soft gold)| —         | `#f8e3b8`  |

Error messages use the muted rosewood red, never terracotta, so they aren't
confused with main buttons.

## Messages

Every success, warning or error message has an icon in a round badge and a bold
first line, so the meaning never depends on color alone. Errors say what went
wrong and what to do next ("Check your internet connection, then try again").

## Phones and access

- One column on phones. Main buttons stretch full width (`w-full sm:w-auto`).
- Nothing scrolls sideways; keep 16px space at the screen edges.
- Everything you can click shows a gold focus ring when reached with the Tab key.
- Decorations (like the yarn ball) get `aria-hidden="true"`.

## Waiting on Megan

- The colors in the table above, added to `globals.css`.
