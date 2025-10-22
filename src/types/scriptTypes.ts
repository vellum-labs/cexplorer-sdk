import type { MetadataTx } from "./assetsTypes";
import type { Label } from "./txTypes";

export interface ScriptStatItem {
  item: {
    data: {
      redeemer: {
        sum: number;
        count: number;
        stake: number;
        redeemers: number;
      };
      tx_payment_cred: {
        out: {
          sum: number;
          count: number;
          stake: number;
          address: number;
        } | null;
        tx_mint: {
          count: number;
          amount: null;
          assets: number;
        } | null;
      } | null;
      tx_reference_script: null;
    };
    epoch_no: number;
  };
}

interface ScriptStatTotal {
  epochs: number;
  interactions: number;
  volume: number;
}

export interface ScriptDetailData {
  tx: MetadataTx;
  hash: string;
  json: null;
  type: string;
  label: Label;
  bytecode: string;
  serialised_size: number;
  purpose: {
    count: number;
    purpose: string;
  }[];
  stat: ScriptStatItem[];
  stat_total: ScriptStatTotal;
}
