import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { WCAG_TAGS } from "./accessibility.data";

/** Runs axe and the extra checks axe doesn't cover on the current page. */
export class AccessibilityAudit {
  /** <img> elements with no alt attribute at all. */
  readonly imagesWithoutAlt: Locator;
  /** Decorative SVGs must be hidden from assistive tech. */
  readonly exposedSvgs: Locator;

  constructor(private readonly page: Page) {
    this.imagesWithoutAlt = page.locator("img:not([alt])");
    this.exposedSvgs = page.locator("svg:not([aria-hidden='true']):not([role='img'])");
  }

  /** Returns one readable line per axe violation (empty when the page passes). */
  async violations(): Promise<string[]> {
    const results = await new AxeBuilder({ page: this.page }).withTags(WCAG_TAGS).analyze();
    return results.violations.map(
      (v) =>
        `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).join("\n  ")}`,
    );
  }
}
