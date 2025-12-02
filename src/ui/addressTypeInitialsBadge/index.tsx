import { Tooltip } from "@/ui/tooltip";
import { getAddressTypeInitials } from "@/utils/address/getAddressTypeInitials";
import { parseShelleyAddress } from "@/utils/address/parseShelleyAddress";

/**
 * Props for the AddressTypeInitialsBadge component
 */
export interface AddressTypeInitialsBadgeProps {
  /**
   * The Cardano address to parse and display type information for.
   * Can be a payment address, stake address, or mixed address.
   * The component automatically parses the address to determine payment and delegation parts.
   *
   * @example
   * // Payment address
   * <AddressTypeInitialsBadge address="addr1qxy...abc123" />
   *
   * @example
   * // Stake address
   * <AddressTypeInitialsBadge address="stake1u8p...def456" />
   */
  address: string;

  /**
   * Optional CSS class name to apply custom styles to the badge.
   *
   * @example
   * <AddressTypeInitialsBadge address="addr1..." className="ml-2" />
   */
  className?: string;
}

/**
 * AddressTypeInitialsBadge displays color-coded initials representing the type of a Cardano address with tooltips.
 *
 * This component parses a Cardano Shelley address to extract its payment and delegation parts,
 * then displays abbreviated type indicators (initials) with color coding. Each address type is
 * represented by specific initials and a unique color scheme. Hovering over a badge shows the
 * full address type in a tooltip.
 *
 * **Address Type Initials:**
 * - **PKH** (PaymentKeyHash): Pink badge - Payment controlled by a key hash
 * - **SH** (ScriptHash): Green badge - Payment controlled by a script
 * - **SKH** (StakeKeyHash): Blue badge - Delegation to a key hash
 * - **PTR** (Pointer): Purple badge - Pointer to stake credentials
 * - **KH** (KeyHash): Pink badge - Special case when both payment and delegation are KeyHash
 *
 * **Color Scheme:**
 * - Pink (100/800): PaymentKeyHash (PKH) or KeyHash (KH)
 * - Green (100/800): ScriptHash (SH)
 * - Blue (100/800): StakeKeyHash (SKH)
 * - Purple (100/800): Pointer (PTR)
 * - Gray (100/800): Unknown or default types
 *
 * **Badge Display Logic:**
 * - **Single badge (KH)**: Shown when both payment and delegation parts are KeyHash
 * - **Payment badge only**: Shown for non-stake addresses or when payment differs from delegation
 * - **Delegation badge only**: Shown for stake addresses or when delegation differs from payment
 * - **Both badges**: Shown when address has distinct payment and delegation parts
 *
 * **Common Use Cases:**
 * - Display address type information in transaction inputs/outputs
 * - Show address composition in address detail views
 * - Indicate address types in address lists and explorers
 * - Visualize payment and delegation components of addresses
 *
 * @component
 * @example
 * ```tsx
 * // Payment address with PaymentKeyHash
 * <AddressTypeInitialsBadge address="addr1qxy2...abc123" />
 * // Displays: PKH badge (pink)
 *
 * // Stake address with StakeKeyHash
 * <AddressTypeInitialsBadge address="stake1u8p...def456" />
 * // Displays: SKH badge (blue)
 *
 * // Script address with ScriptHash
 * <AddressTypeInitialsBadge address="addr1w8s...ghi789" />
 * // Displays: SH badge (green)
 *
 * // Mixed address with payment and delegation
 * <AddressTypeInitialsBadge address="addr1qxyz...mixed" />
 * // Displays: PKH badge + SKH badge (pink + blue)
 *
 * // KeyHash address (both parts are KeyHash)
 * <AddressTypeInitialsBadge address="addr1q...keyhash" />
 * // Displays: KH badge (pink)
 *
 * // With custom className
 * <AddressTypeInitialsBadge address="addr1..." className="ml-2" />
 *
 * // In transaction output list
 * {outputs.map(output => (
 *   <div key={output.index} className="flex items-center gap-2">
 *     <AddressTypeInitialsBadge address={output.address} />
 *     <span className="font-mono">{output.address}</span>
 *     <span>{output.amount} ADA</span>
 *   </div>
 * ))}
 *
 * // In address detail view
 * <div className="flex items-center gap-2">
 *   <h3>Address Type:</h3>
 *   <AddressTypeInitialsBadge address={addressData.address} />
 * </div>
 * ```
 *
 * @param {AddressTypeInitialsBadgeProps} props - Component props
 * @param {string} props.address - The Cardano address to parse and display
 * @param {string} [props.className] - Optional CSS class for custom styling
 * @returns {JSX.Element} One or two color-coded badges with tooltips showing address type information
 */
