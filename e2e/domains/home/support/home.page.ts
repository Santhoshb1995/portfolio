import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

export class HomePage extends SitePage {
  readonly positioning: Locator;
  readonly outcomesHeading: Locator;

  constructor(page: Page) {
    super(page, "/");
    this.positioning = page.getByText(/Forward Deployed Engineering/).first();
    this.outcomesHeading = page.getByRole("heading", { name: "Selected outcomes" });
  }

  cta(name: string | RegExp): Locator {
    return this.main.getByRole("link", { name });
  }
}
