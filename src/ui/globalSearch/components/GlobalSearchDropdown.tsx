import type { FC } from "react";
import { ChevronDown } from "lucide-react";

import { Dropdown } from "@/ui/dropdown";

import { useGlobalSearch } from "@/providers/GlobalSearchContext";

/**
 * Category label configuration for GlobalSearchDropdown
 */
export interface CategoryLabels {
  all?: string;
  tx?: string;
  block?: string;
  pool?: string;
  asset?: string;
  policy?: string;
  address?: string;
  stake?: string;
  adahandle?: string;
  user?: string;
  article?: string;
  page?: string;
  gov?: string;
  drep?: string;
}

interface GlobalSearchDropdownProps {
  isHomepage?: boolean;
  /**
   * Custom labels for search categories
   */
  categoryLabels?: CategoryLabels;
}

const defaultCategoryLabels: Required<CategoryLabels> = {
  all: "All",
  tx: "Tx",
  block: "Block",
  pool: "Pool",
  asset: "Asset",
  policy: "Policy",
  address: "Address",
  stake: "Stake",
  adahandle: "Adahandle",
  user: "User",
  article: "Article",
  page: "Page",
  gov: "Gov",
  drep: "DRep",
};

export const GlobalSearchDropdown: FC<GlobalSearchDropdownProps> = ({
  isHomepage,
  categoryLabels,
}) => {
  const { searchCategory, setSearchCategory } = useGlobalSearch();
  const labels = { ...defaultCategoryLabels, ...categoryLabels };

  return (
    <div
      className={
        isHomepage
          ? "ml-1 flex-shrink-0"
          : "absolute flex h-full w-[100px] cursor-pointer items-center justify-center border-r border-border px-1/2"
      }
    >
      <Dropdown
        label={
          <div className='flex items-center gap-1/2'>
            <span>
              {searchCategory.includes("_")
                ? searchCategory.split("_")[0][0].toUpperCase() +
                  searchCategory.split("_")[0].slice(1)
                : searchCategory[0].toUpperCase() + searchCategory.slice(1)}
            </span>
            {isHomepage && <ChevronDown size={14} />}
          </div>
        }
        id='1'
        hideChevron={isHomepage}
        wrapperClassname='z-[26]'
        poppoverClassname={`z-[26] ${isHomepage ? "left-0" : "left-[0.5px] top-[37.5px] rounded-t-none border-t-0 max-w-[100px]"}`}
        withBorder
        {...(isHomepage && { forceVerticalPosition: "up" })}
        triggerClassName={`text-sm ${isHomepage ? "text-grayTextSecondary bg-cardBg border border-border h-8 px-1 rounded-m hover:bg-grayHover transition-colors flex items-center gap-1/2 whitespace-nowrap" : "text-grayTextPrimary w-[100px] h-[35px] px-1.5"}`}
        options={[
          {
            label: labels.all,
            onClick: () => setSearchCategory("all"),
          },
          {
            label: labels.tx,
            onClick: () => setSearchCategory("tx"),
          },
          {
            label: labels.block,
            onClick: () => setSearchCategory("block"),
          },
          {
            label: labels.pool,
            onClick: () => setSearchCategory("pool"),
          },
          {
            label: labels.asset,
            onClick: () => setSearchCategory("asset"),
          },
          {
            label: labels.policy,
            onClick: () => setSearchCategory("policy"),
          },
          {
            label: labels.address,
            onClick: () => setSearchCategory("address"),
          },
          {
            label: labels.stake,
            onClick: () => setSearchCategory("stake"),
          },
          {
            label: labels.adahandle,
            onClick: () => setSearchCategory("adahandle"),
          },
          {
            label: labels.user,
            onClick: () => setSearchCategory("user"),
          },
          {
            label: labels.article,
            onClick: () => setSearchCategory("article"),
          },
          {
            label: labels.page,
            onClick: () => setSearchCategory("page"),
          },
          {
            label: labels.gov,
            onClick: () => setSearchCategory("gov_action_proposal"),
          },
          {
            label: labels.drep,
            onClick: () => setSearchCategory("drep"),
          },
        ]}
      />
    </div>
  );
};
