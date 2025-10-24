import { type MouseEventHandler, type ReactNode, type RefObject } from "react";

interface TableColumn<T> {
  key: string;
  render: (value: T, index?: number) => ReactNode;
  title: ReactNode;
  visible: boolean;
  standByRanking?: boolean;
  rankingStart?: "asc" | "desc" | undefined;
  jsonFormat?: (value: T, index?: number) => string | number;
  jsonTitleFormat?: string | number;
  widthPx: number;
  filter?: {
    filterOpen?: boolean;
    filterContent?: ReactNode;
    filterButtonDisabled?: boolean;
    anchorRef: RefObject<any>;
    activeFunnel?: boolean;
    width?: string;
    onShow?: MouseEventHandler<SVGSVGElement>;
    onReset?: () => void;
    onFilter?: () => void;
  };
}

export type TableColumns<T> = TableColumn<T>[];
