import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";
import { ROUTES, expect, test } from "./fixtures";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

async function expectNoViolations(page: Page, label: string) {
  // Let entrance animations finish so contrast is measured on final colours.
  await page.evaluate(() => Promise.all(document.getAnimations().map((a) => a.finished)));
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  const summary = results.violations.map(
    (v) =>
      `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).join("\n  ")}`,
  );
  expect(summary, `axe violations on ${label}`).toEqual([]);
}

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`accessibility (${colorScheme} theme)`, () => {
    test.use({ colorScheme });

    for (const route of ROUTES) {
      test(`${route.path} has no axe violations`, async ({ page }) => {
        await page.goto(route.path);
        await expect(page.locator("html")).toHaveAttribute("data-theme", colorScheme);
        await expectNoViolations(page, `${route.path} (${colorScheme})`);
      });
    }
  });
}

test("open mobile menu has no axe violations", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expectNoViolations(page, "mobile menu");
});

test("all images have alt text", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route.path);
    await expect(page.locator("img:not([alt])"), route.path).toHaveCount(0);
    // Decorative SVGs must be hidden from assistive tech.
    await expect(
      page.locator("svg:not([aria-hidden='true']):not([role='img'])"),
      route.path,
    ).toHaveCount(0);
  }
});
