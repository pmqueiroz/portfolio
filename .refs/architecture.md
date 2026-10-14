# Architecture

Personal portfolio and blog for pmqueiroz, styled as an early-2000s personal
homepage on a Windows 98 palette. The mental model: **the index page is a
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

`src/components/window` renders the modal frame: navy-to-sky gradient title bar with close
button, a Win98-style menu bar (`components/menu-bar`), a sunken scrolling
viewport and a status bar showing `Done — https://pmqueiroz.dev<path>`.

- Every window gets the standard menus: **File** (Close · Esc), **Go**
  (Work / Blog / About me with a `●` on the current section, then
  Desktop) and **Help** (About → `/about`, View source ↗ → the portfolio
  repo).
- A window adds its own commands via `menus`: a menu whose label matches a
  standard one has its items prepended above a separator; a new label is
  inserted before Help. `info` renders right-aligned in the menu bar — the
  README view uses it for `README.md · <lang> · MINT|CANCELED`, and puts
  Back to work / Open in GitHub in File instead of an in-content toolbar.
- `MenuBar`: click a label to open, hover switches while one is open, a
  pointerdown outside or Escape closes it. Escape inside the bar stops
  propagation so it closes the menu, not the window. Items are a `Link`
  (`href`), an external `<a target=_blank>` (`external`, shows ↗) or a
  button (`onSelect`); `'separator'` draws a rule. The first letter of each
  label is underlined as a fake accelerator — there are no Alt shortcuts.

- On screens at least `narrow` (640px) wide the frame floats: it spawns at
  a random spot and is dragged by its title bar (`hooks/use-window-position.ts`,
  pointer capture, so a drag that ends over the backdrop does not close it).
  It is clamped 16px inside the viewport and re-clamped on resize or when
  its content grows. Below 640px it stays fullscreen and does not move.
- The position lives in a module variable, so switching sections (each route
  mounts its own `<Window>`) keeps the window where it is. `Desktop` calls
  `forgetWindowPosition()` whenever the path returns to `/`, so the next
  window opened spawns somewhere new, however the last one was closed.
- Server HTML renders the frame centred; it jumps to its spot in a layout
  effect on hydration, so a direct load of `/projects` etc. moves once.
- Close (×), Escape, and a click on the backdrop all `router.push('/')`.
- Body scroll is locked while a window is mounted.
- The viewport scrolls back to the top whenever `path` changes, so moving
  between pages inside a window starts at the top.
- The status text reads `Loading` while the GitHub data behind the window is
  in flight.

Adding a page: create `src/app/<route>/page.tsx` that renders a client
component wrapping its content in `<Window title section path>` (`section`
is optional; the search window has none, so nothing is ticked in Go). If it needs
a Go-menu entry, add it to the `sections` list in `window.tsx`.

## Projects and stamps

Projects are a fixed, ordered list of repo names in `helpers/projects.ts`
(`projectNames`). `useGithubRepos` fetches the user's public repos
(`per_page=100`) and `selectProjects` picks the listed ones in list order,
silently skipping any name that is missing, renamed or private. The desktop
shows the first three as a plain "Selected work" list (name, `[LANG]`,
blurb, linking to the README); the work window shows all as stamps. To change what is shown,
edit the list — GitHub topics play no part.

In the work window each renders as a postage stamp (`components/stamp`), with face data from
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

## Look and reading mode

The desktop is a loud late-90s homepage (design: `Homepage v2` in the
claude.ai design project): teal desktop behind the page, yellow gradient
header with a WordArt `pmqueiroz.dev` logo (`components/logo`), red marquee
ticker (scrolls right-to-left over 22s, pauses on hover; under
`prefers-reduced-motion` it sits still and ellipsises),
blue-gradient panel title bars, a guestbook/ad strip and a sky-blue footer
with a webring and coloured 88×31 badges. Window title bars use the same
Win98 navy `#000080` → `#1084d0` gradient as the panel and ad bars.

The "READING MODE" bevel button in the sidebar (`hooks/use-reading-mode.ts`,
persisted in `localStorage` as `pmq_reading`) removes **only the filler**:
the ticker, the clip-art (sidebar pair, main gallery, project thumbnails),
the "NEW!!" Umbra banner, the guestbook/ad strip, and the logo's shine and
`v2.0!` sticker. Layout, colours, panels, badges and the webring stay, so
the page keeps the same format. Default is off (junk shown); the hook starts
from `false` and syncs in an effect, so readers see the junk for one frame.

Filler images live in `public/junk/` and render through `RetroImage`
(outset-bordered `img`). Files: `handshake-laptops.jpg`, `globe-cable.webp`,
`crt-handshake.jpeg`, `thumbs-up-laptop.jpeg`, `support-agent.jpeg`,
`project.gif`, `mailbox.gif`.
Keep them at roughly 2× their display size with metadata stripped
(`magick <f> -strip -resize …`; for GIFs add `-coalesce` before and
`-layers optimize` after). The originals from the design project were up to
1300px and carried C2PA blocks; the whole set is ~100 KB.

## Blog

User-facing copy says "blog" / "post" and "about me" — the old
"journal" / "entry" / "colophon" wording came from the retired newspaper
look. Internal names (`JournalList`, `entryNumber`, `ColophonWindow`) were
kept.

- Posts are listed in loader order and treated as newest first. Post
  numbers count down (`helpers/entry-number.ts`): the oldest is `001`.
