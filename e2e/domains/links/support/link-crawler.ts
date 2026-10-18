import type { Page } from "@playwright/test";

export interface CrawledLink {
  /** Resolved absolute URL. */
  href: string;
  /** The href attribute exactly as written. */
  raw: string;
  page: string;
  target: string | null;
  rel: string | null;
}

export interface CrawlResult {
  /** Status code each visited page returned. */
  pages: Map<string, number | undefined>;
  /** Every link found, including in-page anchors. */
  links: CrawledLink[];
  /** In-page anchors (#id) and how many elements each one matched. */
  anchors: { page: string; selector: string; matches: number }[];
}

/** Breadth-first crawl of same-origin pages, following trailing-slash links. */
export class LinkCrawler {
  constructor(
    private readonly page: Page,
    private readonly origin: string,
  ) {}

  async crawl(startPaths: readonly string[]): Promise<CrawlResult> {
    const queue = [...startPaths];
    const result: CrawlResult = { pages: new Map(), links: [], anchors: [] };

    while (queue.length) {
      const path = queue.shift()!;
      if (result.pages.has(path)) continue;

      const response = await this.page.goto(path);
      result.pages.set(path, response?.status());

      for (const link of await this.linksOnPage(path)) {
        result.links.push(link);
        if (link.raw.startsWith("#")) {
          // A bare "#" is reported as a placeholder by the spec, not queried here.
          const matches = link.raw.length > 1 ? await this.page.locator(link.raw).count() : 0;
          result.anchors.push({ page: path, selector: link.raw, matches });
          continue;
        }
        const url = new URL(link.href);
        if (url.origin === this.origin && url.pathname.endsWith("/")) queue.push(url.pathname);
      }
    }
    return result;
  }

  /** Links to check once each: not in-page anchors, deduplicated by URL. */
  static uniqueTargets(links: CrawledLink[]): CrawledLink[] {
    const targets = links.filter((link) => !link.raw.startsWith("#"));
    return [...new Map(targets.map((link) => [link.href, link])).values()];
  }

  private linksOnPage(path: string): Promise<CrawledLink[]> {
    return this.page.$$eval(
      "a[href]",
      (anchors, page) =>
        anchors.map((a) => ({
          href: (a as HTMLAnchorElement).href,
          raw: a.getAttribute("href") ?? "",
          page,
          target: a.getAttribute("target"),
          rel: a.getAttribute("rel"),
        })),
      path,
    );
  }
}
