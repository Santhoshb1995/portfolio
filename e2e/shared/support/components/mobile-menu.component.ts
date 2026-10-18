import type { Locator } from "@playwright/test";

/** The open mobile menu panel. */
export class MobileMenu {
  constructor(readonly root: Locator) {}

  link(label: string): Locator {
    return this.root.getByRole("link", { name: label, exact: true });
  }
}
