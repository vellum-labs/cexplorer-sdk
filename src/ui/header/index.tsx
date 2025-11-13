import { GlobalSearchProvider } from "@/providers/GlobalSearchContext";
import type { Locales } from "@/types/commonTypes";
import type { MiscBasicResponse, MiscSearchResponse } from "@/types/miscTypes";
import { cn } from "@/utils/cn";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";
import type { BreadCrumbItem } from "../breadcrumbs";
import { Breadcrumb } from "../breadcrumbs";
import { BreadcrumbSeparator } from "../breadcrumbs/components/BreadcrumbSeparator";
import { GlobalSearch } from "../globalSearch";
import { LoadingSkeleton } from "../loadingSkeleton";
import { ShareButton } from "../shareButton";
import { TruncatedText } from "../truncatedText";

/**
 * Props for the Header component.
 *
 * @interface HeaderProps
 */
export interface HeaderProps {
  /**
   * Breadcrumb navigation items.
   */
  breadcrumbItems?: BreadCrumbItem[];
  /**
   * Custom breadcrumb separator element.
   */
  breadcrumbSeparator?: ReactNode;
  /**
   * Main page title (text or element with icon).
   */
  title: ReactNode;
  /**
   * Optional subtitle below the title.
   */
  subTitle?: ReactNode;
  /**
   * Optional badge next to title.
   */
  badge?: ReactNode;
  /**
   * Optional QR code element.
   */
  qrCode?: ReactNode;
  /**
   * Whether this is the homepage variant.
   */
  isHomepage?: boolean;
  /**
   * Query result for basic data and ads.
   */
  miscBasic: UseQueryResult<
    MiscBasicResponse & {
      prevOffset: number | undefined;
    },
    Error
  >;
  /**
   * Search fetch hook for GlobalSearch.
   */
  useFetchMiscSearch: (
    query: string | undefined,
    category?: string,
    locale?: Locales,
  ) => UseQueryResult<
    MiscSearchResponse & {
      prevOffset: number | undefined;
    },
    unknown
  >;
  /**
   * Current locale.
   */
  locale: Locales;
  /**
   * Homepage ad
   */
  homepageAd?: ReactNode;
  /**
   * Whether this is a custom page variant with centered title and no search.
   */
  customPage?: boolean;
}

/**
 * Page header component with breadcrumbs, title, search, and ads.
 *
 * Displays page navigation, title with optional icon/badge, global search,
 * share button, and ad slots. Supports homepage and detail page variants.
 *
 * @component
 * @param {HeaderProps} props - Component props
 * @returns {JSX.Element} Header element
 *
 * @example
 * ```tsx
 * // Homepage variant
 * <Header
 *   isHomepage
 *   title="Explore Cardano blockchain"
 *   miscBasic={miscBasicQuery}
 *   useFetchMiscSearch={useFetchMiscSearch}
 *   locale="en"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Detail page with breadcrumb and icon
 * <Header
 *   breadcrumbItems={[
 *     { label: "Blocks", href: "/blocks" },
 *     { label: "0ta9cec52f...3c396637" }
 *   ]}
 *   title={
 *     <>
 *       <img src="/cardano-icon.png" className="w-8 h-8 mr-2" />
 *       Title
 *     </>
 *   }
 *   subTitle={
 *     <>
 *       <p>Ident 1: addr174vzdp...eq9qn8q5vtgdea9cee52f</p>
 *       <p>Ident 2: addr174vzdp...eq9qn8q5vtgdea9cee52f</p>
 *     </>
 *   }
 *   miscBasic={miscBasicQuery}
 *   useFetchMiscSearch={useFetchMiscSearch}
 *   locale="en"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // Simple page with breadcrumb
 * <Header
 *   breadcrumbItems={[{ label: "Blocks" }]}
 *   title="Blocks"
 *   miscBasic={miscBasicQuery}
 *   useFetchMiscSearch={useFetchMiscSearch}
 *   locale="en"
 * />
 * ```
 */
