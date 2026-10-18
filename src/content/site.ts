/**
 * Site-wide settings. `url` is used for canonical links, the sitemap and Open Graph tags.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once you have a domain.
 */
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://santhosh-burugupally.vercel.app",
  name: "Santhosh Burugupally",
  title: "Santhosh Burugupally — Senior SDET",
  description:
    "Senior SDET building reliable, AI-assisted test automation with Playwright, API testing and CI/CD — heading toward Forward Deployed Engineering.",
  nav: [
    { label: "About", href: "/about/" },
    { label: "Experience", href: "/experience/" },
    { label: "Skills", href: "/skills/" },
    { label: "Projects", href: "/projects/" },
    { label: "Writing", href: "/writing/" },
    { label: "Contact", href: "/contact/" },
  ],
} as const;
