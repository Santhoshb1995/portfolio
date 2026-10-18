import { describe, expect, it } from "vitest";
import { collectTodos, isTodo, isUsableLink } from "./todo";

describe("isTodo", () => {
  it("detects the TODO: prefix only", () => {
    expect(isTodo("TODO: repo URL")).toBe(true);
    expect(isTodo("Not a TODO: item")).toBe(false);
    expect(isTodo("todo: lowercase")).toBe(false);
    expect(isTodo(42)).toBe(false);
    expect(isTodo(null)).toBe(false);
  });
});

describe("isUsableLink", () => {
  it("rejects placeholders and blanks", () => {
    expect(isUsableLink("https://github.com/x")).toBe(true);
    expect(isUsableLink("TODO: link")).toBe(false);
    expect(isUsableLink("   ")).toBe(false);
  });
});

describe("collectTodos", () => {
  it("returns an empty list when nothing is pending", () => {
    expect(collectTodos({ a: "done", b: [1, true, null] })).toEqual([]);
  });

  it("finds nested placeholders with readable paths", () => {
    const content = {
      title: "x",
      projects: [
        { repo: "TODO: first repo", live: "https://example.com" },
        { repo: "https://github.com", live: "TODO:   second live  " },
      ],
    };
    expect(collectTodos(content)).toEqual([
      { path: "projects[0].repo", message: "first repo" },
      { path: "projects[1].live", message: "second live" },
    ]);
  });

  it("supports a root prefix and top-level strings", () => {
    expect(collectTodos(["TODO: a"], "items")).toEqual([{ path: "items[0]", message: "a" }]);
    expect(collectTodos("TODO: root")).toEqual([{ path: "", message: "root" }]);
  });
});
