import type dynamicIconImports from "lucide-react/dynamicIconImports";
import type { Rate } from "./blockTypes";
import type { ResponseCore } from "./commonTypes";

/**
 * Search result item for blockchain entities.
 *
 * @interface MiscSearch
 */
export interface MiscSearch {
  /**
   * URL path to the entity detail page.
   *
   * @example "/transaction/0x123abc"
   * @example "/pool/pool1abc"
   */
  url: string;
  /**
   * Unique identifier for the entity.
   *
   * @example "0x123abc..."
   * @example "pool1abc..."
   */
  ident: string;
  /**
   * Display title for the search result.
   *
   * @example "Transaction #123"
   * @example "ACME Stake Pool"
   */
  title: string;
  /**
   * Category of the blockchain entity.
   *
   * @example "transaction"
   * @example "pool"
   * @example "address"
   */
  category: string;
  /**
   * Additional metadata about the search result.
   */
  extra: {
    /**
     * Icon type to display.
     */
    icon: "balance" | "time" | "hot" | "promo";
    /**
     * Data type for the value field.
     */
    type: "balance" | "time" | "stake";
    /**
     * Associated value (balance, timestamp, etc.).
     *
     * @example 1000000 // lovelace
     * @example "2024-01-15T10:30:00Z"
     */
    value: number | string;
    /**
     * Optional additional identifier.
     */
    id?: string;
  };
}

/**
 * API response for search queries.
 *
 * Can return either a single result or an array of results.
 *
 * @typedef {ResponseCore<MiscSearch[] | MiscSearch>} MiscSearchResponse
 */
export type MiscSearchResponse = ResponseCore<MiscSearch[] | MiscSearch>;

export type MiscBasicResponse = {
  code: number;
  data: {
    block: {
      hash: string;
      time: string;
      epoch_no: number;
      block_no: number;
      slot_no: number;
      proto: number;
    };
    ads: {
      data: {
        content: string;
        icon: keyof typeof dynamicIconImports;
        section: string;
        title: string;
        type: string;
        link: string;
        text: string;
      };
      type: string;
    }[];
    version: {
      const: number;
      rate: number;
    };
    instance: {
      readonly: boolean;
      server: string;
      snapshot: string;
      time: string;
    };
    rate: Rate;
    rate_day: Rate;
    loads: {
      "24h": number;
      "7d": number;
      "1h": number;
    };
  };
  tokens: number;
  ex: number;
  debug: boolean;
};

interface MiscConstResponseDataEpoch {
  no: number;
  start_time: string;
  end_time: string;
  tx_count: number;
  blk_count: number;
  fees: number;
  out_sum: number;
}

interface MiscConstResponseDataLabelData {
  scriptHash: string;
  contractAddress: string;
}

export interface MiscConstResponseDataLabel {
  name: string;
  type: string;
  label: string;
  data: MiscConstResponseDataLabelData | null;
}

interface MiscConstResponseDataEpochParam {
  nonce: string;
  epoch_no: number;
  influence: string;
  max_epoch: number;
  min_fee_a: number;
  min_fee_b: number;
  price_mem: string;
  price_step: string;
  key_deposit: number;
  max_bh_size: number;
  max_tx_size: number;
  max_val_size: number;
  pool_deposit: number;
  extra_entropy: null;
  max_tx_em_mem: number;
  min_pool_cost: number;
  max_block_size: number;
  min_utxo_size: number;
  protocol_major: number;
  protocol_minor: number;
  max_tx_ex_steps: number;
  decentralisation: number;
  max_block_ex_mem: number;
  collateral_percent: number;
  max_block_ex_steps: number;
  optimal_pool_count: number;
  coint_per_utxo_size: number;
  monetary_expand_rate: string;
  treasury_growth_rate: string;
  max_collateral_inputs: number;
}

interface MiscConstResponseDataEpochStatRewards {
  member: null;
  leader: null;
}

interface MiscConstResponseDataEpochStatStakePools {
  minting: number;
  registered: number;
}

interface MiscConstResponseDataEpochStatStake {
  epoch: number;
  active: number;
  pools: MiscConstResponseDataEpochStatStakePools;
  accounts: number;
}

interface MiscConstResponseDataEpochStatPoots {
  fees: number;
  utxo: number;
  rewards: number;
  slot_no: number;
  block_id: number;
  deposits: number;
  reserves: number;
  treasury: number;
}

interface MiscConstResponseDataEpochStatEpoch {
  start_time: string;
  end_time: string;
  block_count: number;
  tx_count: number;
  fees: number;
  out_sum: number;
  block_size: number;
}

interface MiscConstResponseDataEpochStatPoolStat {
  pools: number;
  pct_leader: null | number;
  pct_member: null | number;
  epoch_stake: null | number;
  delegator_count: null | number;
  delegator_avg: null | number;
}

interface MiscConstResponseDataEpochStatProto {
  min: number;
  max: number;
}
interface MiscConstResponseDataEpochStat {
  epoch_no: number;
  spendable_epoch: number;
  rewards: MiscConstResponseDataEpochStatRewards;
  stake: MiscConstResponseDataEpochStatStake;
  pots: MiscConstResponseDataEpochStatPoots;
  epoch: MiscConstResponseDataEpochStatEpoch;
  pool_stat: MiscConstResponseDataEpochStatPoolStat;
  proto: MiscConstResponseDataEpochStatProto;
  daily: {
    date: string;
    stat: {
      block_version: {
        version: number;
        count: number;
      }[];
    };
  }[];
}

interface MiscConstResponseDataLoad {
  "24h"?: number;
}
export interface MiscConstResponseData {
  no: number;
  epoch: MiscConstResponseDataEpoch;
  circulating_supply: number;
  labels: MiscConstResponseDataLabel[];
  epoch_param: MiscConstResponseDataEpochParam;
  epoch_stat: MiscConstResponseDataEpochStat;
  live_stake: number | null;
  load: MiscConstResponseDataLoad;
  intra: {
    min_value: number;
  };
}
