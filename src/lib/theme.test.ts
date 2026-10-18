import { describe, expect, it } from "vitest";
import { nextTheme, resolveTheme, themeInitScript } from "./theme";

describe("resolveTheme", () => {
  it.each([
    ["dark", false, "dark"],
    ["light", true, "light"],
    [null, true, "dark"],
    [null, false, "light"],
    ["purple", true, "dark"],
    ["", false, "light"],
  ] as const)("stored=%s prefersDark=%s → %s", (stored, prefersDark, expected) => {
    expect(resolveTheme(stored, prefersDark)).toBe(expected);
  });
});

describe("nextTheme", () => {
  it("flips between light and dark", () => {
    expect(nextTheme("light")).toBe("dark");
    expect(nextTheme("dark")).toBe("light");
  });
});

describe("themeInitScript", () => {
  const run = (stored: string | null, prefersDark: boolean, storageThrows = false) => {
    const root = { dataset: {} as Record<string, string>, style: {} as Record<string, string> };
    const sandbox = {
      localStorage: {
        getItem: () => {
          if (storageThrows) throw new Error("blocked");
          return stored;
        },
      },
      window: { matchMedia: () => ({ matches: prefersDark }) },
      document: { documentElement: root },
    };
    new Function(...Object.keys(sandbox), themeInitScript)(...Object.values(sandbox));
    return root;
  };

  it("applies the saved theme and colour scheme", () => {
    expect(run("dark", false)).toEqual({
      dataset: { theme: "dark" },
      style: { colorScheme: "dark" },
    });
  });

  it("falls back to the OS preference when storage is blocked", () => {
    expect(run("light", true, true).dataset.theme).toBe("dark");
  });
});
