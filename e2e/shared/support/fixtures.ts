import { test as base, expect } from "@playwright/test";
import { SitePage } from "./pages/site.page";

export interface SharedFixtures {
  /** Collected console errors; the test fails if any are logged. */
  consoleErrors: string[];
  /** Page object for any route, with the shared layout (header, main, footer). */
  sitePage: SitePage;
}

/**
 * Base test every domain extends. `consoleErrors` runs automatically, so
 * hydration errors and broken scripts can't slip through silently.
 */
export const test = base.extend<SharedFixtures>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
  sitePage: async ({ page }, use) => {
    await use(new SitePage(page));
  },
});

export { expect };
