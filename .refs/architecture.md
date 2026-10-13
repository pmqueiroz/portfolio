# Architecture

Personal portfolio and blog for pmqueiroz, styled as an early-2000s personal
homepage on a paper-and-ink palette. The mental model: **the index page is a
desktop that is always on screen; every other route opens as a window on top
of it.**

Code is the truth. This file explains the *why* behind the shape it takes.

## Stack

- Next.js 14 App Router, React 18, TypeScript.
- styled-components v5 for all styling (SSR via `src/lib/styled-registry.tsx`).
  The `className` with a Tailwind-style utility in `layout.tsx` is inert;
  Tailwind is not installed.
- react-query for GitHub API calls (`src/hooks/use-gh-repos.ts`,
  `src/hooks/use-repo-readme.ts`).
- Posts are local markdown in `content/posts/*.md`, parsed at build time.
- Fonts: JetBrains Mono and Cutive Mono via `next/font/google`.

## Layout

- `src/app/layout.tsx` — root layout. Loads post summaries on the server and
  renders `<Desktop>` (the homepage) followed by `{children}`. Because the
  desktop lives in the layout it never remounts on navigation, so the
  typewriter does not restart when a window opens or closes.
- `src/app/page.tsx` — returns `null`. `/` is the desktop with no window.
- `src/app/projects`, `src/app/blog`, `src/app/blog/[slug]`, `src/app/about`
  — each `page.tsx` is a server component that gathers data and renders a
  client `*-window.tsx` built on `<Window>`.
- `src/components/` — shared UI, one concept per directory, re-exported from
  `src/components/index.ts`.
- `src/service/posts.ts` — markdown loader. `getPosts` keeps raw markdown
  (only used for read time); `getPostBySlug` renders chapters to HTML;
  `getPostSummaries` is the lightweight list passed to client components.
  Bodies are split into chapters on `## ` headings, ignoring fenced code.
- `src/styles/` — `theme.ts` (tokens), `global.ts` (global CSS),
  `bevel.ts` (raised / pressed / sunken edges).

## Windows

`src/components/window` renders the modal frame: navy title bar with close
button, tabs (Work / Journal / Colophon), a sunken scrolling viewport and a
status bar showing `Done — https://pmqueiroz.dev<path>`.

- Close (×), Escape, and a click on the backdrop all `router.push('/')`.
- Body scroll is locked while a window is mounted.
- The viewport scrolls back to the top whenever `path` changes, so moving
  between pages inside a window starts at the top.
- The status text reads `Loading` while the GitHub data behind the window is
  in flight.

Adding a page: create `src/app/<route>/page.tsx` that renders a client
component wrapping its content in `<Window title section path>`. If it needs
a tab, add it to the `tabs` list in `window.tsx`.

## Projects and stamps

Projects are the user's public GitHub repos with the `portfolio-visible`
topic (`featuredRepos` in `components/desktop`). Each renders as a postage
stamp (`components/stamp`), with face data from `helpers/stamp.ts`:

- **Mint** (never opened): ink-black glyph on a neutral striped ground.
- **Canceled** (README opened at least once): glyph and stripes take the
  repo language's ink and ground colour.

The README view is addressable at `/projects?repo=<name>`. Opening it marks
the repo visited regardless of how the URL was reached. `ProjectsWindow`
reads `useSearchParams`, so its page wraps it in `<Suspense>` for static
export.

Visited state lives in `src/hooks/use-visited.ts`: one module-level store
backed by `localStorage` (`pmq_visited`) with subscribers, so the desktop's
featured stamps and the window's stamps update together. Every hook starts
from an empty map and syncs in an effect, so server and first client render
agree.

## Journal

- Entries are listed in loader order and treated as newest first. Entry
  numbers count down (`helpers/entry-number.ts`): the oldest is `001`.
- The first entry gets the `NEW!` badge; drafts get `DRAFT` in the full list
  and the post kicker.
- The prev/next strip on a post links to the neighbouring entries: "prev"
  is the older one (next index), "next" the newer one.
- Read time is words / 200, minimum 1 (`helpers/read-time.ts`).

## Build-time values

`layout.tsx` computes "last updated" and `about/page.tsx` computes the age
in the colophon on the server. Both routes are static, so these reflect the
deploy date and refresh on every build.

## Design system

### Tokens

`src/styles/theme.ts` groups colours as paper and ink (`base`, `card`,
`paper`, `dark`), muted text (`muted`, `subtext`), rules and shadows
(`line`, `dashed`, `shadow`, `highlight`), window chrome (`bevel`,
`titleBar`, `backdrop`, `counter`) and links (`link`, `linkVisited`). The
`gray`/`red`/`orange`/`blue`/`green` keys are legacy names kept for
compatibility; prefer the semantic ones.

`theme.fonts.mono` / `theme.fonts.type` resolve to the `next/font` CSS
variables. Never hard-code `'JetBrains Mono'`: `next/font` serves the face
under a hashed family name, so the literal name only works where the font
happens to be installed locally.

### Edges

`bevel.ts` holds the Windows-2000-style edges: `raised` (light top/left,
dark bottom/right) for buttons and the window frame, `pressed` for
`:active`, and `sunken` for recessed fields such as the window viewport and
status bar cells.

### Components

- `Panel` — bordered box with an ink title bar and an optional action link.
- `BevelButton` / `BevelLink` — the raised button, as a `<button>` or a Next
  `Link`. They share one css block; use `BevelLink` for navigation because
  styled-components' `as` prop collides with `Link`'s own `as`.
- `NewBadge`, `DraftBadge` — entry labels.
- `JournalList` — `compact` on the desktop, `full` in the journal window.
- `Prose` — long-form markdown styles for journal entries and repository
  READMEs.
- `Stamp` — `featured` (desktop) and `full` (work window) sizes.

Global CSS keeps the printed feel: code blocks get no syntax colours, and
hierarchy comes from weight, italics and underline only.

## Known gaps

- The visitor counter (`004217`) and the 88×31 footer badges are static
  decoration.
- "guestbook" in the sidebar is a `mailto:` link; there is no guestbook page.
- README fetching assumes a `master` branch and a lower-case `readme.md`;
  repos that differ show only their description.
- Relative image paths inside READMEs are not rewritten, so they break.
- `typewriter-effect` and `react-anchor-link-smooth-scroll` are still in
  `package.json` but no longer imported.
