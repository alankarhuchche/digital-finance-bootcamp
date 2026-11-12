// GBTD held-payment state model (success path only): Sam (buyer, Bank A) pays Alex (seller, Bank B).
// Amounts in integer pence (£100 = 10000p). Names and bank labels are illustrative;
// actual pilot bank mapping is not publicly disclosed (U01).

export interface GbtdPosition {
  bank: string;
  bookedPence: number;
  availablePence: number;
  reservedPence: number;
}

export type EvidenceClass =
  | 'ILLUSTRATIVE'
  | 'MIXED_PRIMARY_AND_ILLUSTRATIVE'
  | 'ILLUSTRATIVE_TECHNICAL_INTERMEDIATE'
  | 'ILLUSTRATIVE_OUTCOME';

export type ObservationType =
  | 'ILLUSTRATIVE_STAGE_SNAPSHOT'
  | 'LAST_CONFIRMED_SNAPSHOT';

export interface GbtdStage {
  id: string;
  title: string;
  message: string;
  evidenceClass: EvidenceClass;
  buyer: GbtdPosition;
  seller: GbtdPosition;
  workflowStatus: string;
  observationType: ObservationType;
}

export const SUCCESS_PATH: GbtdStage[] = [
  {
    id: 'start',
    title: 'Before the purchase',
    message: 'Sam has £100 to spend at Bank A. Alex hasn’t been paid.',
    evidenceClass: 'ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 10000, reservedPence: 0 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'NOT_STARTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'agreed',
    title: 'Terms agreed',
    message: 'Sam and Alex agree that the £100 is released only once the bike has been handed over.',
    evidenceClass: 'MIXED_PRIMARY_AND_ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 10000, reservedPence: 0 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'TERMS_DEFINED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'reserved',
    title: 'Money held',
    message: 'The £100 is held in Sam’s account. It’s still Sam’s money, but Sam can’t spend it elsewhere, and Alex hasn’t received it.',
    evidenceClass: 'MIXED_PRIMARY_AND_ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 0, reservedPence: 10000 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'RESERVATION_REPORTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'condition_accepted',
    title: 'Condition met',
    message: 'The handover is reported as done. In this model the held money hasn’t moved yet.',
    evidenceClass: 'MIXED_PRIMARY_AND_ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 0, reservedPence: 10000 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'EXTERNAL_CONDITION_REPORTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'release_pending',
    title: 'Release requested',
    message: 'The met condition allows the release. The balances shown are the last confirmed ones before the money moves.',
    evidenceClass: 'ILLUSTRATIVE_TECHNICAL_INTERMEDIATE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 0, reservedPence: 10000 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'RELEASE_REQUESTED',
    observationType: 'LAST_CONFIRMED_SNAPSHOT',
  },
  {
    id: 'customer_complete',
    title: 'Released to Alex',
    message: 'Sam’s account is down £100 and Alex’s is up £100. Bank A now owes Bank B £100, and how that was settled hasn’t been published.',
    evidenceClass: 'ILLUSTRATIVE_OUTCOME',
    buyer:  { bank: 'Bank A', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    seller: { bank: 'Bank B', bookedPence: 10000, availablePence: 10000, reservedPence: 0 },
    workflowStatus: 'CUSTOMER_OUTCOME_REPORTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
];

export function penceToPounds(pence: number): string {
  return `£${(pence / 100).toFixed(0)}`;
}

export function evidencePillLabel(cls: EvidenceClass): string {
  switch (cls) {
    case 'ILLUSTRATIVE': return 'Illustration';
    case 'MIXED_PRIMARY_AND_ILLUSTRATIVE': return 'Reported mechanism · illustrative detail';
    case 'ILLUSTRATIVE_TECHNICAL_INTERMEDIATE': return 'Illustration · last confirmed balances';
    case 'ILLUSTRATIVE_OUTCOME': return 'Customer outcome · bank settlement not published';
  }
}
