import { test as base } from "@e2e/shared/support/fixtures";
import { LinkCrawler } from "./link-crawler";

export const test = base.extend<{ crawler: LinkCrawler }>({
  crawler: async ({ page, baseURL }, use) => {
    await use(new LinkCrawler(page, new URL(baseURL!).origin));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { ROUTES } from "@e2e/shared/support/routes";
export { LinkCrawler } from "./link-crawler";
export { CHECK_EXTERNAL_LINKS, EMAIL_ADDRESS, PLACEHOLDER_HREF } from "./links.data";
