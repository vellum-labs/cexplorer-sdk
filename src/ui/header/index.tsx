import { ReactNode, useState } from "react";
import { Breadcrumb, BreadCrumbItem } from "../breadcrumbs";
import { BreadcrumbSeparator } from "../breadcrumbs/components/BreadcrumbSeparator";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MiscBasicResponse, MiscSearchResponse } from "@/types/miscTypes";
import { cn } from "@/utils/cn";
import { TruncatedText } from "../truncatedText";
import { ShareButton } from "../shareButton";
import { LoadingSkeleton } from "../loadingSkeleton";
import { GlobalSearchProvider } from "@/providers/GlobalSearchContext";
import { GlobalSearch } from "../globalSearch";
import { Locales } from "@/types/commonTypes";
import { AdDropdown } from "../adDropdown";

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
}: HeaderProps) => {
  const [hasImage, setHasImage] = useState(false);
  const headingAd = miscBasicQuery.data?.data.ads.find(
    ad => ad.type === "heading_featured",
  );
  const boxAds = miscBasicQuery.data?.data.ads.filter(ad => ad.type === "box");

  const sortedAds: Record<
    string,
    MiscBasicResponse["data"]["ads"][number]["data"][]
  > = boxAds
    ? boxAds.reduce(
        (acc, ad) => {
          acc[ad.data.title] = [ad.data];
          return acc;
        },
        {} as Record<
          string,
          MiscBasicResponse["data"]["ads"][number]["data"][]
        >,
      )
    : {};

  return (
    <header className='flex min-h-[110px] w-full justify-center bg-gradient-to-b from-bannerGradient to-darker'>
      <div
        className={`flex w-full max-w-desktop flex-wrap justify-between gap-3 p-mobile md:px-desktop md:py-2 ${isHomepage ? "items-center" : ""}`}
      >
        <div
          className={`flex flex-col pt-2 ${isHomepage ? "w-full max-w-[750px]" : ""}`}
        >
          {breadcrumbItems && (
            <Breadcrumb
              breadcrumbItems={breadcrumbItems}
              breadcrumbSeparator={breadcrumbSeparator}
            />
          )}
          <div className={cn("flex items-center gap-2 pb-1.5 font-poppins")}>
            <h1 className={cn("flex items-end")}>
              <TruncatedText
                onHasImageChange={setHasImage}
                className='text-display-md'
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
          <div className={`flex items-center gap-1`}>
            {!isHomepage && subTitle && subTitle}
            {!isHomepage && qrCode && qrCode}
            {isHomepage && (
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
        {!isHomepage ? (
          <div
            className={"flex w-full shrink basis-[385px] flex-col gap-1.5 pt-4"}
          >
            <GlobalSearchProvider
              useFetchMiscSearch={useFetchMiscSearch}
              locale={locale}
            >
              <GlobalSearch />
            </GlobalSearchProvider>

            {miscBasicQuery.isLoading ? (
              <div className='flex flex-wrap gap-1'>
                <LoadingSkeleton width='130px' height='40px' rounded='lg' />
                <LoadingSkeleton width='130px' height='40px' rounded='lg' />
                <LoadingSkeleton width='130px' height='40px' rounded='lg' />
              </div>
            ) : (
              <div className='flex flex-wrap gap-1.5'>
                {Object.entries(sortedAds)?.map(ad => (
                  <AdDropdown
                    key={ad[0]}
                    icon={ad[1][0].icon}
                    label={ad[1][0].section}
                    options={ad[1].map(({ title, content, link }) => ({
                      label: (
                        <a
                          href={link}
                          target='_blank'
                          className='flex flex-col gap-1'
                        >
                          <p>{title}</p>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: content,
                            }}
                          ></p>
                        </a>
                      ),
                    }))}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className='relative h-[110px] w-[320px] rounded-m border border-border bg-black'>
            <div className='absolute right-2 top-1.5 flex h-[24px] w-[32px] items-center justify-center rounded-xs border border-border bg-background text-text-xs font-medium text-text'>
              <span>Ad</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
