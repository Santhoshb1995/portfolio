import { test as base } from "@e2e/shared/support/fixtures";
import { HeadTags } from "./head-tags.component";
import { SeoApi } from "./seo.api";

export const test = base.extend<{ headTags: HeadTags; seoApi: SeoApi }>({
  headTags: async ({ page }, use) => {
    await use(new HeadTags(page));
  },
  seoApi: async ({ request }, use) => {
    await use(new SeoApi(request));
  },
});

export { expect } from "@e2e/shared/support/fixtures";
export { ROUTES } from "@e2e/shared/support/routes";
export { OPEN_GRAPH_PROPERTIES, canonicalUrlFor, sitemapEntryFor } from "./seo.data";
