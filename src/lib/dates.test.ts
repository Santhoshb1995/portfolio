import { describe, expect, it } from "vitest";
import type { YearMonth } from "@/content/types";
import {
  formatDuration,
  formatRange,
  formatYearMonth,
  isYearMonth,
  monthsBetween,
  parseYearMonth,
  sortByStartDesc,
  toYearMonth,
} from "./dates";

describe("isYearMonth / parseYearMonth", () => {
  it.each(["2025-12", "2016-01", "1999-09"])("accepts %s", (value) => {
    expect(isYearMonth(value)).toBe(true);
  });

  it.each(["2025-13", "2025-00", "2025-1", "25-01", "2025/01", "", "2025-01-01"])(
    "rejects %s",
    (value) => {
      expect(isYearMonth(value)).toBe(false);
      expect(() => parseYearMonth(value)).toThrow(/Invalid YearMonth/);
    },
  );

  it("parses year and 1-based month", () => {
    expect(parseYearMonth("2023-07")).toEqual({ year: 2023, month: 7 });
  });
});

describe("formatYearMonth / formatRange", () => {
  it("formats a month", () => {
    expect(formatYearMonth("2025-12")).toBe("Dec 2025");
    expect(formatYearMonth("2016-01")).toBe("Jan 2016");
  });

  it("formats closed and open ranges", () => {
    expect(formatRange("2023-07", "2025-09")).toBe("Jul 2023 – Sep 2025");
    expect(formatRange("2025-12", null)).toBe("Dec 2025 – Present");
  });
});

describe("toYearMonth", () => {
  it("uses UTC and zero-pads the month", () => {
    expect(toYearMonth(new Date("2026-03-31T23:30:00Z"))).toBe("2026-03");
    expect(toYearMonth(new Date("2026-11-01T00:00:00Z"))).toBe("2026-11");
  });
});

describe("monthsBetween", () => {
  it("counts inclusively", () => {
    expect(monthsBetween("2023-07", "2025-09")).toBe(27);
    expect(monthsBetween("2020-08", "2023-07")).toBe(36);
    expect(monthsBetween("2025-12", "2025-12")).toBe(1);
  });

  it("uses `now` for current roles", () => {
    expect(monthsBetween("2025-12", null, new Date("2026-10-17T12:00:00Z"))).toBe(11);
  });

  it("throws when the range is reversed", () => {
    expect(() => monthsBetween("2025-09", "2023-07")).toThrow(/ends before it starts/);
  });
});

describe("formatDuration", () => {
  it.each([
    [1, "1 mo"],
    [11, "11 mos"],
    [12, "1 yr"],
    [13, "1 yr 1 mo"],
    [27, "2 yrs 3 mos"],
    [36, "3 yrs"],
  ])("%i months → %s", (months, expected) => {
    expect(formatDuration(months)).toBe(expected);
  });
});

describe("sortByStartDesc", () => {
  const role = (id: string, start: YearMonth, end: YearMonth | null) => ({ id, start, end });

  it("orders newest first without mutating the input", () => {
    const input = [role("a", "2019-08", "2020-07"), role("b", "2025-12", null)];
    const sorted = sortByStartDesc(input);
    expect(sorted.map((r) => r.id)).toEqual(["b", "a"]);
    expect(input.map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("breaks start-date ties by end date, current role first", () => {
    const sorted = sortByStartDesc([
      role("ended-early", "2020-01", "2020-06"),
      role("current", "2020-01", null),
      role("ended-late", "2020-01", "2021-01"),
      role("same", "2020-01", "2021-01"),
    ]);
    expect(sorted.map((r) => r.id)).toEqual(["current", "ended-late", "same", "ended-early"]);
  });
});
