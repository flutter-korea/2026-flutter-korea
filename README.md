# Flutter Korea 2026 — Conference Website

> **Back to Basics, Move Forward** · 기술의 본질로 돌아가, 두려움 없이 미래를 정의하다
>
> 2026. 11. 07 (SAT) · Seoul · Hosted by **Flutter Seoul**

A fast, fully static, bilingual (한국어 / English) landing page for **Flutter Korea 2026**,
built with **Bun + SvelteKit** and deployed to **GitHub Pages**.

---

## Tech stack

| | |
| --- | --- |
| Runtime / package manager | [Bun](https://bun.sh) |
| Framework | [SvelteKit](https://kit.svelte.dev) (Svelte 5 runes) |
| Adapter | `@sveltejs/adapter-static` (prerendered, no server) |
| Fonts | [Pretendard](https://github.com/orioncactus/pretendard) (KR/EN) |
| Hosting | GitHub Pages via GitHub Actions |

## Local development

```bash
bun install      # install dependencies
bun run dev      # start the dev server → http://localhost:5173
bun run build    # produce the static site in ./build
bun run preview  # preview the production build locally
```

> `bun run check` runs `svelte-check` for type/diagnostic checks.

## Project structure

```
src/
  app.html                 # document shell, meta/OG tags, Pretendard font
  app.css                  # global design system (tokens, utilities, keyframes)
  lib/
    i18n.js                # language store (ko/en) + translation store `t`
    content.js             # all bilingual copy (single source of truth) + links
    actions.js             # `reveal` scroll-in Svelte action
    components/            # one file per page section (Header, Hero, About, …)
  routes/
    +layout.js             # prerender = true, trailingSlash = 'always'
    +layout.svelte         # Header + <main> + Footer, language persistence
    +page.svelte           # home — assembles the section components
    speakers/+page.svelte  # Call for Speakers overview (categories, levels, apply)
static/
  favicon.svg, og-image.svg, .nojekyll
```

### Editing content

All copy lives in [`src/lib/content.js`](src/lib/content.js) as a `dict` with matching
`ko` and `en` trees — edit there and both languages stay in sync structurally.
Shared URLs (Call for Speakers form, ticket platform, contact) live in the `links` export.

---

## Deploying to GitHub Pages

Deployment is automated by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push this repository to GitHub (default branch **`main`**).
2. In the repo, go to **Settings → Pages → Build and deployment** and set **Source: GitHub Actions**.
3. Every push to `main` builds the site and publishes it. The workflow sets
   `BASE_PATH=/<repo-name>` automatically, so the site works when served from
   `https://<user>.github.io/<repo-name>/`.

For this repository the published URL is:

> **https://flutter-korea.github.io/2026-flutter-korea/**

(If you rename the repo or use a custom domain, update the absolute `og:image` / `og:url`
values in `src/app.html`, which social crawlers require to be fully-qualified.)

### Custom domain

If you serve the site from a root/custom domain instead of a project subpath:

- Add a `static/CNAME` file containing your domain, **and**
- The base path is already empty for root domains — no code change needed
  (the workflow only injects `BASE_PATH` for the project-subpath case; for a custom
  domain, set **Settings → Pages → Custom domain** and remove/adjust `BASE_PATH` in the
  workflow if the site lives at the domain root).

---

## Accessibility & performance notes

- Semantic landmarks, skip-link, keyboard-focusable controls, `:focus-visible` rings.
- Fully respects `prefers-reduced-motion` (animations and scroll-reveal disable).
- No client-side data fetching; everything is prerendered to static HTML.

---

*Flutter and the Flutter logo are trademarks of Google LLC. This is a non-profit, community-run event
organized by Flutter Seoul.*
