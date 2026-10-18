"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { site } from "@/content/site";

/** Matches `/writing/` and its children like `/writing/some-post/`. */
function isActive(pathname: string, href: string) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return path === href || path.startsWith(href);
}

export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const menuId = useId();

  // Close the mobile menu after navigating.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const links = (variant: "desktop" | "mobile") =>
    site.nav.map((item) => {
      const active = isActive(pathname, item.href);
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              variant === "desktop"
                ? `rounded-md px-3 py-2 text-sm transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`
                : `block rounded-md px-3 py-3 text-base ${active ? "bg-accent-soft text-fg" : "text-muted hover:text-fg"}`
            }
          >
            {item.label}
          </Link>
        </li>
      );
    });

  return (
    <nav aria-label="Main">
      <ul className="hidden items-center gap-1 md:flex">{links("desktop")}</ul>

      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-full text-muted hover:bg-accent-soft hover:text-fg md:hidden"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-border bg-bg md:hidden"
      >
        <ul className="container-page flex flex-col gap-1 py-3">{links("mobile")}</ul>
      </div>
    </nav>
  );
}
