import type { Meta, StoryObj } from "@storybook/react";
import { ActionTypes } from "../../ui/actionTypes";

const meta: Meta<typeof ActionTypes> = {
  title: "Components/ActionTypes",
  component: ActionTypes,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "ActionTypes component displays governance action type badges with corresponding icons and colors. Used in Cardano governance to indicate different types of actions like parameter changes, committee updates, and constitutional changes.",
      },
    },
  },
  argTypes: {
    title: {
      control: "select",
      options: [
        "InfoAction",
        "NoConfidence",
        "ParameterChange",
        "NewCommittee",
        "NewConstitution",
        "TreasuryWithdrawals",
        "HardForkInitiation",
      ],
      description: "The type of governance action to display",
      table: {
        type: { summary: "ActionTypes" },
        defaultValue: { summary: "InfoAction" },
      },
    },
  },
  decorators: [
    Story => (
      <div className='flex h-[300px] w-full items-center justify-center bg-background'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Info Action - Informational governance action with blue primary color
 */
export const InfoAction: Story = {
  args: {
    title: "InfoAction",
  },
};

/**
 * No Confidence - Action to express no confidence in the current committee
 */
export const NoConfidence: Story = {
  args: {
    title: "NoConfidence",
  },
};

/**
 * Parameter Change - Action to modify protocol parameters (shown in green)
 */
export const ParameterChange: Story = {
  args: {
    title: "ParameterChange",
  },
};

/**
 * New Committee - Action to elect or update constitutional committee members (shown in green)
 */
export const NewCommittee: Story = {
  args: {
    title: "NewCommittee",
  },
};

/**
 * New Constitution - Action to adopt or update the Cardano constitution (shown in green)
 */
export const NewConstitution: Story = {
  args: {
    title: "NewConstitution",
  },
};

/**
 * Treasury Withdrawals - Action to withdraw funds from the treasury (shown in yellow/warning)
 */
export const TreasuryWithdrawals: Story = {
  args: {
    title: "TreasuryWithdrawals",
  },
};

/**
 * Hard Fork Initiation - Critical action to initiate a protocol hard fork (shown in red/danger)
 */
export const HardForkInitiation: Story = {
  args: {
    title: "HardForkInitiation",
  },
};

/**
 * All action types displayed together for visual comparison
 */
export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>Info Action:</span>
        <ActionTypes title='InfoAction' />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>No Confidence:</span>
        <ActionTypes title='NoConfidence' />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>
          Parameter Change:
        </span>
        <ActionTypes title='ParameterChange' />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>New Committee:</span>
        <ActionTypes title='NewCommittee' />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>
          New Constitution:
        </span>
        <ActionTypes title='NewConstitution' />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>
          Treasury Withdrawals:
        </span>
        <ActionTypes title='TreasuryWithdrawals' />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span style={{ width: "180px", fontWeight: 500 }}>
          Hard Fork Initiation:
        </span>
        <ActionTypes title='HardForkInitiation' />
      </div>
    </div>
  ),
};

/**
 * Example usage in a governance proposal list
 */
export const InProposalList: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "600px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Proposal #1234
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
            Update minimum pool cost parameter
          </div>
        </div>
        <ActionTypes title='ParameterChange' />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Proposal #1235
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
            Elect new constitutional committee members
          </div>
        </div>
        <ActionTypes title='NewCommittee' />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Proposal #1236
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
            Withdraw funds for ecosystem development
          </div>
        </div>
        <ActionTypes title='TreasuryWithdrawals' />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
          border: "1px solid var(--border)",
          borderRadius: "8px",
        }}
      >
        <div>
          <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Proposal #1237
          </div>
          <div style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
            Initiate hard fork to next protocol version
          </div>
        </div>
        <ActionTypes title='HardForkInitiation' />
      </div>
    </div>
  ),
};
