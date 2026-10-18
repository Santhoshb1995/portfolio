import { ROUTES, expect, test } from "./fixtures";

interface FoundLink {
  href: string;
  page: string;
  target: string | null;
  rel: string | null;
}

/**
 * Crawls every page, collects every <a href>, and checks:
 * - internal links and assets return < 400
 * - in-page anchors point at an element that exists
 * - mailto links are well-formed
 * - external links are https and open safely in a new tab
 * Set CHECK_EXTERNAL_LINKS=1 to also request external URLs (off by default:
 * sites like LinkedIn block automated requests, which would make CI flaky).
 */
test("no broken links anywhere on the site", async ({ page, request, baseURL, isMobile }) => {
  test.skip(isMobile, "links are identical across viewports; crawl once");
  test.setTimeout(60_000);

  const origin = new URL(baseURL!).origin;
  const toVisit = ROUTES.map((route) => route.path) as string[];
  const visited = new Set<string>();
  const links: FoundLink[] = [];

  while (toVisit.length) {
    const path = toVisit.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);

    const response = await page.goto(path);
    expect(response?.status(), `page ${path}`).toBe(200);

    const found = await page.$$eval("a[href]", (anchors) =>
      anchors.map((a) => ({
        href: (a as HTMLAnchorElement).href,
        raw: a.getAttribute("href") ?? "",
        target: a.getAttribute("target"),
        rel: a.getAttribute("rel"),
      })),
    );

    for (const link of found) {
      expect(link.raw.trim(), `empty href on ${path}`).not.toBe("");
      expect(link.raw, `placeholder href on ${path}`).not.toMatch(/^(#|TODO|javascript:)$/i);

      if (link.raw.startsWith("#")) {
        await expect(page.locator(link.raw), `anchor ${link.raw} on ${path}`).toHaveCount(1);
        continue;
      }
      links.push({ href: link.href, page: path, target: link.target, rel: link.rel });

      const url = new URL(link.href);
      if (url.origin === origin && url.pathname.endsWith("/") && !visited.has(url.pathname)) {
        toVisit.push(url.pathname);
      }
    }
  }

  const unique = [...new Map(links.map((link) => [link.href, link])).values()];
  const checkExternal = process.env.CHECK_EXTERNAL_LINKS === "1";

  for (const link of unique) {
    const url = new URL(link.href);
    const where = `${link.href} (on ${link.page})`;

    if (url.protocol === "mailto:") {
      expect(url.pathname, where).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
    } else if (url.origin === origin) {
      const response = await request.get(link.href);
      expect(response.status(), where).toBeLessThan(400);
    } else {
      expect(url.protocol, where).toBe("https:");
      expect(link.target, `${where} should open in a new tab`).toBe("_blank");
      expect(link.rel ?? "", `${where} needs rel=noopener`).toContain("noopener");
      if (checkExternal) {
        const response = await request.get(link.href, { maxRedirects: 5 });
        expect(response.status(), where).toBeLessThan(400);
      }
    }
  }

  // Sanity check that the crawler actually found things.
  expect(visited.size).toBeGreaterThanOrEqual(ROUTES.length);
  expect(unique.length).toBeGreaterThan(10);
});
