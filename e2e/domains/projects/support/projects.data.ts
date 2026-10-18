import type { Project } from "@/content/types";

/** Labels every project card must show. */
export const CARD_FIELDS = ["Problem", "Stack", "Result", "Repo", "Live"] as const;

export const STATUS_LABEL: Record<Project["status"], string> = {
  "in-progress": "In progress",
  complete: "Complete",
};
