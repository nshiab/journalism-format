import { assertEquals } from "jsr:@std/assert";
import formatDate from "../../src/format/formatDate.ts";

const date = new Date("2023-01-01T12:00:00Z");

Deno.test("formatDate should respect timeZone option for 'HH:MM period TZ' regardless of system TZ", () => {
  // Canada/Eastern is UTC-5 in Jan
  const formattedET = formatDate(date, "HH:MM period TZ", {
    timeZone: "Canada/Eastern",
  });
  assertEquals(formattedET, "7 a.m. ET");

  // Canada/Pacific is UTC-8 in Jan
  const formattedPT = formatDate(date, "HH:MM period TZ", {
    timeZone: "Canada/Pacific",
  });
  assertEquals(formattedPT, "4 a.m. PT");
});

Deno.test("formatDate should respect timeZone option for 'Month DD, HH:MM period TZ' regardless of system TZ", () => {
  const formattedET = formatDate(date, "Month DD, HH:MM period TZ", {
    timeZone: "Canada/Eastern",
  });
  assertEquals(formattedET, "January 1, 7 a.m. ET");
});

Deno.test("formatDate should respect timeZone option for 'DayOfWeek, HH:MM period TZ' regardless of system TZ", () => {
  const formattedET = formatDate(date, "DayOfWeek, HH:MM period TZ", {
    timeZone: "Canada/Eastern",
  });
  assertEquals(formattedET, "Sunday, 7 a.m. ET");
});

Deno.test("formatDate should respect utc option regardless of system TZ", () => {
  const formattedUTC = formatDate(date, "HH:MM period TZ", {
    utc: true,
  });
  assertEquals(formattedUTC, "12 p.m. UTC");
});

Deno.test("formatDate should respect timeZone option for French style regardless of system TZ", () => {
  const formattedHNE = formatDate(date, "HH:MM period TZ", {
    timeZone: "Canada/Eastern",
    style: "rc",
  });
  assertEquals(formattedHNE, "7 h HNE");
});

Deno.test("formatDate should ignore timeZone option if utc is true", () => {
  const formatted = formatDate(date, "HH:MM period TZ", {
    utc: true,
    timeZone: "Canada/Eastern",
  });
  assertEquals(formatted, "12 p.m. UTC");
});
