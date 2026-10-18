import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, loadPost } from "@/lib/load-posts";
import { pageMetadata } from "@/lib/metadata";
import { formatPostDate } from "@/lib/posts";

// Static export: only posts known at build time exist; anything else is a 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await loadPost(slug);
  return pageMetadata({
    title: meta.title,
    description: meta.summary,
    path: `/writing/${slug}/`,
    type: "article",
    publishedTime: meta.date,
  });
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const { slug } = await params;
  const { meta, Content } = await loadPost(slug);

  return (
    <article className="container-page">
      <header className="animate-rise max-w-2xl pt-16 pb-4 sm:pt-24">
        <Link href="/writing/" className="text-sm text-muted hover:text-accent">
          ← All writing
        </Link>
        <p className="mt-8 font-mono text-xs text-muted">
          <time dateTime={meta.date}>{formatPostDate(meta.date)}</time>
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {meta.title}
        </h1>
      </header>
      <div className="max-w-2xl text-fg">
        <Content />
      </div>
    </article>
  );
}
