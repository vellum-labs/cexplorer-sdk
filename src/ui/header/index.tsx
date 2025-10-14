import { ReactNode, useState } from "react";
import { Breadcrumb, BreadCrumbItem } from "../breadcrumbs";
import { BreadcrumbSeparator } from "../breadcrumbs/components/BreadcrumbSeparator";
import type { UseQueryResult } from "@tanstack/react-query";
import type { MiscBasicResponse, MiscSearchResponse } from "@/types/miscTypes";
import { cn } from "@/utils/cn";
import { TruncatedText } from "../truncatedText";
import { ShareButton } from "../shareButton";
import { LoadingSkeleton } from "../loadingSkeleton";
import { Link } from "@tanstack/react-router";
import { GlobalSearchProvider } from "@/providers/GlobalSearchContext";
import { GlobalSearch } from "../globalSearch";
import { Locales } from "@/types/commonTypes";
import { AdDropdown } from "../adDropdown";

export interface HeaderProps {
  breadcrumbItems?: BreadCrumbItem[];
  breadcrumbSeparator?: ReactNode;
  title: ReactNode;
  subTitle?: ReactNode;
  badge?: ReactNode;
  qrCode?: ReactNode;
  isHomepage?: boolean;
  miscBasic: UseQueryResult<
    MiscBasicResponse & {
      prevOffset: number | undefined;
    },
    Error
  >;
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
  locale: Locales;
}

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
    MiscBasicResponse["data"]["ads"][number]["data"]["section"],
    MiscBasicResponse["data"]["ads"][number]["data"][]
  > = boxAds
    ? boxAds.reduce((acc, ad) => {
        if (!acc[ad.data.section]) {
          acc[ad.data.section] = [];
        }
        acc[ad.data.section].push(ad.data);
        return acc;
      }, {})
    : {};

  return (
    <header className='mb-1.5 flex min-h-[110px] w-full justify-center bg-gradient-to-b from-bannerGradient to-darker'>
      <div className='flex w-full max-w-desktop flex-wrap justify-between gap-3 p-mobile md:px-desktop md:py-mobile'>
        <div className='flex flex-col py-1/2'>
          {breadcrumbItems && (
            <Breadcrumb
              breadcrumbItems={breadcrumbItems}
              breadcrumbSeparator={breadcrumbSeparator}
            />
          )}
          <div
            className={cn(
              "flex gap-1 pt-1/2 font-poppins",
              hasImage ? "items-center" : "items-start",
            )}
          >
            <h1
              className={cn(
                "flex items-end",
                !subTitle && !isHomepage && "pb-8",
              )}
            >
              <TruncatedText onHasImageChange={setHasImage}>
                {title}
              </TruncatedText>
            </h1>
            {badge && (
              <div className={cn(!hasImage && "mt-[5px]")}>{badge}</div>
            )}
            {!isHomepage && (
              <div
                className={cn(
                  !hasImage && "mt-[5px]",
                  hasImage ? "translate-y-[2px]" : "translate-y-[4px]",
                )}
              >
                <ShareButton isHeader />
              </div>
            )}
          </div>
          <div className='flex items-center gap-1'>
            {subTitle && subTitle}
            {qrCode && qrCode}
          </div>

          {headingAd && miscBasicQuery.isLoading ? (
            <LoadingSkeleton height='14px' />
          ) : (
            <>
              {headingAd && (
                <div className='flex'>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: headingAd?.data.text || "",
                    }}
                    className='text-text-sm text-grayTextPrimary [&>a]:text-primary'
                  ></p>
                  <Link
                    to='/ads'
                    className='ml-1/2 flex -translate-y-1 items-center justify-center rounded-max border border-border bg-background px-[6px] text-[10px] font-medium'
                  >
                    Ad
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
        <div
          className={
            isHomepage
              ? "mb-3 mt-1.5 flex w-full justify-center"
              : "flex w-full shrink basis-[500px] flex-col justify-center gap-1.5"
          }
        >
          <GlobalSearchProvider
            useFetchMiscSearch={useFetchMiscSearch}
            locale={locale}
          >
            <GlobalSearch isHomepage={isHomepage} />
          </GlobalSearchProvider>
          {!isHomepage && (
            <>
              {miscBasicQuery.isLoading ? (
                <div className='flex flex-wrap gap-1'>
                  <LoadingSkeleton width='130px' height='40px' rounded='lg' />
                  <LoadingSkeleton width='130px' height='40px' rounded='lg' />
                </div>
              ) : (
                <div className='flex flex-wrap gap-1'>
                  {Object.entries(sortedAds)?.map(ad => (
                    <AdDropdown
                      key={ad[0]}
                      icon={ad[1][0].icon}
                      label={ad[0]}
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
                        // onClick: () => {},
                      }))}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
