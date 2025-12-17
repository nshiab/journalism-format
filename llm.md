# API Reference

## arraysToData

Transforms an object of arrays into an array of objects. This function is useful
for converting data from a columnar format to a row-based format, which is
common in data processing and visualization.

It is assumed that all arrays in the input object have the same length.

### Signature

```typescript
function arraysToData<T extends Record<string, unknown[]>>(
  data: T,
): Array<{ [K in keyof T]: T[K][number] }>;
```

### Parameters

- **`data`**: An object where each key is a string and its corresponding value
  is an array of any type. All arrays are expected to have the same length.

### Returns

An array of objects, where each object is a "row" of data created by combining
values from the input arrays at the same index.

### Examples

```ts
// Basic usage with mixed data types
const columnarData = {
  name: ["Alice", "Bob", "Charlie"],
  age: [30, 25, 35],
  city: ["New York", "London", "Paris"],
};

const rowData = arraysToData(columnarData);

console.log(rowData);
// Expected output:
// [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'London' },
//   { name: 'Charlie', age: 35, city: 'Paris' }
// ]
```

```ts
// Usage with numerical data for charting
const chartData = {
  x: [1, 2, 3, 4, 5],
  y: [10, 20, 15, 25, 30],
};

const plotPoints = arraysToData(chartData);

console.log(plotPoints);
// Expected output:
// [
//   { x: 1, y: 10 },
//   { x: 2, y: 20 },
//   { x: 3, y: 15 },
//   { x: 4, y: 25 },
//   { x: 5, y: 30 }
// ]
```

## camelCase

Converts a string into camelCase. This is useful for creating variable names or
object keys from human-readable text.

### Signature

```typescript
function camelCase(input: string): string;
```

### Parameters

- **`input`**: The string to convert to camelCase. It can contain spaces,
  punctuation, and mixed casing.

### Returns

The camelCased version of the input string.

### Examples

```ts
// Basic conversion
const result1 = camelCase("hello world");
console.log(result1); // "helloWorld"
```

```ts
// With punctuation and mixed case
const result2 = camelCase("  --Some@Thing is- happening--  ");
console.log(result2); // "someThingsHappening"
```

```ts
// With a single word
const result3 = camelCase("Journalism");
console.log(result3); // "journalism"
```

## capitalize

Capitalizes the first letter of a given string.

### Signature

```typescript
function capitalize(string: string): string;
```

### Parameters

- **`input`**: The string to be capitalized.

### Returns

A new string with the first letter in uppercase.

### Examples

```ts
// Basic usage
const capitalized = capitalize("hello world");
console.log(capitalized); // "Hello world"
```

```ts
// With an already capitalized string
const alreadyCapitalized = capitalize("Journalism");
console.log(alreadyCapitalized); // "Journalism"
```

```ts
// With a single character
const singleChar = capitalize("a");
console.log(singleChar); // "A"
```

## dataAsCsv

Converts an array of objects into a CSV (Comma-Separated Values) string.

The function takes an array of objects and returns a string in CSV format. The
first line of the string will be the headers, which are derived from the keys of
the first object in the array. Each subsequent line will represent an object,
with the values in the same order as the headers.

### Signature

```typescript
function dataAsCsv(arrayOfObjects: Record<string, unknown>[]): string;
```

### Parameters

- **`data`**: An array of objects to be converted. All objects in the array
  should have the same keys.

### Returns

A string representing the data in CSV format.

### Examples

```ts
// Basic usage with a simple dataset
const dataset = [
  { make: "Toyota", model: "Camry", year: 2021 },
  { make: "Honda", model: "Accord", year: 2022 },
  { make: "Ford", model: "Mustang", year: 2020 },
];

const csvString = dataAsCsv(dataset);

console.log(csvString);
// Expected output:
// "make,model,year\nToyota,Camry,2021\nHonda,Accord,2022\nFord,Mustang,2020"
```

## dataToArrays

Transforms an array of objects into an object of arrays. This function is the
inverse of `arraysToData` and is useful for converting data from a row-based
format to a columnar format.

### Signature

```typescript
function dataToArrays<T extends Record<string, unknown>>(
  data: T[],
): { [K in keyof T]: T[K][] };
```

### Parameters

- **`data`**: An array of objects. Each object is expected to have the same set
  of keys.

### Returns

An object where each key maps to an array of values, effectively representing
the data in a columnar format.

### Examples

