import {
  CHECK_EXTERNAL_LINKS,
  EMAIL_ADDRESS,
  LinkCrawler,
  PLACEHOLDER_HREF,
  ROUTES,
  expect,
  test,
} from "./support/fixtures";

/**
 * Crawls every page and checks that:
 * - every page and internal link or asset returns < 400
 * - in-page anchors point at an element that exists
 * - mailto links are well-formed
 * - external links are https and open safely in a new tab
 */
test("no broken links anywhere on the site", async ({ crawler, request, baseURL, isMobile }) => {
  test.skip(isMobile, "links are identical across viewports; crawl once");
  test.setTimeout(60_000);

  const { pages, links, anchors } = await crawler.crawl(ROUTES.map((route) => route.path));
  const origin = new URL(baseURL!).origin;

  for (const [path, status] of pages) expect(status, `page ${path}`).toBe(200);

  for (const link of links) {
    expect(link.raw.trim(), `empty href on ${link.page}`).not.toBe("");
    expect(link.raw, `placeholder href on ${link.page}`).not.toMatch(PLACEHOLDER_HREF);
  }

  for (const anchor of anchors) {
    expect(anchor.matches, `anchor ${anchor.selector} on ${anchor.page}`).toBe(1);
  }

  const targets = LinkCrawler.uniqueTargets(links);
  for (const link of targets) {
    const url = new URL(link.href);
    const where = `${link.href} (on ${link.page})`;

    if (url.protocol === "mailto:") {
      expect(url.pathname, where).toMatch(EMAIL_ADDRESS);
    } else if (url.origin === origin) {
      const response = await request.get(link.href);
      expect(response.status(), where).toBeLessThan(400);
    } else {
      expect(url.protocol, where).toBe("https:");
      expect(link.target, `${where} should open in a new tab`).toBe("_blank");
      expect(link.rel ?? "", `${where} needs rel=noopener`).toContain("noopener");
      if (CHECK_EXTERNAL_LINKS) {
        const response = await request.get(link.href, { maxRedirects: 5 });
        expect(response.status(), where).toBeLessThan(400);
      }
    }
  }

  // Sanity check that the crawler actually found things.
  expect(pages.size).toBeGreaterThanOrEqual(ROUTES.length);
  expect(targets.length).toBeGreaterThan(10);
});
