import { expect, test } from "vite-plus/test";
import camelCase from "../../src/format/camelCase.ts";

test("should format a string to camel case", () => {
  const string = camelCase("Journalism  _ % IS**@ aWeSoMe.");

  expect(string).toStrictEqual("journalismIsAwesome");
});

test("should handle a simple string", () => {
  const string = camelCase("hello world");
  expect(string).toStrictEqual("helloWorld");
});

test("should handle punctuation and mixed case", () => {
  const string = camelCase("  --Some@Thing is- happening--  ");
  expect(string).toStrictEqual("someThingIsHappening");
});

test("should handle a single word", () => {
  const string = camelCase("Journalism");
  expect(string).toStrictEqual("journalism");
});
