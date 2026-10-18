import type { APIRequestContext } from "@playwright/test";
import { profile } from "@/content/profile";

export interface ResumeFile {
  status: number;
  contentType: string;
  body: Buffer;
}

/** Fetches the resume PDF directly, without a browser page. */
export class ResumeApi {
  readonly path = profile.links.resume;
  /** Filename the browser should save the file as. */
  readonly filename = profile.links.resume.slice(1);

  constructor(private readonly request: APIRequestContext) {}

  async fetch(): Promise<ResumeFile> {
    const response = await this.request.get(this.path);
    return {
      status: response.status(),
      contentType: response.headers()["content-type"] ?? "",
      body: await response.body(),
    };
  }
}
