import { describe, expect, it } from "vitest";
import { pageMetadata } from "./metadata";

describe("pageMetadata", () => {
  it("builds canonical, Open Graph and Twitter tags for a page", () => {
    const meta = pageMetadata({ title: "About", description: "About me", path: "/about/" });
    expect(meta.title).toBe("About");
    expect(meta.alternates?.canonical).toBe("/about/");
    expect(meta.openGraph).toMatchObject({
      type: "website",
      url: "/about/",
      title: "About — Santhosh Burugupally",
      description: "About me",
    });
    expect(meta.openGraph).not.toHaveProperty("publishedTime");
    expect(meta.openGraph?.images).toEqual([expect.objectContaining({ url: "/og.png" })]);
    expect(meta.twitter).toMatchObject({ card: "summary_large_image", description: "About me" });
  });

  it("marks posts as articles with a publish date", () => {
    const meta = pageMetadata({
      title: "Post",
      description: "d",
      path: "/writing/post/",
      type: "article",
      publishedTime: "2026-10-17",
    });
    expect(meta.openGraph).toMatchObject({ type: "article", publishedTime: "2026-10-17" });
  });
});
