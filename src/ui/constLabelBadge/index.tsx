import { type MiscConstResponseData } from "@/types/miscTypes";
import { findLabel } from "@/utils/findLabel";
import { type FC } from "react";
import { Badge } from "../badge";
import { Tooltip } from "../tooltip";

/**
 * Props for the ConstLabelBadge component
 */
export interface ConstLabelBadgeProps {
  /**
   * Type of constant label to search for.
   *
   * - `"metadatum"`: Metadata label (e.g., transaction metadata labels)
   * - `"sc"`: Smart contract label (script hash labels)
   *
   * @example
   * ```tsx
   * // Metadata label
   * <ConstLabelBadge type="metadatum" name={721} miscConst={constants} />
   *
   * // Smart contract label
   * <ConstLabelBadge type="sc" name="abc123..." miscConst={constants} />
   * ```
   */
  type: "metadatum" | "sc";
  /**
   * Identifier to search for in the labels array.
   *
   * - For `type="metadatum"`: typically a number (e.g., 721 for NFT metadata)
   * - For `type="sc"`: typically a script hash string
   *
   * @example
   * ```tsx
   * // Metadata with numeric identifier
   * <ConstLabelBadge type="metadatum" name={721} miscConst={constants} />
   *
   * // Smart contract with hash
   * <ConstLabelBadge
   *   type="sc"
   *   name="a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
   *   miscConst={constants}
   * />
   * ```
   */
  name: number | string | undefined;
  /**
   * Additional CSS classes for the badge
   *
   * @example
   * ```tsx
   * <ConstLabelBadge
   *   type="metadatum"
   *   name={721}
   *   miscConst={constants}
   *   className="ml-2"
   * />
   * ```
   */
  className?: string;
  /**
   * Misc constants data containing the labels array.
   * Retrieved from the API endpoint that provides system constants and labels.
   *
   * @example
   * ```tsx
   * const { data: miscConst } = useQuery({
   *   queryKey: ['misc-const'],
   *   queryFn: fetchMiscConst
   * });
   *
   * <ConstLabelBadge
   *   type="metadatum"
   *   name={721}
   *   miscConst={miscConst}
   * />
   * ```
   */
  miscConst: MiscConstResponseData | undefined;
}

/**
 * ConstLabelBadge displays a label badge for metadata or smart contract constants.
 *
 * This component searches for a label in the misc constants data based on the type
 * and identifier, then displays it as a compact badge. The first word of the label
 * is shown in the badge, with the full label displayed in a tooltip on hover.
 *
 * **Features:**
 * - **Label Search**: Finds labels from misc constants by type and identifier
 * - **Compact Display**: Shows only the first word of the label in the badge
 * - **Full Label Tooltip**: Displays complete label text on hover
 * - **Conditional Rendering**: Returns null if label is not found
 * - **Two Types Supported**:
 *   - `metadatum`: For transaction metadata labels (CIP standards, etc.)
 *   - `sc`: For smart contract/script hash labels
 *
 * **How It Works:**
 * 1. Uses `findLabel()` utility to search in `miscConst.labels` array
 * 2. For `metadatum` type: matches by name/key (e.g., 721 = NFT metadata)
 * 3. For `sc` type: matches by script hash
 * 4. If found: displays blue badge with first word + tooltip with full label
 * 5. If not found: renders nothing (null)
 *
 * **Common Use Cases:**
 * - Display metadata standard labels (CIP-25, CIP-68, etc.)
 * - Show smart contract purpose labels
 * - Indicate transaction metadata types
 * - Display native script labels
 * - Show plutus script identifiers
 *
 * @component
 * @example
 * ```tsx
 * // NFT Metadata label (CIP-25)
 * <ConstLabelBadge
 *   type="metadatum"
 *   name={721}
 *   miscConst={miscConst}
 * />
 * // Result: Badge shows "CIP-25" with tooltip "CIP-25 NFT Metadata"
 *
 * // Royalty Token metadata
 * <ConstLabelBadge
 *   type="metadatum"
 *   name={777}
 *   miscConst={miscConst}
 * />
 * // Result: Badge shows "CIP-27" with tooltip "CIP-27 Royalty Token"
 *
 * // Smart contract label
 * <ConstLabelBadge
 *   type="sc"
 *   name="a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
 *   miscConst={miscConst}
 * />
 * // Result: Badge shows script name from labels
 *
 * // With custom styling
 * <ConstLabelBadge
 *   type="metadatum"
 *   name={721}
 *   miscConst={miscConst}
 *   className="ml-2"
 * />
 *
 * // In a transaction metadata display
 * <div className="flex items-center gap-2">
 *   <span>Metadata Key: {key}</span>
 *   <ConstLabelBadge
 *     type="metadatum"
 *     name={key}
 *     miscConst={miscConst}
 *   />
 * </div>
 *
 * // Label not found case (renders nothing)
 * <ConstLabelBadge
 *   type="metadatum"
 *   name={9999}
 *   miscConst={miscConst}
 * />
 * // Result: null (nothing rendered)
 *
 * // When miscConst is loading
 * <ConstLabelBadge
 *   type="metadatum"
 *   name={721}
 *   miscConst={undefined}
 * />
 * // Result: null (nothing rendered until data loads)
 * ```
 *
 * @param {ConstLabelBadgeProps} props - Component props
 * @param {"metadatum" | "sc"} props.type - Type of label to search for
 * @param {number | string | undefined} props.name - Identifier for the label
 * @param {string} [props.className] - Additional CSS classes for badge
 * @param {MiscConstResponseData | undefined} props.miscConst - Misc constants data with labels
 * @returns {JSX.Element | null} Blue badge with first word of label and tooltip, or null if not found
 */
export const ConstLabelBadge: FC<ConstLabelBadgeProps> = ({
  type,
  name,
  className,
  miscConst,
}) => {
  const label = findLabel(type, name, miscConst);

  if (!label) return null;

  return (
    <Tooltip content={label}>
      <Badge color='blue' className={className}>
        {label.split(" ")[0]}
      </Badge>
    </Tooltip>
  );
};
