import { assertEquals } from "jsr:@std/assert";
import formatDate from "../../src/format/formatDate.ts";

const date = new Date("2023-01-01T12:00:00Z");

const expectedLocalTimes = {
  "America/Toronto": "7 a.m. ET",
  "America/Vancouver": "4 a.m. PT",
  UTC: "12 p.m. UTC",
} as const;

const expectedSystemTimeZone = Deno.env.get("EXPECTED_SYSTEM_TIME_ZONE") as
  | keyof typeof expectedLocalTimes
  | undefined;

Deno.test({
  name:
    "formatDate should use the system time zone when no override is provided",
  ignore: expectedSystemTimeZone === undefined,
  fn() {
    assertEquals(
      formatDate(date, "HH:MM period TZ"),
      expectedLocalTimes[expectedSystemTimeZone!],
    );
  },
});

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

const timeZoneCases = [
  {
    timeZone: "Canada/Atlantic",
    winter: ["8:15 a.m. AT", "8 h 15 HNA"],
    summer: ["9:15 a.m. AT", "9 h 15 HAA"],
  },
  {
    timeZone: "Canada/Central",
    winter: ["6:15 a.m. CT", "6 h 15 HNC"],
    summer: ["7:15 a.m. CT", "7 h 15 HAC"],
  },
  {
    timeZone: "Canada/Eastern",
    winter: ["7:15 a.m. ET", "7 h 15 HNE"],
    summer: ["8:15 a.m. ET", "8 h 15 HAE"],
  },
  {
    timeZone: "Canada/Mountain",
    winter: ["5:15 a.m. MT", "5 h 15 HNR"],
    summer: ["6:15 a.m. MT", "6 h 15 HAR"],
  },
  {
    timeZone: "Canada/Newfoundland",
    winter: ["8:45 a.m. GMT-3:30", "8 h 45 GMT-3:30"],
    summer: ["9:45 a.m. GMT-2:30", "9 h 45 GMT-2:30"],
  },
  {
    timeZone: "Canada/Pacific",
    winter: ["4:15 a.m. PT", "4 h 15 HNP"],
    summer: ["5:15 a.m. PT", "5 h 15 HAP"],
  },
  {
    timeZone: "Canada/Saskatchewan",
    winter: ["6:15 a.m. CT", "6 h 15 HNC"],
    summer: ["6:15 a.m. CT", "6 h 15 HNC"],
  },
  {
    timeZone: "Canada/Yukon",
    winter: ["5:15 a.m. GMT-7", "5 h 15 GMT-7"],
    summer: ["5:15 a.m. GMT-7", "5 h 15 GMT-7"],
  },
] as const;

Deno.test("formatDate should preserve CBC and RC output across Canadian zones and DST", () => {
  const winter = new Date("2023-01-01T12:15:00Z");
  const summer = new Date("2023-07-01T12:15:00Z");

  for (const testCase of timeZoneCases) {
    for (
      const [date, expected] of [
        [winter, testCase.winter],
        [summer, testCase.summer],
      ] as const
    ) {
      assertEquals(
        formatDate(date, "HH:MM period TZ", {
          timeZone: testCase.timeZone,
        }),
        expected[0],
      );
      assertEquals(
        formatDate(date, "HH:MM period TZ", {
          timeZone: testCase.timeZone,
          style: "rc",
        }),
        expected[1],
      );
    }
  }
});
