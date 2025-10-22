export interface Label {
  data: {
    scriptHash: string;
    contractAddress: string;
  };
  extra: {
    bg: string | null;
    fw: number | null;
    link: string | null;
    color: string | null;
  };
  label: string;
  source: string;
  category: string[];
}

export interface InlineDatum {
  bytes: string;
  value: {
    fields: unknown[];
    constructor: number | null;
  };
}
