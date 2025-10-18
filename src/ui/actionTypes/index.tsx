import type { FC } from "react";

import {
  Clipboard,
  CornerRightUp,
  Info,
  Shuffle,
  SquareEqual,
  SquarePen,
  Users,
} from "lucide-react";

/**
 * Governance action types available in Cardano blockchain.
 * Each type represents a different kind of governance action that can be proposed and voted on.
 *
 * @typedef {string} ActionTypes
 * @property {string} InfoAction - Informational action (blue color)
 * @property {string} NoConfidence - Motion of no confidence in the constitutional committee (blue color)
 * @property {string} ParameterChange - Protocol parameter modification proposal (green color)
 * @property {string} NewCommittee - Constitutional committee election or update (green color)
 * @property {string} NewConstitution - Cardano constitution adoption or amendment (green color)
 * @property {string} TreasuryWithdrawals - Treasury fund withdrawal request (yellow/warning color)
 * @property {string} HardForkInitiation - Protocol hard fork initiation (red/danger color)
 */
export type ActionTypes =
  | "InfoAction"
  | "NoConfidence"
  | "ParameterChange"
  | "NewCommittee"
  | "NewConstitution"
  | "TreasuryWithdrawals"
  | "HardForkInitiation";

/**
 * Props for the ActionTypes component
 */
export interface ActionTypesProps {
  /**
   * The type of governance action to display.
   * Determines which badge variant (icon, text, and color) will be rendered.
   *
   * @example
   * <ActionTypes title="ParameterChange" />
   * <ActionTypes title="HardForkInitiation" />
   */
  title: ActionTypes;
}

/**
 * ActionTypes component displays governance action type badges with corresponding icons and semantic colors.
 *
 * This component is used throughout the Cardano explorer to visually identify different types
 * of governance actions. Each action type has a unique icon and color scheme:
 * - Info actions (blue) - General informational proposals
 * - Governance actions (green) - Parameter changes, committee updates, constitution changes
 * - Financial actions (yellow) - Treasury withdrawals
 * - Critical actions (red) - Hard fork initiations
 *
 * @component
 * @example
 * ```tsx
 * // Display a parameter change action
 * <ActionTypes title="ParameterChange" />
 *
 * // Display a hard fork initiation action
 * <ActionTypes title="HardForkInitiation" />
 *
 * // Use in a governance proposal list
 * {proposals.map(proposal => (
 *   <div key={proposal.id}>
 *     <h3>{proposal.name}</h3>
 *     <ActionTypes title={proposal.actionType} />
 *   </div>
 * ))}
 * ```
 *
 * @param {ActionTypesProps} props - Component props
 * @param {ActionTypes} props.title - The type of governance action to display
 * @returns {JSX.Element} A styled badge with icon and label for the specified action type
 */
export const ActionTypes: FC<ActionTypesProps> = ({ title }) => {
  const types = {
    InfoAction: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <Info size={12} className='text-primary' />
        <span className='text-nowrap text-text-xs font-medium'>
          Info action
        </span>
      </div>
    ),
    NoConfidence: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <SquareEqual size={12} className='text-primary' />
        <span className='text-nowrap text-text-xs font-medium'>
          No confidence
        </span>
      </div>
    ),
    ParameterChange: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <SquarePen size={12} className='text-[#47CD89]' />
        <span className='text-nowrap text-text-xs font-medium'>
          Parameter change
        </span>
      </div>
    ),
    NewCommittee: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <Users size={12} className='text-[#47CD89]' />
        <span className='text-nowrap text-text-xs font-medium'>
          New Committee
        </span>
      </div>
    ),
    NewConstitution: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <Clipboard size={12} className='text-[#47CD89]' />
        <span className='text-nowrap text-text-xs font-medium'>
          New Constitution
        </span>
      </div>
    ),
    TreasuryWithdrawals: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <CornerRightUp size={12} className='text-[#FEC84B]' />
        <span className='text-nowrap text-text-xs font-medium'>
          Treasury Withdrawals
        </span>
      </div>
    ),
    HardForkInitiation: (
      <div className='relative flex h-[24px] w-fit items-center justify-end gap-1/2 rounded-m border border-border px-[10px] text-text-xs'>
        <Shuffle size={12} className='text-[#f04438]' />
        <span className='text-nowrap text-text-xs font-medium'>
          Hardfork Initiation
        </span>
      </div>
    ),
  };

  return types[title];
};
