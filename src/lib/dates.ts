import type { YearMonth } from "@/content/types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

const YEAR_MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function isYearMonth(value: string): value is YearMonth {
  return YEAR_MONTH.test(value);
}

/** Parses `YYYY-MM` into a year and 1-based month. Throws on bad input so content errors fail loudly. */
export function parseYearMonth(value: string): { year: number; month: number } {
  const match = YEAR_MONTH.exec(value);
  if (!match) throw new Error(`Invalid YearMonth "${value}", expected YYYY-MM`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

/** `"2025-12"` → `"Dec 2025"`. */
export function formatYearMonth(value: YearMonth): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** `"Dec 2025 – Present"` or `"Jul 2023 – Sep 2025"`. */
export function formatRange(start: YearMonth, end: YearMonth | null): string {
  return `${formatYearMonth(start)} – ${end ? formatYearMonth(end) : "Present"}`;
}

/** `Date` → `YearMonth` in UTC, so builds are deterministic across time zones. */
export function toYearMonth(date: Date): YearMonth {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}` as YearMonth;
}

/**
 * Inclusive month count, matching how resumes read: Jul 2023 – Sep 2025 is 27 months.
 * `now` is injectable for tests.
 */
export function monthsBetween(start: YearMonth, end: YearMonth | null, now = new Date()): number {
  const from = parseYearMonth(start);
  const to = parseYearMonth(end ?? toYearMonth(now));
  const months = (to.year - from.year) * 12 + (to.month - from.month) + 1;
  if (months < 1) throw new Error(`Range ${start} – ${end ?? "now"} ends before it starts`);
  return months;
}

/** `27` → `"2 yrs 3 mos"`, `1` → `"1 mo"`. */
export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

/** Newest first; current roles (no end date) sort ahead of finished ones that started the same month. */
export function sortByStartDesc<T extends { start: YearMonth; end: YearMonth | null }>(
  items: readonly T[],
): T[] {
  return [...items].sort((a, b) => {
    if (a.start !== b.start) return a.start < b.start ? 1 : -1;
    if (a.end === b.end) return 0;
    if (a.end === null) return -1;
    if (b.end === null) return 1;
    return a.end < b.end ? 1 : -1;
  });
}
