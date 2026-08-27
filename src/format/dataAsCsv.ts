function pad(value: number, width: number): string {
  return String(value).padStart(width, "0");
}

function formatYear(year: number): string {
  if (year < 0) return `-${pad(-year, 6)}`;
  if (year > 9999) return `+${pad(year, 6)}`;
  return pad(year, 4);
}

function formatCsvDate(date: Date): string {
  if (Number.isNaN(Number(date))) return "Invalid Date";

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const milliseconds = date.getUTCMilliseconds();
  const day = formatYear(date.getUTCFullYear()) + "-" +
    pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2);

  if (milliseconds !== 0) {
    return `${day}T${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${
      pad(milliseconds, 3)
    }Z`;
  }
  if (seconds !== 0) {
    return `${day}T${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}Z`;
  }
  if (minutes !== 0 || hours !== 0) {
    return `${day}T${pad(hours, 2)}:${pad(minutes, 2)}Z`;
  }
  return day;
}

function formatCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const string = value instanceof Date ? formatCsvDate(value) : String(value);
  return /[",\n\r]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
}

function inferColumns(rows: { [key: string]: unknown }[]): string[] {
  const columns: string[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    for (const column in row) {
      if (seen.has(column)) continue;
      seen.add(column);
      columns.push(column);
    }
  }
  return columns;
}

/**
 * Converts an array of objects into a CSV (Comma-Separated Values) string.
 *
 * The function takes an array of objects and returns a string in CSV format. The first line contains the union of keys found across all objects, in discovery order. Each subsequent line represents an object, with values in the same order as the headers.
 *
 * @param arrayOfObjects The objects to convert. Rows may have different keys;
 * columns are inferred from all rows.
 *
 * @returns A string representing the data in CSV format.
 *
 * @example
 * ```ts
 * // Basic usage with a simple dataset
 * const dataset = [
 *   { make: "Toyota", model: "Camry", year: 2021 },
 *   { make: "Honda", model: "Accord", year: 2022 },
 *   { make: "Ford", model: "Mustang", year: 2020 }
 * ];
 *
 * const csvString = dataAsCsv(dataset);
 *
 * console.log(csvString);
 * // Expected output:
 * // "make,model,year\nToyota,Camry,2021\nHonda,Accord,2022\nFord,Mustang,2020"
 * ```
 * @category Formatting
 */
export default function dataAsCsv(
  arrayOfObjects: { [key: string]: unknown }[],
): string {
  const columns = inferColumns(arrayOfObjects);
  return [
    columns.map(formatCsvValue).join(","),
    ...arrayOfObjects.map((row) =>
      columns.map((column) => formatCsvValue(row[column])).join(",")
    ),
  ].join("\n");
}
