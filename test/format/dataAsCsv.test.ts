import { expect, test } from "vite-plus/test";
import dataAsCsv from "../../src/format/dataAsCsv.ts";

test("should return a CSV string", () => {
  const data = [
    { firstName: "Graeme", lastName: "Bruce" },
    { firstName: "Nael", lastName: "Shiab" },
  ];
  const csv = dataAsCsv(data);

  expect(csv).toStrictEqual("firstName,lastName\nGraeme,Bruce\nNael,Shiab");
});

test("should discover columns across ragged rows in order", () => {
  const csv = dataAsCsv([{ first: 1 }, { second: 2, first: 3 }, { third: 4 }]);

  expect(csv).toStrictEqual("first,second,third\n1,,\n3,2,\n,,4");
});

test("should escape CSV values and format nullish and Date values", () => {
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

  expect(csv).toStrictEqual(
    'comma,quote,newline,nullValue,undefinedValue,date\n"hello, world","She said ""hello""","first\nsecond",,,2023-01-01T01:35:05.120Z',
  );
});

test("should return an empty string for an empty array", () => {
  expect(dataAsCsv([])).toStrictEqual("");
});

test("should serialize nested objects and arrays as JSON and escape them for CSV", () => {
  const csv = dataAsCsv([
    { details: { city: "Toronto", counts: [1, 2] }, labels: ["news", "data"] },
  ]);

  expect(csv).toStrictEqual(
    'details,labels\n"{""city"":""Toronto"",""counts"":[1,2]}","[""news"",""data""]"',
  );
});

test("should use an empty cell when an object's JSON representation is undefined", () => {
  expect(dataAsCsv([{ value: { toJSON: () => undefined } }])).toStrictEqual("value\n");
});
