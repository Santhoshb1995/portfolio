import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";

const theme = (page: Page) => page.locator("html").getAttribute("data-theme");

test.describe("theme toggle", () => {
  test("follows the OS preference on first visit", async ({ browser }) => {
    for (const colorScheme of ["light", "dark"] as const) {
      const context = await browser.newContext({ colorScheme });
      const page = await context.newPage();
      await page.goto("/");
      expect(await theme(page)).toBe(colorScheme);
      await context.close();
    }
  });

  test("toggles, persists across reloads and navigation", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const toggle = page.getByTestId("theme-toggle");

    await expect(toggle).toHaveAccessibleName("Switch to dark theme");
    await toggle.click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(toggle).toHaveAccessibleName("Switch to light theme");
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");

    // Background colour actually changes, not just the attribute.
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).toBe("rgb(12, 10, 9)");

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.goto("/skills/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByTestId("theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("a saved choice beats the OS preference, with no flash on load", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "light" });
    await context.addInitScript(() => localStorage.setItem("theme", "dark"));
    const page = await context.newPage();

    // Read the attribute before any app JavaScript can run.
    await page.route("**/_next/static/**/*.js", (route) => route.abort());
    await page.goto("/", { waitUntil: "commit" });
    await page.waitForFunction(() => document.body !== null);
    expect(await theme(page)).toBe("dark");
    await context.close();
  });

  test("is operable with the keyboard", async ({ page, isMobile }) => {
    test.skip(isMobile, "keyboard Tab is a desktop interaction");
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await page.getByTestId("theme-toggle").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.keyboard.press("Space");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
