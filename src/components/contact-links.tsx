import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui";
import { profile } from "@/content/profile";

/** Primary calls to action: resume, GitHub, LinkedIn, email. Used on Home and Contact. */
export function ContactLinks() {
  return (
    <ul className="flex flex-wrap gap-3">
      <li>
        <ButtonLink
          variant="primary"
          href={profile.links.resume}
          download
          data-testid="resume-link"
        >
          <DownloadIcon className="size-4" />
          Download resume
        </ButtonLink>
      </li>
      <li>
        <ButtonLink href={profile.links.github} target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="size-4" />
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </ButtonLink>
      </li>
      <li>
        <ButtonLink href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="size-4" />
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </ButtonLink>
      </li>
      <li>
        <ButtonLink href={`mailto:${profile.email}`}>
          <MailIcon className="size-4" />
          Email
        </ButtonLink>
      </li>
    </ul>
  );
}
