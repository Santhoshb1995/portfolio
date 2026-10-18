import { test as base, expect } from "@playwright/test";
import { site } from "../src/content/site";

/** Every route that should exist in the static build, with its expected <h1>. */
export const ROUTES = [
  { path: "/", h1: /reliable, AI-assisted test automation/i },
  { path: "/about/", h1: /quality engineering/i },
  { path: "/experience/", h1: /8\+ years/i },
  { path: "/skills/", h1: /toolkit/i },
  { path: "/projects/", h1: /in public/i },
  { path: "/writing/", h1: /notes/i },
  { path: "/writing/what-ill-write-about/", h1: /what i'll write about/i },
  { path: "/contact/", h1: /let's talk/i },
] as const;

export const NAV = site.nav;

/**
 * `page` fails the test on any console error or uncaught exception, so
 * hydration errors and broken scripts can't slip through silently.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      page.on("pageerror", (error) => errors.push(error.message));
      await use(errors);
      expect(errors, "console errors").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
