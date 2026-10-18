@AGENTS.md

# Portfolio — Santhosh Burugupally

Static personal site for a Senior SDET moving toward Forward Deployed Engineering. Positioning: quality-focused engineer, reliable test automation, AI in testing, integrating systems.

## Content rules (most important)

- `SB_Resume.pdf` (the user's resume) is the only source of truth for experience, skills, education and dates, together with metrics the user confirmed directly. **Never invent employers, metrics, projects or achievements**, and don't round or recompute numbers.
- If something is missing, use a `TODO: …` string (type `Todo` in `src/content/types.ts`) and tell the user. `npm run todos` lists them.
- Keep the phone number off the site (a content test enforces this).

## Commands

```bash
npm run dev            # dev server :3000
npm run build          # static export → out/
npm run check          # lint + typecheck + prettier check
npm test               # vitest (unit + content integrity)
npm run test:coverage  # 90% threshold on src/lib
npm run test:e2e       # playwright against out/ (build first)
npm run todos          # remaining content placeholders
```

Before committing: `npm run check && npm test && npm run build && npm run test:e2e`.

## Structure

- `src/content/`: all editable content as typed TS (`profile`, `experience`, `skills`, `projects`, `site`) plus MDX posts in `posts/`. UI reads from here; content must never be hard-coded in components.
- `src/lib/`: pure, unit-tested helpers. Tests sit next to the code as `*.test.ts`. `load-posts.ts` is the only server-only/fs module.
- `src/components/`: UI. Client components only where needed (`main-nav`, `theme-toggle`).
- `src/app/`: routes. Each page builds its metadata with `pageMetadata()` from `src/lib/metadata.ts`.
- `e2e/`: Playwright specs. `fixtures.ts` holds `ROUTES` (update it when adding a page) and an auto fixture that fails on console errors.

## Conventions

- TypeScript strict + `noUncheckedIndexedAccess`; `import type` for types (ESLint enforces it).
- Prettier (100 cols, Tailwind class sorting). Run `npm run format`.
- Styling uses Tailwind with the design tokens in `globals.css` (`bg`, `surface`, `fg`, `muted`, `border`, `accent`, `accent-soft`). One accent colour (teal). Don't add raw hex values in components.
- Dark mode is `data-theme` on `<html>`, set before paint by `themeInitScript` (`src/lib/theme.ts`); use the `dark:` variant.
- Accessibility: semantic landmarks, one `h1` per page, decorative SVGs `aria-hidden`, external links get `target="_blank" rel="noopener noreferrer"` plus sr-only "(opens in a new tab)". axe must pass in both themes.
- Internal hrefs use trailing slashes (`/about/`) to match `trailingSlash: true`.
- Commits: conventional style (`feat(scope): …`, `test(e2e): …`), one per logical step.

## Next.js 16 gotchas found in this repo

- `output: "export"` is incompatible with `cacheComponents`/`partialPrefetching` (build fails with "PPR cannot be enabled in export mode"), so both are off.
- Segment metadata merges shallowly: a page that sets `openGraph` replaces the layout's, so always use `pageMetadata()`, which includes the OG image.
- The OG image is a route handler at `src/app/og.png/route.tsx` (outputs a real `out/og.png`). The `opengraph-image` file convention emitted an extensionless file under static export.
- Metadata routes and route handlers need `export const dynamic = "force-static"`.
- Turbopack is the default bundler; Tailwind runs through the `@tailwindcss/turbopack` loader in `next.config.ts`.
