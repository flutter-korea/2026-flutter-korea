# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Bilingual (KR/EN) marketing site for the **Flutter Korea 2026** conference. Bun + SvelteKit (Svelte 5 runes),
fully prerendered with `@sveltejs/adapter-static`, deployed to GitHub Pages at
`https://flutter-korea.github.io/2026-flutter-korea/`.

## Commands

```bash
bun install          # dependencies
bun run dev          # dev server → http://localhost:5173
bun run build        # static build → ./build  (adapter-static, prerendered)
bun run preview      # preview the production build
bun run check        # svelte-check (types + a11y). Must be 0 errors / 0 warnings.
```

There is **no test suite**. `bun run check` is the gate — it runs `svelte-check` over every `.svelte`/`.js`
file and catches type errors, a11y issues, and unused code. Run it before considering a change done.

## Content model (edit here to change copy)

All user-facing text lives in **`src/lib/content.js`** as a single `dict` with two mirror trees, `dict.ko` and
`dict.en`, that **must keep an identical shape**. Components never hardcode copy; they read the active language
through the `t` derived store:

- `src/lib/i18n.js` — `lang` writable store (`'ko' | 'en'`, defaults `'ko'` to match the prerendered HTML) and
  `t = derived(lang, $lang => dict[$lang])`. Components read `$t.<section>.<key>`.
- `+layout.svelte` restores the saved language from `localStorage` **after mount** (not at module load) to avoid
  a hydration mismatch, then persists changes and keeps `<html lang>` in sync.
- Shared URLs (CFP Google Form, ticket platform, Flutter Seoul, contact email) live in the `links` export of
  `content.js`. The Call-for-Speakers form URL is here — update `links.cfp` to change it everywhere.

When adding a section/field: add the key to **both** `ko` and `en` with the same structure, or `svelte-check`
and prerender will surface the mismatch.

## GitHub Pages base-path rules (easy to get wrong)

The site is served from a **project subpath** (`/2026-flutter-korea/`), so path handling is load-bearing:

- **Every internal link must be base-prefixed.** Import `{ base } from '$app/paths'` and write
  ``href={`${base}/#about`}`` for on-page anchors, ``href={`${base}/speakers`}`` for routes. Anchors are written
  as ``${base}/#id`` (not bare `#id`) so they also work from the `/speakers` route by navigating home first.
  A bare leading-`/` href would break under the subpath.
- `svelte.config.js` sets `paths.base = process.env.BASE_PATH ?? ''` (empty locally). The deploy workflow sets
  `BASE_PATH=/<repo-name>` from the repo name, so links/assets resolve on any fork without code changes.
- SvelteKit emits **relative** asset/link paths (`./_app/…` from `/`, `../_app/…` from `/speakers/`) — verify
  after `bun run build` if you touch routing. `trailingSlash: 'always'` (in `+layout.js`) makes each route a
  directory with `index.html`.
