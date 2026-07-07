import type {
  StackLayer,
  ScatterSpec,
  FlowSpec,
  MatrixSpec,
  TimelineSpec,
  RegionMapSpec,
  CaseStudySpec,
  ScaleSpec,
  QuizSpec,
  MoneyCardsSpec,
  CalloutSpec,
  ComparisonSpec,
} from '../types';

export type ContentBlock =
  | { kind: 'text'; heading?: string; body: string }
  | { kind: 'stack'; heading?: string; data: StackLayer[]; note?: string }
  | { kind: 'scatter'; heading?: string; data: ScatterSpec }
  | { kind: 'flow'; heading?: string; data: FlowSpec }
  | { kind: 'matrix'; heading?: string; data: MatrixSpec }
  | { kind: 'timeline'; heading?: string; data: TimelineSpec }
  | { kind: 'map'; heading?: string; data: RegionMapSpec }
  | { kind: 'case'; heading?: string; data: CaseStudySpec }
  | { kind: 'scale'; heading?: string; data: ScaleSpec }
  | { kind: 'quiz'; heading?: string; data: QuizSpec }
  | { kind: 'money-cards'; heading?: string; data: MoneyCardsSpec }
  | { kind: 'callout'; heading?: string; data: CalloutSpec }
  | { kind: 'comparison'; heading?: string; data: ComparisonSpec }
  | { kind: 'what-moves-visual'; heading?: string }
  | { kind: 'swift-gateway-visual'; heading?: string }
  | { kind: 'swift-role-map-preview'; heading?: string };

export interface ModuleMeta {
  id: string;
  number: string; // "00".."17"
  title: string;
  summary: string;
  ready: boolean; // false = "coming soon" placeholder in the index
  updatedAt?: string;       // ISO date, e.g. "2026-07-03"
  changeType?: 'new' | 'expanded' | 'updated';
  changeSummary?: string;   // one-line note for returning readers
}

export interface ModuleContent extends ModuleMeta {
  blocks: ContentBlock[];
}
