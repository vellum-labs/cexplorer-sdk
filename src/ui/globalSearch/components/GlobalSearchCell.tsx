import type { MiscSearch } from "@/types/miscTypes";
import type { FC } from "react";

import { DateCell } from "@/ui/dateCell";

import { formatString } from "@/utils/format";
import { Link } from "@tanstack/react-router";

import { useGlobalSearch } from "@/providers/GlobalSearchContext";
import { AdaWithTooltip } from "@/ui/adaWithTooltip";
import { Image } from "@/ui/image";
import Dollar from "@/resources/images/dollar.svg";
import {
  ArrowLeftRight,
  BookOpen,
  Box,
  FileText,
  Fingerprint,
  Landmark,
  Wallet,
} from "lucide-react";

interface GlobalSearchCellProps {
  item: MiscSearch;
  formatTitle: boolean;
}

const getCategoryIcon = (category: string) => {
  const iconClass = "h-4 w-4 text-[#475467]";
  switch (category) {
    case "tx":
      return <ArrowLeftRight className={iconClass} />;
    case "block":
      return <Box className={iconClass} />;
    case "address":
    case "stake":
      return <Wallet className={iconClass} />;
    case "article":
      return <BookOpen className={iconClass} />;
    case "page":
      return <FileText className={iconClass} />;
    case "policy":
      return <Fingerprint className={iconClass} />;
    case "gov_action_proposal":
      return <Landmark className={iconClass} />;
    default:
      return null;
  }
};

const SearchResultImage: FC<{
  item: MiscSearch;
  generateImageUrl?: (id: string, size: string, type: string) => string;
}> = ({ item, generateImageUrl }) => {
  const { category, ident, title } = item;

  if (category === "adahandle") {
    return (
      <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-max bg-[#F2F4F7]'>
        <img src={Dollar} alt='ADA Handle' className='h-4 w-4' />
      </div>
    );
  }

  if (["pool", "asset", "drep", "user"].includes(category)) {
    const typeMap: Record<string, "pool" | "asset" | "user"> = {
      pool: "pool",
      asset: "asset",
      drep: "user",
      user: "user",
    };
    const imgTypeMap: Record<string, string> = {
      pool: "pool",
      asset: "token",
      drep: "drep",
      user: "user",
    };

    const imgSrc = generateImageUrl
      ? generateImageUrl(ident, "ico", imgTypeMap[category])
      : undefined;

    return (
      <Image
        src={imgSrc}
        type={typeMap[category]}
        fallbackletters={title}
        width={32}
        height={32}
        className='h-8 w-8 shrink-0 rounded-max'
        alt={title}
      />
    );
  }

  const icon = getCategoryIcon(category);
  if (icon) {
    return (
      <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-max bg-[#F2F4F7]'>
        {icon}
      </div>
    );
  }

  return null;
};

export const GlobalSearchCell: FC<GlobalSearchCellProps> = ({
  item,
  formatTitle,
}) => {
  const { handleInput, handleSearchChange, generateImageUrl } =
    useGlobalSearch();
  const { title, ident, category, ...rest } = item;

  const govActionId = rest.url.replace("/gov/action", "");

  const { to, params } = {
    to: {
      pool: "/pool/$id",
      asset: "/asset/$fingerprint",
      tx: "/tx/$hash",
      block: "/block/$hash",
      stake: "/stake/$stakeAddr",
      address: "/address/$address",
      adahandle: "/address/$address",
      policy: "/policy/$policyId",
      drep: "/drep/$hash",
      gov_action_proposal: "/gov/action/" + govActionId.replace("#", "%23"),
      page: rest.url,
      user: rest.url,
      article: rest.url,
    },
    params: {
      drep: {
        hash: ident,
      },
      pool: {
        id: ident,
      },
      asset: {
        fingerprint: ident,
      },
      tx: {
        hash: ident,
      },
      block: {
        hash: ident,
      },
      stake: {
        stakeAddr: ident,
      },
      address: {
        address: ident,
      },
      adahandle: {
        address: ident,
      },
      policy: {
        policyId: ident,
      },
    },
  };

  return (
    <Link to={to[category]} params={params[category]}>
      <div
        className='flex w-full cursor-pointer items-stretch justify-between border-b border-border pb-1/2 pt-1.5 transition-all duration-100 last:border-b-0 hover:bg-cardBg'
        onClick={() => {
          handleInput("blur");
          handleSearchChange("");
        }}
      >
        <div className='flex items-center gap-1'>
          <SearchResultImage
            item={item}
            generateImageUrl={generateImageUrl}
          />
          <div className='flex w-fit max-w-[350px] flex-col break-words text-text-sm text-primary'>
            <span className='font-semibold'>
              {formatTitle ? formatString(title, "long") : title}
            </span>
            <span className='text-text-xs text-grayTextPrimary'>
              {["page", "article"].includes(category)
                ? rest?.url
                : formatString(ident, "long")}
            </span>
          </div>
        </div>
        {rest.extra.value && rest.extra.type && (
          <div className='flex min-w-[70px] flex-col items-start justify-center text-nowrap text-text'>
            {typeof rest.extra.value === "string" ? (
              <DateCell
                time={rest.extra.value as string}
                className='text-text-xs'
                tabularNums={false}
                withoutConvert
              />
            ) : (
              <span className='text-text-sm text-text'>
                <AdaWithTooltip data={rest.extra.value} />
              </span>
            )}
            <span className='text-text-sm text-grayTextPrimary'>
              {rest.extra.type[0].toUpperCase() + rest.extra.type.slice(1)}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
