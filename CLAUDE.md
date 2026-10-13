@AGENTS.md

# Bluemont Children Foundation website

Student volunteers learn to crochet online, request kits, and make plushies for
children in shelters. The team building this is mostly new to coding: explain
what you change in plain words, and keep changes small.

Stack: Next.js (App Router, `src/app`), Tailwind CSS, TypeScript. Supabase
(logins and database) and Vercel (hosting) come next.

## Who owns what

Only edit files in the folders owned by the person you are working with. If a
change needs a shared file, stop and say what to ask Sophia for.

| Owner  | Folders                                                                 |
| ------ | ----------------------------------------------------------------------- |
| Sophia | shared: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/(app)/layout.tsx`, `src/lib/`; plus `src/app/(auth)/`, `src/app/(app)/dashboard/` |
| Nika   | `src/app/(app)/lessons/`                                                |
| Adhya  | `src/app/(app)/kits/`                                                   |
| Iris   | `src/app/(public)/`, `src/app/(app)/news/`, `src/app/(app)/check-ins/`  |

## Rules

- Build with the fake data in each folder's `_placeholder.ts` until the
  database is ready. Data follows the shapes in `src/lib/types.ts`.
- Use the brand colors from `globals.css` (`bg-navy`, `text-terracotta`,
  `border-line`, ...) and `font-display` for headings. No other colors.
- Pages must work on a phone.
- Volunteers are mostly under 18: collect only the data a feature needs, and
  never put real names, emails or photos in placeholder data.
- Run `npm run lint` and `npm run build` before saying a change is done.
- Work on your own git branch; changes merge at the weekly sync after review.