export const Header = ({
  breadcrumbItems,
  breadcrumbSeparator = <BreadcrumbSeparator />,
  title,
  subTitle,
  badge,
  qrCode,
  isHomepage,
  miscBasic: miscBasicQuery,
  useFetchMiscSearch,
  locale,
  homepageAd,
  customPage,
}: HeaderProps) => {
  const [hasImage, setHasImage] = useState(false);
  const headingAd = miscBasicQuery.data?.data.ads.find(
    ad => ad.type === "heading_featured",
  );

  return (
    <header className='flex min-h-[110px] w-full justify-center bg-gradient-to-b from-bannerGradient to-darker'>
      <div
        className={`flex w-full max-w-desktop flex-wrap justify-between gap-3 p-mobile md:px-desktop md:py-2 ${isHomepage ? "items-center" : ""} ${customPage ? "items-center justify-center" : ""}`}
      >
        <div
          className={`flex flex-col pt-2 ${isHomepage ? "w-full max-w-[750px]" : ""} ${customPage ? "w-full items-center text-center" : ""}`}
        >
          {breadcrumbItems && (
            <Breadcrumb
              breadcrumbItems={breadcrumbItems}
              breadcrumbSeparator={breadcrumbSeparator}
            />
          )}
          <div
            className={cn("flex items-center gap-2 pb-1.5 pt-1 font-poppins")}
          >
            <h1 className={cn("flex items-end", customPage && "pl-[28px]")}>
              <TruncatedText
                onHasImageChange={setHasImage}
                className='text-nowrap text-display-sm'
              >
                {title}
              </TruncatedText>
            </h1>
            {!isHomepage && badge && (
              <div className={cn(!hasImage && "mt-[5px]")}>{badge}</div>
            )}
            {!isHomepage && (
              <div className={cn("flex translate-y-[2px] items-center")}>
                <ShareButton isHeader />
              </div>
            )}
          </div>
          <div
            className={`flex items-center gap-1 ${customPage ? "flex-col" : ""}`}
          >
            {!isHomepage && subTitle && subTitle}
            {!isHomepage && qrCode && qrCode}
            {isHomepage && !customPage && (
              <GlobalSearchProvider
                useFetchMiscSearch={useFetchMiscSearch}
                locale={locale}
              >
                <GlobalSearch isHomepage />
              </GlobalSearchProvider>
            )}
          </div>

          {headingAd && miscBasicQuery.isLoading ? (
            <LoadingSkeleton height='14px' />
          ) : (
            <>
              {headingAd && (
                <div className='flex gap-[4px] pt-1.5'>
                  <span className='text-text-sm font-semibold text-text'>
                    Featured:
                  </span>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: headingAd?.data.text || "",
                    }}
                    className='text-text-sm text-grayTextPrimary [&>a]:font-semibold [&>a]:text-brand-600'
                  ></p>
                </div>
              )}
            </>
          )}
        </div>
        {!isHomepage && !customPage ? (
          <div
            className={`flex pt-2 ${homepageAd ? "basis-[385px] flex-col" : "basis-[385px] pt-4"}`}
          >
            <div className={"flex w-full shrink flex-col gap-1.5 pb-1.5"}>
              <GlobalSearchProvider
                useFetchMiscSearch={useFetchMiscSearch}
                locale={locale}
              >
                <GlobalSearch />
              </GlobalSearchProvider>
            </div>
            {homepageAd && (
              <div className='relative h-[100px] w-[320px] overflow-hidden rounded-m border border-border bg-cardBg'>
                {homepageAd}
                <div className='absolute right-2 top-1.5 flex h-[24px] w-[32px] items-center justify-center rounded-xs border border-border bg-background text-text-xs font-medium text-text'>
                  <span>Ad</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          !customPage &&
          homepageAd && (
            <div className='relative h-[100px] w-[320px] overflow-hidden rounded-m border border-border bg-cardBg'>
              {homepageAd}
              <div className='absolute right-2 top-1.5 flex h-[24px] w-[32px] items-center justify-center rounded-xs border border-border bg-background text-text-xs font-medium text-text'>
                <span>Ad</span>
              </div>
            </div>
          )
        )}
      </div>
    </header>
  );
};
