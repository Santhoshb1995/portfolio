import type { Todo } from "@/content/types";

export const TODO_PREFIX = "TODO:";

export function isTodo(value: unknown): value is Todo {
  return typeof value === "string" && value.startsWith(TODO_PREFIX);
}

/** A link is usable only when it's real content, not a placeholder. */
export function isUsableLink(value: string | Todo): value is string {
  return !isTodo(value) && value.trim().length > 0;
}

export interface TodoEntry {
  /** Where it lives, e.g. `projects[0].repo`. */
  path: string;
  /** The placeholder text without the `TODO:` prefix. */
  message: string;
}

/** Walks any content value and lists every `TODO:` placeholder with its path. */
export function collectTodos(value: unknown, path = ""): TodoEntry[] {
  if (isTodo(value)) {
    return [{ path, message: value.slice(TODO_PREFIX.length).trim() }];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectTodos(item, `${path}[${index}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      collectTodos(item, path ? `${path}.${key}` : key),
    );
  }
  return [];
}
