export type ModuleId = 'module-1' | 'module-2' | 'module-3' | 'glossary' | 'final-project' | 'assessment';

export type LessonId =
  | 'm1-overview'
  | 'm1-l1'
  | 'm1-l2'
  | 'm1-l3'
  | 'm1-l4'
  | 'm1-l5'
  | 'm1-l6'
  | 'm1-l7'
  | 'm1-l8'
  | 'm1-capstone'
  | 'm2-overview'
  | 'm2-l1'
  | 'm2-l2'
  | 'm2-l3'
  | 'm2-l4'
  | 'm2-l5'
  | 'm2-l6'
  | 'm2-l7'
  | 'm2-l8'
  | 'm2-l9'
  | 'm2-l10'
  | 'm2-capstone'
  | 'm3-overview'
  | 'm3-l1'
  | 'm3-l2'
  | 'm3-l3'
  | 'm3-l4'
  | 'm3-l5'
  | 'm3-l6'
  | 'm3-l7'
  | 'm3-l8'
  | 'm3-l9'
  | 'm3-l10'
  | 'm3-capstone'
  | 'final-project'
  | 'assessment'
  | 'glossary';

export interface Lesson {
  id: LessonId;
  moduleId: ModuleId;
  lessonNumber: number | string;
  title: string;
  subtitle: string;
  coreQuestion?: string;
  summary: string;
  pedagogicalStage: 'hear' | 'feel' | 'name' | 'see' | 'control';
  sections: LessonSection[];
  interactiveWidgetId?: string;
  toolMapping?: {
    dawFeature: string;
    description: string;
    proTip: string;
  };
  exercise: {
    instruction: string;
    objective: string;
    actionLabel?: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface LessonSection {
  heading: string;
  content: string;
  diagram?: {
    type: 'ascii' | 'grid' | 'timeline' | 'frequency' | 'anapest' | 'pocket' | 'matrix' | 'velocity' | string;
    code: string;
    caption?: string;
  };
  keyTakeaway?: string;
}

export interface ModuleInfo {
  id: ModuleId;
  number: number | string;
  title: string;
  subtitle: string;
  tagline: string;
  coreQuestion: string;
  description: string;
  color: string;
  accentBg: string;
  borderColor: string;
  lessons: Lesson[];
}

export interface VocabularyTerm {
  term: string;
  moduleId: ModuleId;
  moduleName: string;
  definition: string;
  practicalApplication: string;
  dawFeature: string;
  exampleSound?: string;
  audioCategory?: 'rhythm' | 'pitch' | 'groove';
}

export interface PianoNote {
  pitch: string;
  midi: number;
  step: number; // 0 to 15 (16th notes)
  duration: number; // in 16th steps (1, 2, 4, etc.)
  velocity: number; // 1 to 127
}

export interface DrumStep {
  kick: boolean;
  snare: boolean;
  hihat: boolean;
  hihatVelocity: number;
  snareOffsetMs: number;
  kickOffsetMs: number;
}
