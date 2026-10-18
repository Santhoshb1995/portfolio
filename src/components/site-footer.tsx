import { SocialLinks } from "@/components/social-links";
import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="container-page flex flex-col-reverse items-center justify-between gap-4 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, tested with Playwright.
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
