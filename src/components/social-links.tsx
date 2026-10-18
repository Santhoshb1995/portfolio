import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { profile } from "@/content/profile";

const items = [
  { label: "GitHub", href: profile.links.github, Icon: GitHubIcon, external: true },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedInIcon, external: true },
  { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon, external: false },
] as const;

/** Icon-only links with accessible names, used in the footer. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {items.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex size-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-fg"
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
