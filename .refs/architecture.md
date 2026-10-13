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

Projects are a fixed, ordered list of repo names in `helpers/projects.ts`
(`projectNames`). `useGithubRepos` fetches the user's public repos
(`per_page=100`) and `selectProjects` picks the listed ones in list order,
silently skipping any name that is missing, renamed or private. The desktop
shows the first three; the work window shows all. To change what is shown,
edit the list — GitHub topics play no part.

Each renders as a postage stamp (`components/stamp`), with face data from
`helpers/stamp.ts`:

- **Mint** (never opened): ink-black glyph on a neutral striped ground.
- **Canceled** (README opened at least once): glyph and stripes take the
  repo language's ink and ground colour.

READMEs come from GitHub's `/repos/<repo>/readme` JSON (base64 content plus
`download_url` / `html_url`), so the default branch and filename case are
resolved by GitHub. `helpers/resolve-readme-urls.ts` rewrites relative
`src` to the raw file URL and relative `href` to the GitHub page, relative
to the README's own directory (a leading `/` means repo root). `Prose`
hides `#gh-dark-mode-only` images, since the site is light-only.

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
variables.

### Emoji

Emoji render as SerenityOS's colourful pixel-art set (Win98-era look,
BSD-2), vendored in `public/emoji/` with its `LICENSE` and credited in the
colophon. MSN/Windows emoticons were the reference but are Microsoft
artwork, so they cannot be shipped.

- `scripts/sync-emoji.sh [commit]` re-downloads the set from a pinned
  SerenityOS commit and regenerates `src/helpers/emoji-manifest.json`, the
  list of available files. Files are named by codepoint, `_`-joined, with
  `U+FE0F` dropped (`U+1F1E7_U+1F1F7.png`).
- `helpers/emoji.ts` matches emoji that display as emoji by default, or are
  followed by `U+FE0F`, so text-style characters such as `©`, `™` and `↗`
  stay text. A sequence with no file retries without skin-tone modifiers,
  then falls back to the plain character.
- `emojifyHtml` converts HTML strings (READMEs, post bodies) outside `pre`
  and `code`; `<Emojify text>` converts plain strings (titles,
  descriptions, stamp blurbs).
- `img.emoji` in `global.ts` draws them at `1.25em` with
  `image-rendering: pixelated`.
- `:shortcode:` emoji in READMEs and repo descriptions are first converted
  to characters by `helpers/parse-emojis.ts` (gemoji, plus GitHub-only
  aliases such as `:shipit:`). Never hard-code `'JetBrains Mono'`: `next/font` serves the face
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

The site is no longer held to a monochrome paper-and-ink rule; colour is
welcome where it reads as late-90s/2000s (window title bars, pixel emoji,
stamp inks). Code blocks currently still get no syntax colours, with
hierarchy from weight, italics and underline.

## Known gaps

- The visitor counter (`004217`) and the 88×31 footer badges are static
  decoration.
- "guestbook" in the sidebar is a `mailto:` link; there is no guestbook page.
- GitHub calls are unauthenticated, so each visitor gets 60 requests an
  hour. The repo list is one call; every README opened is another
  (`/repos/<repo>/readme`, which resolves the default branch and filename).
- `typewriter-effect` and `react-anchor-link-smooth-scroll` are still in
  `package.json` but no longer imported.
