import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Scissors, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface SyllableSlot {
  id: number;
  word: string;
  isRest: boolean;
  stress: boolean;
}

export const SubtractionSilenceWidget: React.FC = () => {
  const initialSyllables: SyllableSlot[] = [
    { id: 0, word: 'I', isRest: false, stress: false },
    { id: 1, word: 'came', isRest: false, stress: true },
    { id: 2, word: 'in', isRest: false, stress: false },
    { id: 3, word: 'the', isRest: false, stress: false },
    { id: 4, word: 'front', isRest: false, stress: true },
    { id: 5, word: 'door', isRest: false, stress: false },
    { id: 6, word: 'stepped', isRest: false, stress: false },
    { id: 7, word: 'on', isRest: false, stress: false },
    { id: 8, word: 'the', isRest: false, stress: false },
    { id: 9, word: 'floor', isRest: false, stress: true },
    { id: 10, word: 'look-ing', isRest: false, stress: false },
    { id: 11, word: 'for', isRest: false, stress: false },
    { id: 12, word: 'more', isRest: false, stress: true },
    { id: 13, word: 'than', isRest: false, stress: false },
    { id: 14, word: 'ev-er', isRest: false, stress: false },
    { id: 15, word: 'be-fore', isRest: false, stress: true }
  ];

  const [syllables, setSyllables] = useState<SyllableSlot[]>(initialSyllables);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const toggleRest = (id: number) => {
    setSyllables((prev) =>
      prev.map((syl) => (syl.id === id ? { ...syl, isRest: !syl.isRest } : syl))
    );
  };

  const applyRecommendedSilence = () => {
    setSyllables((prev) =>
      prev.map((syl) => {
        const eraseIds = [2, 3, 6, 7, 10, 11];
        return {
          ...syl,
          isRest: eraseIds.includes(syl.id)
        };
      })
    );
  };

  const resetAll = () => {
    setSyllables(initialSyllables);
  };

  const activeSyllableCount = syllables.filter((s) => !s.isRest).length;
  const restCount = syllables.filter((s) => s.isRest).length;

  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = 88;
    const stepIntervalMs = ((60 / bpm) * 4 * 1000) / 16;
    let step = 0;

    const playStep = (s: number) => {
      setCurrentStep(s);

      // Drum foundation
      if (s === 0 || s === 8) soundEngine.playKick(undefined, 100, true);
      if (s === 4 || s === 12) soundEngine.playSnare(undefined, 105);
      if (s % 2 === 0) soundEngine.playHiHat(undefined, 40);

      const syl = syllables[s];
      if (syl && !syl.isRest) {
        soundEngine.playTone(syl.stress ? 260 : 190, 0.1, syl.stress ? 'sawtooth' : 'triangle', syl.stress ? 120 : 70);
        soundEngine.speakCadenceWord(syl.word, syl.stress);
      }
    };

    playStep(0);
    timerRef.current = window.setInterval(() => {
      step = (step + 1) % 16;
      playStep(step);
    }, stepIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, syllables]);

  return (
    <div id="subtraction-silence-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.6
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Silence Is a Rhythm: The Syllable Subtraction Tool
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={applyRecommendedSilence}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#F7F3F0] text-[#1A1A1A] border border-[#E5E1DA] hover:bg-[#E5E1DA] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5 text-[#C5A059]" /> Weaponize 6 Rests
          </button>
          <button
            onClick={resetAll}
            className="p-1.5 rounded-lg bg-[#F7F3F0] text-[#8B8378] hover:text-[#1A1A1A] border border-[#E5E1DA] transition-colors cursor-pointer"
            title="Reset All"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-[#8B8378]">
        <span className="font-serif italic">Click any syllable to toggle it into a <strong>Rest [SILENCE]</strong></span>
        <span className="font-mono text-[#C5A059] font-bold">
          Words: {activeSyllableCount} / Rests: {restCount}
        </span>
      </div>

      {/* 16-Syllable Interactive Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5">
        {syllables.map((syl, idx) => {
          const isActive = isPlaying && currentStep === idx;
          return (
            <button
              key={syl.id}
              onClick={() => toggleRest(syl.id)}
              className={`h-20 rounded-xl p-1.5 flex flex-col items-center justify-between border transition-all text-center cursor-pointer ${
                syl.isRest
                  ? 'bg-[#F7F3F0] border-[#E5E1DA] text-[#A69D91] opacity-60'
                  : isActive
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105 shadow-md font-bold'
                  : syl.stress
                  ? 'bg-[#FFFFFF] border-[#C5A059] text-[#1A1A1A] font-bold shadow-xs'
                  : 'bg-[#FFFFFF] border-[#E5E1DA] text-[#4A453E]'
              }`}
            >
              <span className="text-[9px] font-mono opacity-50">{idx + 1}</span>
              <span className="text-xs font-serif font-semibold leading-tight">
                {syl.isRest ? <VolumeX className="w-4 h-4 mx-auto text-[#8B8378]" /> : syl.word}
              </span>
              <span className="text-[8px] uppercase font-mono tracking-tighter">
                {syl.isRest ? 'REST' : syl.stress ? 'ACCENT' : 'LANE'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Psychological Acoustic Insight */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] text-xs font-serif text-[#4A453E] space-y-1">
        <p className="font-sans font-bold text-[#1A1A1A] flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-[#C5A059]" /> Acoustic Contrast Principle:
        </p>
        <p className="leading-relaxed">
          When every millisecond is filled, the listener suffers acoustic fatigue. Adding rests builds an invisible rubber band of suspense—when the next phrase lands, it hits with amplified emotional weight.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Loop' : 'Play Cadence with Rests'}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          Try disabling syllables in slots 3, 7, 10, and 14.
        </span>
      </div>
    </div>
  );
};
