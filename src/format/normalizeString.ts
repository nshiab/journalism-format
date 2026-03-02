/**
 * Normalizes a string by converting it to lowercase and stripping accents.
 *
 * @param string The string to be normalized.
 *
 * @returns A new string with characters in lowercase and without accents.
 *
 * @example
 * ```ts
 * // Basic usage
 * const normalized = normalizeString("Évènement");
 * console.log(normalized); // "evenement"
 * ```
 * @example
 * ```ts
 * // With accents and uppercase
 * const normalized = normalizeString("Niño");
 * console.log(normalized); // "nino"
 * ```
 * @category Formatting
 */
export default function normalizeString(string: string): string {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
