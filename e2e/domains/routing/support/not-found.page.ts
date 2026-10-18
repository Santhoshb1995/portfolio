import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

export class NotFoundPage extends SitePage {
  readonly backHomeLink: Locator;

  constructor(page: Page) {
    super(page, "/does-not-exist/");
    this.backHomeLink = page.getByRole("link", { name: "Back to home" });
  }
}
