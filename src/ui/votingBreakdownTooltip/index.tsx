import type { FC } from "react";
import { Tooltip } from "@/ui/tooltip";
import { Info } from "lucide-react";

/**
 * Props for the VotingBreakdownTooltip component
 */
export interface VotingBreakdownTooltipProps {
  /**
   * Number of voters who cast this vote
   *
   * @example
   * <VotingBreakdownTooltip voters={125} delegators={350} />
   */
  voters?: number;

  /**
   * Number of delegators represented by these voters
   * For SPO votes, this represents the number of stake pools
   *
   * @example
   * // DRep voting
   * <VotingBreakdownTooltip voters={50} delegators={1250} voterType="drep" />
   *
   * // SPO voting
   * <VotingBreakdownTooltip voters={30} delegators={45} voterType="spo" />
   */
  delegators?: number;

  /**
   * Amount of stake that automatically voted "Abstain"
   * Only displayed when type is "Abstain"
   *
   * @example
   * <VotingBreakdownTooltip
   *   type="Abstain"
   *   autoStake={1500000}
   *   manualStake={500000}
   * />
   */
  autoStake?: number;

  /**
   * Amount of stake that manually voted "Abstain"
   * Only displayed when type is "Abstain"
   *
   * @example
   * <VotingBreakdownTooltip
   *   type="Abstain"
   *   autoStake={1500000}
   *   manualStake={500000}
   * />
   */
  manualStake?: number;

  /**
   * Type of vote this breakdown represents
   * Determines whether to show auto/manual stake breakdown
   *
   * @example
   * <VotingBreakdownTooltip type="Yes" voters={100} />
   * <VotingBreakdownTooltip type="Abstain" autoStake={1000} manualStake={500} />
   */
  type?: "Abstain" | "No confidence" | "Yes" | "No" | "Not voted";

  /**
   * Type of voter (DRep or SPO)
   * Determines the label for delegators/stake pools
   * @default "drep"
   *
   * @example
   * // Shows "delegators"
   * <VotingBreakdownTooltip voters={50} delegators={200} voterType="drep" />
   *
   * // Shows "stake pools"
   * <VotingBreakdownTooltip voters={30} delegators={45} voterType="spo" />
   */
  voterType?: "drep" | "spo";
}

/**
 * VotingBreakdownTooltip displays detailed voting information in a tooltip with an info icon.
 *
 * This component provides a breakdown of voting data for blockchain governance, showing
 * the number of voters, delegators (or stake pools), and stake distribution. For "Abstain"
 * votes, it also displays the split between automatic and manual abstentions. The tooltip
 * appears when hovering over an info icon, making it perfect for displaying supplementary
 * voting details without cluttering the main UI.
 *
 * **Key Features:**
 * - Shows voter count with singular/plural handling
 * - Displays delegator or stake pool representation
 * - Special handling for "Abstain" votes with auto/manual stake breakdown
 * - Supports both DRep and SPO voting contexts
 * - Info icon trigger for clean UI integration
 *
 * **Vote Types:**
 * - **Yes/No**: Shows voters and delegators/pools
 * - **Abstain**: Shows voters, delegators, auto stake, and manual stake
 * - **No confidence**: Shows voters and delegators
 * - **Not voted**: Shows representation data
 *
 * **Voter Types:**
 * - **drep**: Uses "delegator/delegators" terminology
 * - **spo**: Uses "stake pool/stake pools" terminology
 *
 * **Common Use Cases:**
 * - Display voting breakdown in governance proposals
 * - Show delegation representation in voting results
 * - Explain abstention types (automatic vs manual)
 * - Provide detailed voting statistics
 * - Show SPO voting participation
 * - Display DRep voting breakdown
 *
 * @component
 * @example
 * ```tsx
 * // Basic DRep voting breakdown
 * <VotingBreakdownTooltip
 *   voters={125}
 *   delegators={3500}
 *   type="Yes"
 * />
 * // Tooltip shows: "125 voters" and "Represented by 3,500 delegators"
 *
 * // SPO voting breakdown
 * <VotingBreakdownTooltip
 *   voters={30}
 *   delegators={45}
 *   type="Yes"
 *   voterType="spo"
 * />
 * // Tooltip shows: "30 voters" and "Represented by 45 stake pools"
 *
 * // Abstain vote with stake breakdown
 * <VotingBreakdownTooltip
 *   voters={50}
 *   delegators={1200}
 *   type="Abstain"
 *   autoStake={1500000}
 *   manualStake={500000}
 * />
 * // Tooltip shows voters, delegators, auto stake, and manual stake
 *
 * // Single voter (singular form)
 * <VotingBreakdownTooltip
 *   voters={1}
 *   delegators={15}
 *   type="No"
 * />
 * // Tooltip shows: "1 voter" and "Represented by 15 delegators"
 *
 * // In a voting result display
 * <div className="flex items-center">
 *   <span>Yes: 125 votes</span>
 *   <VotingBreakdownTooltip voters={125} delegators={3500} type="Yes" />
 * </div>
 * ```
 *
 * @param {VotingBreakdownTooltipProps} props - Component props
 * @param {number} [props.voters] - Number of voters who cast this vote
 * @param {number} [props.delegators] - Number of delegators or stake pools represented
 * @param {number} [props.autoStake] - Automatic abstention stake (Abstain only)
 * @param {number} [props.manualStake] - Manual abstention stake (Abstain only)
 * @param {"Abstain" | "No confidence" | "Yes" | "No" | "Not voted"} [props.type] - Vote type
 * @param {"drep" | "spo"} [props.voterType="drep"] - Type of voter (DRep or SPO)
 * @returns {JSX.Element} Info icon with voting breakdown tooltip
 */
export const VotingBreakdownTooltip: FC<VotingBreakdownTooltipProps> = ({
  voters,
  delegators,
  autoStake,
  manualStake,
  type,
  voterType = "drep",
}) => {
  return (
    <Tooltip
      content={
        <div className='flex flex-col gap-1/2 text-text-sm text-text'>
          {voters !== undefined && (
            <span>
              <b>{voters}</b> {voters === 1 ? "voter" : "voters"}
            </span>
          )}
          {delegators !== undefined && (
            <span>
              Represented by <b>{delegators}</b>{" "}
              {voterType === "spo"
                ? `stake pool${delegators !== 1 ? "s" : ""}`
                : `delegator${delegators !== 1 ? "s" : ""}`}
            </span>
          )}
          {type === "Abstain" &&
            autoStake !== undefined &&
            manualStake !== undefined && (
              <>
                <span>
                  Auto stake: <b>{autoStake}</b>
                </span>
                <span>
                  Manual stake: <b>{manualStake}</b>
                </span>
              </>
            )}
        </div>
      }
    >
      <Info
        size={14}
        className='ml-1/2 cursor-pointer text-grayTextSecondary'
      />
    </Tooltip>
  );
};
