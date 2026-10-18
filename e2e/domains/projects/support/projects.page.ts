import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

export class ProjectCard {
  constructor(readonly root: Locator) {}

  title(name: string): Locator {
    return this.root.getByRole("heading", { name });
  }
}

export class ProjectsPage extends SitePage {
  readonly cards: Locator;

  constructor(page: Page) {
    super(page, "/projects/");
    this.cards = page.getByTestId("project-card");
  }

  card(index: number): ProjectCard {
    return new ProjectCard(this.cards.nth(index));
  }
}
