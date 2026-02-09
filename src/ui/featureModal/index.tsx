import type { Dispatch, FC, SetStateAction } from "react";

import { Modal } from "@/ui/modal";

import { useEffect, useState } from "react";
import { ArrowRight, WalletMinimal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { WalletApi } from "@/types/walletTypes";

/**
 * Props for the FeatureModal component
 */
export interface FeatureModalProps {
  /**
   * Callback function triggered when the modal should close
   * Called when user cancels or after triggering wallet connection
   *
   * @example
   * <FeatureModal onClose={() => setIsOpen(false)} ... />
   */
  onClose: () => void;

  /**
   * Subtitle text explaining why the feature is locked
   * Describes the requirement to access premium features
   *
   * @default "To access premium features, you need to own a Cexplorer NFT. Connect your wallet or buy the NFT now."
   * @example
   * <FeatureModal
   *   subTitle="This advanced analytics feature requires Cexplorer PRO membership."
   *   ...
   * />
   */
  subTitle?: string;

  /**
   * State setter to show/hide the wallet connection modal
   * Used to trigger wallet connection flow when user clicks "Connect wallet"
   *
   * @param value - Boolean indicating whether to show wallet connection modal
   * @example
   * const [showConnect, setShowConnect] = useState(false);
   * <FeatureModal setShowConnectWallet={setShowConnect} ... />
   */
  setShowConnectWallet: Dispatch<SetStateAction<boolean>>;

  /**
   * Current connected wallet address
   * Used to determine wallet connection status
   *
   * @example "addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234"
   */
  address: string | undefined;

  /**
   * Cardano wallet API instance
   * Provides access to wallet functions (signing, UTXOs, balance, etc.)
   * Used to determine wallet connection status
   *
   * @see {@link WalletApi} for available wallet methods
   * @example
   * <FeatureModal
   *   address={walletAddress}
   *   walletApi={connectedWalletApi}
   *   ...
   * />
   */
  walletApi: WalletApi | undefined;

  /**
   * Title text for the modal (supports JSX for "PRO" highlighting)
   * @default "Cexplorer PRO feature"
   */
  title?: string;

  /**
   * Cancel button label (shown when wallet is connected)
   * @default "Cancel"
   */
  cancelLabel?: string;

  /**
   * Connect wallet button label
   * @default "Connect wallet"
   */
  connectWalletLabel?: string;

  /**
   * Get PRO button label
   * @default "Get a PRO"
   */
  getProLabel?: string;
}

/**
 * FeatureModal displays a premium feature gate that prompts users to connect a wallet or purchase Cexplorer PRO.
 *
 * This modal appears when users attempt to access premium features without proper authentication
 * or NFT ownership. It adapts its interface based on wallet connection status, showing either
 * a "Connect wallet" or "Cancel" button depending on whether a wallet is already connected.
 * The modal promotes the Cexplorer PRO subscription with a gradient call-to-action button.
 *
 * **Behavior:**
 * - If wallet is not connected: Shows "Connect wallet" button that triggers wallet connection flow
 * - If wallet is connected: Shows "Cancel" button to dismiss the modal
 * - Always shows "Get a PRO" button with gradient styling that links to /pro page
 * - Automatically detects wallet connection status from address and walletApi props
 *
 * **Common Use Cases:**
 * - Blocking access to advanced analytics features
 * - Gating premium blockchain data insights
 * - Prompting users to upgrade to PRO membership
 * - Triggering wallet connection for authentication
 * - Displaying NFT ownership requirements
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage - wallet not connected
 * const [showFeatureModal, setShowFeatureModal] = useState(false);
 * const [showConnectWallet, setShowConnectWallet] = useState(false);
 *
 * {showFeatureModal && (
 *   <FeatureModal
 *     onClose={() => setShowFeatureModal(false)}
 *     setShowConnectWallet={setShowConnectWallet}
 *     address={undefined}
 *     walletApi={undefined}
 *   />
 * )}
 *
 * // With wallet connected
 * <FeatureModal
 *   onClose={() => setShowModal(false)}
 *   setShowConnectWallet={setShowConnect}
 *   address="addr1qxyz123abc456def789ghi012jkl345mno678pqr901stu234"
 *   walletApi={connectedWallet}
 * />
 *
 * // Custom subtitle message
 * <FeatureModal
 *   onClose={handleClose}
 *   subTitle="Advanced stake pool analytics require Cexplorer PRO. Connect your wallet to verify NFT ownership."
 *   setShowConnectWallet={setShowConnect}
 *   address={userAddress}
 *   walletApi={wallet}
 * />
 * ```
 *
 * @param {FeatureModalProps} props - Component props
 * @param {() => void} props.onClose - Callback when modal should close
 * @param {string} [props.subTitle] - Custom subtitle explaining feature requirement
 * @param {Dispatch<SetStateAction<boolean>>} props.setShowConnectWallet - State setter for wallet connection modal
 * @param {string | undefined} props.address - Connected wallet address
 * @param {WalletApi | undefined} props.walletApi - Wallet API instance
 * @returns {JSX.Element} A modal dialog prompting users to connect wallet or purchase PRO
 */
export const FeatureModal: FC<FeatureModalProps> = ({
  onClose,
  subTitle = "To access premium features, you need to own a Cexplorer NFT. Connect your wallet or buy the NFT now.",
  setShowConnectWallet,
  address,
  walletApi,
  title = "Cexplorer PRO feature",
  cancelLabel = "Cancel",
  connectWalletLabel = "Connect wallet",
  getProLabel = "Get a PRO",
}) => {
  const [isWalletConnected, setWalletConected] = useState<boolean>(false);

  const handleCancel = () => {
    if (!isWalletConnected) {
      setShowConnectWallet(true);
    }

    onClose();
  };

  useEffect(() => {
    setWalletConected(!!address && !!walletApi);
  }, [address, walletApi]);

  return (
    <Modal minWidth='95%' maxWidth='400px' maxHeight='95%' onClose={onClose}>
      <div className='flex h-full w-full flex-col gap-3'>
        <span className='text-text-lg font-semibold'>{title}</span>
        <p className='max-w-[320px] text-text-sm'>{subTitle}</p>
        <div className='flex items-center justify-between gap-1.5'>
          <button
            className='flex h-[40px] w-full max-w-[170px] flex-1 cursor-pointer items-center justify-center rounded-s border border-border'
            onClick={handleCancel}
          >
            {isWalletConnected ? (
              <span className='text-text-md font-semibold'>{cancelLabel}</span>
            ) : (
              <div className='flex items-center gap-1'>
                <WalletMinimal size={15} />
                <span className='text-text-md font-semibold'>
                  {connectWalletLabel}
                </span>
              </div>
            )}
          </button>
          <button
            className='flex h-[40px] w-full max-w-[170px] flex-1 cursor-pointer items-center justify-center gap-1 rounded-s'
            style={{
              background: "linear-gradient(270deg, #6A11CB 0%, #2575FC 100%)",
            }}
          >
            <Link to='/pro'>
              <span className='text-text-md font-semibold text-white'>
                {getProLabel}
              </span>
            </Link>
            <ArrowRight color='white' size={15} />
          </button>
        </div>
      </div>
    </Modal>
  );
};
