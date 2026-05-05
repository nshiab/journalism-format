/**
 * @module
 *
 * The Journalism library (formatting functions)
 *
 * To install the library with Deno, use:
 * ```bash
 * deno add jsr:@nshiab/journalism-format
 * ```
 *
 * To install the library with Node.js, use:
 * ```bash
 * npm i @nshiab/journalism-format
 * ```
 *
 * To import a function, use:
 * ```ts
 * import { functionName } from "@nshiab/journalism-format";
 * ```
 */

import formatDate from "./format/formatDate.ts";
import formatNumber from "./format/formatNumber.ts";
import round from "./format/round.ts";
import prettyDuration from "./format/prettyDuration.ts";
import arraysToData from "./format/arraysToData.ts";
import dataToArrays from "./format/dataToArrays.ts";
import dataAsCsv from "./format/dataAsCsv.ts";
import capitalize from "./format/capitalize.ts";
import camelCase from "./format/camelCase.ts";
import printTable from "./format/printTable.ts";
import normalizeString from "./format/normalizeString.ts";

export {
  arraysToData,
  camelCase,
  capitalize,
  dataAsCsv,
  dataToArrays,
  formatDate,
  formatNumber,
  normalizeString,
  prettyDuration,
  printTable,
  round,
};
