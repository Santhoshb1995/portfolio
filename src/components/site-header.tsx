import Link from "next/link";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/85 backdrop-blur-md">
      <div className="container-page relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight text-fg">
          {profile.name}
        </Link>
        <div className="flex items-center gap-1">
          <MainNav />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
