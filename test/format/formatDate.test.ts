import { expect, test } from "vite-plus/test";
import formatDate from "../../src/format/formatDate.ts";

const unix = 1672531200000;
const date = new Date("2023-01-01T01:35:00.000Z");
const dateInFebruary = new Date("2023-02-01T01:35:00.000Z");
const datePM = new Date("2023-01-01T15:35:00.000Z");
const dateNoMinutes = new Date("2023-01-01T01:00:00.000Z");
const dateWithSeconds = new Date("2023-01-01T01:35:05.000Z");

test("should accept a Date constructed from a unix timestamp and a return a date formatted as a string with local time", () => {
  const formattedDate = formatDate(new Date(unix), "YYYY-MM-DD");
  expect(formattedDate).toStrictEqual("2022-12-31");
});
test("should accept a Date constructed from a unix timestamp and a return a date formatted as a string with utc time", () => {
  const formattedDate = formatDate(new Date(unix), "YYYY-MM-DD", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2023-01-01");
});
test("should accept a Date a return it formatted as a string with local time", () => {
  const formattedDate = formatDate(date, "YYYY-MM-DD");
  expect(formattedDate).toStrictEqual("2022-12-31");
});
test("should accept a Date a return it formatted as a string with UTC time", () => {
  const formattedDate = formatDate(date, "YYYY-MM-DD", { utc: true });
  expect(formattedDate).toStrictEqual("2023-01-01");
});
test("should return a Date in the format YYYY-MM-DD HH:MM:SS TZ", () => {
  const formattedDate = formatDate(dateWithSeconds, "YYYY-MM-DD HH:MM:SS TZ", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2023-01-01 01:35:05 UTC");
});
test("should return a Date in the format YYYY-MM-DD HH:MM:SS TZ with a specific time zone", () => {
  const formattedDate = formatDate(dateWithSeconds, "YYYY-MM-DD HH:MM:SS TZ", {
    timeZone: "Canada/Eastern",
  });
  expect(formattedDate).toStrictEqual("2022-12-31 20:35:05 ET");
});
test("should return a Date in the format Month DD, YYYY", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY", { utc: true });
  expect(formattedDate).toStrictEqual("January 1, 2023");
});
test("should return a Date in the format Month DD, YYYY with an abbreviated month", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY", {
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Jan. 1, 2023");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM period with an abbreviated month", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period", {
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Jan. 1, 2023, at 1:35 a.m.");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM period (morning)", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period", { utc: true });
  expect(formattedDate).toStrictEqual("January 1, 2023, at 1:35 a.m.");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM period (afternoon)", () => {
  const formattedDate = formatDate(datePM, "Month DD, YYYY, at HH:MM period", { utc: true });
  expect(formattedDate).toStrictEqual("January 1, 2023, at 3:35 p.m.");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM without ':00' for the minutes", () => {
  const formattedDate = formatDate(dateNoMinutes, "Month DD, YYYY, at HH:MM period", { utc: true });
  expect(formattedDate).toStrictEqual("January 1, 2023, at 1 a.m.");
});
test("should return the full day name", () => {
  const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Sunday");
});
test("should return the abbreviated day name", () => {
  const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
    utc: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Sun.");
});
test("should return the full month name", () => {
  const formattedDate = formatDate(date, "Month", { utc: true });
  expect(formattedDate).toStrictEqual("January");
});
test("should return the abbreviated month name", () => {
  const formattedDate = formatDate(date, "Month", {
    utc: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Jan.");
});
test("should return the day name, followed by the month and the day", () => {
  const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Sunday, January 1");
});
test("should return the day name, followed by the month and the day, abbreviated", () => {
  const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
    utc: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Sun., Jan. 1");
});
test("should return the month and the day", () => {
  const formattedDate = formatDate(date, "Month DD", { utc: true });
  expect(formattedDate).toStrictEqual("January 1");
});
test("should return the month and the day", () => {
  const formattedDate = formatDate(date, "Month DD", {
    utc: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Jan. 1");
});
test("should return the month", () => {
  const formattedDate = formatDate(date, "Month", { utc: true });
  expect(formattedDate).toStrictEqual("January");
});
test("should return the month abbreviated", () => {
  const formattedDate = formatDate(date, "Month", {
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Jan.");
});
test("should return the zero-padded day", () => {
  const formattedDate = formatDate(date, "DD", { utc: true });
  expect(formattedDate).toStrictEqual("01");
});
test("should return the zero-padded day and abbreviations shouldn't change a thing", () => {
  const formattedDate = formatDate(date, "DD", {
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("01");
});
test("should return the day without 0 padding", () => {
  const formattedDate = formatDate(date, "DD", {
    noZeroPadding: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1");
});
test("should return the zero-padded month", () => {
  const formattedDate = formatDate(dateInFebruary, "MM", { utc: true });
  expect(formattedDate).toStrictEqual("02");
});
test("should return the month without zero padding", () => {
  const formattedDate = formatDate(dateInFebruary, "MM", {
    noZeroPadding: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2");
});
test("should return the zero-padded month and abbreviations shouldn't change a thing", () => {
  const formattedDate = formatDate(dateInFebruary, "MM", {
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("02");
});
test("should return the year", () => {
  const formattedDate = formatDate(date, "YYYY", { utc: true });
  expect(formattedDate).toStrictEqual("2023");
});
test("should return the year and abbreviations shouldn't change a thing", () => {
  const formattedDate = formatDate(date, "YYYY", {
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2023");
});
test("should return the 'Month DD, YYYY, at HH:MM period' for local time zone", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period");
  expect(formattedDate).toStrictEqual("December 31, 2022, at 8:35 p.m.");
});
test("should return the 'Month DD, YYYY, at HH:MM period' for a specific time zone", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period", {
    timeZone: "Canada/Atlantic",
  });
  expect(formattedDate).toStrictEqual("December 31, 2022, at 9:35 p.m.");
});
test("should return the date for UTC time zone with the time zone in the string", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", { utc: true });
  expect(formattedDate).toStrictEqual("January 1, 2023, at 1:35 a.m. UTC");
});
test("should return the date for a specific time zone with the time zone in the string", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
    timeZone: "Canada/Atlantic",
  });
  expect(formattedDate).toStrictEqual("December 31, 2022, at 9:35 p.m. AT");
});
test("should return the date in the format Month DD, HH:MM period", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period");
  expect(formattedDate).toStrictEqual("December 31, 8:35 p.m.");
});
test("should return the date in the format Month DD, HH:MM period with abbreviated month", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period", {
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Dec. 31, 8:35 p.m.");
});
test("should return the date in the format Month DD, HH:MM period TZ", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period TZ");
  expect(formattedDate).toStrictEqual("December 31, 8:35 p.m. ET");
});
test("should return the date in the format Month DD, HH:MM period TZ with abbreviated month", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period TZ", {
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Dec. 31, 8:35 p.m. ET");
});
test("should return the date in the format DayOfWeek, HH:MM period", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period");
  expect(formattedDate).toStrictEqual("Saturday, 8:35 p.m.");
});
test("should return the date in the format DayOfWeek, HH:MM period with abbreviated month", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period", {
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Sat., 8:35 p.m.");
});
test("should return the date in the format DayOfWeek, HH:MM period TZ", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ");
  expect(formattedDate).toStrictEqual("Saturday, 8:35 p.m. ET");
});
test("should return the date in the format DayOfWeek, HH:MM period TZ with abbreviated month", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ", {
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Sat., 8:35 p.m. ET");
});
test("should return the date in the format HH:MM period", () => {
  const formattedDate = formatDate(date, "HH:MM period");
  expect(formattedDate).toStrictEqual("8:35 p.m.");
});
test("should return the date in the format HH:MM period TZ", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ", {
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("8:35 p.m. ET");
});

