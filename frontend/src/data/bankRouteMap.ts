export type Maturity = 'live' | 'modernising' | 'sandbox' | 'emerging';
export type ZoneId = 'channels' | 'controls' | 'route' | 'rails' | 'settlement' | 'ledgers';

export interface RouteNode {
  id: string;
  label: string;
  zone: ZoneId;
  maturity?: Maturity;
}

export interface PathSegment {
  from: string;
  to: string;
}

export interface RouteInsight {
  routeType: string;
  controlFocus: string;
  settlementModel: string;
  mainRisk: string;
  judgement: string;
}

export interface RouteScenario {
  id: string;
  label: string;
  maturity: Maturity;
  maturityLabel: string;
  caption: string;
  activeNodes: string[];
  // Cross-zone paths only — intra-zone connections are implied by active highlighting
  pathSegments: PathSegment[];
  mobileStrip: string[];
  ariaDescription: string;
  insight: RouteInsight;
}

export const ROUTE_ZONES: { id: ZoneId; label: string }[] = [
  { id: 'channels',   label: 'Channels' },
  { id: 'controls',   label: 'Controls' },
  { id: 'route',      label: 'Route decision' },
  { id: 'rails',      label: 'Rails / networks' },
  { id: 'settlement', label: 'Settlement' },
  { id: 'ledgers',    label: 'Ledgers & evidence' },
];

export const ROUTE_NODES: RouteNode[] = [
  // Channels
  { id: 'retail-mobile',   label: 'Retail mobile',    zone: 'channels' },
  { id: 'corp-portal',     label: 'Corporate portal', zone: 'channels' },
  { id: 'capital-markets', label: 'Capital markets',  zone: 'channels' },
  { id: 'api-embedded',    label: 'API / embedded',   zone: 'channels' },
  // Controls
  { id: 'identity-consent',    label: 'Identity & consent',    zone: 'controls' },
  { id: 'financial-crime',     label: 'Financial crime',        zone: 'controls' },
  { id: 'limits-policy',       label: 'Limits & policy',        zone: 'controls' },
  { id: 'custody-eligibility', label: 'Custody & eligibility',  zone: 'controls' },
  // Route decision — rendered as one block with chips, not individual nodes
  { id: 'route-decision', label: 'Route decision', zone: 'route' },
  // Rails
  { id: 'faster-payments',     label: 'Faster Payments',        zone: 'rails', maturity: 'live' },
  { id: 'chaps-rtgs',          label: 'CHAPS / RTGS',           zone: 'rails', maturity: 'modernising' },
  { id: 'swift-correspondent', label: 'SWIFT / correspondent',  zone: 'rails', maturity: 'modernising' },
  { id: 'stablecoin-network',  label: 'Stablecoin network',     zone: 'rails', maturity: 'emerging' },
  { id: 'tokenised-asset-net', label: 'Tokenised asset network', zone: 'rails', maturity: 'sandbox' },
  // Settlement
  { id: 'scheme-confirm',      label: 'Scheme confirmation',    zone: 'settlement' },
  { id: 'rtgs-finality',       label: 'RTGS finality',          zone: 'settlement' },
  { id: 'correspondent-settle', label: 'Correspondent settlement', zone: 'settlement' },
  { id: 'blockchain-finality', label: 'Blockchain finality',    zone: 'settlement' },
  { id: 'off-ramp',            label: 'Off-ramp',               zone: 'settlement' },
  { id: 'dvp',                 label: 'DvP',                    zone: 'settlement' },
  { id: 'cash-leg',            label: 'Cash leg',               zone: 'settlement' },
  { id: 'asset-leg',           label: 'Asset leg',              zone: 'settlement' },
  // Ledgers
  { id: 'customer-ledger',     label: 'Customer ledger',    zone: 'ledgers' },
  { id: 'general-ledger',      label: 'General ledger',     zone: 'ledgers' },
  { id: 'custody-ledger',      label: 'Custody ledger',     zone: 'ledgers' },
  { id: 'token-ledger',        label: 'Token ledger',       zone: 'ledgers' },
  { id: 'nostro-vostro',       label: 'Nostro / vostro',    zone: 'ledgers' },
  { id: 'reconciliation',      label: 'Reconciliation',     zone: 'ledgers' },
  { id: 'regulatory-evidence', label: 'Regulatory evidence', zone: 'ledgers' },
  { id: 'audit-evidence',      label: 'Audit evidence',     zone: 'ledgers' },
];

