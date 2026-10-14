import { expect, test } from "vite-plus/test";
import normalizeString from "../../src/format/normalizeString.ts";

test("should normalize a string by stripping accents, punctuation, and converting to lowercase", () => {
  expect(normalizeString("Évènement!")).toStrictEqual("evenement");
  expect(normalizeString("Café?")).toStrictEqual("cafe");
  expect(normalizeString("¡Niño!")).toStrictEqual("nino");
  expect(normalizeString(" façade... ")).toStrictEqual("facade");
  expect(normalizeString("ÖBB (Austria)")).toStrictEqual("obb austria");
  expect(normalizeString("")).toStrictEqual("");
});

test("should strip punctuation", () => {
  expect(normalizeString("Hello, World!")).toStrictEqual("hello world");
  expect(normalizeString("Wait... what?")).toStrictEqual("wait what");
  expect(normalizeString("100%")).toStrictEqual("100");
  expect(normalizeString("email@example.com")).toStrictEqual("emailexamplecom");
  expect(normalizeString("multi-word-string")).toStrictEqual("multiwordstring");
  expect(normalizeString("underscore_test")).toStrictEqual("underscoretest");
});

test("should not strip punctuation when stripPunctuation is false", () => {
  expect(normalizeString("Hello, World!", { stripPunctuation: false })).toStrictEqual(
    "hello, world!",
  );
  expect(normalizeString("multi-word-string", { stripPunctuation: false })).toStrictEqual(
    "multi-word-string",
  );
  expect(normalizeString("Évènement!", { stripPunctuation: false })).toStrictEqual("evenement!");
});

test("should trim whitespace", () => {
  expect(normalizeString("  hello  ")).toStrictEqual("hello");
  expect(normalizeString("\tworld\n")).toStrictEqual("world");
});

test("should handle multiple spaces between words", () => {
  expect(normalizeString("hello    world")).toStrictEqual("hello world");
  expect(normalizeString("hello\tworld")).toStrictEqual("hello world");
  expect(normalizeString("  hello    \n  world  ")).toStrictEqual("hello world");
});

test("should handle complex accented strings", () => {
  expect(normalizeString("ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ")).toStrictEqual(
    "aaaaaaceeeeiiiinooooouuuuyaaaaaaceeeeiiiinooooouuuuyy",
  );
});
