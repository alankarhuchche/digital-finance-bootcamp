// Shared data contracts for the visualization library.
// Phase 2C content modules will be authored as JSON matching these shapes.

export interface StackLayer {
  id: string;
  number: string;       // e.g. "01"
  label: string;
  detail: string;
  examples?: string;
  colorClass: string;   // maps to a CSS class, e.g. "s1".."s5"
}

export interface ScatterPoint {
  key: string;
  label: string;
  x: number;            // 0-100, plot coordinate
  y: number;            // 0-100, plot coordinate
  color: string;         // hex
  detail: {
    tag: string;
    title: string;
    fields: { k: string; v: string }[];
  };
}

export interface ScatterSpec {
  axisX: string;
  axisY: string;
  points: ScatterPoint[];
}

export interface FlowBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  caption: string;
  value: string;
  valueColor?: string;
  detail?: string;
}

export interface FlowPath {
  d: string;             // SVG path data
  animated?: boolean;
  dotColor?: string;
  dotDur?: string;
}

export interface FlowSpec {
  viewBox: string;
  boxes: FlowBox[];
  paths: FlowPath[];
  caption?: string;
}

export interface MatrixSpec {
  columns: string[];               // row labels, e.g. ["Issuer", "Backing", ...]
  items: {
    id: string;
    label: string;
    color: string;
    values: string[];               // same order as columns
  }[];
}

export interface TimelineEvent {
  date: string;          // display string, e.g. "Jun 2024"
  title: string;
  detail: string;
  status?: 'done' | 'upcoming' | 'deadline';
}

export interface TimelineSpec {
  events: TimelineEvent[];
}

export type InitiativeStatus = 'live' | 'pilot' | 'research' | 'none';

export interface Initiative {
  country: string;
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Middle East & Africa';
  status: InitiativeStatus;
  name?: string;            // e.g. "e-CNY", "Sand Dollar"
  coords?: [number, number]; // manual override for non-country regions (e.g. "Eurozone"),
                              // in the same projected coordinate space as worldMap.generated.ts
}

export interface RegionMapSpec {
  initiatives: Initiative[];
  crossBorderProjects: { name: string; description: string; participants: string }[];
}

export interface ScaleItem {
  key: string;
  label: string;
  value: number; // common unit across all items in the spec (see ScaleSpec.unit)
  color: string;
  detail?: string;
}

export interface ScaleSpec {
  unit: string; // e.g. "USD, billions" — for the caption, not per-item formatting
  items: ScaleItem[];
  note?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizSpec {
  questions: QuizQuestion[];
}

export interface MoneyCardData {
  key: string;
  label: string;
  color: string;
  riskLevel: number;
  riskLabel: string;
  riskColor: string;
  fields: { k: string; v: string }[];
  detail: string;
}

export interface MoneyCardsSpec {
  cards: MoneyCardData[];
}

export interface CaseStudySpec {
  title: string;
  dateRange: string;
  whatHappened: string;
  whyItMatters: string;
  source: string;
  sourceUrl?: string;
  verifiedAsOf: string;   // "data as of" discipline from the brutal review
}
