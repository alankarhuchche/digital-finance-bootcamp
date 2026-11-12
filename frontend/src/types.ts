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

export type CalloutTone = 'insight' | 'warning' | 'strategy' | 'reality';

export interface CalloutSpec {
  tone?: CalloutTone;
  body: string;
}

export interface ComparisonColumn {
  title: string;
  subtitle?: string;
  points: { label: string; value: string; emphasis?: 'positive' | 'negative' | 'neutral' }[];
}

export interface ComparisonSpec {
  columns: ComparisonColumn[];
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

export interface SourceLink {
  label: string;          // publisher, title and date, e.g. "UK Finance, 24 Sep 2026"
  url: string;
}

// ── Long pages: numbered chapter headings and a sticky chapter rail ──

export interface ChapterSpec {
  id: string;             // anchor id, matched by the chapter rail
  num: string;
  title: string;
  job?: string;           // one line under the title
  ask?: string;           // question prefilled into the site chat
}

export interface ChapterNavSpec {
  chapters: { id: string; num: string; short: string }[];
}

// ── Status cards: options or reasons, each with a dated status chip ──

export type StatusTone = 'live' | 'pilot' | 'poc' | 'idea' | 'none';

export interface StatusCard {
  tone: StatusTone;
  status: string;         // chip text, e.g. "Pilot · Sep 2026"
  title: string;
  body: string;           // inline HTML
  who?: string;           // who says so
  focus?: boolean;        // the option the page is about
}

export interface StatusCardsSpec {
  cards: StatusCard[];
}

// ── Use-case atlas: where each use sits (inside one bank or between banks,
//    organisations or people), filterable by status and audience ──

export type UseCaseStatus = 'live' | 'pilot' | 'poc';
export type UseCaseAudience = 'people' | 'companies' | 'markets';
export type UseCaseReach = 'inside' | 'between';
export type UseCaseRow = 'organisations' | 'people';

export interface UseCaseItem {
  id: string;
  title: string;
  status: UseCaseStatus;
  statusLabel: string;    // e.g. "Pilot · UK · Sep 2026"
  audience: UseCaseAudience;
  reach: UseCaseReach;
  summary: string;
  aside?: string;         // one short line under the summary, inline HTML
  today: string;          // what does the job today, without tokens
  adds: string;           // what tokens add
  watch: string;          // watch-outs
  sources: SourceLink[];
  highlight?: boolean;    // the page's own case
}

export interface UseCaseCell {
  row: UseCaseRow;
  reach: UseCaseReach;
  label: string;
  status?: { tone: StatusTone; label: string };
  text: string;           // inline HTML
  highlight?: boolean;
}

export interface UseCaseAtlasSpec {
  columns: Record<UseCaseReach, string>;
  rows: Record<UseCaseRow, string>;
  cells: UseCaseCell[];
  items: UseCaseItem[];
  emptyNotes?: { status: UseCaseStatus; audience: UseCaseAudience; text: string }[];
  footnote?: string;
}

// ── GBTD: the "who goes first?" dilemma and the step-by-step payment scene ──

export type GbtdHookChoiceId = 'pay' | 'hand' | 'lock';

export interface GbtdHookTab {
  id: 'buy' | 'home';
  tab: string;
  intro: string;
  payer: { name: string; sub: string };
  payee: { name: string; sub: string };
  itemLabel: string;
  midLabel: string;       // the place money waits in the "pay first" case
  choices: Record<GbtdHookChoiceId, { label: string; outcome: string }>;
  copy: string;           // HTML shown beside the scene
}

export interface GbtdHookSpec {
  tabs: GbtdHookTab[];
  lens: string;           // banking lens, inline HTML
  sources: SourceLink[];
}

export interface GbtdSceneStep {
  label: string;
  title: string;
  body: string;
  like?: string;          // everyday comparison
  stops?: string;         // where the comparison stops working
}

export interface GbtdSceneSpec {
  steps: GbtdSceneStep[]; // six steps, one per scene state
  sources: SourceLink[];
}
