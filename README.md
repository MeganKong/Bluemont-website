# Bluemont website

The website for Bluemont Children Foundation: volunteers sign up, learn to
crochet, request kits, and track the plushies they make.

## Run it on your computer

1. Install [Node.js](https://nodejs.org) (the LTS version).
2. In a terminal, inside this folder:

   ```bash
   npm install     # once, downloads the libraries
   npm run dev     # starts the site
   ```

3. Open http://localhost:3000. Pages reload as you save files.
   Press Ctrl+C in the terminal to stop.

## Where things are

Each folder under `src/app` is a page. Folders in parentheses, like `(public)`,
group pages without changing the web address. Each page file starts with a
short note: what the page will do, and when it counts as done.

| Page                        | Folder                          | Owner  |
| --------------------------- | ------------------------------- | ------ |
| Sign in, Sign up            | `src/app/(auth)/`               | Sophia |
| Dashboard                   | `src/app/(app)/dashboard/`      | Sophia |
| Lessons                     | `src/app/(app)/lessons/`        | Nika   |
| Kit requests, Stock         | `src/app/(app)/kits/`           | Adhya  |
| Home, About                 | `src/app/(public)/`             | Unassigned |
| News, Officer check-ins     | `src/app/(app)/news/`, `check-ins/` | Unassigned |
| Shared: colors, fonts, menus, data shapes, Supabase connection | `layout.tsx` files, `globals.css`, `src/lib/`, `src/components/`, `supabase/` | Sophia |

Only edit your own folders. For a shared file, ask Sophia. Unassigned areas
will be split later by Megan.

Pages marked "Sample page · fake data" use made-up data from the
`_placeholder.ts` file in their folder. Nothing on them saves yet.

## Supabase settings

The site reads its database address and key from a file called `.env.local`
in this folder. It is never uploaded to GitHub. Ask Megan for the two lines
and paste them into a new `.env.local` file.

## Weekly workflow

1. `git switch main && git pull`: get everyone's latest work.
2. `git switch -c yourname/what-youre-building`: make your own branch.
3. Build with Claude Code. Save progress with `git add` and `git commit`.
4. `git push`, then open a pull request on GitHub.
5. A teammate reviews it, and it merges at the weekly sync.

## Coming next

- Supabase is connected; logins and tables come as each owner builds
- Vercel: put the site online
- Month 2: donate page, badges, service-hour certificates, pickup slots
