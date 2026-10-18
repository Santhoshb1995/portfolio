import { test as base } from "@e2e/shared/support/fixtures";
import { NotFoundPage } from "./not-found.page";

export const test = base.extend<{ notFoundPage: NotFoundPage }>({
  // Its own page, so the expected 404 console error doesn't trip `consoleErrors`.
  notFoundPage: async ({ browser }, use) => {
    const page = await browser.newPage();
    await use(new NotFoundPage(page));
    await page.close();
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { ROUTES } from "@e2e/shared/support/routes";