export const ROUTE_DECISION_CHIPS = ['Liability', 'Liquidity', 'Finality', 'Compliance', 'Reconciliation'];

export const SCENARIOS: RouteScenario[] = [
  {
    id: 'domestic',
    label: 'UK domestic payment',
    maturity: 'live',
    maturityLabel: 'LIVE',
    caption: "Domestic account payment is already digital. The bank's job is not to find a blockchain. It is to decide whether the instruction is authorised, safe, within limits, liquid and reconcilable before it reaches Faster Payments or CHAPS.",
    activeNodes: [
      'retail-mobile', 'corp-portal',
      'identity-consent', 'financial-crime', 'limits-policy',
      'route-decision',
      'faster-payments', 'chaps-rtgs',
      'scheme-confirm', 'rtgs-finality',
      'customer-ledger', 'reconciliation',
    ],
    pathSegments: [
      { from: 'retail-mobile',  to: 'identity-consent' },
      { from: 'limits-policy',  to: 'route-decision' },
      { from: 'route-decision', to: 'faster-payments' },
      { from: 'route-decision', to: 'chaps-rtgs' },
      { from: 'faster-payments', to: 'scheme-confirm' },
      { from: 'chaps-rtgs',     to: 'rtgs-finality' },
      { from: 'scheme-confirm', to: 'customer-ledger' },
      { from: 'rtgs-finality',  to: 'customer-ledger' },
    ],
    mobileStrip: [
      'retail-mobile', 'identity-consent', 'route-decision',
      'faster-payments', 'scheme-confirm', 'customer-ledger',
    ],
    ariaDescription: 'UK domestic payment route: retail mobile or corporate portal through identity and consent, financial crime checks, limits and policy, route decision — then Faster Payments or CHAPS to scheme confirmation or RTGS finality — ending in the customer ledger and reconciliation.',
    insight: {
      routeType: 'UK account rail',
      controlFocus: 'Authentication, fraud, limits, liquidity and customer protection',
      settlementModel: 'Faster Payments confirmation or CHAPS / RTGS finality depending on value and urgency',
      mainRisk: 'Authorised push-payment fraud, limit policy, liquidity and exception handling',
      judgement: 'The bank does not need a new rail for every domestic payment. The value is deciding whether the instruction is authorised, safe, liquid and reconcilable before it reaches the rail.',
    },
  },
  {
    id: 'tokenised',
    label: 'Tokenised asset settlement',
    maturity: 'sandbox',
    maturityLabel: 'SANDBOX / EMERGING',
    caption: "Tokenised asset settlement changes what moves. The asset, cash leg and rules can be coordinated digitally, but custody, eligibility, legal finality, audit evidence and reconciliation still decide whether the model is bank-grade.",
    activeNodes: [
      'capital-markets',
      'custody-eligibility', 'financial-crime',
      'route-decision',
      'tokenised-asset-net',
      'dvp', 'cash-leg', 'asset-leg',
      'custody-ledger', 'general-ledger', 'token-ledger', 'audit-evidence',
    ],
    pathSegments: [],
    mobileStrip: [
      'capital-markets', 'custody-eligibility', 'route-decision',
      'tokenised-asset-net', 'dvp', 'audit-evidence',
    ],
    ariaDescription: 'Tokenised asset settlement route: capital markets through custody and eligibility, financial crime checks, route decision — then tokenised asset network to DvP with cash leg and asset leg — ending in custody ledger, general ledger, token ledger and audit evidence. This route is sandbox and emerging only.',
    insight: {
      routeType: 'Tokenised asset DvP',
      controlFocus: 'Eligibility, custody, asset servicing, settlement finality, audit evidence and reconciliation',
      settlementModel: 'Digital asset leg and cash leg coordinated through DvP',
      mainRisk: 'Custody, legal finality, failed settlement, asset servicing, dispute handling and evidence quality',
      judgement: 'Tokenisation changes what moves and how rules execute, but a bank still needs custody, eligibility, legal finality, audit evidence and reconciliation before the model is bank-grade.',
    },
  },
  {
    id: 'cross-border',
    label: 'Cross-border supplier',
    maturity: 'modernising',
    maturityLabel: 'LIVE / MODERNISING',
    caption: "Cross-border supplier payment still depends on correspondent banking, liquidity, FX and sanctions controls. ISO 20022 improves the data carried with the instruction, but nostro funding, settlement timing, exceptions and reconciliation remain the operating challenge.",
    activeNodes: [
      'corp-portal', 'api-embedded',
      'identity-consent', 'financial-crime', 'limits-policy',
      'route-decision',
      'swift-correspondent',
      'correspondent-settle',
      'general-ledger', 'nostro-vostro', 'reconciliation', 'regulatory-evidence',
    ],
    pathSegments: [],
    mobileStrip: [
      'corp-portal', 'financial-crime', 'route-decision',
      'swift-correspondent', 'correspondent-settle', 'nostro-vostro',
    ],
    ariaDescription: 'Cross-border supplier payment route: corporate portal or API through identity and consent, financial crime checks, limits and policy, route decision — then SWIFT or correspondent banking to correspondent settlement — ending in general ledger, nostro and vostro accounts, reconciliation and regulatory evidence.',
    insight: {
      routeType: 'Correspondent banking route',
      controlFocus: 'Sanctions, AML, FX, liquidity, nostro funding and exception handling',
      settlementModel: 'SWIFT message flow with correspondent settlement and nostro / vostro reconciliation',
      mainRisk: 'Settlement timing, trapped liquidity, repair queues, sanctions hits and reconciliation breaks',
      judgement: 'ISO 20022 improves the data carried with the instruction, but it does not remove the operating weight of correspondent settlement, liquidity and exceptions.',
    },
  },
  {
    id: 'stablecoin',
    label: 'Stablecoin payment',
    maturity: 'emerging',
    maturityLabel: 'EMERGING',
    caption: "Stablecoin payment can change the settlement venue, but it does not remove bank controls. The bank still needs eligibility, wallet screening, sanctions controls, custody, legal-finality assessment, off-ramp handling and reconciliation.",
    activeNodes: [
      'corp-portal', 'api-embedded',
      'financial-crime', 'custody-eligibility',
      'route-decision',
      'stablecoin-network',
      'blockchain-finality', 'off-ramp',
      'token-ledger', 'custody-ledger', 'reconciliation', 'regulatory-evidence',
    ],
    pathSegments: [],
    mobileStrip: [
      'corp-portal', 'custody-eligibility', 'route-decision',
      'stablecoin-network', 'blockchain-finality', 'token-ledger',
    ],
    ariaDescription: 'Stablecoin payment route: corporate portal or API through financial crime checks, custody and eligibility screening, route decision — then stablecoin network to blockchain finality with off-ramp — ending in token ledger, custody ledger, reconciliation and regulatory evidence. This route is emerging only.',
    insight: {
      routeType: 'External token-money route',
      controlFocus: 'Eligibility, wallet screening, sanctions, custody, off-ramp and reconciliation',
      settlementModel: 'Blockchain finality plus issuer redemption, off-ramp and legal-finality assessment',
      mainRisk: 'Issuer model, jurisdiction, wallet risk, sanctions exposure, off-ramp dependency and ledger reconciliation',
      judgement: 'Stablecoin payment can change the settlement venue, but it does not remove bank controls. Blockchain finality is technical confirmation; legal settlement finality depends on issuer model, jurisdiction and contractual treatment.',
    },
  },
];
