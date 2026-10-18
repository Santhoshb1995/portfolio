import type { Metadata } from "next";
import { ContactLinks } from "@/components/contact-links";
import { PageHeader } from "@/components/ui";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name} by email or LinkedIn.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <div className="container-page">
      <PageHeader eyebrow="Contact" title="Let's talk.">
        <p>{profile.lookingFor}</p>
      </PageHeader>

      <p className="text-sm text-muted">The quickest way to reach me is email:</p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-2 inline-block text-xl font-medium break-all text-accent underline-offset-4 hover:text-accent-hover hover:underline sm:text-3xl"
      >
        {profile.email}
      </a>

      <div className="mt-10">
        <ContactLinks />
      </div>

      <p className="mt-10 text-sm text-muted">Based in {profile.location}.</p>
    </div>
  );
}
