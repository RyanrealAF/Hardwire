import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, ArrowRightLeft } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

type AccentMode = 'standard' | 'syncopated' | 'anticipated';

export const SyncopationDisplacementWidget: React.FC = () => {
  const [accentMode, setAccentMode] = useState<AccentMode>('syncopated');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const getAccentsForMode = (mode: AccentMode): number[] => {
    switch (mode) {
      case 'standard':
        return [0, 8];
      case 'syncopated':
        return [3, 7, 11, 15];
      case 'anticipated':
        return [15, 7];
    }
  };

  const accents = getAccentsForMode(accentMode);

  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = 90;
    const stepDurationMs = ((60 / bpm) * 4 * 1000) / 16;
    let step = 0;

    const playStep = (s: number) => {
      setCurrentStep(s);
      const isAccented = accents.includes(s);

      if (s % 4 === 0) {
        soundEngine.playMetronome(undefined, s === 0);
      }

      if (isAccented) {
        soundEngine.playSnare(undefined, 125, 210);
        soundEngine.playTone(320, 0.12, 'sawtooth', 120);
      } else {
        soundEngine.playHiHat(undefined, 45);
      }
    };

    playStep(0);
    timerRef.current = window.setInterval(() => {
      step = (step + 1) % 16;
      playStep(step);
    }, stepDurationMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, accentMode, accents]);

  return (
    <div id="syncopation-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.7
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Syncopation & Anticipation Displacement Grid
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F3F0] rounded-xl border border-[#E5E1DA] text-xs">
          <button
            onClick={() => setAccentMode('standard')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              accentMode === 'standard' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            Standard (1 & 3)
          </button>
          <button
            onClick={() => setAccentMode('syncopated')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              accentMode === 'syncopated' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            Syncopated Off-Beats
          </button>
          <button
            onClick={() => setAccentMode('anticipated')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              accentMode === 'anticipated' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            Anticipated (Early Hit)
          </button>
        </div>
      </div>

      {/* Grid Step Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#8B8378] px-1 font-mono">
          <span>Beat 1</span>
          <span>Beat 2</span>
          <span>Beat 3</span>
          <span>Beat 4</span>
        </div>

        <div className="grid grid-cols-16 gap-1">
          {Array.from({ length: 16 }).map((_, idx) => {
            const isActive = isPlaying && currentStep === idx;
            const isAccented = accents.includes(idx);
            const isQuarterBeat = idx % 4 === 0;

            return (
              <div
                key={idx}
                className={`h-16 rounded-xl p-1 flex flex-col items-center justify-between border text-center transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105 shadow-md font-bold z-10'
                    : isAccented
                    ? 'bg-[#FFFFFF] border-[#C5A059] text-[#1A1A1A] font-bold shadow-xs'
                    : isQuarterBeat
                    ? 'bg-[#F7F3F0] border-[#E5E1DA] text-[#1A1A1A]'
                    : 'bg-[#FDFCFB] border-[#E5E1DA] text-[#8B8378]'
                }`}
              >
                <span className="text-[8px] font-mono opacity-60">{idx + 1}</span>
                <span className="text-[11px] font-bold">
                  {isAccented ? '💥' : isQuarterBeat ? 'CLK' : '·'}
                </span>
                <span className="text-[7px] uppercase font-mono tracking-wider text-[#C5A059] font-bold">
                  {isAccented ? 'HIT' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] text-xs font-serif text-[#4A453E] space-y-1">
        <p className="font-sans font-bold text-[#1A1A1A] flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <ArrowRightLeft className="w-4 h-4 text-[#C5A059]" /> Pattern Breakdown:
        </p>
        <p className="leading-relaxed">
          {accentMode === 'standard' && 'Standard marching cadence. Everything lands predictably on strong downbeats. Functional, but static.'}
          {accentMode === 'syncopated' && 'Accents shifted onto off-beats ("e" and "a" subdivisions). The listener’s head is prompted into an addictive rhythmic bounce.'}
          {accentMode === 'anticipated' && 'Transients hit 1 sixteenth-note earlier than the downbeat, pulling the listener forward across the bar line.'}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Pattern' : 'Audition Displacement'}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          Compare Standard vs Syncopated vs Anticipated back-to-back.
        </span>
      </div>
    </div>
  );
};
