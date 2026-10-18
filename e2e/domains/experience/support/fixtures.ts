import { test as base } from "@e2e/shared/support/fixtures";
import { ExperiencePage } from "./experience.page";

export const test = base.extend<{ experiencePage: ExperiencePage }>({
  experiencePage: async ({ page }, use) => {
    await use(new ExperiencePage(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { experience } from "@/content/experience";
