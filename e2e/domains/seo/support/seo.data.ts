export const OPEN_GRAPH_PROPERTIES = [
  "og:title",
  "og:description",
  "og:url",
  "og:image",
  "og:type",
];

/** Canonical URL for a path: an absolute https URL ending in exactly that path. */
export function canonicalUrlFor(path: string): RegExp {
  return new RegExp(`^https://[^/]+${path.replace(/\//g, "\\/")}$`);
}

export function sitemapEntryFor(path: string): RegExp {
  return new RegExp(`<loc>https://[^<]+${path}</loc>`);
}
