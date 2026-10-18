import { MAILTO, expect, test } from "./support/fixtures";

test("contact page has a mailto link", async ({ contactPage }) => {
  await contactPage.goto();
  await expect(contactPage.emailLink).toHaveAttribute("href", MAILTO);
});
