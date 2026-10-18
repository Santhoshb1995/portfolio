import type { Locator, Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";

export class WritingPage extends SitePage {
  readonly posts: Locator;

  constructor(page: Page) {
    super(page, "/writing/");
    this.posts = page.getByTestId("post");
  }

  /** Opens the newest post and returns the title it was listed under. */
  async openFirstPost(): Promise<string> {
    const link = this.posts.first().getByRole("link");
    const title = (await link.textContent()) ?? "";
    await link.click();
    return title;
  }
}
