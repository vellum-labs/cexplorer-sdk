export interface GovernanceActionDetail {
  ident: GovernanceActionIdent;
  tx: GovernanceActionTx;
  prev_gov_action_proposal_id: string | null;
  deposit: number;
  return_address: {
    view: string;
  };
  epoch_param: Array<{
    drep_activity: number;
    dvt_p_p_gov_group: number;
    committee_min_size: number;
    gov_action_lifetime: number;
    dvt_committee_normal: number;
    pvt_committee_normal: number;
    pvtpp_security_group: number;
    dvt_p_p_network_group: number;
    dvt_p_p_economic_group: number;
    dvt_p_p_technical_group: number;
    dvt_treasury_withdrawal: number;
    dvt_hard_fork_initiation: number;
    dvt_motion_no_confidence: number;
    pvt_hard_fork_initiation: number;
    pvt_motion_no_confidence: number;
    committee_max_term_length: number;
    dvt_update_to_constitution: number;
    dvt_committee_no_confidence: number;
    pvt_committee_no_confidence: number;
  }>;
  expiration: number;
  anchor: GovernanceActionAnchor;
  type: string;
  description: GovernanceActionDescription;
  param_proposal: null;
  ratified_epoch: number | null;
  enacted_epoch: number | null;
  dropped_epoch: number | null;
  expired_epoch: number | null;
  voting_procedure: GovernanceActionVotingProcedure[];
  total: {
    drep: {
      count: number;
      represented_by: number;
      stake: number;
      drep_always_no_confidence: {
        represented_by: number;
        stake: number;
      };
      drep_always_abstain: {
        represented_by: number;
        stake: number;
      };
    };
    spo: {
      count: number;
      represented_by: number;
      stake: number;
      drep_always_abstain: {
        represented_by: number;
        stake: number;
      };
      drep_always_no_confidence: {
        represented_by: number;
        stake: number;
      };
    };
  };
  committee: {
    quorum: {
      numerator: number;
      denuminator: number;
    };
    member: GovernanceActionCommitteeMember[];
  };
}

interface GovernanceActionIdent {
  id: string;
  bech: string;
}

interface GovernanceActionTx {
  hash: string;
  time: string;
  invalid_hereafter: number | null;
  treasury_donation: number;
  index: number;
}

interface GovernanceActionAnchor {
  url: string;
  data_hash: string;
  offchain: {
    name: string;
    abstract: string;
    motivation: string;
    rationale: string;
  } | null;
}

interface GovernanceActionDescription {
  tag: string;
  contents: any[];
}

interface GovernanceActionVotingProcedure {
  vote: string;
  voter_role: string;
  count: number;
  stat: {
    stake: number;
    represented_by: number;
  };
}

export interface GovernanceActionCommitteeMember {
  ident: {
    raw: string;
    has_script: boolean;
  };
  key: {
    cold: string;
    hot: string;
  };
  registry: {
    img: string;
    name: string;
  };
  vote: null | string;
  expiration_epoch: number | null;
}
