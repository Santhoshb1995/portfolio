import type { BrowserContext } from "@playwright/test";
import type { Theme } from "@/lib/theme";
import { test as base } from "@e2e/shared/support/fixtures";
import { THEME_STORAGE_KEY } from "./theme.data";
import { ThemePage } from "./theme.page";

interface FreshVisitOptions {
  colorScheme: Theme;
  /** A theme already saved from a previous visit. */
  savedTheme?: Theme;
}

interface ThemeFixtures {
  themePage: ThemePage;
  /** Opens a new browser context, e.g. to emulate a first visit with a given OS setting. */
  freshVisit: (options: FreshVisitOptions) => Promise<ThemePage>;
}

export const test = base.extend<ThemeFixtures>({
  themePage: async ({ page }, use) => {
    await use(new ThemePage(page));
  },
  freshVisit: async ({ browser }, use) => {
    const contexts: BrowserContext[] = [];
    await use(async ({ colorScheme, savedTheme }) => {
      const context = await browser.newContext({ colorScheme });
      contexts.push(context);
      if (savedTheme) {
        await context.addInitScript(([key, value]) => localStorage.setItem(key, value), [
          THEME_STORAGE_KEY,
          savedTheme,
        ] as const);
      }
      return new ThemePage(await context.newPage());
    });
    await Promise.all(contexts.map((context) => context.close()));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { DARK_BACKGROUND, THEMES } from "./theme.data";
