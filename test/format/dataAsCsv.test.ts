import { assertEquals } from "jsr:@std/assert";
import dataAsCsv from "../../src/format/dataAsCsv.ts";

Deno.test("should return a CSV string", () => {
  const data = [
    { firstName: "Graeme", lastName: "Bruce" },
    { firstName: "Nael", lastName: "Shiab" },
  ];
  const csv = dataAsCsv(data);

  assertEquals(
    csv,
    "firstName,lastName\nGraeme,Bruce\nNael,Shiab",
  );
});

Deno.test("should discover columns across ragged rows in order", () => {
  const csv = dataAsCsv([
    { first: 1 },
    { second: 2, first: 3 },
    { third: 4 },
  ]);

  assertEquals(csv, "first,second,third\n1,,\n3,2,\n,,4");
});

Deno.test("should escape CSV values and format nullish and Date values", () => {
  const csv = dataAsCsv([
    {
      comma: "hello, world",
      quote: 'She said "hello"',
      newline: "first\nsecond",
      nullValue: null,
      undefinedValue: undefined,
      date: new Date("2023-01-01T01:35:05.120Z"),
    },
  ]);

  assertEquals(
    csv,
    'comma,quote,newline,nullValue,undefinedValue,date\n"hello, world","She said ""hello""","first\nsecond",,,2023-01-01T01:35:05.120Z',
  );
});

Deno.test("should return an empty string for an empty array", () => {
  assertEquals(dataAsCsv([]), "");
});
