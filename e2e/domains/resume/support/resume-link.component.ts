import type { Download, Locator, Page } from "@playwright/test";

/** The "Download resume" button shown on Home and Contact. */
export class ResumeLink {
  readonly link: Locator;

  constructor(private readonly page: Page) {
    this.link = page.getByTestId("resume-link");
  }

  async download(): Promise<Download> {
    const [download] = await Promise.all([this.page.waitForEvent("download"), this.link.click()]);
    return download;
  }
}
