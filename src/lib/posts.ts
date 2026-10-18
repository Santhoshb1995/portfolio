import type { PostMeta } from "@/content/types";

export interface Post extends PostMeta {
  slug: string;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Throws with a helpful message if a post's metadata is malformed. */
export function validatePost(post: Post): Post {
  if (!SLUG.test(post.slug)) throw new Error(`Post slug "${post.slug}" must be kebab-case`);
  if (!post.title.trim()) throw new Error(`Post "${post.slug}" is missing a title`);
  if (!post.summary.trim()) throw new Error(`Post "${post.slug}" is missing a summary`);
  if (!ISO_DATE.test(post.date) || Number.isNaN(Date.parse(post.date))) {
    throw new Error(`Post "${post.slug}" has invalid date "${post.date}", expected YYYY-MM-DD`);
  }
  return post;
}

/** Published posts, newest first. Drafts are kept only when `includeDrafts` is set (e.g. in dev). */
export function publishedPosts(posts: readonly Post[], includeDrafts = false): Post[] {
  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

/** `"2026-10-17"` → `"October 17, 2026"`, in UTC so the build is deterministic. */
export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
