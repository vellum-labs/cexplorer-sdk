import { useThemeStore } from "@/stores/themeStore";

/**
 * Props for the EnvironmentBadge component
 */
export interface EnvironmentBadgeProps {
  /**
   * Network name to display (e.g., "testnet", "preview", "preprod")
   * Note: "mainnet" will not render anything (badge is hidden for mainnet)
   *
   * @example
   * <EnvironmentBadge network="testnet" />
   */
  network: string;
}

/**
 * EnvironmentBadge displays the Cardano network environment (testnet, preview, preprod, etc.)
 *
 * Shows a small badge in the upper-left area indicating which Cardano network environment
 * the application is currently connected to. The badge automatically hides when on mainnet,
 * as the default assumption is mainnet operation. Adapts styling based on the current theme
 * (light or dark mode).
 *
 * **Position**: Absolutely positioned at top-left (75px from left, 31px from top)
 *
 * **Common Use Cases:**
 * - Indicate testnet/preview environment in blockchain explorers
 * - Warn developers/users they're not on mainnet
 * - Display network environment in application header
 * - Environment-specific debugging indicators
 *
 * @component
 * @example
 * ```tsx
 * // Testnet badge (displays)
 * <EnvironmentBadge network="testnet" />
 *
 * // Preview network badge (displays)
 * <EnvironmentBadge network="preview" />
 *
 * // Preprod network badge (displays)
 * <EnvironmentBadge network="preprod" />
 *
 * // Mainnet (no badge displayed - returns null)
 * <EnvironmentBadge network="mainnet" />
 * ```
 *
 * @param {EnvironmentBadgeProps} props - Component props
 * @param {string} props.network - Network name to display (mainnet will render nothing)
 * @returns {JSX.Element | null} Network badge or null if mainnet
 */
export const EnvironmentBadge = ({ network }: EnvironmentBadgeProps) => {
  const { theme } = useThemeStore();

  if (network === "mainnet") {
    return null;
  }

  const styles = {
    dark: {
      border: "border-[#475467]",
      bg: "bg-[#1D2939]",
      text: "text-white",
    },
    light: {
      border: "border-[#E4E7EC]",
      bg: "bg-[#F9FAFB]",
      text: "text-[#344054]",
    },
  }[theme];

  return (
    <div
      className={`absolute left-[75px] top-[31px] flex w-fit items-center rounded-xl border ${styles.border} ${styles.bg} h-5 px-[6px] py-[2px]`}
    >
      <span
        className={`text-[10px] font-medium ${styles.text} whitespace-nowrap`}
      >
        {network}
      </span>
    </div>
  );
};
