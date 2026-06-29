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
  | { kind: 'quiz'; heading?: string; data: QuizSpec };

export interface ModuleMeta {
  id: string;
  number: string; // "00".."17"
  title: string;
  summary: string;
  ready: boolean; // false = "coming soon" placeholder in the index
}

export interface ModuleContent extends ModuleMeta {
  blocks: ContentBlock[];
}
