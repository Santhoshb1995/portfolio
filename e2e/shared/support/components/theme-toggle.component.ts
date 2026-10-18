import type { Locator, Page } from "@playwright/test";

export class ThemeToggle {
  readonly button: Locator;

  constructor(page: Page) {
    this.button = page.getByTestId("theme-toggle");
  }

  click(): Promise<void> {
    return this.button.click();
  }

  focus(): Promise<void> {
    return this.button.focus();
  }
}
