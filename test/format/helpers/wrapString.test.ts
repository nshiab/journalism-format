import { expect, test } from "vite-plus/test";
import wrapString from "../../../src/format/helpers/wrapString.ts";

test("wrapString should not wrap short strings", () => {
  const result = wrapString("Hello", 10);
  expect(result).toStrictEqual("Hello");
});

test("wrapString should wrap long strings at word boundaries", () => {
  const text = "This is a very long sentence that needs to be wrapped";
  const result = wrapString(text, 20);
  const lines = result.split("\n");

  // Each line should be <= 20 characters
  for (const line of lines) {
    expect(line.length <= 20).toStrictEqual(true);
  }

  // Should have multiple lines
  expect(lines.length > 1).toStrictEqual(true);
});

test("wrapString should wrap at character boundary when wordWrap is false", () => {
  const text = "Thisisaverylongword";
  const result = wrapString(text, 10, false);
  expect(result).toStrictEqual("Thisisaver\nylongword");
});

test("wrapString should handle very long words by breaking them", () => {
  const text = "Thisisaverylongwordthatcannotbewrappedatwordboundaries";
  const result = wrapString(text, 10);
  const lines = result.split("\n");

  // Each line should be <= 10 characters
  for (const line of lines) {
    expect(line.length <= 10).toStrictEqual(true);
  }

  // Should have multiple lines
  expect(lines.length > 1).toStrictEqual(true);
});

test("wrapString should handle text with spaces", () => {
  const text = "Hello world this is a test";
  const result = wrapString(text, 15);
  const lines = result.split("\n");

  // Each line should be <= 15 characters
  for (const line of lines) {
    expect(line.length <= 15).toStrictEqual(true);
  }

  // When recombined (removing newlines and extra spaces), should match original
  const recombined = lines.join(" ").replace(/\s+/g, " ");
  expect(recombined).toStrictEqual(text);
});

test("wrapString should handle empty string", () => {
  const result = wrapString("", 10);
  expect(result).toStrictEqual("");
});

test("wrapString should handle single character", () => {
  const result = wrapString("a", 10);
  expect(result).toStrictEqual("a");
});

test("wrapString should wrap when text is exactly maxWidth + 1", () => {
  const text = "12345678901";
  const result = wrapString(text, 10, false);
  expect(result).toStrictEqual("1234567890\n1");
});

test("wrapString should preserve word boundaries for readable text", () => {
  const text = "The quick brown fox jumps over the lazy dog";
  const result = wrapString(text, 20);
  const lines = result.split("\n");

  // No line should start with a space (word boundary preservation)
  for (const line of lines) {
    if (line.length > 0) {
      expect(line[0] !== " ").toStrictEqual(true);
    }
  }
});
