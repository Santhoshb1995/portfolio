import { DARK_BACKGROUND, THEMES, expect, test } from "./support/fixtures";

test.describe("theme toggle", () => {
  test("follows the OS preference on first visit", async ({ freshVisit }) => {
    for (const colorScheme of THEMES) {
      const themePage = await freshVisit({ colorScheme });
      await themePage.goto();
      expect(await themePage.currentTheme()).toBe(colorScheme);
    }
  });

  test("toggles, persists across reloads and navigation", async ({ themePage }) => {
    await themePage.page.emulateMedia({ colorScheme: "light" });
    await themePage.goto();

    await expect(themePage.toggle.button).toHaveAccessibleName("Switch to dark theme");
    await themePage.toggle.click();
    await expect(themePage.html).toHaveAttribute("data-theme", "dark");
    await expect(themePage.toggle.button).toHaveAccessibleName("Switch to light theme");
    expect(await themePage.storedTheme()).toBe("dark");

    // Background colour actually changes, not just the attribute.
    expect(await themePage.bodyBackground()).toBe(DARK_BACKGROUND);

    await themePage.page.reload();
    await expect(themePage.html).toHaveAttribute("data-theme", "dark");

    await themePage.goto("/skills/");
    await expect(themePage.html).toHaveAttribute("data-theme", "dark");

    await themePage.toggle.click();
    await expect(themePage.html).toHaveAttribute("data-theme", "light");
  });

  test("a saved choice beats the OS preference, with no flash on load", async ({ freshVisit }) => {
    const themePage = await freshVisit({ colorScheme: "light", savedTheme: "dark" });
    await themePage.blockAppScripts();
    await themePage.gotoBeforeHydration();
    expect(await themePage.currentTheme()).toBe("dark");
  });

  test("is operable with the keyboard", async ({ themePage, isMobile }) => {
    test.skip(isMobile, "keyboard Tab is a desktop interaction");
    await themePage.page.emulateMedia({ colorScheme: "light" });
    await themePage.goto();
    await themePage.toggle.focus();
    await themePage.page.keyboard.press("Enter");
    await expect(themePage.html).toHaveAttribute("data-theme", "dark");
    await themePage.page.keyboard.press("Space");
    await expect(themePage.html).toHaveAttribute("data-theme", "light");
  });
});
