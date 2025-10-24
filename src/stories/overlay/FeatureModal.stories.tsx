import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FeatureModal } from "../../ui/featureModal";
import { Button } from "../../ui/button";

const meta: Meta<typeof FeatureModal> = {
  title: "Overlay/FeatureModal",
  component: FeatureModal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Premium feature gate modal that prompts users to connect wallet or purchase Cexplorer PRO.",
      },
    },
    layout: "fullscreen",
  },
  argTypes: {
    onClose: {
      control: false,
      description: "Callback when modal should close",
      table: {
        type: { summary: "() => void" },
      },
    },
    subTitle: {
      control: "text",
      description: "Subtitle text explaining feature requirement",
      table: {
        type: { summary: "string" },
        defaultValue: {
          summary:
            '"To access premium features, you need to own a Cexplorer NFT. Connect your wallet or buy the NFT now."',
        },
      },
    },
    setShowConnectWallet: {
      control: false,
      description: "State setter for wallet connection modal",
      table: {
        type: { summary: "Dispatch<SetStateAction<boolean>>" },
      },
    },
    address: {
      control: "text",
      description: "Connected wallet address",
      table: {
        type: { summary: "string | undefined" },
      },
    },
    walletApi: {
      control: false,
      description: "Wallet API instance",
      table: {
        type: { summary: "WalletApi | undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Modal shown when wallet is not connected
 */
const WalletNotConnectedComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Open Feature Modal (No Wallet)"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <FeatureModal
          onClose={() => setIsOpen(false)}
          setShowConnectWallet={setShowConnectWallet}
          address={undefined}
          walletApi={undefined}
        />
      )}
      {showConnectWallet && (
        <div className="fixed bottom-4 right-4 rounded-m border border-primary bg-background p-2 text-text-sm">
          Wallet connection triggered!
        </div>
      )}
    </div>
  );
};

export const WalletNotConnected: Story = {
  render: () => <WalletNotConnectedComponent />,
};

/**
 * Modal shown when wallet is connected
 */
const WalletConnectedComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setShowConnectWallet = useState(false)[1];

  // Mock wallet API
  const mockWalletApi = {
    getNetworkId: async () => 1,
    getUtxos: async () => [],
    getBalance: async () => "5000000",
    getUsedAddresses: async () => [
      "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
    ],
    getUnusedAddresses: async () => [],
    getChangeAddress: async () =>
      "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
    getRewardAddresses: async () => [],
    signTx: async () => "signed_tx",
    signData: async () => ({ signature: "sig", key: "key" }),
    submitTx: async () => "tx_hash",
    getCollateral: async () => [],
    experimental: {
      getCollateral: async () => [],
      on: () => {},
      off: () => {},
    },
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Open Feature Modal (Wallet Connected)"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <FeatureModal
          onClose={() => setIsOpen(false)}
          setShowConnectWallet={setShowConnectWallet}
          address="addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234"
          walletApi={mockWalletApi}
        />
      )}
    </div>
  );
};

export const WalletConnected: Story = {
  render: () => <WalletConnectedComponent />,
};

/**
 * Modal with custom subtitle for specific feature
 */
const CustomSubtitleComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setShowConnectWallet = useState(false)[1];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="primary"
        label="Open with Custom Subtitle"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <FeatureModal
          onClose={() => setIsOpen(false)}
          subTitle="Advanced stake pool analytics require Cexplorer PRO. Connect your wallet to verify NFT ownership and unlock detailed metrics."
          setShowConnectWallet={setShowConnectWallet}
          address={undefined}
          walletApi={undefined}
        />
      )}
    </div>
  );
};

export const CustomSubtitle: Story = {
  render: () => <CustomSubtitleComponent />,
};

/**
 * Modal for governance feature access
 */
const GovernanceFeatureComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setShowConnectWallet = useState(false)[1];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="purple"
        label="Access Governance Analytics"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <FeatureModal
          onClose={() => setIsOpen(false)}
          subTitle="Governance voting analytics and proposal tracking require Cexplorer PRO membership. Get instant access to historical voting patterns and delegation insights."
          setShowConnectWallet={setShowConnectWallet}
          address={undefined}
          walletApi={undefined}
        />
      )}
    </div>
  );
};

export const GovernanceFeature: Story = {
  render: () => <GovernanceFeatureComponent />,
};

/**
 * Modal for transaction analytics
 */
const TransactionAnalyticsComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const setShowConnectWallet = useState(false)[1];

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Button
        size="md"
        variant="secondary"
        label="View Advanced Transaction Data"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <FeatureModal
          onClose={() => setIsOpen(false)}
          subTitle="Deep transaction analytics and metadata exploration require Cexplorer PRO. Unlock detailed insights into smart contract interactions and token movements."
          setShowConnectWallet={setShowConnectWallet}
          address={undefined}
          walletApi={undefined}
        />
      )}
    </div>
  );
};

export const TransactionAnalytics: Story = {
  render: () => <TransactionAnalyticsComponent />,
};

/**
 * Interactive example showing wallet connection flow
 */
const InteractiveFlowComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConnectWallet, setShowConnectWallet] = useState(false);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [walletApi, setWalletApi] = useState<any>(undefined);

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setAddress("addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234");
    setWalletApi({
      getNetworkId: async () => 1,
      getUtxos: async () => [],
      getBalance: async () => "5000000",
      getUsedAddresses: async () => [
        "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
      ],
      getUnusedAddresses: async () => [],
      getChangeAddress: async () =>
        "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234",
      getRewardAddresses: async () => [],
      signTx: async () => "signed_tx",
      signData: async () => ({ signature: "sig", key: "key" }),
      submitTx: async () => "tx_hash",
      getCollateral: async () => [],
      experimental: {
        getCollateral: async () => [],
        on: () => {},
        off: () => {},
      },
    });
    setShowConnectWallet(false);
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
      <div className="flex gap-2">
        <Button
          size="md"
          variant="primary"
          label="Open Feature Modal"
          onClick={() => setIsOpen(true)}
        />
        {address && (
          <Button
            size="md"
            variant="red"
            label="Disconnect Wallet"
            onClick={() => {
              setAddress(undefined);
              setWalletApi(undefined);
            }}
          />
        )}
      </div>
      <div className="text-text-sm text-text">
        <p>Wallet Status: {address ? "Connected" : "Not Connected"}</p>
        {address && <p className="text-xs text-gray-500">{address}</p>}
      </div>
      {isOpen && (
        <FeatureModal
          onClose={() => setIsOpen(false)}
          setShowConnectWallet={setShowConnectWallet}
          address={address}
          walletApi={walletApi}
        />
      )}
      {showConnectWallet && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-sm">
          <div className="rounded-l border border-border bg-background p-4 shadow-lg">
            <h3 className="mb-2 text-text-lg font-semibold">
              Connect Wallet
            </h3>
            <p className="mb-4 text-text-sm text-gray-600">
              Simulated wallet connection
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="primary"
                label="Connect"
                onClick={handleConnectWallet}
              />
              <Button
                size="sm"
                variant="secondary"
                label="Cancel"
                onClick={() => setShowConnectWallet(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const InteractiveFlow: Story = {
  render: () => <InteractiveFlowComponent />,
};
