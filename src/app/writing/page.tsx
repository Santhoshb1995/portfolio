import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui";
import { getPosts } from "@/lib/load-posts";
import { formatPostDate } from "@/lib/posts";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Writing",
  description: "Short posts on test automation, AI in quality engineering and integrating systems.",
  path: "/writing/",
});

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <div className="container-page">
      <PageHeader eyebrow="Writing" title="Notes from the test pipeline.">
        <p>Short, practical posts on automation, AI in testing and shipping reliable systems.</p>
      </PageHeader>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet — check back soon.</p>
      ) : (
        <ol className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug} data-testid="post">
              <article className="group relative py-6">
                <p className="font-mono text-xs text-muted">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  {post.draft ? <span className="ml-2 text-accent">Draft</span> : null}
                </p>
                <h2 className="mt-2 text-lg font-semibold tracking-tight group-hover:text-accent">
                  <Link
                    href={`/writing/${post.slug}/`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-1 text-muted">{post.summary}</p>
              </article>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
