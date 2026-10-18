import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

/** Styles for elements in Writing posts. Required by @next/mdx in the App Router. */
function MdxLink({ href = "", children, ...props }: ComponentProps<"a">) {
  const className = "font-medium text-accent underline underline-offset-4 hover:text-accent-hover";
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-12 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 text-lg font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-5 leading-relaxed text-pretty" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-accent" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-5 marker:text-muted" {...props} />,
  a: MdxLink,
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 border-accent pl-4 text-muted italic" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface p-4 font-mono text-sm [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
