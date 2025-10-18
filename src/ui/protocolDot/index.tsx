import { type MiscConstResponseData } from "@/types/miscTypes";
import { type FC } from "react";
import { PulseDot } from "../pulseDot";

/**
 * Props for ProtocolDot component.
 */
export interface ProtocolDotProps {
  /** Protocol version number to check against network versions */
  protNo: number;
  /** Miscellaneous constant data containing epoch statistics and block versions */
  miscData: MiscConstResponseData | undefined;
}

/**
 * ProtocolDot displays a status indicator for protocol version compatibility.
 *
 * This component analyzes the current protocol version against network block
 * versions to determine compatibility status. It shows a colored pulsing dot
 * indicating whether a pool or node is running an up-to-date protocol version.
 * The component automatically hides when only one version exists or when a
 * version has 95%+ adoption (network consensus).
 *
 * **Features:**
 * - Color-coded status indicators (green/yellow/red)
 * - Automatic hiding when version check is unnecessary
 * - Network consensus detection (95%+ adoption)
 * - Real-time protocol version analysis
 * - Pulsing animation for visual attention
 *
 * **Color Meanings:**
 * - **Green** (`bg-greenText`): Protocol version is up-to-date (≥ highest network version)
 * - **Yellow** (`bg-yellowText`): Protocol major version matches, minor version outdated
 * - **Red** (`bg-redText`): Protocol version is significantly outdated
 *
 * **Visibility Logic:**
 * Component returns `null` (hidden) when:
 * - Only one block version exists on the network
 * - Any single version has ≥95% adoption (consensus reached)
 *
 * **Common Use Cases:**
 * - Stake pool protocol version indicators
 * - Node software version warnings
 * - Block explorer version compatibility displays
 * - Protocol upgrade monitoring during hard forks
 *
 * @component
 * @example
 * ```tsx
 * // Pool running latest protocol
 * <ProtocolDot
 *   protNo={9.0}
 *   miscData={epochData}
 * />
 * // Shows green dot if protNo >= network's highest version
 *
 * // Pool with outdated protocol
 * <ProtocolDot
 *   protNo={7.0}
 *   miscData={epochData}
 * />
 * // Shows red dot if protNo < network's highest version
 * ```
 *
 * @param {ProtocolDotProps} props - Component props
 * @param {number} props.protNo - Protocol version number to check
 * @param {MiscConstResponseData | undefined} props.miscData - Epoch statistics with block versions
 * @returns {JSX.Element | null} Colored pulsing dot or null if hidden
 */
export const ProtocolDot: FC<ProtocolDotProps> = ({ protNo, miscData }) => {
  const isDaily = Array.isArray(miscData?.epoch_stat?.daily);

  const versionCount = isDaily
    ? miscData?.epoch_stat?.daily[0]?.stat.block_version.length
    : 0;
  const countSum = isDaily
    ? miscData?.epoch_stat?.daily[0]?.stat.block_version.reduce(
        (acc, curr) => acc + curr.count,
        0,
      ) || 0
    : 0;
  const highestVersion = isDaily
    ? miscData?.epoch_stat?.daily[0]?.stat.block_version.reduce(
        (acc, curr) => Math.max(acc, curr.version),
        0,
      ) || 0
    : 0;
  const isAnyCountMajor = isDaily
    ? miscData?.epoch_stat?.daily[0]?.stat.block_version.some(
        item => item.count / countSum >= 0.95,
      )
    : false;

  const returnColor = () => {
    if (protNo >= highestVersion) {
      return "bg-greenText";
    } else if (Math.floor(protNo) === Math.floor(highestVersion)) {
      return "bg-yellowText";
    } else {
      return "bg-redText";
    }
  };

  if (versionCount === 1 || isAnyCountMajor) {
    return null;
  }

  return <PulseDot color={returnColor()} />;
};
