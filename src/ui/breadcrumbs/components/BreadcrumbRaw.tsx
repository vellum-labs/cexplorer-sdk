import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef } from "react";

/**
 * BreadcrumbRaw is the root container for breadcrumb navigation.
 *
 * This component wraps all breadcrumb elements and provides proper semantic HTML
 * structure with navigation landmarks and ARIA attributes for accessibility.
 * It renders a `<nav>` element with `aria-label="breadcrumb"` to indicate
 * breadcrumb navigation to screen readers.
 *
 * **Features:**
 * - Semantic `<nav>` element for navigation landmark
 * - ARIA `aria-label="breadcrumb"` for accessibility
 * - Forward ref support for parent component access
 * - Optional separator prop (currently not implemented in component logic)
 *
 * **Common Use Cases:**
 * - Page navigation hierarchy (Home > Transactions > Details)
 * - Block explorer navigation (Blocks > Block #123 > Transaction)
 * - Nested resource navigation (Pools > Pool Details > Delegators)
 *
 * @component
 * @example
 * ```tsx
 * <BreadcrumbRaw>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <a href="/">Home</a>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </BreadcrumbRaw>
 * ```
 *
 * @param {ComponentPropsWithoutRef<"nav">} props - Standard nav element props
 * @param {ReactNode} [props.separator] - Optional custom separator (not currently used)
 * @param {React.Ref<HTMLElement>} ref - Forward ref to nav element
 * @returns {JSX.Element} Navigation container for breadcrumbs
 */
export const BreadcrumbRaw = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<"nav"> & {
    separator?: ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label='breadcrumb' {...props} />);
BreadcrumbRaw.displayName = "Breadcrumb";
