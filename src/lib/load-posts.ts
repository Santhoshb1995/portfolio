import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import type { PostMeta } from "@/content/types";
import { publishedPosts, validatePost, type Post } from "@/lib/posts";

/**
 * Build-time loader for MDX posts in src/content/posts. Each file exports
 * `metadata` (see PostMeta) and its body as the default export.
 */
const POSTS_DIR = path.join(process.cwd(), "src", "content", "posts");

const showDrafts = process.env.NODE_ENV === "development";

function postSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function loadPost(slug: string): Promise<{ meta: Post; Content: MDXContent }> {
  const mod = (await import(`@/content/posts/${slug}.mdx`)) as {
    default: MDXContent;
    metadata: PostMeta;
  };
  return { meta: validatePost({ slug, ...mod.metadata }), Content: mod.default };
}

export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(postSlugs().map(async (slug) => (await loadPost(slug)).meta));
  return publishedPosts(posts, showDrafts);
}
