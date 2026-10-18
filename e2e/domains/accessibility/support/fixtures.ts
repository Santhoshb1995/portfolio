import { test as base } from "@e2e/shared/support/fixtures";
import { AccessibilityAudit } from "./accessibility.audit";

export const test = base.extend<{ audit: AccessibilityAudit }>({
  audit: async ({ page }, use) => {
    await use(new AccessibilityAudit(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { ROUTES } from "@e2e/shared/support/routes";
export { COLOR_SCHEMES } from "./accessibility.data";
