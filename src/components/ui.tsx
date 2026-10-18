import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/** Consistent top-of-page heading block: small eyebrow, h1, optional intro. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="animate-rise max-w-2xl pt-16 pb-10 sm:pt-24">
      <p className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h1>
      {children ? <div className="mt-4 text-lg text-pretty text-muted">{children}</div> : null}
    </header>
  );
}

export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-sm font-semibold tracking-wide text-fg uppercase">
      {children}
    </h2>
  );
}

const buttonStyles = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover shadow-sm shadow-accent/20 border border-transparent",
  secondary: "border border-border bg-surface text-fg hover:border-accent hover:text-accent",
} as const;

type ButtonLinkProps = Omit<ComponentProps<"a">, "className"> & {
  variant?: keyof typeof buttonStyles;
  /** Internal routes use next/link for client-side navigation. */
  internal?: boolean;
};

export function ButtonLink({
  variant = "secondary",
  internal = false,
  href = "",
  children,
  ...props
}: ButtonLinkProps) {
  const className = `inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors ${buttonStyles[variant]}`;
  if (internal) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
}

/** Opens in a new tab with safe rel attributes and a screen-reader hint. */
export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </li>
  );
}

export function TagList({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
