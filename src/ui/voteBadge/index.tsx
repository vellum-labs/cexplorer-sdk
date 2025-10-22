import { ChevronUp, ChevronDown, Minus } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { VOTE_OPTIONS, type Vote } from "@/constants/votes";

/**
 * Props for the VoteBadge component
 */
export interface VoteBadgeProps {
  /**
   * The vote decision type in Cardano governance.
   * - `"Yes"`: Affirmative vote - shows ChevronUp icon with blue theme
   * - `"No"`: Negative vote - shows ChevronDown icon with orange theme
   * - `"Abstain"`: Abstain from voting - shows Minus icon with gray theme
   * - `null`: No vote cast - displays "Not voted" badge
   *
   * @example
   * <VoteBadge vote="Yes" />
   */
  vote: Vote;
}

/**
 * VoteBadge displays a styled badge indicating a vote decision in Cardano governance proposals.
 *
 * This component renders a badge with an icon and text that corresponds to the vote decision.
 * It supports three vote types (Yes, No, Abstain) and a null/not-voted state. The badge
 * appearance adapts to the current theme (light/dark) with appropriate colors for each vote type.
 *
 * **Vote Types and Styling:**
 * - **Yes**: Blue theme with ChevronUp icon - indicates approval
 * - **No**: Orange theme with ChevronDown icon - indicates disapproval
 * - **Abstain**: Gray theme with Minus icon - indicates abstention
 * - **Not voted**: Gray theme with no icon - indicates no vote was cast
 *
 * **Theme Support:**
 * - Automatically adjusts colors based on light/dark theme
 * - Each vote type has distinct colors for both themes
 * - Maintains accessibility and contrast in both modes
 *
 * **Common Use Cases:**
 * - Display vote decisions in governance proposal listings
 * - Show voting results in proposal detail views
 * - Indicate voter choices in voting history feeds
 * - Display vote tallies and breakdowns in analytics
 *
 * @component
 * @example
 * ```tsx
 * // Yes vote
 * <VoteBadge vote="Yes" />
 *
 * // No vote
 * <VoteBadge vote="No" />
 *
 * // Abstain vote
 * <VoteBadge vote="Abstain" />
 *
 * // No vote cast
 * <VoteBadge vote={null} />
 *
 * // In a proposal vote list
 * {votes.map(vote => (
 *   <div key={vote.id} className="flex items-center gap-2">
 *     <span>{vote.voterName}</span>
 *     <VoteBadge vote={vote.decision} />
 *   </div>
 * ))}
 *
 * // In a voting results summary
 * <div className="flex gap-4">
 *   <div className="flex items-center gap-2">
 *     <VoteBadge vote="Yes" />
 *     <span>{yesCount} votes</span>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <VoteBadge vote="No" />
 *     <span>{noCount} votes</span>
 *   </div>
 *   <div className="flex items-center gap-2">
 *     <VoteBadge vote="Abstain" />
 *     <span>{abstainCount} votes</span>
 *   </div>
 * </div>
 * ```
 *
 * @param {VoteBadgeProps} props - Component props
 * @param {Vote} props.vote - The vote decision ("Yes", "No", "Abstain", or null)
 * @returns {JSX.Element} A themed badge with icon and vote text
 */
export const VoteBadge = ({ vote }: VoteBadgeProps) => {
  const { theme } = useThemeStore();

  if (!vote || vote === null || !VOTE_OPTIONS.includes(vote as any)) {
    return (
      <div
        className={`flex h-[24px] w-fit items-center gap-1/2 rounded-l border px-[8px] py-[2px] ${theme === "dark" ? "border-[#475467] bg-[#1D2939]" : "border-[#E4E7EC] bg-[#F9FAFB]"}`}
      >
        <span
          className={`whitespace-nowrap text-text-xs font-medium ${theme === "dark" ? "text-white" : "text-[#344054]"}`}
        >
          Not voted
        </span>
      </div>
    );
  }

  const baseStyles = {
    Yes: {
      dark: {
        border: "border-[#0094D4]",
        bg: "bg-[#1C384B]",
        text: "text-white",
        icon: "text-white",
      },
      light: {
        border: "border-[#00A9E3]",
        bg: "bg-[#EFFAFF]",
        text: "text-[#0094D4]",
        icon: "text-[#0094D4]",
      },
    },
    No: {
      dark: {
        border: "border-[#DC6803]",
        bg: "bg-[#392E33]",
        text: "text-white",
        icon: "text-white",
      },
      light: {
        border: "border-[#FEDF89]",
        bg: "bg-[#FFFAEB]",
        text: "text-[#DC6803]",
        icon: "text-[#DC6803]",
      },
    },
    Abstain: {
      dark: {
        border: "border-[#475467]",
        bg: "bg-[#1D2939]",
        text: "text-white",
        icon: "text-white",
      },
      light: {
        border: "border-[#E4E7EC]",
        bg: "bg-[#F9FAFB]",
        text: "text-[#344054]",
        icon: "text-[#344054]",
      },
    },
  } as const;

  const styles = baseStyles[vote][theme];

  const icon = {
    Yes: <ChevronUp size={14} className={styles.icon} />,
    No: <ChevronDown size={14} className={styles.icon} />,
    Abstain: <Minus size={14} className={styles.icon} />,
  } as const;

  return (
    <div
      className={`flex w-fit items-center gap-1 rounded-xl border ${styles.border} ${styles.bg} h-[24px] px-[8px] py-[2px]`}
    >
      {icon[vote]}
      <span className={`text-text-xs font-medium ${styles.text}`}>{vote}</span>
    </div>
  );
};
