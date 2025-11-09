import type { FC } from "react";
import { PulseDot } from "@/ui/pulseDot";
import {
  getGovActionStatus,
  type GovActionStatus,
  type GovernanceEpochs,
} from "@/utils/gov/getGovActionStatus";

/**
 * Props for the GovernanceStatusBadge component
 */
export interface GovernanceStatusBadgeProps {
  /**
   * The governance action item containing epoch information for determining status.
   * Includes dropped_epoch, enacted_epoch, expired_epoch, and ratified_epoch fields.
   *
   * @example
   * <GovernanceStatusBadge
   *   item={{
   *     ratified_epoch: 450,
   *     enacted_epoch: null,
   *     expired_epoch: null,
   *     dropped_epoch: null
   *   }}
   *   currentEpoch={452}
   * />
   */
  item: GovernanceEpochs;

  /**
   * The current epoch number used to determine the status of the governance action.
   * Compared against the item's epoch fields to calculate the current status.
   *
   * @example
   * <GovernanceStatusBadge item={action} currentEpoch={455} />
   */
  currentEpoch: number;
}

/**
 * Helper function to get the color for a governance action status.
 *
 * @param {GovActionStatus} status - The governance action status
 * @returns {string} The hex color code for the status
 */
const getStatusColor = (status: GovActionStatus): string => {
  switch (status) {
    case "Active":
      return "#10B981"; // Emerald Teal - In progress/voting
    case "Ratified":
      return "#00A9E3"; // Blue - Approved, waiting for enactment
    case "Enacted":
      return "#886fe2"; // Bright Indigo - Successfully completed
    case "Expired":
      return "#F79009"; // Orange - Failed/expired
    case "Dropped":
      return "#EF4444"; // Red - Explicitly dropped/withdrawn
    default:
      return "#10B981"; // Default to Active color
  }
};

/**
 * GovernanceStatusBadge displays the current status of a Cardano governance action with a colored pulse indicator.
 *
 * This component renders a badge showing the governance action's status based on epoch information.
 * The status is automatically calculated by comparing the current epoch against the action's
 * dropped_epoch, enacted_epoch, expired_epoch, and ratified_epoch values. Each status has a
 * unique color, and the "Active" status includes an animated pulse dot.
 *
 * **Status Types:**
 * - **Active**: Green (#10B981) with animated pulse - Currently in voting period
 * - **Ratified**: Blue (#00A9E3) - Approved by voters, waiting for enactment
 * - **Enacted**: Indigo (#886fe2) - Successfully executed and completed
 * - **Expired**: Orange (#F79009) - Expired without enactment
 * - **Dropped**: Red (#EF4444) - Explicitly dropped/withdrawn
 *
 * **Status Calculation Logic:**
 * 1. **Enacted**: If enacted_epoch exists and current epoch >= enacted_epoch
 * 2. **Dropped**: If dropped_epoch exists and current epoch >= dropped_epoch
 * 3. **Expired**: If expired_epoch exists and current epoch >= expired_epoch
 * 4. **Ratified**: If ratified_epoch exists but not yet enacted
 * 5. **Active**: Default state - proposal is open for voting
 *
 * **Common Use Cases:**
 * - Display governance proposal status in proposal listings
 * - Show governance action status in detail views
 * - Indicate current state in governance dashboards
 * - Track proposal lifecycle in governance activity feeds
 *
 * @component
 * @example
 * ```tsx
 * // Active proposal (currently voting)
 * <GovernanceStatusBadge
 *   item={{
 *     ratified_epoch: null,
 *     enacted_epoch: null,
 *     expired_epoch: null,
 *     dropped_epoch: null
 *   }}
 *   currentEpoch={450}
 * />
 *
 * // Ratified proposal (approved, waiting for enactment)
 * <GovernanceStatusBadge
 *   item={{
 *     ratified_epoch: 448,
 *     enacted_epoch: 455,
 *     expired_epoch: null,
 *     dropped_epoch: null
 *   }}
 *   currentEpoch={450}
 * />
 *
 * // Enacted proposal (successfully completed)
 * <GovernanceStatusBadge
 *   item={{
 *     ratified_epoch: 448,
 *     enacted_epoch: 450,
 *     expired_epoch: null,
 *     dropped_epoch: null
 *   }}
 *   currentEpoch={452}
 * />
 *
 * // Expired proposal
 * <GovernanceStatusBadge
 *   item={{
 *     ratified_epoch: null,
 *     enacted_epoch: null,
 *     expired_epoch: 449,
 *     dropped_epoch: null
 *   }}
 *   currentEpoch={450}
 * />
 *
 * // Dropped proposal (explicitly withdrawn)
 * <GovernanceStatusBadge
 *   item={{
 *     ratified_epoch: null,
 *     enacted_epoch: null,
 *     expired_epoch: null,
 *     dropped_epoch: 448
 *   }}
 *   currentEpoch={450}
 * />
 *
 * // In a proposal list
 * {proposals.map(proposal => (
 *   <div key={proposal.id} className="flex items-center gap-2">
 *     <span>{proposal.title}</span>
 *     <GovernanceStatusBadge
 *       item={proposal}
 *       currentEpoch={currentEpoch}
 *     />
 *   </div>
 * ))}
 *
 * // In governance dashboard
 * <div className="governance-stats">
 *   <h3>Proposal #{proposal.id}</h3>
 *   <GovernanceStatusBadge
 *     item={proposal}
 *     currentEpoch={currentEpoch}
 *   />
 *   <p>Submitted: Epoch {proposal.submitted_epoch}</p>
 * </div>
 * ```
 *
 * @param {GovernanceStatusBadgeProps} props - Component props
 * @param {GovernanceEpochs} props.item - Governance action with epoch information
 * @param {number} props.currentEpoch - Current epoch number for status calculation
 * @returns {JSX.Element} A badge with status text and colored pulse indicator
 */
export const GovernanceStatusBadge: FC<GovernanceStatusBadgeProps> = ({
  item,
  currentEpoch,
}) => {
  const status = getGovActionStatus(item, currentEpoch);
  const statusColor = getStatusColor(status);

  return (
    <div className='relative flex h-[24px] w-fit items-center justify-end gap-1 rounded-m border border-border px-[10px]'>
      <PulseDot color={statusColor} animate={status === "Active"} />
      <span className='text-text-xs font-medium'>{status}</span>
    </div>
  );
};
