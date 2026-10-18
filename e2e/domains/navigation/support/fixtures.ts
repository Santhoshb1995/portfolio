import { test as base } from "@e2e/shared/support/fixtures";
import type { SiteHeader } from "@e2e/shared/support/components/site-header.component";

export const test = base.extend<{ header: SiteHeader }>({
  header: async ({ sitePage }, use) => {
    await use(sitePage.header);
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { NAV } from "@e2e/shared/support/routes";
export { pressTab } from "./keyboard";
