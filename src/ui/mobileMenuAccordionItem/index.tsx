import type { NavigationOptions } from "@/types/navigationTypes";
import type { FileRoutesByPath } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type dynamicIconImports from "lucide-react/dynamicIconImports";
import type { SetStateAction } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion/accordion";
import { Icon } from "../icon";

/**
 * Props for the MobileMenuAccordionItem component
 */
export type MobileMenuAccordionItemProps = {
  /**
   * Display label for the accordion trigger
   */
  label: string;
  /**
   * Lucide icon name to display next to the label
   */
  icon: keyof typeof dynamicIconImports;
  /**
   * Navigation options/items to display in the accordion content
   */
  items: NavigationOptions;
  /**
   * State setter to close the mobile menu when a link is clicked
   */
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  /**
   * Optional href to make the accordion trigger itself a clickable link
   */
  href?: FileRoutesByPath[keyof FileRoutesByPath]["path"];
};

/**
 * MobileMenuAccordionItem provides an expandable navigation menu item for mobile devices.
 *
 * An accordion-based navigation component designed for mobile menus. Features an icon,
 * label (optionally clickable), and expandable list of sub-navigation items. Automatically
 * closes the mobile menu when any navigation link is clicked.
 *
 * **Common Use Cases:**
 * - Mobile navigation menus
 * - Hamburger menu sections
 * - Nested mobile navigation
 * - Collapsible menu categories
 * - Mobile-first responsive navigation
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with sub-items
 * <MobileMenuAccordionItem
 *   label="Blockchain"
 *   icon="blocks"
 *   items={{
 *     blocks: { label: "Blocks", href: "/blocks" },
 *     epochs: { label: "Epochs", href: "/epochs" },
 *     transactions: { label: "Transactions", href: "/tx" }
 *   }}
 *   setIsOpen={setMenuOpen}
 * />
 *
 * // With clickable trigger label
 * <MobileMenuAccordionItem
 *   label="Governance"
 *   icon="vote"
 *   href="/governance"
 *   items={{
 *     proposals: { label: "Proposals", href: "/gov/proposals" },
 *     dreps: { label: "DReps", href: "/gov/dreps" }
 *   }}
 *   setIsOpen={setMenuOpen}
 * />
 *
 * // With button actions
 * <MobileMenuAccordionItem
 *   label="Settings"
 *   icon="settings"
 *   items={{
 *     theme: {
 *       label: "Toggle Theme",
 *       onClick: () => toggleTheme()
 *     },
 *     language: {
 *       label: "Change Language",
 *       onClick: () => openLanguageModal()
 *     }
 *   }}
 *   setIsOpen={setMenuOpen}
 * />
 * ```
 *
 * @param {MobileMenuAccordionItemProps} props - Component props
 * @param {string} props.label - Accordion trigger label
 * @param {string} props.icon - Lucide icon name
 * @param {NavigationOptions} props.items - Navigation sub-items
 * @param {Function} props.setIsOpen - Menu state setter
 * @param {string} [props.href] - Optional trigger link
 * @returns {JSX.Element} Expandable mobile menu accordion item
 */
export const MobileMenuAccordionItem = ({
  label,
  icon,
  items,
  setIsOpen,
  href,
}: MobileMenuAccordionItemProps) => {
  return (
    <AccordionItem value={label} className='mt-1.5'>
      <AccordionTrigger>
        <Icon name={icon} size={20} />
        {}
        {href ? (
          <Link
            className='text-text-md underline'
            to={href}
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ) : (
          <span className='text-text-md'>{label}</span>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex flex-col'>
          {Object.entries(items).map((item, i) => {
            return item[1].href ? (
              <Link
                key={item[0] + i}
                className='ml-[31px] border-b border-border py-1.5 last:border-none last:pb-0 hover:text-primary'
                to={item[1].href}
                onClick={() => setIsOpen(false)}
              >
                {item[1].label}
              </Link>
            ) : (
              <button
                key={item[0] + i}
                className='ml-[31px] border-b border-border py-1.5 last:border-none last:pb-0 hover:text-primary'
                onClick={() => {
                  item[1].onClick();
                }}
              >
                {item[1].label}
              </button>
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