export const AddressTypeInitialsBadge = ({
  address,
  className,
}: AddressTypeInitialsBadgeProps) => {
  const delegationPart = parseShelleyAddress(address)?.delegationPart;
  const paymentPart = parseShelleyAddress(address)?.paymentPart;

  const shouldRenderPayment =
    (paymentPart && !address.includes("stake")) ||
    (paymentPart && delegationPart !== paymentPart);
  const shouldRenderDelegation =
    delegationPart &&
    (address.includes("stake") || delegationPart !== paymentPart);

  let paymentBgColor;
  let paymentTextColor;
  let delegationBgColor;
  let delegationTextColor;

  switch (getAddressTypeInitials(paymentPart)) {
    case "PKH":
      paymentBgColor = "bg-pink-100";
      paymentTextColor = "text-pink-800";
      break;
    case "SH":
      paymentBgColor = "bg-green-100";
      paymentTextColor = "text-green-800";
      break;
    case "SKH":
      paymentBgColor = "bg-blue-100";
      paymentTextColor = "text-blue-800";
      break;
    case "PTR":
      paymentBgColor = "bg-purple-100";
      paymentTextColor = "text-purple-800";
      break;
    default:
      paymentBgColor = "bg-gray-100";
      paymentTextColor = "text-gray-800";
  }

  switch (getAddressTypeInitials(delegationPart)) {
    case "PKH":
      delegationBgColor = "bg-pink-100";
      delegationTextColor = "text-pink-800";
      break;
    case "SH":
      delegationBgColor = "bg-green-100";
      delegationTextColor = "text-green-800";
      break;
    case "SKH":
      delegationBgColor = "bg-blue-100";
      delegationTextColor = "text-blue-800";
      break;
    default:
      delegationBgColor = "bg-gray-100";
      delegationTextColor = "text-gray-800";
  }

  if (paymentPart?.includes("Key") && delegationPart?.includes("Key")) {
    return (
      <Tooltip
        content={<div className='min-w-[50px] text-center'>KeyHash</div>}
      >
        <span
          className={`flex w-fit items-center gap-1/2 rounded-xs border ${paymentBgColor} px-1 py-0 text-right text-[10px] font-bold ${paymentTextColor} ${className}`}
        >
          KH
        </span>
      </Tooltip>
    );
  }

  return (
    <div className='flex items-center gap-1'>
      {shouldRenderPayment && (
        <Tooltip
          content={
            <div className='min-w-[50px] text-center'>{paymentPart}</div>
          }
        >
          <span
            className={`flex w-fit items-center gap-1/2 rounded-xs border ${paymentBgColor} px-1 py-0 text-right text-[10px] font-bold ${paymentTextColor} ${className}`}
          >
            {getAddressTypeInitials(paymentPart)}
          </span>
        </Tooltip>
      )}
      {shouldRenderDelegation && (
        <Tooltip
          content={
            <div className='min-w-[50px] text-center'>{delegationPart}</div>
          }
        >
          <span
            className={`flex w-fit items-center gap-1 rounded-xs border ${delegationBgColor} px-1.5 py-0 text-right text-[10px] font-bold ${delegationTextColor} ${className}`}
          >
            {getAddressTypeInitials(delegationPart)}
          </span>
        </Tooltip>
      )}
    </div>
  );
};
