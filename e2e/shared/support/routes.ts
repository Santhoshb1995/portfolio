import { site } from "@/content/site";

/** Every route that should exist in the static build, with its expected <h1>. */
export const ROUTES = [
  { path: "/", h1: /reliable, AI-assisted test automation/i },
  { path: "/about/", h1: /quality engineering/i },
  { path: "/experience/", h1: /8\+ years/i },
  { path: "/skills/", h1: /toolkit/i },
  { path: "/projects/", h1: /in public/i },
  { path: "/writing/", h1: /notes/i },
  { path: "/writing/what-ill-write-about/", h1: /what i'll write about/i },
  { path: "/contact/", h1: /let's talk/i },
] as const;

export type Route = (typeof ROUTES)[number];

export const NAV = site.nav;
