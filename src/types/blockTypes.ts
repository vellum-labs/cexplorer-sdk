interface BlockDetailResponseDataTxsItemRateCurrency {
  close: number;
  high: number;
  low: number;
  market_cap: number;
  open: number;
  time_close: string;
  time_open: string;
  volume: number;
}

interface BlockDetailResponseDataTxsItemRateFiat {
  [key: string]: [currency: number, ada: number];
}

export interface Rate {
  ada: BlockDetailResponseDataTxsItemRateCurrency[];
  btc: BlockDetailResponseDataTxsItemRateCurrency[];
  date: string;
  epoch_no: number;
  fiat: BlockDetailResponseDataTxsItemRateFiat;
  need_fix: string;
}
