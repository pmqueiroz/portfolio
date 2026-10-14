# CI/CD

No CI pipeline lives in this repo: there is no `.github/workflows` or other
CI config. `.vercel` is gitignored, which points to the site being linked
to and deployed from a Vercel project outside this repo.

## Hosting gotcha: cached 404s

Cloudflare sits in front of Vercel (`server: cloudflare`, apex redirects
308 to `www`). It stamps `cache-control: public, max-age=14400` on every
response, **including 404s**, so a browser that requested a file before
it was deployed keeps getting the 404 for up to 4 hours. Hard-refresh to
check a new asset. Setting Cloudflare's Browser Cache TTL to
"Respect Existing Headers" would stop it.

## Environment

- `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` (or the Marketplace's
  `KV_REST_API_URL` + `KV_REST_API_TOKEN`) — guestbook storage. Without
  them the site builds and runs; only the guestbook reports offline. See
  [guestbook.md](./guestbook.md).

## Local gates

Run these before committing. `next build` runs lint and the type check
itself and fails on any lint error.

- `pnpm lint` — `next lint` with `.eslintrc.json` (2-space indent, single
  quotes, no semicolons).
- `pnpm build` — production build. Every page is statically prerendered
  (`/api/guestbook` is the one dynamic function);
  `/blog/[slug]` uses `generateStaticParams` over `content/posts`.

## Not set up yet

- No automated lint/build on push or PR.
- No preview/production deploy config checked into the repo.