// Radio-Canada style

test("should return a Date in the format Month DD, YYYY, with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1 janvier 2023");
});
test("should return a Date in the format Month DD, YYYY with an abbreviated month with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY", {
    abbreviations: true,
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1 janv. 2023");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM period (morning) with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("1 janvier 2023 à 1 h 35");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM period (afternoon) with RC style", () => {
  const formattedDate = formatDate(datePM, "Month DD, YYYY, at HH:MM period", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("1 janvier 2023 à 15 h 35");
});
test("should return a Date in the format Month DD, YYYY, at HH:MM with RC style without ' h 00' for the minutes ", () => {
  const formattedDate = formatDate(dateNoMinutes, "Month DD, YYYY, at HH:MM period", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1 janvier 2023 à 1 h");
});
test("should return the full day name with RC style", () => {
  const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Dimanche");
});
test("should return the abbreviated day name with RC style", () => {
  const formattedDate = formatDate(dateNoMinutes, "DayOfWeek", {
    style: "rc",
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("Dim.");
});
test("should return the full month name with RC style", () => {
  const formattedDate = formatDate(date, "Month", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("janvier");
});
test("should return the abbreviated month name with RC style", () => {
  const formattedDate = formatDate(dateNoMinutes, "Month", {
    style: "rc",
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("janv.");
});
test("should return the day name, followed by the month and the day with RC style", () => {
  const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("Dimanche 1 janvier");
});
test("should return the day name, followed by the month and the day, abbreviated with RC style", () => {
  const formattedDate = formatDate(date, "DayOfWeek, Month Day", {
    utc: true,
    style: "rc",
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Dim. 1 janv.");
});
test("should return the month and the day with RC style", () => {
  const formattedDate = formatDate(date, "Month DD", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1 janvier");
});
test("should return the month and the day with RC style abbreviated", () => {
  const formattedDate = formatDate(date, "Month DD", {
    utc: true,
    style: "rc",
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("1 janv.");
});
test("should return the month with RC style", () => {
  const formattedDate = formatDate(date, "Month", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("janvier");
});
test("should return the month abbreviated with RC style", () => {
  const formattedDate = formatDate(date, "Month", {
    style: "rc",
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("janv.");
});
test("should return the zero-padded day with RC style", () => {
  const formattedDate = formatDate(date, "DD", { style: "rc", utc: true });
  expect(formattedDate).toStrictEqual("01");
});
test("should return the zero-padded day with RC style and without zero padding", () => {
  const formattedDate = formatDate(date, "DD", {
    style: "rc",
    noZeroPadding: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1");
});
test("should return the zero-padded day and abbreviations shouldn't change a thing with RC style", () => {
  const formattedDate = formatDate(date, "DD", {
    style: "rc",
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("01");
});
test("should return the zero-padded month with RC style", () => {
  const formattedDate = formatDate(dateInFebruary, "MM", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("02");
});
test("should return the zero-padded month with RC style but without zero padding", () => {
  const formattedDate = formatDate(dateInFebruary, "MM", {
    style: "rc",
    noZeroPadding: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2");
});
test("should return the zero-padded month and abbreviations shouldn't change a thing with RC style", () => {
  const formattedDate = formatDate(dateInFebruary, "MM", {
    style: "rc",
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("02");
});
test("should return the year with RC style", () => {
  const formattedDate = formatDate(date, "YYYY", {
    style: "rc",
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2023");
});
test("should return the year and abbreviations shouldn't change a thing with RC style", () => {
  const formattedDate = formatDate(date, "YYYY", {
    style: "rc",
    abbreviations: true,
    utc: true,
  });
  expect(formattedDate).toStrictEqual("2023");
});
test("should return the 'Month DD, YYYY, at HH:MM period' for local time zone with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period", {
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 décembre 2022 à 20 h 35");
});
test("should return the 'Month DD, YYYY, at HH:MM period' for a specific time zone with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period", {
    timeZone: "Canada/Atlantic",
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 décembre 2022 à 21 h 35");
});
test("should return the date for a specific time zone with the time zone in the string with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
    timeZone: "Canada/Atlantic",
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 décembre 2022 à 21 h 35 HNA");
});
test("should return the date in the format Month DD, HH:MM period with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period", {
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 décembre, 20 h 35");
});
test("should return the date in the format Month DD, HH:MM period with abbreviated month with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period", {
    abbreviations: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 déc., 20 h 35");
});
test("should return the date in the format Month DD, HH:MM period TZ with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period TZ", {
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 décembre, 20 h 35 HNE");
});
test("should return the date in the format Month DD, HH:MM period TZ with abbreviated month with RC style", () => {
  const formattedDate = formatDate(date, "Month DD, HH:MM period TZ", {
    abbreviations: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("31 déc., 20 h 35 HNE");
});
test("should return the date in the format DayOfWeek, HH:MM period with RC style", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period", {
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("Samedi, 20 h 35");
});
test("should return the date in the format DayOfWeek, HH:MM period with abbreviated month with RC style", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period", {
    abbreviations: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("Sam., 20 h 35");
});
test("should return the date in the format DayOfWeek, HH:MM period TZ with RC style", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ", {
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("Samedi, 20 h 35 HNE");
});
test("should return the date in the format DayOfWeek, HH:MM period TZ with abbreviated month with RC style", () => {
  const formattedDate = formatDate(date, "DayOfWeek, HH:MM period TZ", {
    abbreviations: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("Sam., 20 h 35 HNE");
});
test("should return the date in the format HH:MM period with RC style", () => {
  const formattedDate = formatDate(date, "HH:MM period", { style: "rc" });
  expect(formattedDate).toStrictEqual("20 h 35");
});
test("should return the date in the format HH:MM period TZ with RC style", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ", {
    abbreviations: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("20 h 35 HNE");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth (CBC)", () => {
  const formattedDate = formatDate(new Date("2023-05-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    threeLetterMonth: true,
  });
  expect(formattedDate).toStrictEqual("May 1, 2023"); // No dot for May
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth (CBC, non-May)", () => {
  const formattedDate = formatDate(new Date("2023-01-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    threeLetterMonth: true,
  });
  expect(formattedDate).toStrictEqual("Jan. 1, 2023");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth (RC, mai)", () => {
  const formattedDate = formatDate(new Date("2023-05-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    style: "rc",
    threeLetterMonth: true,
  });
  expect(formattedDate).toStrictEqual("1 mai 2023"); // No dot for mai
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth (RC, non-mai)", () => {
  const formattedDate = formatDate(new Date("2023-01-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    style: "rc",
    threeLetterMonth: true,
  });
  expect(formattedDate).toStrictEqual("1 janv. 2023");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth and abbreviations (CBC)", () => {
  const formattedDate = formatDate(new Date("2023-01-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    threeLetterMonth: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Jan. 1, 2023"); // abbreviations should not override threeLetterMonth
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth and abbreviations (RC)", () => {
  const formattedDate = formatDate(new Date("2023-01-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    style: "rc",
    threeLetterMonth: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("1 janv. 2023");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth (CBC, April)", () => {
  const formattedDate = formatDate(new Date("2023-04-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    threeLetterMonth: true,
  });
  expect(formattedDate).toStrictEqual("Apr. 1, 2023");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth (RC, avril)", () => {
  const formattedDate = formatDate(new Date("2023-04-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    style: "rc",
    threeLetterMonth: true,
  });
  expect(formattedDate).toStrictEqual("1 avr. 2023");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth and abbreviations (CBC, April)", () => {
  const formattedDate = formatDate(new Date("2023-04-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    threeLetterMonth: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("Apr. 1, 2023");
});
test("should return a Date in the format Month DD, YYYY with threeLetterMonth and abbreviations (RC, avril)", () => {
  const formattedDate = formatDate(new Date("2023-04-01T01:35:00.000Z"), "Month DD, YYYY", {
    utc: true,
    style: "rc",
    threeLetterMonth: true,
    abbreviations: true,
  });
  expect(formattedDate).toStrictEqual("1 avr. 2023");
});

test("should return a Date in the format HH:MM period TZ on Month DD, YYYY (CBC)", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ on Month DD, YYYY", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1:35 a.m. UTC on January 1, 2023");
});

test("should return a Date in the format HH:MM period TZ on Month DD, YYYY (RC)", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ on Month DD, YYYY", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("1 h 35 UTC le 1 janvier 2023");
});

test("should return a Date in the format HH:MM period TZ on Month DD, YYYY with time zone (CBC)", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ on Month DD, YYYY", {
    timeZone: "Canada/Eastern",
  });
  expect(formattedDate).toStrictEqual("8:35 p.m. ET on December 31, 2022");
});

test("should return a Date in the format HH:MM period on Month DD, YYYY (CBC)", () => {
  const formattedDate = formatDate(date, "HH:MM period on Month DD, YYYY", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1:35 a.m. on January 1, 2023");
});

test("should return a Date in the format HH:MM period on Month DD, YYYY (RC)", () => {
  const formattedDate = formatDate(date, "HH:MM period on Month DD, YYYY", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("1 h 35 le 1 janvier 2023");
});

test("should return a Date in the format HH:MM period on Month DD, YYYY (afternoon, CBC)", () => {
  const formattedDate = formatDate(datePM, "HH:MM period on Month DD, YYYY", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("3:35 p.m. on January 1, 2023");
});

test("should return a Date in the format HH:MM period TZ on Month DD (CBC)", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ on Month DD", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1:35 a.m. UTC on January 1");
});

test("should return a Date in the format HH:MM period TZ on Month DD (RC)", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ on Month DD", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("1 h 35 UTC le 1 janvier");
});

test("should return a Date in the format HH:MM period TZ on Month DD with time zone (CBC)", () => {
  const formattedDate = formatDate(date, "HH:MM period TZ on Month DD", {
    timeZone: "Canada/Pacific",
  });
  expect(formattedDate).toStrictEqual("5:35 p.m. PT on December 31");
});

test("should return a Date in the format HH:MM period on Month DD (CBC)", () => {
  const formattedDate = formatDate(date, "HH:MM period on Month DD", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1:35 a.m. on January 1");
});

test("should return a Date in the format HH:MM period on Month DD (RC)", () => {
  const formattedDate = formatDate(date, "HH:MM period on Month DD", {
    utc: true,
    style: "rc",
  });
  expect(formattedDate).toStrictEqual("1 h 35 le 1 janvier");
});

test("should return a Date in the format HH:MM period on Month DD with no minutes (CBC)", () => {
  const formattedDate = formatDate(dateNoMinutes, "HH:MM period on Month DD", {
    utc: true,
  });
  expect(formattedDate).toStrictEqual("1 a.m. on January 1");
});
