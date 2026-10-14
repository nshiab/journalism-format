import { expect, test } from "vite-plus/test";
import formatNumber from "../../src/format/formatNumber.ts";

test("should return the number as a string", () => {
  const string = formatNumber(10);
  expect(string).toStrictEqual("10");
});
test("should return the number with coma as a thousand separator (using 1000)", () => {
  const string = formatNumber(1000);
  expect(string).toStrictEqual("1,000");
});
test("should return the number with coma as a thousand separator (using 10000)", () => {
  const string = formatNumber(10000);
  expect(string).toStrictEqual("10,000");
});
test("should return the number with coma as a thousand separator (using 100000)", () => {
  const string = formatNumber(100000);
  expect(string).toStrictEqual("100,000");
});
test("should return the number with coma as a thousand separator and keep decimals (using 1000000000.1234)", () => {
  const string = formatNumber(1000000000.1234);
  expect(string).toStrictEqual("1,000,000,000.1234");
});
test("should return the number with + sign", () => {
  const string = formatNumber(1.12, { sign: true });
  expect(string).toStrictEqual("+1.12");
});
test("should return the number with - sign", () => {
  const string = formatNumber(-2.23, { sign: true });
  expect(string).toStrictEqual("-2.23");
});
test("should return 0 even if with option sign to true", () => {
  const string = formatNumber(0, { sign: true });
  expect(string).toStrictEqual("0");
});
test("should return the number rounded", () => {
  const string = formatNumber(1.5345, { round: true });
  expect(string).toStrictEqual("2");
});
test("should return the number rounded with 2 decimals", () => {
  const string = formatNumber(1.5345, { decimals: 2 });
  expect(string).toStrictEqual("1.53");
});
test("should return the number rounded with 2 fixed decimals", () => {
  const string = formatNumber(1.5042, { decimals: 2, fixed: true });
  expect(string).toStrictEqual("1.50");
});
test("should return the number rounded with base 10", () => {
  const string = formatNumber(11523.5345, { nearestInteger: 10 });
  expect(string).toStrictEqual("11,520");
});
test("should return the number rounded with 2 decimals and + sign", () => {
  const string = formatNumber(1.5345, { decimals: 2, sign: true });
  expect(string).toStrictEqual("+1.53");
});
test("should return the number rounded with base 10 and + sign", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    sign: true,
  });
  expect(string).toStrictEqual("+11,520");
});
test("should return the number rounded with 2 decimals and - sign", () => {
  const string = formatNumber(-1.5345, { decimals: 2, sign: true });
  expect(string).toStrictEqual("-1.53");
});
test("should return the number rounded with 2 fixed decimals and - sign", () => {
  const string = formatNumber(-1.5023, {
    decimals: 2,
    fixed: true,
    sign: true,
  });
  expect(string).toStrictEqual("-1.50");
});
test("should return the number rounded with base 10 and - sign", () => {
  const string = formatNumber(-11523.5345, {
    nearestInteger: 10,
    sign: true,
  });
  expect(string).toStrictEqual("-11,520");
});
test("should return the negative number with prefix", () => {
  const string = formatNumber(-11523, {
    prefix: "$",
  });
  expect(string).toStrictEqual("-$11,523");
});
test("should return the negative number with prefix and sign", () => {
  const string = formatNumber(11523, {
    prefix: "$",
    sign: true,
  });
  expect(string).toStrictEqual("+$11,523");
});
test("should return the number with suffix", () => {
  const string = formatNumber(35, {
    suffix: " C",
  });
  expect(string).toStrictEqual("35 C");
});
test("should return the number with a prefix and a suffix", () => {
  const string = formatNumber(35, {
    prefix: "Temp.: ",
    suffix: " C",
  });
  expect(string).toStrictEqual("Temp.: 35 C");
});

// Radio-Canada style

