// GBTD conditional-payment state model — SUCCESS path only (Phase B).
// Amounts in integer pence (£100 = 10000p). Bank A/B labels are illustrative;
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
    title: 'Before purchase',
    message: 'The buyer starts with £100 available at Bank A. The seller has not been paid.',
    evidenceClass: 'ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 10000, reservedPence: 0 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'NOT_STARTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'agreed',
    title: 'Terms agreed',
    message: 'Buyer and seller agree that payment should be released only after the agreed exchange condition is satisfied.',
    evidenceClass: 'MIXED_PRIMARY_AND_ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 10000, reservedPence: 0 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'TERMS_DEFINED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'reserved',
    title: 'Funds reserved',
    message: '£100 is set aside in the buyer\'s account. It is unavailable for other spending. The seller has not received it.',
    evidenceClass: 'MIXED_PRIMARY_AND_ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 0, reservedPence: 10000 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'RESERVATION_REPORTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'condition_accepted',
    title: 'Condition satisfied',
    message: 'The agreed exchange condition is reported as met. The reserved funds have not yet been transferred in this model.',
    evidenceClass: 'MIXED_PRIMARY_AND_ILLUSTRATIVE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 0, reservedPence: 10000 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'EXTERNAL_CONDITION_REPORTED',
    observationType: 'ILLUSTRATIVE_STAGE_SNAPSHOT',
  },
  {
    id: 'release_pending',
    title: 'Release requested',
    message: 'The satisfied condition authorises release. Customer balances shown are the last confirmed values before the illustrative transfer.',
    evidenceClass: 'ILLUSTRATIVE_TECHNICAL_INTERMEDIATE',
    buyer:  { bank: 'Bank A', bookedPence: 10000, availablePence: 0, reservedPence: 10000 },
    seller: { bank: 'Bank B', bookedPence: 0, availablePence: 0, reservedPence: 0 },
    workflowStatus: 'RELEASE_REQUESTED',
    observationType: 'LAST_CONFIRMED_SNAPSHOT',
  },
  {
    id: 'customer_complete',
    title: 'Illustrative payment complete',
    message: 'The example shows the buyer debited and seller credited £100. Interbank settlement mechanics remain undisclosed.',
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
    case 'ILLUSTRATIVE': return 'Illustrative';
    case 'MIXED_PRIMARY_AND_ILLUSTRATIVE': return 'Public mechanism · Illustrative detail';
    case 'ILLUSTRATIVE_TECHNICAL_INTERMEDIATE': return 'Illustrative · Last confirmed view';
    case 'ILLUSTRATIVE_OUTCOME': return 'Illustrative outcome · Settlement unknown';
  }
}
