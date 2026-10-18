import { test as base } from "@e2e/shared/support/fixtures";
import { ContactPage } from "./contact.page";

export const test = base.extend<{ contactPage: ContactPage }>({
  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { MAILTO } from "./contact.data";
