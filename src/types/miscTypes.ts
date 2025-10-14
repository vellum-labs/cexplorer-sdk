import { ResponseCore } from "./commonTypes";

export interface MiscSearch {
  url: string;
  ident: string;
  title: string;
  category: string;
  extra: {
    icon: "balance" | "time" | "hot" | "promo";
    type: "balance" | "time" | "stake";
    value: number | string;
    id?: string;
  };
}

export type MiscSearchResponse = ResponseCore<MiscSearch[] | MiscSearch>;
