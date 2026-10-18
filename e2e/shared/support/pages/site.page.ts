import type { Locator, Page, Response } from "@playwright/test";
import { SiteHeader } from "../components/site-header.component";

/**
 * Base page object: the layout every route shares. Domain page objects extend
 * it with their own path and locators.
 */
export class SitePage {
  readonly header: SiteHeader;
  readonly html: Locator;
  readonly heading: Locator;
  readonly headings: Locator;
  readonly banner: Locator;
  readonly main: Locator;
  readonly footer: Locator;
  readonly metaDescription: Locator;

  constructor(
    readonly page: Page,
    readonly path: string = "/",
  ) {
    this.header = new SiteHeader(page);
    this.html = page.locator("html");
    this.heading = page.getByRole("heading", { level: 1 });
    this.headings = page.locator("h1");
    this.banner = page.getByRole("banner");
    this.main = page.getByRole("main");
    this.footer = page.getByRole("contentinfo");
    this.metaDescription = page.locator('meta[name="description"]');
  }

  goto(path: string = this.path): Promise<Response | null> {
    return this.page.goto(path);
  }

  /** Waits for entrance animations so measurements use final styles. */
  async settleAnimations(): Promise<void> {
    await this.page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
  }
}
