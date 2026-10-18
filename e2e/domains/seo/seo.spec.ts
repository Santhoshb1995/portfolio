import {
  OPEN_GRAPH_PROPERTIES,
  ROUTES,
  canonicalUrlFor,
  expect,
  sitemapEntryFor,
  test,
} from "./support/fixtures";

test.describe("SEO", () => {
  test.skip(({ isMobile }) => isMobile, "SEO output is viewport-independent");

  test("every page has canonical, Open Graph and Twitter tags", async ({ sitePage, headTags }) => {
    for (const route of ROUTES) {
      await sitePage.goto(route.path);
      await expect(headTags.canonical, route.path).toHaveAttribute(
        "href",
        canonicalUrlFor(route.path),
      );
      for (const property of OPEN_GRAPH_PROPERTIES) {
        await expect(headTags.openGraph(property), `${route.path} ${property}`).toHaveAttribute(
          "content",
          /\S/,
        );
      }
      await expect(headTags.twitterCard).toHaveAttribute("content", "summary_large_image");
    }
  });

  test("the Open Graph image is a real PNG", async ({ seoApi }) => {
    const response = await seoApi.ogImage();
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  });

  test("sitemap.xml lists every page", async ({ seoApi }) => {
    const response = await seoApi.sitemap();
    expect(response.status()).toBe(200);
    const xml = await response.text();
    for (const route of ROUTES) expect(xml, route.path).toMatch(sitemapEntryFor(route.path));
  });

  test("robots.txt allows crawling and points at the sitemap", async ({ seoApi }) => {
    const text = await (await seoApi.robots()).text();
    expect(text).toMatch(/User-Agent: \*/i);
    expect(text).toMatch(/Allow: \//);
    expect(text).toMatch(/Sitemap: https:\/\/.+\/sitemap\.xml/);
  });

  test("home page has Person structured data", async ({ sitePage, headTags }) => {
    await sitePage.goto("/");
    const data = await headTags.jsonLd();
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Santhosh Burugupally");
  });
});
