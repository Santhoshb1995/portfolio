# Santhosh Burugupally — Portfolio

[![CI](https://github.com/Santhoshb1995/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Santhoshb1995/portfolio/actions/workflows/ci.yml)

<!-- TODO: if the GitHub repo isn't named "portfolio", update both badge URLs above. -->

Personal site for a Senior SDET moving toward Forward Deployed Engineering. Built as a fully static Next.js site and tested the way I'd test a product: unit tests for logic, Playwright for behaviour, axe for accessibility, and a crawler for broken links, all in CI on every push.

**Stack:** Next.js 16 (App Router, static export) · TypeScript (strict) · Tailwind CSS v4 · MDX · Vitest · Playwright · axe-core · GitHub Actions

## Getting started

Requires Node 20.9+ (Node 24 recommended; see `.nvmrc`).

```bash
npm install
npx playwright install chromium   # once, for E2E tests
npm run dev                       # http://localhost:3000
```

## Scripts

| Script                  | What it does                                              |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | Dev server with hot reload                                |
| `npm run build`         | Static export to `out/`                                   |
| `npm start`             | Serve `out/` locally on port 3000 (run `build` first)     |
| `npm run lint`          | ESLint, zero warnings allowed                             |
| `npm run typecheck`     | Generate route types and run `tsc --noEmit`               |
| `npm run format`        | Format everything with Prettier                           |
| `npm run format:check`  | Check formatting (CI)                                     |
| `npm run check`         | Lint, type-check and format check together                |
| `npm test`              | Vitest unit and content-integrity tests                   |
| `npm run test:coverage` | Unit tests with coverage (90% threshold on `src/lib`)     |
| `npm run test:e2e`      | Playwright E2E, links, SEO and a11y tests against `out/`  |
| `npm run test:e2e:ui`   | Playwright UI mode for debugging                          |
| `npm run test:all`      | Unit tests, build, then E2E                               |
| `npm run todos`         | List every `TODO:` placeholder still in the content files |

## Editing content

All content lives in typed files in `src/content/`. You never need to touch components to update the site, and `npm run typecheck` will tell you if a field is missing or misspelled.

| File                                     | What's in it                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------- |
| `src/content/profile.ts`                 | Name, headline, positioning, About paragraphs, links, education, certs |
| `src/content/experience.ts`              | Roles (newest first), dates as `YYYY-MM`, highlights, metrics, stack   |
| `src/content/skills.ts`                  | Skill groups shown on the Skills page                                  |
| `src/content/projects.ts`                | Project cards: problem, stack, result, repo and live links             |
| `src/content/site.ts`                    | Site URL, title, description, nav                                      |
| `src/content/posts/*.mdx`                | Writing posts                                                          |
| `public/Santhosh-Burugupally-Resume.pdf` | The downloadable resume                                                |

**Rules of thumb**

- **Metrics:** only add numbers you can stand behind. Leave `metrics: []` rather than estimate. The home page's "Selected outcomes" uses the first metric of each role.
- **Placeholders:** any string starting with `TODO:` is a placeholder. Project links that are still `TODO:` show as "coming soon" instead of a broken link. Run `npm run todos` to see what's left.
- **Shipping a project:** fill in `result`, `repo` and `live`, then change `status` to `"complete"`. A content test stops you marking it complete while `result` or `repo` is still a TODO.
- **Updating the resume:** replace the PDF in `public/`, keeping the filename (or update `profile.links.resume`).

### Adding a post

Create `src/content/posts/my-post-slug.mdx`:

```mdx
export const metadata = {
  title: "My post title",
  date: "2026-11-01",
  summary: "One sentence shown on the Writing page and in search results.",
  // draft: true,  // visible in `npm run dev` only
};

Your post in Markdown. You can use **MDX** components too.
```

The filename becomes the URL (`/writing/my-post-slug/`), and the post is added to the Writing page and the sitemap automatically. Slugs must be kebab-case; the build fails with a clear message if the metadata is invalid.

## Testing

- **Unit (Vitest):** date ranges and durations, theme resolution (including the inline no-flash script), TODO detection, post validation and sorting, metadata. `src/content/content.test.ts` checks the content itself: valid dates, newest-first order, https links or explicit TODOs, unique ids, and that no phone number appears on the site.
- **E2E (Playwright, desktop + mobile Chromium)**, run against the real static build:
  - `pages.spec.ts`: every route returns 200 with one `h1`, landmarks, title and description; content renders from the data files; custom 404
  - `navigation.spec.ts`: nav links and `aria-current`, mobile menu (Escape closes it), skip link, keyboard-only use
  - `theme.spec.ts`: follows the OS setting, toggles, persists, and applies before any JS runs (no flash)
  - `resume.spec.ts`: the link serves a real PDF and downloads it
  - `links.spec.ts`: crawls every page; internal links and anchors must resolve, mailto links must be well-formed, external links must be https with `target="_blank" rel="noopener"`. Set `CHECK_EXTERNAL_LINKS=1` to also request external URLs (off in CI because LinkedIn blocks bots).
  - `a11y.spec.ts`: axe (WCAG 2.2 AA + best practices) on every page in light and dark themes, plus the open mobile menu
  - `seo.spec.ts`: canonical, Open Graph and Twitter tags on every page, OG image, sitemap, robots, JSON-LD
- A shared fixture fails any E2E test that logs a browser console error.

CI (`.github/workflows/ci.yml`) runs two jobs on every push and pull request: **checks** (lint, type-check, format, unit tests with coverage) and **e2e** (build, then Playwright). The HTML report is uploaded as an artifact.

## Deploying to Vercel (free)

1. Push this repo to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repo. Vercel detects Next.js; the defaults work as they are.
3. Under **Settings → Environment Variables**, set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-name.vercel.app` or a custom domain). This drives canonical URLs, the sitemap, robots.txt and Open Graph tags.
4. Deploy. Every push to `main` redeploys, and pull requests get preview URLs.

Because the site is a static export (`out/`), it also works on any static host (Netlify, Cloudflare Pages, GitHub Pages, S3).

## Project structure

```
src/
  app/            Routes (App Router), sitemap, robots, OG image, icon
  components/     UI components (header, nav, theme toggle, buttons, icons)
  content/        All editable content + types + content-integrity tests
  lib/            Pure helpers (dates, theme, todo, posts, metadata) + unit tests
  mdx-components.tsx
e2e/              Playwright specs and shared fixtures
scripts/todos.ts  Lists remaining content TODOs
```
