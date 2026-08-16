import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Sparkles } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

type SubdivisionMode = 'quarter' | 'eighth' | 'sixteenth' | 'triplet';

export const SubdivisionVisualizer: React.FC = () => {
  const [bpm] = useState<number>(75);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<SubdivisionMode>('sixteenth');
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [userClapTarget] = useState<string>('a');
  const [drillFeedback, setDrillFeedback] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const getSubdivisionSteps = () => {
    switch (activeMode) {
      case 'quarter':
        return [
          { label: '1', type: 'down' },
          { label: '2', type: 'down' },
          { label: '3', type: 'down' },
          { label: '4', type: 'down' }
        ];
      case 'eighth':
        return [
          { label: '1', type: 'down' },
          { label: '&', type: 'off' },
          { label: '2', type: 'down' },
          { label: '&', type: 'off' },
          { label: '3', type: 'down' },
          { label: '&', type: 'off' },
          { label: '4', type: 'down' },
          { label: '&', type: 'off' }
        ];
      case 'sixteenth':
        return [
          { label: '1', type: 'down' },
          { label: 'e', type: 'micro' },
          { label: '&', type: 'off' },
          { label: 'a', type: 'target' },
          { label: '2', type: 'down' },
          { label: 'e', type: 'micro' },
          { label: '&', type: 'off' },
          { label: 'a', type: 'target' },
          { label: '3', type: 'down' },
          { label: 'e', type: 'micro' },
          { label: '&', type: 'off' },
          { label: 'a', type: 'target' },
          { label: '4', type: 'down' },
          { label: 'e', type: 'micro' },
          { label: '&', type: 'off' },
          { label: 'a', type: 'target' }
        ];
      case 'triplet':
        return [
          { label: '1', type: 'down' },
          { label: 'trip', type: 'micro' },
          { label: 'let', type: 'off' },
          { label: '2', type: 'down' },
          { label: 'trip', type: 'micro' },
          { label: 'let', type: 'off' },
          { label: '3', type: 'down' },
          { label: 'trip', type: 'micro' },
          { label: 'let', type: 'off' },
          { label: '4', type: 'down' },
          { label: 'trip', type: 'micro' },
          { label: 'let', type: 'off' }
        ];
    }
  };

  const steps = getSubdivisionSteps();

  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const totalSteps = steps.length;
    const barDurationMs = (60 / bpm) * 4 * 1000;
    const stepDurationMs = barDurationMs / totalSteps;

    let step = 0;
    const playCurrentStep = (s: number) => {
      setCurrentStep(s);
      const stepObj = steps[s];
      if (stepObj.type === 'down') {
        soundEngine.playKick(undefined, 110, false);
      } else if (stepObj.label === 'a') {
        soundEngine.playHiHat(undefined, 120, false);
      } else {
        soundEngine.playHiHat(undefined, 50, false);
      }
    };

    playCurrentStep(0);
    timerRef.current = window.setInterval(() => {
      step = (step + 1) % totalSteps;
      playCurrentStep(step);
    }, stepDurationMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeMode, bpm]);

  const handleClapDrill = () => {
    if (!isPlaying) return;
    const currentStepObj = steps[currentStep];
    if (!currentStepObj) return;

    if (currentStepObj.label === userClapTarget) {
      setDrillFeedback('🎯 DEAD CENTER! You locked onto the "' + userClapTarget + '" subdivision.');
      soundEngine.playSnare(undefined, 115);
    } else {
      setDrillFeedback('⚠️ Missed: You clapped on "' + currentStepObj.label + '". Aim for "' + userClapTarget + '".');
    }
  };

  return (
    <div id="subdivision-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.2
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Subdivision Lanes: Quarter, 8th, 16th & Triplets
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F3F0] rounded-xl border border-[#E5E1DA] text-xs">
          {(['quarter', 'eighth', 'sixteenth', 'triplet'] as SubdivisionMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActiveMode(mode);
                setCurrentStep(-1);
              }}
              className={`px-3 py-1 rounded-lg capitalize font-semibold transition-colors cursor-pointer ${
                activeMode === mode
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#8B8378] hover:text-[#1A1A1A]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Lanes Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#8B8378] px-1 font-mono">
          <span>Bar 01 (4/4 Metric Space)</span>
          <span className="text-[#C5A059] font-bold">
            {activeMode === 'sixteenth' ? '16 Lanes (4 subdivisions / beat)' : `${steps.length} Lanes`}
          </span>
        </div>

        <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, idx) => {
            const isActive = isPlaying && currentStep === idx;
            const isDown = step.type === 'down';
            const isTarget = step.label === 'a';

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center py-3.5 px-1 rounded-lg border transition-all duration-75 text-center ${
                  isActive
                    ? isDown
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105 shadow-md font-bold'
                      : isTarget
                      ? 'bg-[#C5A059] text-white border-[#C5A059] scale-105 font-bold shadow-md'
                      : 'bg-[#C5A059]/80 text-white border-[#C5A059] scale-105 font-bold'
                    : isDown
                    ? 'bg-[#F7F3F0] border-[#E5E1DA] text-[#1A1A1A] font-bold'
                    : isTarget
                    ? 'bg-[#FDFCFB] border-[#C5A059]/40 text-[#C5A059]'
                    : 'bg-[#FDFCFB] border-[#E5E1DA] text-[#8B8378]'
                }`}
              >
                <span className="text-xs md:text-sm font-mono">{step.label}</span>
                <span className="text-[8px] uppercase tracking-wider opacity-80 mt-0.5 hidden sm:block">
                  {isDown ? 'Beat' : step.type === 'off' ? '&' : step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson 2 Drill Panel: Clap on the 'A' */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-3 font-serif">
        <div className="flex items-center justify-between font-sans">
          <span className="text-xs font-bold text-[#1A1A1A] flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#C5A059]" /> Execution Drill: Clap on the &ldquo;a&rdquo;
          </span>
          <span className="text-[10px] text-[#8B8378] font-mono">1-e-and-[A] 2-e-and-[A]</span>
        </div>
        <p className="text-xs text-[#4A453E] leading-relaxed">
          The &ldquo;a&rdquo; is the final sixteenth-note micro-lane before the next integer downbeat. Hit the button below precisely in sync with the gold highlight.
        </p>

        <div className="flex items-center gap-3 pt-1 font-sans">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] text-white hover:bg-[#2D2A26]'
            }`}
          >
            {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
            {isPlaying ? 'Stop Loop' : 'Play Grid Lanes'}
          </button>

          <button
            onClick={handleClapDrill}
            disabled={!isPlaying}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C5A059] hover:bg-[#B38F48] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            👏 CLAP ON THE &ldquo;a&rdquo;!
          </button>
        </div>

        {drillFeedback && (
          <div className="text-xs font-mono py-2 px-3 rounded-lg bg-[#FFFFFF] border border-[#E5E1DA] text-[#2D2A26] mt-2">
            {drillFeedback}
          </div>
        )}
      </div>
    </div>
  );
};
