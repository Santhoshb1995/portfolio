import type { Page } from "@playwright/test";
import { SitePage } from "@e2e/shared/support/pages/site.page";
import { THEME_STORAGE_KEY } from "./theme.data";

/** Any page, viewed through what the theme domain cares about. */
export class ThemePage extends SitePage {
  constructor(page: Page) {
    super(page, "/");
  }

  get toggle() {
    return this.header.themeToggle;
  }

  currentTheme(): Promise<string | null> {
    return this.html.getAttribute("data-theme");
  }

  storedTheme(): Promise<string | null> {
    return this.page.evaluate((key) => localStorage.getItem(key), THEME_STORAGE_KEY);
  }

  bodyBackground(): Promise<string> {
    return this.page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  }

  /** Aborts the app's JS bundles, so only the inline head script can set the theme. */
  async blockAppScripts(): Promise<void> {
    await this.page.route("**/_next/static/**/*.js", (route) => route.abort());
  }

  /** Navigates and returns as soon as <body> exists, before any app JS runs. */
  async gotoBeforeHydration(path: string = this.path): Promise<void> {
    await this.page.goto(path, { waitUntil: "commit" });
    await this.page.waitForFunction(() => document.body !== null);
  }
}
