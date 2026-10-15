# Arcade & 2000s extras

Toys that make the site feel like a 2000s homepage: two games in an
`/arcade` window, plus desktop-wide extras (Clippy, cursor trail, Konami
blue screen, "best viewed in IE6").

## Arcade

- `/arcade` (`app/arcade/arcade-window.tsx`) lists `helpers/games.ts`. Add a
  game by adding an entry there and a route under `app/arcade/<name>`.
- Each game route is a `<Window section="arcade">` with File › Back to arcade.
  `arcade` is in the Go menu and the desktop Navigate box.
- `LedCounter` (`components/led-counter`) is the shared black LED readout
  used by both games (red for Minesweeper, green for Helicopter).

### Minesweeper

- Logic is pure in `helpers/minefield.ts`; `components/minesweeper` is UI.
- Beginner board, 9×9 with 10 mines. Mines are laid on the **first click**,
  never in the clicked cell or its neighbours, so the first click always
  opens an area.
- Right-click flags. Clicking an opened number whose flag count matches it
  "chords" (opens the remaining neighbours), as in Win98.
- Touch devices have no right-click: the `🚩 flag mode` checkbox makes
  clicks place flags instead.
- Timer caps at 999; the smiley resets.

### Helicopter

- Canvas 640×320 internal, scaled to width by CSS. Loop is one
  `requestAnimationFrame`; world state is in a ref so the loop never
  re-subscribes. React state only holds phase / score / best for the UI.
- Hold pointer, Space or ↑ to climb. Keys are listened on `window` and
  `preventDefault`ed so Space doesn't scroll the window viewport.
- The cave is a list of 8px slices drawn with a sub-slice offset
  (`distance % slice`) so scrolling is smooth. The gap shrinks 8px every
  600 distance down to 150px; speed rises to 6px/frame. Blocks spawn every
  260px inside the gap.
- Score = distance / 10. Best score is per-browser in `localStorage`
  (`pmq_helicopter_best`). No global leaderboard — scores would be trivially
  forgeable; if one is added it needs server-side sanity limits.

## Desktop-wide extras

Mounted inside `Desktop` (always on screen, see architecture.md).

- **Cursor trail** (`components/cursor-trail`): sparkle glyphs spawned
  every 14px of pointer travel, removed after 700ms. Plain DOM nodes, no
  React state, so moving the mouse never re-renders. Off on coarse pointers
  and under `prefers-reduced-motion`.
- **Clippy** (`components/clippy`): SVG paperclip bottom-right, appears 4s
  after load. Tips depend on the path (`tipsFor`). Clicking the clip toggles
  the balloon; "Go away" hides it for good (`localStorage` `pmq_clippy_hidden`).
  z-index 30, above windows (10) and menus (20).
- Both are filler: hidden in **reading mode**.
- **Konami code** (`hooks/use-konami.ts`): ↑↑↓↓←→←→BA, ignored while
  typing in inputs. Shows `BlueScreen` (fake Win9x fatal exception,
  z-index 100). Any key or click dismisses; the key listener is in capture
  phase and stops propagation so Escape doesn't also close a window. It
  arms after 300ms so the final "A" doesn't dismiss it instantly. Works in
  reading mode too.
- **Best viewed in IE6**: an 88×31 `IE 6.0` badge in the footer badge row
  plus a "Best viewed in Internet Explorer 6 at 800×600" line.
