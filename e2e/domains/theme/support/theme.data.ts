import { THEME_STORAGE_KEY } from "@/lib/theme";
import type { Theme } from "@/lib/theme";

export const THEMES = ["light", "dark"] as const satisfies readonly Theme[];

export { THEME_STORAGE_KEY };

/** Computed `body` background in dark mode (the `bg` token in globals.css). */
export const DARK_BACKGROUND = "rgb(12, 10, 9)";