test("should return the number as a string without separator (using 1000)", () => {
  const string = formatNumber(1000, { style: "rc" });
  expect(string).toStrictEqual("1000");
});
test("should return the number with non-breaking space as a thousand separator (using 10000)", () => {
  const string = formatNumber(10000, { style: "rc" });
  expect(string).toStrictEqual("10 000");
});
test("should return the number with non-breaking space as a thousand separator (using 100000)", () => {
  const string = formatNumber(100000, { style: "rc" });
  expect(string).toStrictEqual("100 000");
});
test("should return the number with non-breaking space as a thousand separator and keep decimals (using 1000000000.1234)", () => {
  const string = formatNumber(1000000000.1234, { style: "rc" });
  expect(string).toStrictEqual("1 000 000 000,1234");
});
test("should return the number with + sign with rc style", () => {
  const string = formatNumber(1.12, { sign: true, style: "rc" });
  expect(string).toStrictEqual("+1,12");
});
test("should return the number with - sign with rc style", () => {
  const string = formatNumber(-2.23, { sign: true, style: "rc" });
  expect(string).toStrictEqual("-2,23");
});
test("should return the number rounded with rc style", () => {
  const string = formatNumber(1.5345, { round: true, style: "rc" });
  expect(string).toStrictEqual("2");
});
test("should return the number rounded with 2 decimals with rc style", () => {
  const string = formatNumber(1.5345, { decimals: 2, style: "rc" });
  expect(string).toStrictEqual("1,53");
});
test("should return the number rounded with 2 fixed decimals with rc style", () => {
  const string = formatNumber(1.5042, {
    decimals: 2,
    fixed: true,
    style: "rc",
  });
  expect(string).toStrictEqual("1,50");
});
test("should return the number rounded with base 10 with rc style", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    style: "rc",
  });
  expect(string).toStrictEqual("11 520");
});
test("should return the number rounded with 2 decimals, + sign and rc style", () => {
  const string = formatNumber(1.5345, {
    decimals: 2,
    sign: true,
    style: "rc",
  });
  expect(string).toStrictEqual("+1,53");
});
test("should return the number rounded, with 2 fixed decimals, +sign and rc style", () => {
  const string = formatNumber(1.2, {
    decimals: 2,
    fixed: true,
    sign: true,
    style: "rc",
  });
  expect(string).toStrictEqual("+1,20");
});
test("should return the number rounded with base 10, + sign and rc style", () => {
  const string = formatNumber(11523.5345, {
    nearestInteger: 10,
    sign: true,
    style: "rc",
  });
  expect(string).toStrictEqual("+11 520");
});
test("should return the number rounded with 2 decimals, - sign and rc style", () => {
  const string = formatNumber(-1.5345, {
    decimals: 2,
    sign: true,
    style: "rc",
  });
  expect(string).toStrictEqual("-1,53");
});
test("should return the number rounded with base 10, - sign and rc style", () => {
  const string = formatNumber(-11523.5345, {
    nearestInteger: 10,
    sign: true,
    style: "rc",
  });
  expect(string).toStrictEqual("-11 520");
});
test("should return the number with suffix and rc style", () => {
  const string = formatNumber(35.2, {
    suffix: " C",
    style: "rc",
  });
  expect(string).toStrictEqual("35,2 C");
});
test("should return the number with a prefix, a suffix and rc style", () => {
  const string = formatNumber(35.6, {
    prefix: "Temp.: ",
    suffix: " C",
    style: "rc",
  });
  expect(string).toStrictEqual("Temp.: 35,6 C");
});
test("should return the number round with 1 significant digit", () => {
  const string = formatNumber(0.01578, { significantDigits: 1 });
  expect(string).toStrictEqual("0.02");
});
test("should return the number round with 2 significant digits and a positive sign", () => {
  const string = formatNumber(0.01578, {
    significantDigits: 2,
    sign: true,
  });
  expect(string).toStrictEqual("+0.016");
});
test("should return the number round with 2 significant digits and a negative sign", () => {
  const string = formatNumber(-0.01578, {
    significantDigits: 2,
    sign: true,
  });
  expect(string).toStrictEqual("-0.016");
});
test("should return the number round with 2 significant digits and a percentage sign", () => {
  const string = formatNumber(1.3922092532695824, {
    suffix: "%",
    significantDigits: 2,
  });
  expect(string).toStrictEqual("1.4%");
});
test("should return the number not abbreviated", () => {
  const string = formatNumber(15, { abbreviation: true });
  expect(string).toStrictEqual("15");
});
test("should return the number abbreviated to K", () => {
  const string = formatNumber(1500, { abbreviation: true });
  expect(string).toStrictEqual("1.5K");
});
test("should return the number abbreviated to M", () => {
  const string = formatNumber(1500000, { abbreviation: true });
  expect(string).toStrictEqual("1.5M");
});
test("should return the number abbreviated to B", () => {
  const string = formatNumber(1500000000, { abbreviation: true });
  expect(string).toStrictEqual("1.5B");
});
test("should return the number abbreviated to T", () => {
  const string = formatNumber(1500000000000, { abbreviation: true });
  expect(string).toStrictEqual("1.5T");
});
test("should return the number abbreviated with prefix and suffix", () => {
  const string = formatNumber(1500, {
    abbreviation: true,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("$1.5K USD");
});
test("should return the number abbreviated with 2 decimals", () => {
  const string = formatNumber(1525, {
    abbreviation: true,
    decimals: 2,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("$1.52K USD");
});
test("should return the number abbreviated with 3 fixed decimals", () => {
  const string = formatNumber(1510, {
    abbreviation: true,
    decimals: 3,
    fixed: true,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("$1.510K USD");
});
test("should return the number abbreviated with 0 decimals", () => {
  const string = formatNumber(1525, {
    abbreviation: true,
    decimals: 0,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("$2K USD");
});
test("should return 0 when abbreviation is true", () => {
  const string = formatNumber(0, {
    abbreviation: true,
    decimals: 0,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("$0 USD");
});
test("should return the absolute value when sign is strictly false (positive number)", () => {
  const string = formatNumber(123, { sign: false });
  expect(string).toStrictEqual("123");
});
test("should return the absolute value when sign is strictly false (negative number)", () => {
  const string = formatNumber(-456, { sign: false });
  expect(string).toStrictEqual("456");
});
test("should not remove sign if sign is undefined (negative number)", () => {
  const string = formatNumber(-789, {});
  expect(string).toStrictEqual("-789");
});
test("should not remove sign if sign is undefined (positive number)", () => {
  const string = formatNumber(789, {});
  expect(string).toStrictEqual("789");
});
test("should work with sign false and prefix/suffix", () => {
  const string = formatNumber(-1000, {
    sign: false,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("$1,000 USD");
});
test("should return the negative number abbreviated to K", () => {
  const string = formatNumber(-1500, { abbreviation: true });
  expect(string).toStrictEqual("-1.5K");
});
test("should return the negative number abbreviated to M", () => {
  const string = formatNumber(-1500000, { abbreviation: true });
  expect(string).toStrictEqual("-1.5M");
});
test("should return the negative number abbreviated to B", () => {
  const string = formatNumber(-1500000000, { abbreviation: true });
  expect(string).toStrictEqual("-1.5B");
});
test("should return the negative number abbreviated to T", () => {
  const string = formatNumber(-1500000000000, { abbreviation: true });
  expect(string).toStrictEqual("-1.5T");
});
test("should return the negative number abbreviated with prefix and suffix", () => {
  const string = formatNumber(-1500, {
    abbreviation: true,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("-$1.5K USD");
});
test("should return the negative number abbreviated with 2 decimals", () => {
  const string = formatNumber(-1525, {
    abbreviation: true,
    decimals: 2,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("-$1.52K USD");
});
test("should return the negative number abbreviated with 3 fixed decimals", () => {
  const string = formatNumber(-1510, {
    abbreviation: true,
    decimals: 3,
    fixed: true,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("-$1.510K USD");
});
test("should return the negative number abbreviated with 0 decimals", () => {
  const string = formatNumber(-1525, {
    abbreviation: true,
    decimals: 0,
    prefix: "$",
    suffix: " USD",
  });
  expect(string).toStrictEqual("-$2K USD");
});
test("should return CBC-style position for 1", () => {
  const string = formatNumber(1, { position: true });
  expect(string).toStrictEqual("first");
});
test("should return CBC-style position for 2", () => {
  const string = formatNumber(2, { position: true });
  expect(string).toStrictEqual("second");
});
test("should return CBC-style position for 3", () => {
  const string = formatNumber(3, { position: true });
  expect(string).toStrictEqual("third");
});
test("should return CBC-style position for 11", () => {
  const string = formatNumber(11, { position: true });
  expect(string).toStrictEqual("11th");
});
test("should return CBC-style position for 22", () => {
  const string = formatNumber(22, { position: true });
  expect(string).toStrictEqual("22nd");
});
test("should return CBC-style position for 33", () => {
  const string = formatNumber(33, { position: true });
  expect(string).toStrictEqual("33rd");
});
test("should throw for invalid position (0)", () => {
  let error = null;
  try {
    formatNumber(0, { position: true });
  } catch (e) {
    error = e;
  }
  expect(error instanceof Error).toStrictEqual(true);
});
test("should throw for invalid position (1.5)", () => {
  let error = null;
  try {
    formatNumber(1.5, { position: true });
  } catch (e) {
    error = e;
  }
  expect(error instanceof Error).toStrictEqual(true);
});
test("should return RC-style position for 1", () => {
  const string = formatNumber(1, { position: true, style: "rc" });
  expect(string).toStrictEqual("premier");
});
test("should return RC-style position for 2", () => {
  const string = formatNumber(2, { position: true, style: "rc" });
  expect(string).toStrictEqual("deuxième");
});
test("should return RC-style position for 3", () => {
  const string = formatNumber(3, { position: true, style: "rc" });
  expect(string).toStrictEqual("troisième");
});
test("should return RC-style position for 9", () => {
  const string = formatNumber(9, { position: true, style: "rc" });
  expect(string).toStrictEqual("neuvième");
});
test("should return RC-style position for 10", () => {
  const string = formatNumber(10, { position: true, style: "rc" });
  expect(string).toStrictEqual("10e");
});
test("should return RC-style position for 21", () => {
  const string = formatNumber(21, { position: true, style: "rc" });
  expect(string).toStrictEqual("21e");
});
test("should throw for invalid RC position (0)", () => {
  let error = null;
  try {
    formatNumber(0, { position: true, style: "rc" });
  } catch (e) {
    error = e;
  }
  expect(error instanceof Error).toStrictEqual(true);
});
test("should throw for invalid RC position (1.5)", () => {
  let error = null;
  try {
    formatNumber(1.5, { position: true, style: "rc" });
  } catch (e) {
    error = e;
  }
  expect(error instanceof Error).toStrictEqual(true);
});

test("should format a number with thousands separator", () => {
  const num1 = formatNumber(1234567.89);
  expect(num1).toStrictEqual("1,234,567.89");
});

test("should format a number with sign and rounding to 0 decimals", () => {
  const num2 = formatNumber(1234.567, { sign: true, decimals: 0 });
  expect(num2).toStrictEqual("+1,235");
});

test("should format a number in French style with abbreviation", () => {
  const num3 = formatNumber(1234567, { style: "rc", abbreviation: true });
  expect(num3).toStrictEqual("1,234567M");
});

test("should format a number with fixed decimals, prefix and suffix", () => {
  const num4 = formatNumber(98.765, {
    decimals: 2,
    fixed: true,
    prefix: "$",
    suffix: " CAD",
  });
  expect(num4).toStrictEqual("$98.77 CAD");
});

test("should format a number as an ordinal position (English)", () => {
  const position1 = formatNumber(1, { position: true });
  expect(position1).toStrictEqual("first");
});

test("should format a number as an ordinal position (French)", () => {
  const position2 = formatNumber(2, { position: true, style: "rc" });
  expect(position2).toStrictEqual("deuxième");
});
