import { NAV, expect, pressTab, test } from "./support/fixtures";

test.describe("desktop navigation", () => {
  test.skip(({ isMobile }) => isMobile, "desktop nav is hidden on small screens");

  test("each nav link navigates and marks itself current", async ({ sitePage, header }) => {
    await sitePage.goto("/");

    for (const item of NAV) {
      await header.navLink(item.label).click();
      await expect(sitePage.page).toHaveURL(new RegExp(`${item.href}$`));
      await expect(header.navLink(item.label)).toHaveAttribute("aria-current", "page");
      await expect(header.currentNavLinks).toHaveCount(1);
    }

    await header.homeLink.click();
    await expect(sitePage.page).toHaveURL(/\/$/);
    await expect(header.currentNavLinks).toHaveCount(0);
  });

  test("nav is reachable and usable with the keyboard alone", async ({ sitePage, header }) => {
    const first = NAV[0]!;
    await sitePage.goto("/");
    // Tab order: skip link → name/home → first nav link.
    await pressTab(sitePage.page, 3);
    await expect(header.navLink(first.label)).toBeFocused();
    await sitePage.page.keyboard.press("Enter");
    await expect(sitePage.page).toHaveURL(new RegExp(`${first.href}$`));
  });
});

test.describe("mobile navigation", () => {
  test.skip(({ isMobile }) => !isMobile, "menu button only shows on small screens");

  test("menu opens, navigates and closes", async ({ sitePage, header }) => {
    await sitePage.goto("/");
    await expect(header.openMenuButton).toHaveAttribute("aria-expanded", "false");

    const menu = await header.openMenu();
    await expect(header.closeMenuButton).toHaveAttribute("aria-expanded", "true");
    await expect(menu.root).toBeVisible();

    await menu.link("Projects").click();
    await expect(sitePage.page).toHaveURL(/\/projects\/$/);
    await expect(menu.root).toBeHidden();
    await expect(header.openMenuButton).toBeVisible();
  });

  test("Escape closes the menu", async ({ sitePage, header }) => {
    await sitePage.goto("/");
    await header.openMenu();
    await sitePage.page.keyboard.press("Escape");
    await expect(header.openMenuButton).toHaveAttribute("aria-expanded", "false");
  });
});

test("skip link moves focus to the main content", async ({ sitePage, header, isMobile }) => {
  test.skip(isMobile, "keyboard Tab is a desktop interaction");
  await sitePage.goto("/about/");
  await pressTab(sitePage.page, 1);
  await expect(header.skipLink).toBeFocused();
  await expect(header.skipLink).toBeVisible();
  await sitePage.page.keyboard.press("Enter");
  await expect(sitePage.main).toBeFocused();
});
