import AssetFingerprint from "@emurgo/cip14-js";
import { Buffer } from "buffer";

/**
 * Generates a CIP-14 asset fingerprint for a Cardano native asset.
 *
 * Creates a human-readable asset fingerprint from a policy ID and asset name
 * according to CIP-14 (Cardano Improvement Proposal 14). The fingerprint provides
 * a standardized way to reference assets in a compact, user-friendly format.
 *
 * Supports two input formats:
 * - Concatenated: "policyId" + "assetName" (56 chars policy + remaining chars asset)
 * - Dot-separated: "policyId.assetName"
 *
 * @param assetName - The asset identifier in hex format (policyId + assetName or policyId.assetName)
 * @returns CIP-14 asset fingerprint (e.g., "asset1xyz...")
 *
 * @example
 * ```tsx
 * // Concatenated format (policy ID is first 56 hex chars)
 * getAssetFingerprint("000de140...56chars...68656c6c6f")
 * // Returns: "asset1abc123..." (CIP-14 fingerprint)
 *
 * // Dot-separated format
 * getAssetFingerprint("000de140abcd1234.68656c6c6f")
 * // Returns: "asset1xyz789..." (CIP-14 fingerprint)
 *
 * // Ada Handle example
 * getAssetFingerprint("f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a.68656c6c6f")
 * // Returns: "asset1..." (unique fingerprint for this handle)
 * ```
 */
export function getAssetFingerprint(assetName: string) {
  const policyId = assetName.includes(".")
    ? assetName.split(".")[0]
    : assetName.slice(0, 56);
  const name = assetName.includes(".")
    ? assetName.split(".")[1]
    : assetName.slice(56);

  const assetFingerprint = AssetFingerprint.fromParts(
    Buffer.from(policyId, "hex"),
    Buffer.from(name, "hex"),
  );

  return assetFingerprint.fingerprint();
}
