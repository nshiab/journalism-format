import { assertEquals } from "jsr:@std/assert";
import normalizeString from "../../src/format/normalizeString.ts";

Deno.test("should normalize a string by stripping accents, punctuation, and converting to lowercase", () => {
  assertEquals(normalizeString("Évènement!"), "evenement");
  assertEquals(normalizeString("Café?"), "cafe");
  assertEquals(normalizeString("¡Niño!"), "nino");
  assertEquals(normalizeString(" façade... "), "facade");
  assertEquals(normalizeString("ÖBB (Austria)"), "obb austria");
  assertEquals(normalizeString(""), "");
});

Deno.test("should strip punctuation", () => {
  assertEquals(normalizeString("Hello, World!"), "hello world");
  assertEquals(normalizeString("Wait... what?"), "wait what");
  assertEquals(normalizeString("100%"), "100");
  assertEquals(normalizeString("email@example.com"), "emailexamplecom");
  assertEquals(normalizeString("multi-word-string"), "multiwordstring");
  assertEquals(normalizeString("underscore_test"), "underscoretest");
});

Deno.test("should not strip punctuation when stripPunctuation is false", () => {
  assertEquals(
    normalizeString("Hello, World!", { stripPunctuation: false }),
    "hello, world!",
  );
  assertEquals(
    normalizeString("multi-word-string", { stripPunctuation: false }),
    "multi-word-string",
  );
  assertEquals(
    normalizeString("Évènement!", { stripPunctuation: false }),
    "evenement!",
  );
});

Deno.test("should trim whitespace", () => {
  assertEquals(normalizeString("  hello  "), "hello");
  assertEquals(normalizeString("\tworld\n"), "world");
});

Deno.test("should handle multiple spaces between words", () => {
  assertEquals(normalizeString("hello    world"), "hello world");
  assertEquals(normalizeString("hello\tworld"), "hello world");
  assertEquals(normalizeString("  hello    \n  world  "), "hello world");
});

Deno.test("should handle complex accented strings", () => {
  assertEquals(
    normalizeString("ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ"),
    "aaaaaaceeeeiiiinooooouuuuyaaaaaaceeeeiiiinooooouuuuyy",
  );
});
