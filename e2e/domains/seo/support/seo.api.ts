import type { APIRequestContext, APIResponse } from "@playwright/test";

/** The machine-readable files crawlers and social sites fetch. */
export class SeoApi {
  constructor(private readonly request: APIRequestContext) {}

  ogImage(): Promise<APIResponse> {
    return this.request.get("/og.png");
  }

  sitemap(): Promise<APIResponse> {
    return this.request.get("/sitemap.xml");
  }

  robots(): Promise<APIResponse> {
    return this.request.get("/robots.txt");
  }
}
