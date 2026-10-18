import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

export class SkillsPage extends SitePage {
  constructor(page: Page) {
    super(page, "/skills/");
  }

  groupHeading(title: string): Locator {
    return this.page.getByRole("heading", { level: 2, name: title });
  }
}
