import { COLOR_SCHEMES, ROUTES, expect, test } from "./support/fixtures";

for (const colorScheme of COLOR_SCHEMES) {
  test.describe(`accessibility (${colorScheme} theme)`, () => {
    test.use({ colorScheme });

    for (const route of ROUTES) {
      test(`${route.path} has no axe violations`, async ({ sitePage, audit }) => {
        await sitePage.goto(route.path);
        await expect(sitePage.html).toHaveAttribute("data-theme", colorScheme);
        // Let entrance animations finish so contrast is measured on final colours.
        await sitePage.settleAnimations();
        expect(await audit.violations(), `axe violations on ${route.path}`).toEqual([]);
      });
    }
  });
}

test("open mobile menu has no axe violations", async ({ sitePage, audit, isMobile }) => {
  test.skip(!isMobile, "mobile menu only");
  await sitePage.goto("/");
  await sitePage.header.openMenu();
  await sitePage.settleAnimations();
  expect(await audit.violations(), "axe violations on mobile menu").toEqual([]);
});

test("all images have alt text and decorative SVGs are hidden", async ({ sitePage, audit }) => {
  for (const route of ROUTES) {
    await sitePage.goto(route.path);
    await expect(audit.imagesWithoutAlt, route.path).toHaveCount(0);
    await expect(audit.exposedSvgs, route.path).toHaveCount(0);
  }
});
