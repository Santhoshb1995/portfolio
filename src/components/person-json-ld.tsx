import { profile } from "@/content/profile";
import { site } from "@/content/site";

/** schema.org Person data so search engines can link the site to my profiles. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: site.url,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Vancouver", addressRegion: "BC" },
    sameAs: [profile.links.github, profile.links.linkedin],
    alumniOf: profile.education.map((item) => ({
      "@type": "CollegeOrUniversity",
      name: item.school,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escape `<` so content can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
