export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/** A saved choice wins; otherwise follow the OS setting. */
export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  return stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
}

export function nextTheme(current: Theme): Theme {
  return current === "dark" ? "light" : "dark";
}

/**
 * Runs in <head> before first paint so there's no light/dark flash.
 * Reuses `resolveTheme` so the script and the unit-tested logic can't drift apart.
 */
export const themeInitScript = `(function(){var s=null;try{s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})}catch(e){}var t=(${resolveTheme.toString()})(s,window.matchMedia("(prefers-color-scheme: dark)").matches);var d=document.documentElement;d.dataset.theme=t;d.style.colorScheme=t})()`;
