import React, { useState, useEffect } from 'react';
import { Lesson, ModuleInfo } from '../types';
import { MetronomeDrill } from './interactive/MetronomeDrill';
import { SubdivisionVisualizer } from './interactive/SubdivisionVisualizer';
import { CadenceMovementPlayer } from './interactive/CadenceMovementPlayer';
import { AnapesticEngineWidget } from './interactive/AnapesticEngineWidget';
import { PocketOffsetSimulator } from './interactive/PocketOffsetSimulator';
import { SubtractionSilenceWidget } from './interactive/SubtractionSilenceWidget';
import { SyncopationDisplacementWidget } from './interactive/SyncopationDisplacementWidget';
import { TempoDensityWidget } from './interactive/TempoDensityWidget';
import { PianoRollWidget } from './interactive/PianoRollWidget';
import { NotesFrequencyWidget } from './interactive/NotesFrequencyWidget';
import {
  ChromaticKeyboardWidget,
  ScaleLockExplorer,
  ChordTriadBuilder,
  VelocityLaneWidget,
  FrequencyRangesEQ
} from './interactive/Module2Widgets';
import {
  SwingSliderWidget,
  MicrotimingNudgeWidget,
  RelationalGrooveMixer,
  TensionReleaseWidget
} from './interactive/Module3Widgets';
import {
  Module1Capstone,
  Module2Capstone,
  FinalAssessmentQuiz,
  HardwireGlossary
} from './CapstonesAndAssessments';
import { CheckCircle2, ChevronRight, HelpCircle, Laptop, Wrench, Sparkles, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';

interface ChapterViewProps {
  lesson: Lesson;
  module: ModuleInfo;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  lessonIndex?: number;
  totalLessons?: number;
}

export const ChapterView: React.FC<ChapterViewProps> = ({
  lesson,
  module,
  onNextLesson,
  onPrevLesson,
  lessonIndex = 1,
  totalLessons = 28
}) => {
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  // Reset quiz states whenever a new lesson is loaded
  useEffect(() => {
    setSelectedQuizAnswer(null);
    setShowQuizResult(false);
  }, [lesson.id]);

  const renderWidget = (widgetId?: string) => {
    switch (widgetId) {
      // Module 1 Widgets
      case 'metronome-drill':
        return <MetronomeDrill />;
      case 'subdivision-visualizer':
        return <SubdivisionVisualizer />;
      case 'cadence-movement':
        return <CadenceMovementPlayer />;
      case 'anapestic-engine':
        return <AnapesticEngineWidget />;
      case 'pocket-offset':
        return <PocketOffsetSimulator />;
      case 'subtraction-silence':
        return <SubtractionSilenceWidget />;
      case 'syncopation-displacement':
        return <SyncopationDisplacementWidget />;
      case 'tempo-density':
        return <TempoDensityWidget />;
      case 'm1-capstone-workbench':
        return <Module1Capstone />;

      // Module 2 Widgets
      case 'piano-roll-map':
        return <PianoRollWidget />;
      case 'notes-frequencies':
        return <NotesFrequencyWidget />;
      case 'chromatic-keyboard':
        return <ChromaticKeyboardWidget />;
      case 'scale-lock-explorer':
        return <ScaleLockExplorer />;
      case 'chord-triad-builder':
        return <ChordTriadBuilder />;
      case 'rhythm-grid-translator':
        return <PianoRollWidget />;
      case 'velocity-lane-widget':
        return <VelocityLaneWidget />;
      case 'note-length-widget':
        return <PianoRollWidget />;
      case 'frequency-ranges-eq':
        return <FrequencyRangesEQ />;
      case 'signal-chain-widget':
        return <NotesFrequencyWidget />;
      case 'm2-capstone-workbench':
        return <Module2Capstone />;

      // Module 3 Widgets
      case 'quantize-groove-widget':
      case 'ab-groove-player':
        return <SwingSliderWidget />;
      case 'swing-slider-widget':
        return <SwingSliderWidget />;
      case 'microtiming-nudge':
        return <MicrotimingNudgeWidget />;
      case 'humanization-random':
      case 'controlled-imperfection-triad':
        return <MicrotimingNudgeWidget />;
      case 'relational-groove-mixer':
        return <RelationalGrooveMixer />;
      case 'human-machine-matrix':
      case 'arrangement-conversation':
        return <RelationalGrooveMixer />;
      case 'tension-release-widget':
        return <TensionReleaseWidget />;
      case 'm3-capstone-workbench':
        return <TensionReleaseWidget />;

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Editorial Chapter Header */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-3 font-sans">
          <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B8378]">
            Volume I &bull; Module {module.number}
          </span>
          <span className="text-[#E5E1DA]">&bull;</span>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C5A059]">
            Lesson {lesson.lessonNumber}
          </span>
          <span className="text-[#E5E1DA]">&bull;</span>
          <span className="text-[10px] uppercase tracking-widest text-[#8B8378] font-mono">
            {lesson.pedagogicalStage} stage
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1A1A1A] tracking-tight leading-[1.02]">
          {lesson.title}
        </h1>

        <p className="text-lg md:text-xl font-serif italic text-[#4A453E] leading-relaxed">
          &ldquo;{lesson.subtitle}&rdquo;
        </p>

        {lesson.coreQuestion && (
          <div className="mt-6 p-6 bg-[#F7F3F0] border-l-4 border-[#C5A059] rounded-r-xl space-y-1">
            <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#8B8378]">
              Core Street Question
            </p>
            <p className="font-serif italic text-base md:text-lg text-[#2D2A26] leading-relaxed">
              {lesson.coreQuestion}
            </p>
          </div>
        )}
      </div>

      {/* Main Interactive Studio Console / Workbench */}
      {lesson.interactiveWidgetId && (
        <div className="my-8">
          <div className="flex items-center justify-between mb-3 font-sans">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B8378]">
              Interactive Simulation & Audio Workbench
            </span>
            <span className="text-[10px] font-mono text-[#C5A059] uppercase">
              Physical Engine Active
            </span>
          </div>
          {renderWidget(lesson.interactiveWidgetId)}
        </div>
      )}

      {/* Chapter Sections (Editorial Prose Layout) */}
      <div className="space-y-8">
        {lesson.sections.map((section, idx) => (
          <article
            key={idx}
            className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#C5A059] font-bold">
                0{idx + 1} &bull;
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                {section.heading}
              </h3>
            </div>

            <div className="text-base font-serif leading-relaxed text-[#4A453E] whitespace-pre-line space-y-4">
              {section.content}
            </div>

            {section.diagram && (
              <div className="my-4 bg-[#121212] p-5 rounded-xl border border-[#2D2A26] font-mono text-xs text-[#C5A059] overflow-x-auto shadow-inner">
                <pre className="leading-relaxed">{section.diagram.code}</pre>
              </div>
            )}

            {section.keyTakeaway && (
              <div className="mt-4 p-5 bg-[#F7F3F0] border-l-4 border-[#C5A059] rounded-r-lg font-serif">
                <p className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#8B8378] mb-1">
                  Key Takeaway
                </p>
                <p className="text-sm italic text-[#2D2A26] leading-relaxed">
                  {section.keyTakeaway}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* DAW Tool Mapping Card (Editorial Studio Reference) */}
      {lesson.toolMapping && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#F7F3F0] border border-[#E5E1DA] space-y-4 font-sans">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8B8378]">
              DAW & Mobile Tool Translation
            </span>
          </div>

          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            {lesson.toolMapping.dawFeature}
          </h4>

          <p className="text-sm font-serif text-[#4A453E] leading-relaxed">
            {lesson.toolMapping.description}
          </p>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E1DA] text-xs font-serif text-[#4A453E] space-y-1">
            <strong className="font-sans text-[10px] uppercase tracking-widest text-[#C5A059] block font-bold">
              Street Pro Tip:
            </strong>
            <p className="italic text-[#2D2A26]">{lesson.toolMapping.proTip}</p>
          </div>
        </div>
      )}

      {/* Concept Mastery Check (Editorial Quiz Box) */}
      {lesson.quiz && (
        <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
          <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B8378] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Concept Mastery Check
            </span>
            <span className="text-[10px] font-mono text-[#8B8378]">
              Immediate Feedback
            </span>
          </div>

          <h4 className="text-lg md:text-xl font-serif font-bold text-[#1A1A1A] leading-snug">
            {lesson.quiz.question}
          </h4>

          <div className="space-y-2.5">
            {lesson.quiz.options.map((opt, i) => {
              const isSelected = selectedQuizAnswer === i;
              const isCorrect = i === lesson.quiz?.correctIndex;
              const letter = String.fromCharCode(65 + i);

              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedQuizAnswer(i);
                    setShowQuizResult(true);
                  }}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-start gap-3.5 ${
                    showQuizResult
                      ? isCorrect
                        ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#14532D] font-medium'
                        : isSelected
                        ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                        : 'bg-[#F7F3F0] border-[#E5E1DA] text-[#8B8378]'
                      : isSelected
                      ? 'bg-[#F7F3F0] border-[#C5A059] text-[#1A1A1A] font-semibold'
                      : 'bg-[#FFFFFF] border-[#E5E1DA] text-[#4A453E] hover:border-[#C5A059] hover:bg-[#FDFCFB]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#C5A059] text-white border-[#C5A059]'
                        : 'border-[#E5E1DA] text-[#8B8378]'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-serif text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          {showQuizResult && (
            <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] font-serif space-y-1">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#C5A059] block">
                Pedagogical Explanation:
              </span>
              <p className="text-sm text-[#4A453E] leading-relaxed">
                {lesson.quiz.explanation}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Editorial Chapter Navigation Footer */}
      <footer className="pt-6 border-t border-[#E5E1DA] flex items-center justify-between font-sans text-xs uppercase tracking-widest text-[#8B8378]">
        <div>
          Unit {lessonIndex} of {totalLessons}
        </div>

        <div className="flex gap-4 sm:gap-8">
          {onPrevLesson && (
            <button
              onClick={onPrevLesson}
              className="cursor-pointer hover:text-[#1A1A1A] transition-colors flex items-center gap-1 font-bold"
            >
              &larr; Previous Unit
            </button>
          )}

          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="cursor-pointer text-[#1A1A1A] font-bold hover:text-[#C5A059] transition-colors flex items-center gap-1"
            >
              Next Unit &rarr;
            </button>
          )}
        </div>
      </footer>
    </div>
  );
};
