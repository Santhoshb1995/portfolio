import { profile } from "../src/content/profile";
import { expect, test } from "./fixtures";

test.describe("resume download", () => {
  test("the link points at the PDF and offers a download", async ({ page }) => {
    await page.goto("/");
    const link = page.getByTestId("resume-link");
    await expect(link).toHaveAttribute("href", profile.links.resume);
    await expect(link).toHaveAttribute("download");
  });

  test("the PDF is served with the right type and real PDF bytes", async ({ request }) => {
    const response = await request.get(profile.links.resume);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const body = await response.body();
    expect(body.subarray(0, 5).toString()).toBe("%PDF-");
    expect(body.length).toBeGreaterThan(10_000);
  });

  test("clicking it downloads the file", async ({ page }) => {
    await page.goto("/contact/");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByTestId("resume-link").click(),
    ]);
    expect(download.suggestedFilename()).toBe(profile.links.resume.slice(1));
    expect(await download.failure()).toBeNull();
  });
});
