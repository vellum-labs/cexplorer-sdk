import { Code, User } from "lucide-react";
import { Badge } from "@/ui/badge";

/**
 * Props for the ScriptBadge component
 */
export interface ScriptBadgeProps {
  /**
   * Whether the address is a script address or a regular user address.
   * - `true`: Script address - displays yellow badge with Code icon
   * - `false`: Non-script address - displays blue badge with User icon
   *
   * @example
   * <ScriptBadge isScript={true} />
   */
  isScript: boolean;
}

/**
 * ScriptBadge displays a badge indicating whether an address is a script or non-script address on Cardano.
 *
 * This component renders a colored badge with an icon that distinguishes between script addresses
 * (smart contracts) and non-script addresses (regular user wallets). Script addresses are shown
 * with a yellow badge and Code icon, while non-script addresses use a blue badge and User icon.
 *
 * **Badge Types:**
 * - **Script**: Yellow badge with Code icon - indicates a smart contract or script address
 * - **Non-script**: Blue badge with User icon - indicates a regular user wallet address
 *
 * **Common Use Cases:**
 * - Identify address types in transaction details (inputs/outputs)
 * - Distinguish smart contract addresses in address lists
 * - Show address types in UTxO explorers
 * - Label addresses in transaction history and address search results
 *
 * @component
 * @example
 * ```tsx
 * // Script address (smart contract)
 * <ScriptBadge isScript={true} />
 *
 * // Non-script address (user wallet)
 * <ScriptBadge isScript={false} />
 *
 * // In transaction output list
 * {outputs.map(output => (
 *   <div key={output.index} className="flex items-center gap-2">
 *     <ScriptBadge isScript={output.isScript} />
 *     <span>{output.address}</span>
 *     <span>{output.amount} ADA</span>
 *   </div>
 * ))}
 *
 * // In address detail view
 * <div className="flex items-center gap-2">
 *   <h2>Address Details</h2>
 *   <ScriptBadge isScript={addressData.isScript} />
 * </div>
 *
 * // Conditional rendering based on address type
 * {address.isScript ? (
 *   <div>
 *     <ScriptBadge isScript={true} />
 *     <p>This is a smart contract address</p>
 *   </div>
 * ) : (
 *   <div>
 *     <ScriptBadge isScript={false} />
 *     <p>This is a user wallet address</p>
 *   </div>
 * )}
 * ```
 *
 * @param {ScriptBadgeProps} props - Component props
 * @param {boolean} props.isScript - Whether the address is a script address
 * @returns {JSX.Element} A colored badge with icon indicating script or non-script address
 */
export const ScriptBadge = ({ isScript }: ScriptBadgeProps) => {
  if (!isScript) {
    return (
      <Badge color='blue'>
        <User size={15} />
        Non-script
      </Badge>
    );
  }
  return (
    <Badge color='yellow'>
      <Code size={15} />
      Script
    </Badge>
  );
};