```ts
// Basic usage with a simple dataset
const rowData = [
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "London" },
  { name: "Charlie", age: 35, city: "Paris" },
];

const columnarData = dataToArrays(rowData);

console.log(columnarData);
// Expected output:
// {
//   name: ['Alice', 'Bob', 'Charlie'],
//   age: [30, 25, 35],
//   city: ['New York', 'London', 'Paris']
// }
```

```ts
// Preparing data for statistical analysis
const measurements = [
  { id: 1, temp: 20, humidity: 60 },
  { id: 2, temp: 22, humidity: 65 },
  { id: 3, temp: 18, humidity: 55 },
];

const separatedVariables = dataToArrays(measurements);

console.log(separatedVariables);
// Expected output:
// {
//   id: [1, 2, 3],
//   temp: [20, 22, 18],
//   humidity: [60, 65, 55]
// }
```

## formatDate

Formats a `Date` object into a human-readable string based on a specified
format, style, and time zone. This function provides flexible date and time
formatting options, including support for UTC, different linguistic styles
(English/French), and various display preferences like abbreviations and
zero-padding.

### Signature

```typescript
function formatDate(
  date: Date,
  format:
    | "YYYY-MM-DD"
    | "YYYY-MM-DD HH:MM:SS TZ"
    | "DayOfWeek, Month Day"
    | "Month DD"
    | "Month DD, HH:MM period"
    | "Month DD, HH:MM period TZ"
    | "DayOfWeek, HH:MM period"
    | "DayOfWeek, HH:MM period TZ"
    | "Month DD, YYYY"
    | "Month DD, YYYY, at HH:MM period"
    | "Month DD, YYYY, at HH:MM period TZ"
    | "DayOfWeek"
    | "Month"
    | "YYYY"
    | "MM"
    | "DD"
    | "HH:MM period"
    | "HH:MM period TZ",
  options?: {
    utc?: boolean;
    style?: "cbc" | "rc";
    abbreviations?: boolean;
    noZeroPadding?: boolean;
    threeLetterMonth?: boolean;
    timeZone?:
      | "Canada/Atlantic"
      | "Canada/Central"
      | "Canada/Eastern"
      | "Canada/Mountain"
      | "Canada/Newfoundland"
      | "Canada/Pacific"
      | "Canada/Saskatchewan"
      | "Canada/Yukon";
  },
): string;
```

### Parameters

- **`date`**: The `Date` object to be formatted.
- **`format`**: A predefined string literal specifying the desired output
  format. Examples include "YYYY-MM-DD", "Month DD, YYYY", "HH:MM period", etc.
- **`options`**: Optional settings to customize the formatting behavior.
- **`options.utc`**: If `true`, the date will be formatted in UTC (Coordinated
  Universal Time). Defaults to `false`.
- **`options.style`**: The linguistic style for formatting. Use "cbc" for
  English (default) or "rc" for French. This affects month and day names, and
  time representations.
- **`options.abbreviations`**: If `true`, month and day names will be
  abbreviated (e.g., "Jan.", "Mon."). Defaults to `false`.
- **`options.noZeroPadding`**: If `true`, single-digit days and months will not
  be padded with a leading zero (e.g., "1" instead of "01"). Defaults to
  `false`.
- **`options.threeLetterMonth`**: If `true`, month abbreviations will be three
  letters (e.g., "Jan", "Feb"). Defaults to `false`.
- **`options.timeZone`**: Specifies a time zone for formatting. Accepts standard
  IANA time zone names (e.g., "America/New_York") or specific Canadian time
  zones. If `utc` is `true`, this option is ignored.

### Returns

The formatted date string.

### Examples

```ts
// Basic usage: Format a date in default English style.
const date = new Date("2023-01-01T01:35:00.000Z");
const formatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
  utc: true,
});
console.log(formatted); // "January 1, 2023, at 1:35 a.m."
```

```ts
// Formatting in French style with abbreviations.
const frenchFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period", {
  style: "rc",
  abbreviations: true,
  utc: true,
});
console.log(frenchFormatted); // "1 janv. 2023 à 1 h 35"
```

```ts
// Formatting with a specific time zone.
const estFormatted = formatDate(date, "Month DD, YYYY, at HH:MM period TZ", {
  timeZone: "Canada/Eastern",
});
console.log(estFormatted); // "January 1, 2023, at 8:35 p.m. EST" (assuming date is UTC)
```

```ts
// Custom format: YYYY-MM-DD
const isoFormatted = formatDate(new Date("2024-03-15T10:00:00Z"), "YYYY-MM-DD");
console.log(isoFormatted); // "2024-03-15"
```

## formatNumber

