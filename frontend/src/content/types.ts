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
  ChapterSpec,
  ChapterNavSpec,
  StatusCardsSpec,
  UseCaseAtlasSpec,
  GbtdHookSpec,
  GbtdSceneSpec,
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
  | { kind: 'swift-role-map'; heading?: string }
  | { kind: 'gbtd-explorer'; heading?: string }
  | { kind: 'chapter'; data: ChapterSpec }
  | { kind: 'chapter-nav'; data: ChapterNavSpec }
  | { kind: 'status-cards'; heading?: string; data: StatusCardsSpec }
  | { kind: 'usecase-atlas'; heading?: string; data: UseCaseAtlasSpec }
  | { kind: 'gbtd-hook'; data: GbtdHookSpec }
  | { kind: 'gbtd-scene'; data: GbtdSceneSpec };

export interface ModuleMeta {
  id: string;
  number: string; // "00".."17"
  title: string;
  summary: string;
  ready: boolean; // false = "coming soon" placeholder in the index
  layout?: 'standard' | 'wide'; // wide: visuals up to 1800px, reading blocks capped at 760px
  updatedAt?: string;       // ISO date, e.g. "2026-07-03"
  changeType?: 'new' | 'expanded' | 'updated';
  changeSummary?: string;   // one-line note for returning readers
}

export interface ModuleContent extends ModuleMeta {
  blocks: ContentBlock[];
}
