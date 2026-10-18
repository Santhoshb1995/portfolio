import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

/** One role on the timeline. */
export class RoleEntry {
  readonly title: Locator;

  constructor(readonly root: Locator) {
    this.title = root.getByRole("heading", { level: 2 });
  }
}

export class ExperiencePage extends SitePage {
  readonly roles: Locator;

  constructor(page: Page) {
    super(page, "/experience/");
    this.roles = page.getByTestId("role");
  }

  role(index: number): RoleEntry {
    return new RoleEntry(this.roles.nth(index));
  }
}
