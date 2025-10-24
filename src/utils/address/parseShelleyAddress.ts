import { bech32 } from "bech32";

/**
 * Parsed Shelley address components
 */
interface ShelleyAddress {
  /** Network identifier: "mainnet" or "testnet" */
  network: string;
  /** Address type: "payment" or "stake" */
  addressType: string;
  /** Payment part type (e.g., "PaymentKeyHash", "ScriptHash") or null */
  paymentPart: string | null;
  /** Delegation part type (e.g., "StakeKeyHash", "ScriptHash", "Pointer") or null */
  delegationPart: string | null;
}

/**
 * Parses a Cardano Shelley-era address (bech32 format) into its constituent parts.
 *
 * Decodes a bech32-encoded Cardano address and extracts information about the network,
 * address type, payment part, and delegation part. Supports both payment addresses
 * (starting with "addr1" or "addr_test1") and stake addresses (starting with "stake1" or "stake_test1").
 *
 * @param address - The bech32-encoded Cardano address to parse
 * @returns Parsed address components or null if parsing fails
 *
 * @example
 * ```tsx
 * // Parse mainnet payment address with payment key and stake key
 * parseShelleyAddress("addr1qxyz...")
 * // Returns: {
 * //   network: "mainnet",
 * //   addressType: "payment",
 * //   paymentPart: "PaymentKeyHash",
 * //   delegationPart: "StakeKeyHash"
 * // }
 *
 * // Parse stake address
 * parseShelleyAddress("stake1uxyz...")
 * // Returns: {
 * //   network: "mainnet",
 * //   addressType: "stake",
 * //   paymentPart: null,
 * //   delegationPart: "StakeKeyHash"
 * // }
 *
 * // Parse testnet address
 * parseShelleyAddress("addr_test1qxyz...")
 * // Returns: {
 * //   network: "testnet",
 * //   addressType: "payment",
 * //   paymentPart: "PaymentKeyHash",
 * //   delegationPart: "StakeKeyHash"
 * // }
 *
 * // Invalid address format
 * parseShelleyAddress("invalid_address")
 * // Returns: null
 * ```
 */
export const parseShelleyAddress = (address: string): ShelleyAddress | null => {
  const MAINNET_NETWORK = "addr1";
  const TESTNET_NETWORK = "addr_test1";
  const MAINNET_STAKE = "stake1";
  const TESTNET_STAKE = "stake_test1";

  if (
    !address.startsWith(MAINNET_NETWORK) &&
    !address.startsWith(TESTNET_NETWORK) &&
    !address.startsWith(MAINNET_STAKE) &&
    !address.startsWith(TESTNET_STAKE)
  ) {
    console.error("Invalid Shelley or staking address format");
    return null;
  }

  let network = "";
  let addressType = "";

  if (address.startsWith(MAINNET_NETWORK)) {
    network = "mainnet";
    addressType = "payment";
  } else if (address.startsWith(TESTNET_NETWORK)) {
    network = "testnet";
    addressType = "payment";
  } else if (address.startsWith(MAINNET_STAKE)) {
    network = "mainnet";
    addressType = "stake";
  } else if (address.startsWith(TESTNET_STAKE)) {
    network = "testnet";
    addressType = "stake";
  }

  let decoded;

  try {
    decoded = bech32.decode(address, 1000);
  } catch (error) {
    console.error("Failed to decode address:", error);
    return null;
  }

  const data = bech32.fromWords(decoded.words);
  const headerByte = data[0];

  const partType = (headerByte >> 4) & 0b1111;

  if (addressType === "stake") {
    let delegationPart: string | null = null;

    switch (partType) {
      case 14:
        delegationPart = "StakeKeyHash";
        break;
      case 15:
        delegationPart = "ScriptHash";
        break;
      default:
        console.error("Invalid stake address type");
        return null;
    }

    return {
      network,
      addressType,
      paymentPart: null,
      delegationPart,
    };
  }

  let paymentPart: string | null = null;
  let delegationPart: string | null = null;

  switch (partType) {
    case 0:
      paymentPart = "PaymentKeyHash";
      delegationPart = "StakeKeyHash";
      break;
    case 1:
      paymentPart = "ScriptHash";
      delegationPart = "StakeKeyHash";
      break;
    case 2:
      paymentPart = "PaymentKeyHash";
      delegationPart = "ScriptHash";
      break;
    case 3:
      paymentPart = "ScriptHash";
      delegationPart = "ScriptHash";
      break;
    case 4:
      paymentPart = "PaymentKeyHash";
      delegationPart = "Pointer";
      break;
    case 5:
      paymentPart = "ScriptHash";
      delegationPart = "Pointer";
      break;
    case 6:
      paymentPart = "PaymentKeyHash";
      break;
    case 7:
      paymentPart = "ScriptHash";
      break;
    default:
      paymentPart = null;
      break;
  }

  return {
    network,
    addressType,
    paymentPart,
    delegationPart,
  };
};
