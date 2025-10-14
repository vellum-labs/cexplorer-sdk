/**
 * Core API response structure.
 *
 * @template T - Type of the data payload
 * @interface ResponseCore
 */
export interface ResponseCore<T> {
  /**
   * HTTP status code.
   *
   * @example 200
   * @example 404
   */
  code: number;
  /**
   * Response data payload.
   */
  data: T;
  /**
   * Number of tokens used for the request.
   */
  tokens: number;
  /**
   * Execution time in milliseconds.
   */
  ex: number;
  /**
   * Whether debug mode is enabled.
   */
  debug: boolean;
}

/**
 * Supported locale codes for internationalization.
 *
 * @typedef {string} Locales
 * @example "en" // English
 * @example "cz" // Czech
 * @example "es" // Spanish
 */
export type Locales = "en" | "cz" | "es";
