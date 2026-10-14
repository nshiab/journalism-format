import { expect, test } from "vite-plus/test";
import capitalize from "../../src/format/capitalize.ts";

test("should capitalize the first character of a string", () => {
  const string = capitalize("journalism");

  expect(string).toStrictEqual("Journalism");
});