- The first post gets the `NEW!` badge; drafts get `DRAFT` in the full list
  and the post kicker.
- The prev/next strip on a post links to the neighbouring posts: "prev"
  is the older one (next index), "next" the newer one.
- Read time is words / 200, minimum 1 (`helpers/read-time.ts`).

## Search

`/search?q=` (`app/search`) opens a window that matches the query against
blog post summaries (title, description; passed from the server page) and
the visible projects (name, blurb, language, tag; fetched client-side via
`useGithubRepos`). `helpers/search.ts` lower-cases, splits on whitespace and
requires every word to appear somewhere in an item's fields. There is no
index: it is a substring scan over the same small lists the desktop already
loads. Entry points: the sidebar Search box, Go › Search… in every window's
menu, and the box at the top of the search window itself.

## Build-time values

`layout.tsx` computes "last updated" and `about/page.tsx` computes the age
in the about-me window on the server. Both routes are static, so these reflect the
deploy date and refresh on every build.

## Design system

### Tokens

`src/styles/theme.ts` holds the classic Windows 98 system palette, which
replaced the old cream/brown newspaper one: silver `#c0c0c0` face (`base`,
`bevel`), white content and bevel highlight (`card`, `paper`), black text
(`dark`), grey `#808080` shadow, navy `#000080` selection, teal `#008080`
desktop, classic `#0000ee` / `#551a8b` links and a green LED visitor
counter. The `paper` key name is historical — it is just the white
highlight now. Groups: base surfaces (`base`, `card`, `paper`, `dark`),
muted text (`muted`, `subtext`), rules and shadows
(`line`, `dashed`, `shadow`, `highlight`), window chrome (`bevel`,
`backdrop`, `counter`) and links (`link`, `linkVisited`). The
`gray`/`red`/`orange`/`blue`/`green` keys are legacy names kept for
compatibility; prefer the semantic ones. The homepage chrome adds `desktop`,
`alarm`, `sun`, `highlighter`, `sky`, `navy` and `outset`, and
`theme.gradients` holds the `panel`, `window`, `header`, `footer`, `ad` and
`wordArt` fills.

`theme.fonts.mono` / `theme.fonts.type` resolve to the `next/font` CSS
variables.

### Emoji

Emoji are the visitor's native system emoji — plain text, no images. The
vendored SerenityOS pixel set (and its sync script, manifest and
`Emojify`/`emojifyHtml` helpers) was removed. `theme.fonts.mono`/`type`
end with `'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'` so
emoji glyphs fall through the monospace faces to a colour font. A machine
with no emoji font (e.g. a bare headless Linux) shows tofu boxes; that is
expected.

- `:shortcode:` emoji in READMEs and repo descriptions are converted to
  characters by `helpers/parse-emojis.ts` (gemoji, plus GitHub-only
  aliases such as `:shipit:`).

### Fonts

Never hard-code `'JetBrains Mono'`: `next/font` serves the face
Never hard-code `'JetBrains Mono'`: `next/font` serves the face
under a hashed family name, so the literal name only works where the font
happens to be installed locally.

### Edges

`bevel.ts` holds the Windows-2000-style edges: `raised` (light top/left,
dark bottom/right) for buttons and the window frame, `pressed` for
`:active`, and `sunken` for recessed fields such as the window viewport and
status bar cells.

### Components

- `MenuBar` — Win98 menu bar with dropdowns; used by `Window`, see
  Windows above.
- `Panel` — bordered box with a blue-gradient title bar and an optional
  action link.
- `Logo` — WordArt handle; `flashy` adds the shine sweep and sticker.
- `RetroImage` — clip-art `img` with a 2px outset border.
- `BevelButton` / `BevelLink` — a Win98 push button (silver face, white/
  black outer edge, `#dfdfdf`/grey inner edge, sentence-case 12px label,
  75px minimum width, dotted inner focus ring, label shifts 1px when
  pressed), as a `<button>` or a Next `Link`. `$default` adds the black
  outer ring of a dialog's default button. Labels that open a window end
  with `…`, like Win98 commands that open a dialog. They share one css
  block; use `BevelLink` for navigation because styled-components' `as`
  prop collides with `Link`'s own `as`.
- `SearchBox` — sunken Win98 text field plus a `Go` button; submitting
  pushes `/search?q=…` (and degrades to a plain GET form). Used in the
  desktop sidebar's Search box and at the top of the search window.
- `NewBadge`, `DraftBadge` — entry labels.
- `JournalList` — `compact` on the desktop, `full` in the blog window.
- `Prose` — long-form markdown styles for blog posts and repository
  READMEs.
- `Stamp` — `full` (work window) size; `featured` is no longer used by the
  desktop.

The site is no longer held to a monochrome rule; colour is
welcome where it reads as late-90s/2000s (window title bars, emoji,
stamp inks). Code blocks currently still get no syntax colours, with
hierarchy from weight, italics and underline.

## Known gaps

- The visitor counter (`004217`), the 88×31 footer badges, the ticker and
  the UmbraHost ad are static decoration. Webring links point at `#`.
- "guestbook" in the sidebar is a `mailto:` link; there is no guestbook page.
- GitHub calls are unauthenticated, so each visitor gets 60 requests an
  hour. The repo list is one call; every README opened is another
  (`/repos/<repo>/readme`, which resolves the default branch and filename).
- `typewriter-effect` and `react-anchor-link-smooth-scroll` are still in
  `package.json` but no longer imported.
