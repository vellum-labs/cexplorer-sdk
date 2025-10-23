export interface PoolMetaExtended {
  github_handle?: string;
  twitter_handle?: string;
  discord_handle?: string;
  twitch_handle?: string;
  youtube_handle?: string;
  facebook_handle?: string;
  telegram_handle?: string;
}

export type PoolInfo = {
  id: string;
  meta: PoolMeta | null;
};

export interface PoolMeta {
  ticker: string;
  name: string;
  description: string;
  extended: PoolMetaExtended | null;
  homepage: string;
}
