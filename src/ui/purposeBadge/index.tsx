import { Badge } from "@/ui/badge";

/**
 * Props for the PurposeBadge component
 */
export interface PurposeBadgeProps {
  /**
   * The redeemer purpose type in Cardano transactions.
   * Determines the badge color through hue rotation:
   * - `"spent"`: Purple base color (0° rotation)
   * - `"mint"`: Rotated color (35° rotation)
   * - `"cert"`: Rotated color (70° rotation)
   * - `"reward"`: Rotated color (105° rotation)
   * - `"vote"`: Rotated color (140° rotation)
   * - `"propose"`: Rotated color (175° rotation)
   *
   * @example
   * <PurposeBadge purpose="spent" />
   */
  purpose: string;

  /**
   * Optional CSS class name to apply custom styles to the badge.
   *
   * @example
   * <PurposeBadge purpose="mint" className="ml-2" />
   */
  className?: string;
}

/**
 * PurposeBadge displays a colored badge indicating the redeemer purpose in Cardano transactions.
 *
 * This component renders a rounded badge with dynamically colored text based on the redeemer purpose.
 * Each purpose type gets a unique color through hue rotation, making it easy to visually distinguish
 * between different redeemer purposes in transaction details. If no purpose is provided, the component
 * returns null.
 *
 * **Purpose Types:**
 * - **spent**: Spending UTxOs - purple base color
 * - **mint**: Minting/burning tokens - rotated hue
 * - **cert**: Certificate operations - rotated hue
 * - **reward**: Reward withdrawals - rotated hue
 * - **vote**: Governance voting - rotated hue
 * - **propose**: Governance proposals - rotated hue
 *
 * **Color System:**
 * - Uses hue rotation for color differentiation
 * - Each purpose gets a unique color (35° increments)
 * - Maintains consistent visual hierarchy
 * - Easy to distinguish at a glance
 *
 * **Common Use Cases:**
 * - Display redeemer purposes in transaction details
 * - Show script execution purposes in smart contract interactions
 * - Label Plutus script redeemers in transaction explorers
 * - Identify purpose types in UTxO spending contexts
 *
 * @component
 * @example
 * ```tsx
 * // Spent purpose
 * <PurposeBadge purpose="spent" />
 *
 * // Mint purpose
 * <PurposeBadge purpose="mint" />
 *
 * // Certificate purpose
 * <PurposeBadge purpose="cert" />
 *
 * // Reward withdrawal purpose
 * <PurposeBadge purpose="reward" />
 *
 * // Vote purpose
 * <PurposeBadge purpose="vote" />
 *
 * // Propose purpose
 * <PurposeBadge purpose="propose" />
 *
 * // With custom className
 * <PurposeBadge purpose="mint" className="ml-2" />
 *
 * // In transaction redeemer list
 * {redeemers.map((redeemer, index) => (
 *   <div key={index} className="flex items-center gap-2">
 *     <PurposeBadge purpose={redeemer.purpose} />
 *     <span>{redeemer.scriptHash}</span>
 *   </div>
 * ))}
 *
 * // In Plutus script execution details
 * <div className="flex items-center gap-2">
 *   <span>Purpose:</span>
 *   <PurposeBadge purpose={scriptExecution.purpose} />
 * </div>
 *
 * // Conditional rendering
 * {transaction.redeemer && (
 *   <PurposeBadge purpose={transaction.redeemer.purpose} />
 * )}
 * ```
 *
 * @param {PurposeBadgeProps} props - Component props
 * @param {string} props.purpose - The redeemer purpose type (spent, mint, cert, reward, vote, propose)
 * @param {string} [props.className] - Optional CSS class for custom styling
 * @returns {JSX.Element | null} A colored badge with capitalized purpose text, or null if purpose is empty
 */
export const PurposeBadge = ({
  purpose,
  className,
}: PurposeBadgeProps) => {
  enum Purpose {
    spent,
    mint,
    cert,
    reward,
    vote,
    propose,
  }

  if (!purpose) return null;

  return (
    <Badge
      style={{ filter: `hue-rotate(${Purpose[purpose] * 35}deg)` }}
      color='purple'
      rounded
      className={className}
    >
      {purpose.slice(0, 1).toUpperCase() + purpose.slice(1)}
    </Badge>
  );
};
