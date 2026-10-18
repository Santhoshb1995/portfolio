import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

export class ContactPage extends SitePage {
  readonly emailLink: Locator;

  constructor(page: Page) {
    super(page, "/contact/");
    this.emailLink = page.getByRole("link", { name: /@gmail\.com/ });
  }
}
