import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getPosts } from "@/lib/load-posts";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["/", ...site.nav.map((item) => item.href)].map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const posts = (await getPosts()).map((post) => ({
    url: new URL(`/writing/${post.slug}/`, site.url).toString(),
    lastModified: post.date,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...pages, ...posts];
}
