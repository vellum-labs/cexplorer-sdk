import type { GovernanceActionDetail } from "@/types/governanceTypes";

/**
 * Status of a Cardano governance action
 */
export type GovActionStatus =
  | "Active"
  | "Ratified"
  | "Enacted"
  | "Expired"
  | "Dropped";

/**
 * Epoch-related fields from governance action detail
 */
export type GovernanceEpochs = Pick<
  GovernanceActionDetail,
  "dropped_epoch" | "enacted_epoch" | "expired_epoch" | "ratified_epoch"
>;

/**
 * Determines the current status of a Cardano governance action based on epoch data.
 *
 * The status is determined by comparing the current epoch with various governance
 * action epoch milestones. The function follows a specific priority order:
 * 1. Enacted - if enacted_epoch exists and has passed
 * 2. Dropped - if dropped_epoch has passed (explicitly withdrawn)
 * 3. Expired - if expired_epoch has passed (naturally expired)
 * 4. Ratified - if ratified but not yet enacted
 * 5. Active - default state for pending actions
 *
 * @param item - Governance action containing epoch milestones
 * @param currentEpoch - The current blockchain epoch number
 * @returns The status of the governance action
 *
 * @example
 * ```tsx
 * // Active governance action (no milestones reached)
 * getGovActionStatus({
 *   dropped_epoch: null,
 *   enacted_epoch: null,
 *   expired_epoch: null,
 *   ratified_epoch: null
 * }, 500)
 * // Returns: "Active"
 *
 * // Ratified but not yet enacted
 * getGovActionStatus({
 *   dropped_epoch: null,
 *   enacted_epoch: 520,
 *   expired_epoch: null,
 *   ratified_epoch: 510
 * }, 515)
 * // Returns: "Ratified"
 *
 * // Enacted action
 * getGovActionStatus({
 *   dropped_epoch: null,
 *   enacted_epoch: 510,
 *   expired_epoch: null,
 *   ratified_epoch: 505
 * }, 515)
 * // Returns: "Enacted"
 *
 * // Dropped action
 * getGovActionStatus({
 *   dropped_epoch: 508,
 *   enacted_epoch: null,
 *   expired_epoch: null,
 *   ratified_epoch: null
 * }, 515)
 * // Returns: "Dropped"
 * ```
 */
export const getGovActionStatus = (
  item: GovernanceEpochs,
  currentEpoch: number,
): GovActionStatus => {
  const { dropped_epoch, enacted_epoch, expired_epoch, ratified_epoch } = item;

  // Enacted: action has been enacted and current epoch >= enacted epoch
  if (enacted_epoch != null && enacted_epoch <= currentEpoch) {
    return "Enacted";
  }

  // Dropped: action was explicitly dropped
  if (dropped_epoch != null && dropped_epoch <= currentEpoch) {
    return "Dropped";
  }

  // Expired: action expired naturally
  if (expired_epoch != null && expired_epoch <= currentEpoch) {
    return "Expired";
  }

  // Ratified: action is ratified but not yet enacted (enacted_epoch is null or future)
  if (
    ratified_epoch != null &&
    (enacted_epoch == null || enacted_epoch > currentEpoch)
  ) {
    return "Ratified";
  }

  // Active: default state - not ratified, not enacted, not expired/dropped
  return "Active";
};
