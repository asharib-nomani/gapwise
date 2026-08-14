export interface Concept {
  id: string;
  name: string;
  description: string;
  prerequisites: string[];
}

export interface Question {
  id: string;
  conceptId: string;
  text: string;
  options: string[];
  correctAnswer: string;
  visualType?: 'none' | 'fraction_grid' | 'comparison' | 'division_grouping';
  visualData?: any;
}

export interface StudentResponse {
  questionId: string;
  conceptId: string;
  studentAnswer: string;
  isCorrect: boolean;
}

export interface GapReport {
  conceptId: string;
  severity: 'high' | 'medium' | 'low';
  confidence: 'high' | 'medium' | 'low';
  evidence: string[];
}

export interface DiagnosticResult {
  primaryGap: GapReport | null;
  secondaryGaps: GapReport[];
  strengths: string[];
  currentTopicReadiness: number; // percentage (e.g. 72)
  teacherRecommendation: string;
  intervention: {
    durationMinutes: number;
    title: string;
    steps: string[];
    content?: string; // Generated worksheet or activity details
  } | null;
  ruleBased?: boolean;
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  subject: string;
  currentTopic: string;
  lastDiagnosticDate: string;
  history: StudentResponse[];
  status: 'ready' | 'needs_practice' | 'needs_foundation_review';
  diagnosticResult: DiagnosticResult | null;
}
