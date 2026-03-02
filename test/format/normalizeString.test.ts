import { assertEquals } from "jsr:@std/assert";
import normalizeString from "../../src/format/normalizeString.ts";

Deno.test("should normalize a string by stripping accents and converting to lowercase", () => {
  assertEquals(normalizeString("Évènement"), "evenement");
  assertEquals(normalizeString("Café"), "cafe");
  assertEquals(normalizeString("Niño"), "nino");
  assertEquals(normalizeString(" façade "), "facade");
  assertEquals(normalizeString("ÖBB"), "obb");
  assertEquals(normalizeString(""), "");
});

Deno.test("should trim whitespace", () => {
  assertEquals(normalizeString("  hello  "), "hello");
  assertEquals(normalizeString("\tworld\n"), "world");
});

Deno.test("should handle complex accented strings", () => {
  assertEquals(
    normalizeString("ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïñòóôõöùúûüýÿ"),
    "aaaaaaceeeeiiiinooooouuuuyaaaaaaceeeeiiiinooooouuuuyy",
  );
});
