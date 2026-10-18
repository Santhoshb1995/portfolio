import type { Locator, Page } from "@playwright/test";

/** SEO-relevant tags in <head>, plus the page's JSON-LD. */
export class HeadTags {
  readonly canonical: Locator;
  readonly twitterCard: Locator;
  private readonly jsonLdScript: Locator;

  constructor(private readonly page: Page) {
    const head = page.locator("head");
    this.canonical = head.locator('link[rel="canonical"]');
    this.twitterCard = head.locator('meta[name="twitter:card"]');
    this.jsonLdScript = page.locator('script[type="application/ld+json"]');
  }

  openGraph(property: string): Locator {
    return this.page.locator(`head meta[property="${property}"]`);
  }

  async jsonLd(): Promise<Record<string, unknown>> {
    return JSON.parse((await this.jsonLdScript.textContent()) ?? "{}") as Record<string, unknown>;
  }
}