Formats a number according to specified style, rounding, and display options.
This versatile function can handle various numerical formatting needs.

The function supports two main styles: "cbc" (Canadian Broadcasting Corporation
style, typically English) and "rc" (Radio-Canada style, typically French), which
dictate the thousands separator and decimal marker.

### Signature

```typescript
function formatNumber(
  number: number,
  options?: {
    style?: "cbc" | "rc";
    sign?: boolean;
    round?: boolean;
    decimals?: number;
    significantDigits?: number;
    fixed?: boolean;
    nearestInteger?: number;
    abbreviation?: boolean;
    prefix?: string;
    suffix?: string;
    position?: boolean;
  },
): string;
```

### Parameters

- **`number`**: The number to be formatted.
- **`options`**: An object containing various formatting options.
- **`options.style`**: The formatting style to apply. Can be "cbc" (default,
  typically English with comma thousands separator and dot decimal) or "rc"
  (typically French with space thousands separator and comma decimal).
- **`options.sign`**: If `true`, a "+" sign will be prepended to positive
  numbers. Negative numbers always retain their "-" sign. Defaults to `false`.
- **`options.round`**: If `true`, the number will be rounded to the nearest
  integer or based on `decimals`, `significantDigits`, or `nearestInteger`
  options. Defaults to `false`.
- **`options.decimals`**: The number of decimal places to round to.
- **`options.significantDigits`**: The number of significant digits to round to.
- **`options.fixed`**: If `true`, the number will be displayed with a fixed
  number of decimal places as specified by `decimals`, padding with zeros if
  necessary. Defaults to `false`.
- **`options.nearestInteger`**: The base to which the number should be rounded
  (e.g., 10 for rounding to the nearest ten, 100 for nearest hundred).
- **`options.abbreviation`**: If `true`, the number will be abbreviated (e.g.,
  1,200,000 becomes "1.2M"). Defaults to `false`.
- **`options.prefix`**: A string to prepend before the formatted number.
- **`options.suffix`**: A string to append after the formatted number.
- **`options.position`**: If `true`, formats the number as an ordinal position
  (e.g., "1st", "2nd" in English, "1er", "2e" in French).

### Returns

The formatted number as a string.

### Examples

```ts
// Basic usage: Format a number with thousands separator.
const num1 = formatNumber(1234567.89);
console.log(num1); // "1,234,567.89"
```

```ts
// With sign and rounding to 0 decimals.
const num2 = formatNumber(1234.567, { sign: true, decimals: 0 });
console.log(num2); // "+1,235"
```

```ts
// French style with abbreviation.
const num3 = formatNumber(1234567, { style: "rc", abbreviation: true });
console.log(num3); // "1,2 M"
```

```ts
// Fixed number of decimals with prefix and suffix.
const num4 = formatNumber(98.765, {
  decimals: 2,
  fixed: true,
  prefix: "$",
  suffix: " CAD",
});
console.log(num4); // "$98.77 CAD"
```

```ts
// Formatting as an ordinal position.
const position1 = formatNumber(1, { position: true });
console.log(position1); // "1st"

const position2 = formatNumber(2, { position: true, style: "rc" });
console.log(position2); // "2e"
```

## prettyDuration

Formats a duration into a human-readable string, breaking it down into years,
months, days, hours, minutes, seconds, and milliseconds. This function is useful
for displaying elapsed time in a user-friendly format, such as for performance
logging, task completion times, or general time tracking.

The function can calculate the duration from a given start time to the current
time, or between a specified start and end time. It provides options for logging
the output directly to the console and adding custom prefixes or suffixes to the
formatted string. Note that for simplicity, months are approximated as 30 days
and years as 365 days.

### Signature

```typescript
function prettyDuration(
  start: Date | number,
  options?: {
    log?: boolean;
    end?: Date | number;
    prefix?: string;
    suffix?: string;
  },
): string;
```

### Parameters

- **`start`**: - The starting point of the duration. This can be a `Date` object
  or a Unix timestamp (number of milliseconds since epoch).
- **`options`**: - Optional settings to customize the duration formatting and
  output.
- **`options.log`**: - If `true`, the formatted duration string will be logged
  to the console. Defaults to `false`.
- **`options.end`**: - The ending point of the duration. This can be a `Date`
  object or a Unix timestamp. If omitted, the current time (`Date.now()`) will
  be used as the end point.
- **`options.prefix`**: - A string to prepend to the formatted duration string
  (e.g., "Elapsed time: ").
- **`options.suffix`**: - A string to append to the formatted duration string
  (e.g., " (Task completed)").

