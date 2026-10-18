import { ROUTES, expect, test } from "./fixtures";

test.describe("SEO", () => {
  test.skip(({ isMobile }) => isMobile, "SEO output is viewport-independent");

  test("every page has canonical, Open Graph and Twitter tags", async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route.path);
      const head = page.locator("head");
      await expect(head.locator('link[rel="canonical"]'), route.path).toHaveAttribute(
        "href",
        new RegExp(`^https://[^/]+${route.path.replace(/\//g, "\\/")}$`),
      );
      for (const property of ["og:title", "og:description", "og:url", "og:image", "og:type"]) {
        await expect(
          head.locator(`meta[property="${property}"]`),
          `${route.path} ${property}`,
        ).toHaveAttribute("content", /\S/);
      }
      await expect(head.locator('meta[name="twitter:card"]')).toHaveAttribute(
        "content",
        "summary_large_image",
      );
    }
  });

  test("the Open Graph image is a real PNG", async ({ request }) => {
    const response = await request.get("/og.png");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("sitemap.xml lists every page", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const route of ROUTES) {
      expect(xml, route.path).toMatch(new RegExp(`<loc>https://[^<]+${route.path}</loc>`));
    }
  });

  test("robots.txt allows crawling and points at the sitemap", async ({ request }) => {
    const text = await (await request.get("/robots.txt")).text();
    expect(text).toMatch(/User-Agent: \*/i);
    expect(text).toMatch(/Allow: \//);
    expect(text).toMatch(/Sitemap: https:\/\/.+\/sitemap\.xml/);
  });

  test("home page has Person structured data", async ({ page }) => {
    await page.goto("/");
    const json = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(json ?? "{}") as Record<string, unknown>;
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Santhosh Burugupally");
  });
});
