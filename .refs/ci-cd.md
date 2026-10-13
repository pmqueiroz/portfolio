# CI/CD

No CI pipeline lives in this repo: there is no `.github/workflows` or other
CI config. `.vercel` is gitignored, which points to the site being linked
to and deployed from a Vercel project outside this repo.

## Local gates

Run these before committing. `next build` runs lint and the type check
itself and fails on any lint error.

- `pnpm lint` — `next lint` with `.eslintrc.json` (2-space indent, single
  quotes, no semicolons).
- `pnpm build` — production build. Every route is statically prerendered;
  `/blog/[slug]` uses `generateStaticParams` over `content/posts`.

## Not set up yet

- No automated lint/build on push or PR.
- No preview/production deploy config checked into the repo.
