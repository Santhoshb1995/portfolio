import { test as base } from "@e2e/shared/support/fixtures";
import { WritingPage } from "./writing.page";

export const test = base.extend<{ writingPage: WritingPage }>({
  writingPage: async ({ page }, use) => {
    await use(new WritingPage(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { POST_URL } from "./writing.data";
