import type { Locator, Page } from "@playwright/test";
import { MobileMenu } from "./mobile-menu.component";
import { ThemeToggle } from "./theme-toggle.component";

/** Site header: name link, main nav (desktop list + mobile menu) and theme toggle. */
export class SiteHeader {
  readonly root: Locator;
  readonly homeLink: Locator;
  readonly nav: Locator;
  readonly openMenuButton: Locator;
  readonly closeMenuButton: Locator;
  readonly skipLink: Locator;
  readonly themeToggle: ThemeToggle;

  constructor(private readonly page: Page) {
    this.root = page.getByRole("banner");
    this.homeLink = this.root.getByRole("link", { name: "Santhosh Burugupally" });
    this.nav = page.getByRole("navigation", { name: "Main" });
    this.openMenuButton = page.getByRole("button", { name: "Open menu" });
    this.closeMenuButton = page.getByRole("button", { name: "Close menu" });
    this.skipLink = page.getByRole("link", { name: "Skip to content" });
    this.themeToggle = new ThemeToggle(page);
  }

  navLink(label: string): Locator {
    return this.nav.getByRole("link", { name: label, exact: true });
  }

  /** Visible links marked current. The hidden mobile list is excluded. */
  get currentNavLinks(): Locator {
    return this.nav.locator('[aria-current="page"]:visible');
  }

  /** Opens the mobile menu and returns the panel its button controls. */
  async openMenu(): Promise<MobileMenu> {
    await this.openMenuButton.click();
    const id = await this.closeMenuButton.getAttribute("aria-controls");
    return new MobileMenu(this.page.locator(`[id="${id}"]`));
  }
}
