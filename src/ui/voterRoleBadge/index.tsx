import { Landmark, Network, User } from "lucide-react";
import { Badge } from "@/ui/badge";

/**
 * Props for the VoterRoleBadge component
 */
export interface VoterRoleBadgeProps {
  /**
   * The voter role type in Cardano governance.
   * - `"DRep"`: Delegated Representative - shows User icon
   * - `"SPO"`: Stake Pool Operator - shows Network icon
   * - `"CC"` or other: Constitutional Committee - shows Landmark icon (default)
   *
   * @example
   * <VoterRoleBadge role="DRep" />
   */
  role: string;
}

/**
 * VoterRoleBadge displays a badge indicating a voter's role in Cardano governance with an appropriate icon.
 *
 * This component renders a gray badge with an icon that corresponds to the voter's governance role.
 * It supports three main governance roles in the Cardano ecosystem: DRep (Delegated Representatives),
 * SPO (Stake Pool Operators), and CC (Constitutional Committee). Each role is represented by a
 * distinct icon for quick visual identification.
 *
 * **Role Icons:**
 * - **DRep**: User icon - represents individual delegated representatives
 * - **SPO**: Network icon - represents stake pool operators
 * - **CC/Other**: Landmark icon - represents constitutional committee members or other governance roles
 *
 * **Common Use Cases:**
 * - Display voter roles in governance proposal listings
 * - Show voter type in delegation interfaces
 * - Indicate role in voting history and activity feeds
 * - Identify governance participants in dashboard views
 *
 * @component
 * @example
 * ```tsx
 * // DRep (Delegated Representative)
 * <VoterRoleBadge role="DRep" />
 *
 * // SPO (Stake Pool Operator)
 * <VoterRoleBadge role="SPO" />
 *
 * // CC (Constitutional Committee)
 * <VoterRoleBadge role="CC" />
 *
 * // In a voter list
 * {voters.map(voter => (
 *   <div key={voter.id} className="flex items-center gap-2">
 *     <VoterRoleBadge role={voter.role} />
 *     <span>{voter.name}</span>
 *   </div>
 * ))}
 *
 * // In a governance proposal view
 * <div className="flex items-center gap-3">
 *   <VoterRoleBadge role={vote.voterRole} />
 *   <span>{vote.voterAddress}</span>
 *   <span className="text-muted">{vote.decision}</span>
 * </div>
 * ```
 *
 * @param {VoterRoleBadgeProps} props - Component props
 * @param {string} props.role - The voter role type (DRep, SPO, CC, or other)
 * @returns {JSX.Element} A gray badge with role-specific icon and text
 */
export const VoterRoleBadge = ({ role }: VoterRoleBadgeProps) => {
  const getIcon = () => {
    switch (role) {
      case "DRep":
        return <User size={15} />;
      case "SPO":
        return <Network size={15} />;
      default:
        return <Landmark size={15} />;
    }
  };
  return (
    <Badge color='gray'>
      {getIcon()}
      {role}
    </Badge>
  );
};
