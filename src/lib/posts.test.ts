import { describe, expect, it } from "vitest";
import { formatPostDate, publishedPosts, validatePost, type Post } from "./posts";

const post = (overrides: Partial<Post> = {}): Post => ({
  slug: "hello-world",
  title: "Hello",
  date: "2026-10-17",
  summary: "A post.",
  ...overrides,
});

describe("validatePost", () => {
  it("returns a valid post unchanged", () => {
    const valid = post();
    expect(validatePost(valid)).toBe(valid);
  });

  it.each([
    [{ slug: "Hello World" }, /kebab-case/],
    [{ slug: "trailing-" }, /kebab-case/],
    [{ title: "  " }, /missing a title/],
    [{ summary: "" }, /missing a summary/],
    [{ date: "17/10/2026" }, /invalid date/],
    [{ date: "2026-13-45" }, /invalid date/],
  ])("rejects %o", (overrides, message) => {
    expect(() => validatePost(post(overrides))).toThrow(message);
  });
});

describe("publishedPosts", () => {
  const posts = [
    post({ slug: "old", date: "2025-01-01" }),
    post({ slug: "draft", date: "2026-12-01", draft: true }),
    post({ slug: "new", date: "2026-06-01" }),
    post({ slug: "b-same-day", date: "2026-06-01" }),
  ];

  it("hides drafts and sorts newest first, then by slug", () => {
    expect(publishedPosts(posts).map((p) => p.slug)).toEqual(["b-same-day", "new", "old"]);
  });

  it("includes drafts when asked", () => {
    expect(publishedPosts(posts, true).map((p) => p.slug)).toEqual([
      "draft",
      "b-same-day",
      "new",
      "old",
    ]);
  });
});

describe("formatPostDate", () => {
  it("formats in UTC regardless of local time zone", () => {
    expect(formatPostDate("2026-01-01")).toBe("January 1, 2026");
  });
});
