import { test as base } from "@e2e/shared/support/fixtures";
import { HomePage } from "./home.page";

export const test = base.extend<{ homePage: HomePage }>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { HERO_CTAS } from "./home.data";