- **Social meta is the exception:** `og:image` / `og:url` / `twitter:image` in `src/app.html` are **hardcoded
  absolute URLs** to the deploy domain (crawlers can't resolve relative paths). They also point at
  `og-image.png`, **not** the SVG (crawlers don't render SVG). **If the repo is renamed or moves to a custom
  domain, update those absolute URLs by hand.**

## Rendering & structure

- Fully static: `prerender = true` in `src/routes/+layout.js` cascades to all routes (home `/` and `/speakers/`).
  No server, no client data fetching.
- `+layout.svelte` is the app shell (skip-link → `Header` → `<main>` → `Footer`). `+page.svelte` just composes
  the home sections in order; each section is a self-contained component in `src/lib/components/`.
- **SSR safety:** components render on the server first. Never touch `window`/`document`/`localStorage`/
  `matchMedia`/`IntersectionObserver` at module or render scope — only inside `onMount`, event handlers, or a
  guarded `$effect`. The `reveal` scroll-in action (`src/lib/actions.js`, used as `use:reveal`) already guards
  these and honors `prefers-reduced-motion`.

## Design system

The site follows the **official Flutter brand** (docs.flutter.dev / flutter.dev), not a generic dark SaaS
look: white canvas, hairline-bordered light-blue "paper" cards, near-black headings, and restrained blue accents.
`src/app.css` defines this as CSS custom properties (`--white`, `--paper`, `--ink`, `--text-muted`, `--accent`
(`--blue-700`), `--border`, `--r-*`, `--font-mono`, `--section-y`, `--header-h`, `--announce-h`, …) plus utility
classes (`.container`, `.section`, `.section-tint` (paper background for alternating rhythm), `.kicker`,
`.section-title`, `.section-lead`, `.btn`/`.btn-primary`/`.btn-ghost`, `.btn-on-gradient`/
`.btn-outline-on-gradient` (for use on the hero band), `.chip`, `.card`, `.gradient-text`, `.reveal`). Components
use **scoped `<style>` only** and reuse these tokens rather than hardcoding colors, so theme changes are
centralized. Sections follow a shared heading pattern (`kicker` → `section-title` → `section-lead`).

**The gradient is deliberately contained to one place.** `--gradient-hero` (a diagonal blue→violet, matching
flutter.dev's marketing device) is used ONLY in `Hero.svelte`'s background and `AnnouncementBar.svelte` — nowhere
else. Every other surface (buttons, cards, chips, text) is flat/solid. Do not reintroduce glow blobs, blueprint
grids, or gradient text outside those two components — that reads as generic AI-SaaS, which is exactly what this
redesign moved away from. `--glow` is a small crisp shadow tint, not a diffuse blur.

Two components carry the site's interactivity signature:
- `Countdown.svelte` — a live, ticking countdown to the event start (`2026-11-07T11:00:00+09:00`, browser-only,
  `onMount`/`setInterval`, SSR-safe placeholder `--` before mount). Embedded in the Hero's glass panel.
- `Header.svelte` — scroll-spy nav via `IntersectionObserver` over the section ids, underlining the active link.

Responsive grids must self-clamp — use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so a column can't exceed
the container and overflow at ~320px (body has `overflow-x: hidden`).

Avoid numbered markers (`01`/`02`/`03`) unless the content is a genuine sequence — e.g. the speaker page's
3 difficulty levels (real progression) and 11 session categories (mirrors the actual Google Form's own numbering)
qualify; a pair of named concepts does not.

## "To be announced" sections

Sessions, Timetable, and Sponsors are intentionally in a **TBD state**: each renders its heading plus the shared
`ComingSoon.svelte` panel (badge / title / body / optional CTA). Tickets shows pricing but its purchase buttons
are a non-interactive "coming soon" state (`.tier-cta-tbd`). The active conversion path is speaker recruitment —
all "Apply to Speak" CTAs (Header, Hero, the CFP section) route to the `/speakers` overview page, whose Apply
button links out to the Google Form (`links.cfp`). When real content is confirmed, restore the detailed
rendering and update `content.js`.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds with `BASE_PATH=/<repo>` and publishes to Pages
(`upload-pages-artifact` + `deploy-pages`; Pages source must be **GitHub Actions**). `static/.nojekyll` is
required so the `_app/` directory isn't stripped by Jekyll.

The same workflow also builds the **Flutter Web port** (`flutter/`, see `flutter/README.md`) with
`flutter build web --base-href "$BASE_PATH/flutter/"` and copies it into `build/flutter/`, so one Pages
artifact serves both apps. The **`mode` query param** (case-insensitive) picks the app: SvelteKit is the
default, `?mode=flutter` redirects to the Flutter build, and `?mode=svelte` / `?mode=sveltekit` explicitly
select SvelteKit (a counterpart script in `flutter/web/index.html` redirects back up when the Flutter app
receives them). The SvelteKit-side script sits at the top of `src/app.html`'s `<head>` and resolves the
target via `%sveltekit.assets%` (so it works locally, on Pages, and on forks), mapping `/speakers` to the
Flutter app's `#/speakers` hash route and back. The redirect only exists in composed builds; under
`bun run dev` there is no `/flutter/` to serve. The Flutter toolchain version is pinned in the workflow
(keep in sync with `fvm`).

## Gotchas

- `svelte-check` needs **TypeScript pinned to v5** (`typescript@5`). TypeScript 7 (the native compiler) has a
  different package shape and crashes svelte-check 4.
- Config imports: `sveltekit()` comes from `@sveltejs/kit/vite` (in `vite.config.js`); `vitePreprocess` comes
  from `@sveltejs/vite-plugin-svelte` (in `svelte.config.js`). Mixing these up breaks the build.
- Fonts (Pretendard) load from a jsDelivr CDN in `src/app.html`; there is a system-font fallback stack in
  `--font-sans`.
