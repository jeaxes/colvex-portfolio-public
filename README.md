# colvex-portfolio

Source of the colvex portfolio: a single page with projects, skills and a short introduction. English lives at `/`, German at `/de/`. The old `/en/` address redirects to `/` via `public/_redirects`.

It is a static [Astro 7](https://astro.build) site in the Colvex Brand Kit 2.0. That means the blue-black background `#05070d`, the electric blue `#4c8dff`, Albert Sans with IBM Plex Mono, and the "Raster" logo.

The site sets no cookies of its own and loads nothing from third parties. It is hosted on Cloudflare, which adds its own layer on top: depending on the zone settings, Cloudflare injects a bot-protection script (`/cdn-cgi/challenge-platform`) and prefetch hints into the served page. The strict CSP (see below) allows scripts from the site origin only, so an injected inline script is blocked. What Cloudflare itself does with a visitor stays outside the site's control.

A small script, bundled from `src/scripts/site.ts`, adds a few enhancements:
- the scroll reveals
- the top bar that turns into a pill on scroll
- the mobile menu behaviour

Every part of the page works without it. With `prefers-reduced-motion` the page drops all animation and keeps every section visible.

## Quick start

You need Node.js 22.23.4 or newer (Astro 7 refuses older versions). `.node-version` pins it for Cloudflare.

```bash
npm install
cp .env.example .env   # optional, fill in your own values
npm run dev            # http://localhost:4321
npm run check          # type checks
npm run build          # static output in dist/, then checks for [placeholders]
npm run preview        # serve dist/
```

## No personal data in the repository

The repository is public, so it holds no private data or credentials. The contact block only uses public handles: a contact address, the GitHub profile and a Discord username. They have defaults in `src/content.ts` and can be overridden at build time:

| Variable | Used for |
|---|---|
| `CONTACT_EMAIL` | Email link |
| `CONTACT_GITHUB` | GitHub link (`https://...`) |
| `CONTACT_DISCORD` | Discord username, shown as text |

Locally they go into `.env`, which git ignores. In production you set them in the hosting dashboard. `npm run build` warns about any `[placeholder]` left in the output, and `STRICT=1 npm run build` stops the build.

Never commit `.env`, tokens or any other credentials. The site needs none.

## Where things live

| Path | Purpose |
|---|---|
| `src/content.ts` | All copy in German and English, projects and skills; reads the environment variables |
| `src/views/Home.astro` | Sections of the home page |
| `src/layouts/Base.astro` | Head, top bar, background, footer |
| `src/styles/tokens.css` | Brand Kit 2.0 tokens, unchanged |
| `src/styles/global.css` | Portfolio styles |
| `src/scripts/site.ts` | Progressive enhancements, bundled and fingerprinted with the build |
| `public/_headers` | Security headers, including a strict Content Security Policy |
| `public/_redirects` | Redirects for old addresses (`/en/`, removed privacy pages) |
| `scripts/` | Font copy and the placeholder check |

The Content Security Policy allows no inline styles or scripts. Layout values that would normally sit in a `style` attribute live in `global.css` and are keyed by `data-*` attributes.

## Deploy on Cloudflare

`wrangler.jsonc` serves `dist/` as Workers static assets and uses the generated 404 page.

- Build command: `STRICT=1 npm run build`
- Deploy command: `npx wrangler deploy`, or `npm run deploy` locally
- Node version: taken from `.node-version`
- Environment variables: optional, see the table above.

## Content rules

All text is written in the first person and kept plain. Every skill and project must be backed by real work. The site says openly that the projects are built with Claude Code.

## Commit and documentation style

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) and are written in English. A message describes what changed and why, in a plain, factual tone. It never repeats the instruction or request that led to the change. Pull request titles, code comments and documentation follow the same rule.

- Good: `style: refine copy for a natural, personal tone`
- Avoid: `style: make the page read less generated`

Nothing in commits, comments or docs names private details or the sites used as design inspiration.

## Credits

Icons come from [Lucide](https://lucide.dev) (ISC) and [Simple Icons](https://simpleicons.org) (CC0) and are inlined at build time. The fonts are Albert Sans and IBM Plex Mono (SIL OFL 1.1). The Colvex logo and brand assets belong to their owner and are not covered by any open source license.
