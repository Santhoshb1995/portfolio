import { HERO_CTAS, expect, test } from "./support/fixtures";

test("home shows the positioning, CTAs and outcomes", async ({ homePage }) => {
  await homePage.goto();
  await expect(homePage.positioning).toBeVisible();
  for (const name of HERO_CTAS) await expect(homePage.cta(name)).toBeVisible();
  await expect(homePage.outcomesHeading).toBeVisible();
});
