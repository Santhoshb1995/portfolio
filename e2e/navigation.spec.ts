import { NAV, expect, test } from "./fixtures";

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop nav is hidden on small screens");

  test("each nav link navigates and marks itself current", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });

    for (const item of NAV) {
      await nav.getByRole("link", { name: item.label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${item.href}$`));
      await expect(nav.getByRole("link", { name: item.label, exact: true })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(nav.locator('[aria-current="page"]:visible')).toHaveCount(1);
    }

    await page.getByRole("banner").getByRole("link", { name: "Santhosh Burugupally" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(nav.locator('[aria-current="page"]:visible')).toHaveCount(0);
  });

  test("nav is reachable and usable with the keyboard alone", async ({ page }) => {
    await page.goto("/");
    // Tab order: skip link → name/home → first nav link.
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: NAV[0]!.label, exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${NAV[0]!.href}$`));
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "menu button only shows on small screens");

  test("menu opens, navigates and closes", async ({ page }) => {
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open menu" });
    await expect(button).toHaveAttribute("aria-expanded", "false");

    await button.click();
    const close = page.getByRole("button", { name: "Close menu" });
    await expect(close).toHaveAttribute("aria-expanded", "true");

    const menu = page.locator(`#${await close.getAttribute("aria-controls")}`);
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Projects" }).click();

    await expect(page).toHaveURL(/\/projects\/$/);
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("Escape closes the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});

test("skip link moves focus to the main content", async ({ page, isMobile }) => {
  test.skip(isMobile, "keyboard Tab is a desktop interaction");
  await page.goto("/about/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
});