### Returns

A human-readable string representing the duration.

### Examples

```ts
// A starting Date somewhere in your code.
const startDate = new Date(); // or Date.now()

// When you want to know the elapsed duration, pass the start date.
const duration = prettyDuration(startDate);
console.log(duration); // Returns something like "22 days, 6 h, 3 min, 15 sec, 3 ms"
```

```ts
// If you want to console.log it directly, set the `log` option to `true`.
// This will print the duration to the console and also return the string.
const startDateForLog = new Date();
// ... some operations ...
prettyDuration(startDateForLog, { log: true });
```

```ts
// You can also use a prefix and/or suffix for the output string.
const startDateWithPrefixSuffix = new Date();
// ... some operations ...
prettyDuration(startDateWithPrefixSuffix, {
  log: true,
  prefix: "Elapsed time: ",
  suffix: " (Main function)",
});
// Returns and logs something like "Total duration: 3 min, 15 sec, 3 ms (Main function)"
```

```ts
// If you want to format the duration between two specific dates, use the `end` option.
const start = new Date("2024-01-01T17:00:00");
const end = new Date("2024-01-23T23:03:15");
const specificDuration = prettyDuration(start, { end });
console.log(specificDuration); // Returns "22 days, 6 h, 3 min, 15 sec, 0 ms"
```

## round

Rounds a number based on specified criteria: a fixed number of decimal places,
to the nearest integer multiple, or to a specific number of significant digits.
This function provides flexible rounding capabilities essential for data
presentation and numerical accuracy.

By default, if no options are specified, the function rounds to the nearest
whole number.

### Signature

```typescript
function round(
  number: number,
  options?: {
    decimals?: number;
    nearestInteger?: number;
    significantDigits?: number;
    try?: boolean;
  },
): number;
```

### Parameters

- **`number`**: - The number to be rounded.
- **`options`**: - An object containing options for rounding.
- **`options.decimals`**: - The number of decimal places to keep when rounding.
  For example, `round(123.456, { decimals: 2 })` returns `123.46`.
- **`options.nearestInteger`**: - The base to which the number should be
  rounded. For example, `round(123, { nearestInteger: 10 })` rounds to `120`.
- **`options.significantDigits`**: - The number of significant digits to retain.
  Significant digits are counted from the first non-zero digit. For example,
  `round(0.004622, { significantDigits: 1 })` rounds to `0.005`.
- **`options.try`**: - If `true`, the function will return `NaN` (Not a Number)
  if the input `number` is not a valid number, instead of throwing an error.
  Defaults to `false`.

### Returns

The rounded number.

### Throws

- **`Error`**: If the input `number` is not a number (and `options.try` is not
  `true`), or if more than one rounding option (`decimals`, `nearestInteger`,
  `significantDigits`) is provided.

### Examples

```ts
// Round to the nearest integer (default behavior).
const resultDefault = round(1234.567);
console.log(resultDefault); // Expected output: 1235

// Round to one decimal place.
const resultDecimal = round(1234.567, { decimals: 1 });
console.log(resultDecimal); // Expected output: 1234.6
```

```ts
// Round 123 to the nearest multiple of 10.
const resultNearestInteger = round(123, { nearestInteger: 10 });
console.log(resultNearestInteger); // Expected output: 120

// Round 127 to the nearest multiple of 5.
const resultNearestFive = round(127, { nearestInteger: 5 });
console.log(resultNearestFive); // Expected output: 125
```

```ts
// Round 0.004622 to 1 significant digit.
const resultSignificantDigits = round(0.004622, { significantDigits: 1 });
console.log(resultSignificantDigits); // Expected output: 0.005

// Round 12345 to 2 significant digits.
const resultSignificantDigitsLarge = round(12345, { significantDigits: 2 });
console.log(resultSignificantDigitsLarge); // Expected output: 12000
```

```ts
// Attempting to round a non-numeric value without `try: true` will throw an error.
try {
  round("abc");
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: abc is not a number. If you want to return NaN instead of throwing an error, pass option {try: true}."
}

// With `try: true`, it returns NaN for non-numeric input.
const nanResult = round("abc", { try: true });
console.log(nanResult); // Expected output: NaN
```

```ts
// Providing multiple rounding options will throw an error.
try {
  round(123.45, { decimals: 1, significantDigits: 2 });
} catch (error) {
  console.error("Error:", error.message);
  // Expected output: "Error: You can't use options decimals, nearestInteger, or significantDigits together. Pick one."
}
```
