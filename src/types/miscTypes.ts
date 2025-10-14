import { ResponseCore } from "./commonTypes";

/**
 * Search result item for blockchain entities.
 *
 * @interface MiscSearch
 */
export interface MiscSearch {
  /**
   * URL path to the entity detail page.
   *
   * @example "/transaction/0x123abc"
   * @example "/pool/pool1abc"
   */
  url: string;
  /**
   * Unique identifier for the entity.
   *
   * @example "0x123abc..."
   * @example "pool1abc..."
   */
  ident: string;
  /**
   * Display title for the search result.
   *
   * @example "Transaction #123"
   * @example "ACME Stake Pool"
   */
  title: string;
  /**
   * Category of the blockchain entity.
   *
   * @example "transaction"
   * @example "pool"
   * @example "address"
   */
  category: string;
  /**
   * Additional metadata about the search result.
   */
  extra: {
    /**
     * Icon type to display.
     */
    icon: "balance" | "time" | "hot" | "promo";
    /**
     * Data type for the value field.
     */
    type: "balance" | "time" | "stake";
    /**
     * Associated value (balance, timestamp, etc.).
     *
     * @example 1000000 // lovelace
     * @example "2024-01-15T10:30:00Z"
     */
    value: number | string;
    /**
     * Optional additional identifier.
     */
    id?: string;
  };
}

/**
 * API response for search queries.
 *
 * Can return either a single result or an array of results.
 *
 * @typedef {ResponseCore<MiscSearch[] | MiscSearch>} MiscSearchResponse
 */
export type MiscSearchResponse = ResponseCore<MiscSearch[] | MiscSearch>;
