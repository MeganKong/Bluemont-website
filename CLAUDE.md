@AGENTS.md

# Bluemont Children Foundation website

Student volunteers learn to crochet online, request kits, and make plushies for
children in shelters. The team building this is mostly new to coding: explain
what you change in plain words, and keep changes small.

Stack: Next.js (App Router, `src/app`), Tailwind CSS, TypeScript, Supabase
(logins and database), Vercel (hosting).

## Who owns what

Only edit files in the folders owned by the person you are working with. If a
change needs a shared file, stop and say what to ask Sophia for.

| Owner      | Folders                                                                 |
| ---------- | ----------------------------------------------------------------------- |
| Sophia     | shared: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/(app)/layout.tsx`, `src/lib/`, `src/components/`, `src/proxy.ts`, `supabase/`; plus `src/app/(auth)/`, `src/app/(app)/dashboard/` |
| Nika       | `src/app/(app)/lessons/`                                                |
| Adhya      | `src/app/(app)/kits/`                                                   |
| Unassigned | `src/app/(public)/`, `src/app/(app)/news/`, `src/app/(app)/check-ins/`  |

Unassigned areas: Iris is not on the build team. Megan will split these areas
among the builders later. Until then, don't change them unless Megan says so.

Megan (founder) reviews progress but codes little. The builders are new to
coding: they learn by building their own features, so help them understand
each change rather than writing big pieces for them.

Each page file starts with "What this page will do" and "Done when" from the
build plan. That is the target for the page.

Supabase is connected (settings in `.env.local`, never committed). To talk to
the database use `@/lib/supabase/server` in pages and server code, and
`@/lib/supabase/client` in "use client" files. Database changes go in
`supabase/migrations/` (create one with `npx supabase migration new <name>`);
every table needs row level security and explicit grants, because new tables
are not exposed automatically in this project.

## Rules

- Build with the fake data in each folder's `_placeholder.ts` until the
  database is ready. Remove `<SampleNote />` once a page uses real data. Data follows the shapes in `src/lib/types.ts`.
- Use the brand colors from `globals.css` (`bg-navy`, `text-terracotta`,
  `border-line`, ...) and `font-display` for headings. No other colors.
- Pages must work on a phone.
- Every page uses the shared header and footer (`src/components/site-header.tsx`
  and `site-footer.tsx`). New pages get them automatically by going inside
  `(public)`, `(app)` or `(auth)`; never build a separate header, menu or
  footer in a page or layout. Menu links live in `src/components/menu-links.ts`
  (ask Sophia to add one; five per menu at most).
- Volunteers are mostly under 18: collect only the data a feature needs, and
  never put real names, emails or photos in placeholder data.
- Run `npm run lint` and `npm run build` before saying a change is done.
- Work on your own git branch; changes merge at the weekly sync after review.
