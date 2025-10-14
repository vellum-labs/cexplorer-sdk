import type { NavigationOptions } from "@/types/navigationTypes";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import Icon from "../icon";
import { Dropdown } from "../dropdown";
import { useThemeStore } from "@/providers/ThemeProvider";

/**
 * Props for the AdDropdown component.
 *
 * @interface Props
 */
interface Props {
  /**
   * Display label text for the dropdown trigger.
   *
   * @example "ADA"
   * @example "Language"
   * @example "Network"
   */
  label: string;
  /**
   * Lucide icon name to display alongside the label.
   *
   * @example "globe"
   * @example "coins"
   * @example "settings"
   */
  icon: keyof typeof dynamicIconImports;
  /**
   * Array of navigation options for the dropdown menu.
   *
   * @example
   * ```tsx
   * [
   *   { label: "English", onClick: () => setLocale("en") },
   *   { label: "Czech", onClick: () => setLocale("cz") }
   * ]
   * ```
   */
  options: NavigationOptions;
}

/**
 * Styled dropdown component with icon and label trigger.
 *
 * Wrapper around the base Dropdown component that provides a consistent
 * styled trigger with icon and text label. Commonly used for currency,
 * language, or network selection.
 *
 * Features:
 * - Icon + text label trigger
 * - Consistent border and background styling
 * - Fixed width (200px) dropdown menu
 * - Hover state styling
 * - Chevron indicator
 *
 * @component
 * @example
 * ```tsx
 * // Currency selector
 * <AdDropdown
 *   label="ADA"
 *   icon="coins"
 *   options={[
 *     { label: "ADA", onClick: () => setCurrency("ADA") },
 *     { label: "USD", onClick: () => setCurrency("USD") },
 *     { label: "EUR", onClick: () => setCurrency("EUR") }
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Language selector
 * <AdDropdown
 *   label="English"
 *   icon="globe"
 *   options={[
 *     { label: "English", onClick: () => setLang("en") },
 *     { label: "Czech", onClick: () => setLang("cz") },
 *     { label: "Spanish", onClick: () => setLang("es") }
 *   ]}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Network selector
 * <AdDropdown
 *   label="Mainnet"
 *   icon="network"
 *   options={[
 *     { label: "Mainnet", href: "/mainnet" },
 *     { label: "Testnet", href: "/testnet" },
 *     { label: "Preview", href: "/preview" }
 *   ]}
 * />
 * ```
 *
 * @param {Props} props - Component props
 * @returns {JSX.Element} Styled dropdown with icon and label
 */
export const AdDropdown = ({ label, options, icon }: Props) => {
  const { theme } = useThemeStore();

  return (
    <div className='flex justify-end rounded-s border border-border'>
      <Dropdown
        id={label}
        width='200px'
        label={
          <div className='group flex h-[36px] w-[86px] shrink grow items-center justify-center gap-1 rounded-s border-border bg-background py-1.5'>
            <Icon name={icon} size={18} />
            <span>{label}</span>
          </div>
        }
        options={options}
        triggerClassName={`pr-1.5 rounded-s ${theme === "light" ? "bg-white" : "bg-background"}`}
      />
    </div>
  );
};
