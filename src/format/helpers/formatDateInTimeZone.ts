const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const CANADIAN_TIME_ZONES: Record<string, string> = {
  "Canada/Atlantic": "America/Halifax",
  "Canada/Central": "America/Winnipeg",
  "Canada/Eastern": "America/Toronto",
  "Canada/Mountain": "America/Edmonton",
  "Canada/Newfoundland": "America/St_Johns",
  "Canada/Pacific": "America/Vancouver",
  "Canada/Saskatchewan": "America/Regina",
  "Canada/Yukon": "America/Whitehorse",
};

const CANADIAN_TIME_ZONE_NAMES: Record<string, Record<number, string>> = {
  "America/Halifax": { [-240]: "AST", [-180]: "ADT" },
  "America/Winnipeg": { [-360]: "CST", [-300]: "CDT" },
  "America/Toronto": { [-300]: "EST", [-240]: "EDT" },
  "America/Edmonton": { [-420]: "MST", [-360]: "MDT" },
  "America/Vancouver": { [-480]: "PST", [-420]: "PDT" },
  "America/Regina": { [-360]: "CST" },
};

const formatters = new Map<string, Intl.DateTimeFormat>();

function normalizeTimeZone(timeZone?: string): string | undefined {
  return timeZone === undefined
    ? undefined
    : CANADIAN_TIME_ZONES[timeZone] ?? timeZone;
}

function getFormatter(timeZone?: string): Intl.DateTimeFormat {
  const normalizedTimeZone = normalizeTimeZone(timeZone);
  const cacheKey = normalizedTimeZone ?? "local";
  const cached = formatters.get(cacheKey);
  if (cached !== undefined) return cached;

  const formatter = new Intl.DateTimeFormat(
    "en-US-u-ca-gregory-nu-latn",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZoneName: "short",
      ...(normalizedTimeZone === undefined
        ? {}
        : { timeZone: normalizedTimeZone }),
    },
  );
  formatters.set(cacheKey, formatter);
  return formatter;
}

function getOffsetMinutes(date: Date, parts: Record<string, string>): number {
  const localAsUtc = new Date(0);
  localAsUtc.setUTCFullYear(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
  );
  localAsUtc.setUTCHours(
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second),
    0,
  );
  return Math.round((localAsUtc.getTime() - date.getTime()) / 60_000);
}

function formatGmtOffset(offsetMinutes: number): string {
  const sign = offsetMinutes < 0 ? "-" : "+";
  const absoluteMinutes = Math.abs(offsetMinutes);
  const hours = Math.floor(absoluteMinutes / 60);
  const minutes = absoluteMinutes % 60;
  return `GMT${sign}${hours}${minutes === 0 ? "" : `:${pad(minutes)}`}`;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function normalizeTimeZoneName(
  date: Date,
  parts: Record<string, string>,
  timeZone?: string,
): string {
  if (timeZone === "UTC") return "UTC";

  const normalizedTimeZone = normalizeTimeZone(timeZone) ??
    getFormatter().resolvedOptions().timeZone;
  const offsetMinutes = getOffsetMinutes(date, parts);
  const canadianName = CANADIAN_TIME_ZONE_NAMES[normalizedTimeZone]?.[
    offsetMinutes
  ];
  if (canadianName !== undefined) return canadianName;

  if (
    normalizedTimeZone === "America/St_Johns" ||
    normalizedTimeZone === "America/Whitehorse"
  ) {
    return formatGmtOffset(offsetMinutes);
  }
  return parts.timeZoneName;
}

function getParts(date: Date, timeZone?: string): Record<string, string> {
  const parts: Record<string, string> = {};
  for (const part of getFormatter(timeZone).formatToParts(date)) {
    if (part.type !== "literal") parts[part.type] = part.value;
  }
  parts.timeZoneName = normalizeTimeZoneName(date, parts, timeZone);
  return parts;
}

/**
 * Formats the subset of Unicode date tokens used by `formatDate` with
 * browser-native `Intl.DateTimeFormat` time-zone support.
 */
export default function formatDateInTimeZone(
  date: Date,
  pattern: string,
  timeZone?: string,
): string {
  const parts = getParts(date, timeZone);
  const month = Number(parts.month);
  const hour = Number(parts.hour);

  const replacements: Record<string, string> = {
    yyyy: parts.year.padStart(4, "0"),
    MMMM: MONTHS[month - 1],
    EEEE: parts.weekday,
    zzz: parts.timeZoneName,
    dd: parts.day.padStart(2, "0"),
    d: String(Number(parts.day)),
    MM: parts.month.padStart(2, "0"),
    M: String(month),
    HH: parts.hour.padStart(2, "0"),
    H: String(hour),
    h: String(hour % 12 || 12),
    mm: parts.minute.padStart(2, "0"),
    ss: parts.second.padStart(2, "0"),
    aa: hour < 12 ? "AM" : "PM",
  };

  return pattern.replace(
    /'([^']*)'|yyyy|MMMM|EEEE|zzz|dd|MM|HH|mm|ss|aa|d|M|H|h/g,
    (token, literal: string | undefined) =>
      literal === undefined ? replacements[token] : literal,
  );
}
