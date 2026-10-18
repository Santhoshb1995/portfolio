import { ROUTES, expect, test } from "./support/fixtures";

test.describe("every page loads", () => {
  for (const route of ROUTES) {
    test(`${route.path} renders with a heading, title and landmarks`, async ({ sitePage }) => {
      const response = await sitePage.goto(route.path);
      expect(response?.status()).toBe(200);

      await expect(sitePage.heading).toHaveText(route.h1);
      await expect(sitePage.headings).toHaveCount(1);
      await expect(sitePage.page).toHaveTitle(/Santhosh Burugupally/);
      await expect(sitePage.banner).toBeVisible();
      await expect(sitePage.main).toBeVisible();
      await expect(sitePage.footer).toBeVisible();
      await expect(sitePage.metaDescription).toHaveAttribute("content", /^.{50,160}$/);
    });
  }
});

test("unknown routes return the custom 404 page", async ({ notFoundPage }) => {
  const response = await notFoundPage.goto();
  expect(response?.status()).toBe(404);
  await expect(notFoundPage.heading).toHaveText(/didn't pass its tests/);

  await notFoundPage.backHomeLink.click();
  await expect(notFoundPage.page).toHaveURL(/\/$/);
});
