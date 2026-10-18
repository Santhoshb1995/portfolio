import type { Page } from "@playwright/test";

export async function pressTab(page: Page, times: number): Promise<void> {
  for (let i = 0; i < times; i++) await page.keyboard.press("Tab");
}
