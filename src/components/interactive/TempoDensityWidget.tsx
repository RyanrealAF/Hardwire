import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

type TempoMode = 'boombap' | 'trap';

export const TempoDensityWidget: React.FC = () => {
  const [mode, setMode] = useState<TempoMode>('boombap');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const configs = {
    boombap: {
      title: '85 BPM (Boom-Bap Territory)',
      subtitle: 'High Transient Density & Double-Time Cadence',
      bpm: 85,
      desc: 'Packing 16th-note triplets, double-time rapid-fire syllables, and busy hi-hats into a slow 85 BPM timeline creates a frantic, high-velocity sonic experience.',
      mathBpm: '85 BPM (Slow Math)',
      feltSpeed: 'Very Fast / Hyperactive (Felt Psychology)'
    },
    trap: {
      title: '140 BPM (Trap Territory)',
      subtitle: 'Half-Time Spacing & Floating Cadence Drops',
      bpm: 140,
      desc: 'Despite the fast 140 BPM metronome, snares land only on beat 3 (half-time) and vocal deliveries space out across 2 to 4 macro-beats, creating a slow, floating, spacious sensation.',
      mathBpm: '140 BPM (Fast Math)',
      feltSpeed: 'Slow & Spacious Half-Time (Felt Psychology)'
    }
  };

  const currentConfig = configs[mode];

  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = currentConfig.bpm;
    const stepDurationMs = ((60 / bpm) * 4 * 1000) / 16;
    let step = 0;

    const playStep = (s: number) => {
      setCurrentStep(s);

      if (mode === 'boombap') {
        // Boom bap: Kick on 0, 7, 10; Snare on 4, 12; 16th hats every step
        if (s === 0 || s === 7 || s === 10) soundEngine.playKick(undefined, 110, true);
        if (s === 4 || s === 12) soundEngine.playSnare(undefined, 115);
        soundEngine.playHiHat(undefined, s % 2 === 0 ? 90 : 45);
        if (s % 2 === 0) soundEngine.playTone(220 + s * 10, 0.05, 'triangle', 70);
      } else {
        // Trap 140 half time: Kick on 0, 10; Snare ONLY on beat 3 (step 8); sparse hats
        if (s === 0 || s === 10) soundEngine.playKick(undefined, 120, true);
        if (s === 8) soundEngine.playSnare(undefined, 120);
        if (s % 4 === 0) soundEngine.playHiHat(undefined, 80);
        if (s === 0 || s === 8) soundEngine.playTone(160, 0.4, 'sine', 100);
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
  }, [isPlaying, mode, currentConfig.bpm]);

  return (
    <div id="tempo-density-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.8
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Tempo vs. Perceived Speed: Math vs. Psychology
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMode('boombap');
              setCurrentStep(-1);
            }}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'boombap'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-[#F7F3F0] text-[#8B8378] border border-[#E5E1DA] hover:text-[#1A1A1A]'
            }`}
          >
            85 BPM (Boom-Bap)
          </button>
          <button
            onClick={() => {
              setMode('trap');
              setCurrentStep(-1);
            }}
            className={`px-3.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              mode === 'trap'
                ? 'bg-[#1A1A1A] text-white shadow-sm'
                : 'bg-[#F7F3F0] text-[#8B8378] border border-[#E5E1DA] hover:text-[#1A1A1A]'
            }`}
          >
            140 BPM (Trap Half-Time)
          </button>
        </div>
      </div>

      {/* Comparison Stat Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#8B8378] tracking-wider">Objective Clock</span>
          <p className="text-base font-bold text-[#1A1A1A] font-mono">{currentConfig.mathBpm}</p>
        </div>
        <div className="p-5 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA] space-y-1">
          <span className="text-[10px] uppercase font-bold text-[#8B8378] tracking-wider">Subjective Perception</span>
          <p className="text-base font-bold text-[#C5A059] font-serif italic">{currentConfig.feltSpeed}</p>
        </div>
      </div>

      {/* 16-step animation bar */}
      <div className="grid grid-cols-16 gap-1">
        {Array.from({ length: 16 }).map((_, idx) => {
          const isActive = isPlaying && currentStep === idx;
          return (
            <div
              key={idx}
              className={`h-12 rounded-lg border flex items-center justify-center font-mono text-[9px] transition-all ${
                isActive
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-110 font-bold shadow-md'
                  : 'bg-[#FDFCFB] border-[#E5E1DA] text-[#8B8378]'
              }`}
            >
              {idx + 1}
            </div>
          );
        })}
      </div>

      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] text-xs font-serif text-[#4A453E]">
        <p className="leading-relaxed">{currentConfig.desc}</p>
      </div>

      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Comparison' : `Play ${currentConfig.title.split(' ')[0]} Feel`}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          BPM is raw clock speed. Transient density is psychological velocity.
        </span>
      </div>
    </div>
  );
};
