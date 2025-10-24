/**
 * Converts Cardano address type string to abbreviated initials.
 *
 * Maps full address type names to their standard abbreviations used in
 * Cardano blockchain address components.
 *
 * @param type - The address type string (e.g., "PaymentKeyHash", "ScriptHash")
 * @returns The abbreviated initials (e.g., "PKH", "SH") or empty string if type is invalid/null
 *
 * @example
 * ```tsx
 * // Payment key hash
 * getAddressTypeInitials("PaymentKeyHash")
 * // Returns: "PKH"
 *
 * // Script hash
 * getAddressTypeInitials("ScriptHash")
 * // Returns: "SH"
 *
 * // Stake key hash
 * getAddressTypeInitials("StakeKeyHash")
 * // Returns: "SKH"
 *
 * // Invalid or null type
 * getAddressTypeInitials(null)
 * // Returns: ""
 * ```
 */
export const getAddressTypeInitials = (
  type: string | null | undefined,
): string => {
  switch (type) {
    case "PaymentKeyHash":
      return "PKH";
    case "ScriptHash":
      return "SH";
    case "StakeKeyHash":
      return "SKH";
    case "Pointer":
      return "PTR";
    default:
      return "";
  }
};
