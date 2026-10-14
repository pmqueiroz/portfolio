# Guestbook

Visitors sign at `/guestbook`; entries show only after the owner approves
them. Storage is Upstash Redis (free tier) attached to the Vercel project
through the Vercel Marketplace.

## Pieces

- `src/app/api/guestbook/route.ts` — the only dynamic route on the site.
  `GET` returns approved entries (newest first, max 100). `POST` validates,
  rate-limits and stores the entry as pending, answering `202`.
- `src/service/guestbook.ts` — Redis access, validation (`parseDraft`) and
  the rate limit. Server-only.
- `src/hooks/use-guestbook.ts` — react-query list + `sign` mutation; a
  successful sign invalidates the list.
- `src/app/guestbook/guestbook-window.tsx` — form + signatures, inside a
  normal `<Window section="guestbook">` (it is in the Go menu).
- `scripts/guestbook.mjs` — moderation CLI (`pnpm guestbook …`).

## Data model

| key | type | holds |
| --- | --- | --- |
| `guestbook:entries` | hash | id → entry JSON (`id`, `name`, `message`, `website?`, `createdAt`) |
| `guestbook:pending` | sorted set | ids awaiting approval, scored by `createdAt` |
| `guestbook:approved` | sorted set | published ids, scored by `createdAt` |
| `guestbook:signings:<ip>` | counter | signings in the current hour |

Approving moves an id from `pending` to `approved` with the same score.
Rejecting or removing deletes the id from its set **and** the hash. The key
names are duplicated in `scripts/guestbook.mjs` (plain Node, can't import
the TS service) — change both together.

## Anti-spam

- Approve-first: nothing a visitor writes is public until approved.
- Honeypot: a hidden `homepage` input. If filled, the API pretends success
  (`202`) and stores nothing. The real homepage field is `website`.
- Rate limit: 3 signings per IP per hour, `INCR` + `EXPIRE … NX` (fixed
  window). The IP is `cf-connecting-ip` (Cloudflare proxies the domain),
  falling back to the first `x-forwarded-for` hop. `@upstash/ratelimit` was
  tried and dropped: its Lua scripts use an Upstash-only shebang flag
  (`allow-key-locking`) that plain Redis rejects, so it could not be tested
  locally.
- Limits: name 40, message 500 (blank-line runs collapsed), website 100 and
  `http(s)` only. Messages render as React text (`white-space: pre-wrap`),
  never as HTML; homepage links get `rel="nofollow ugc noopener noreferrer"`.

## Caching gotcha

Cloudflare stamps a 4-hour browser cache on every response (see
[ci-cd.md](./ci-cd.md)). The API sends `Cache-Control: no-store` and
`CDN-Cache-Control: no-store`, and the client fetches with
`cache: 'no-store'`, which skips the browser HTTP cache whatever headers come
back. Keep both.

## Configuration

`Redis.fromEnv()` reads `UPSTASH_REDIS_REST_URL`/`_TOKEN`, falling back to
`KV_REST_API_URL`/`_TOKEN` (what the Marketplace integration injects).
With neither set, the API answers `503 The guestbook is offline.` and the
window shows that message — local dev works without a database.

## Moderating

```bash
vercel env pull .env.local      # once, to get the Redis credentials
pnpm guestbook pending          # list waiting entries with their ids
pnpm guestbook approve <id...>
pnpm guestbook reject <id...>   # delete pending
pnpm guestbook approved
pnpm guestbook remove <id...>   # unpublish + delete
```

There is no notification for new entries; check `pending` now and then.

## Testing locally

Upstash's REST API can be emulated with `hiett/serverless-redis-http` in
front of a stock Redis container; point `UPSTASH_REDIS_REST_URL` at it and
set `UPSTASH_REDIS_REST_TOKEN` to its `SRH_TOKEN`.
