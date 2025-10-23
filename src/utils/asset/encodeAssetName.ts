/**
 * Decodes a hexadecimal-encoded Cardano asset name to a readable string.
 *
 * Converts a hex-encoded asset name (policy ID + asset name) to its UTF-8 string representation.
 * If the hex string is longer than 56 characters (policy ID length), it extracts only the
 * asset name portion (characters after position 56).
 *
 * @param hex - Hexadecimal string or number representing the asset name
 * @returns Decoded asset name as a UTF-8 string, or empty string if input is falsy
 *
 * @example
 * ```tsx
 * // Decode Ada Handle hex name
 * encodeAssetName("68656c6c6f")
 * // Returns: "hello"
 *
 * // Decode from full policy ID + asset name (extracts asset name part)
 * encodeAssetName("000de140...56chars...68656c6c6f")
 * // Returns: "hello" (only the part after 56 chars)
 *
 * // Empty input
 * encodeAssetName("")
 * // Returns: ""
 *
 * // NFT asset name
 * encodeAssetName("4d794e4654")
 * // Returns: "MyNFT"
 * ```
 */
export const encodeAssetName = (hex: string | number): string => {
  if (!hex) {
    return "";
  }

  let str = "";
  const strHex =
    hex.toString().length > 56 ? hex.toString().slice(56) : hex.toString();
  for (let i = 0; i < strHex.length; i += 2) {
    const hexCode = strHex.substr(i, 2);
    const charCode = parseInt(hexCode, 16);
    str += String.fromCharCode(charCode);
  }
  return str;
};
