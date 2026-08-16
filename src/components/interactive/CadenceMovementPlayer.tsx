import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

type CadencePatternType = 'straight' | 'compressed' | 'floating';

interface SyllableEvent {
  text: string;
  gridStep: number;
  stress: boolean;
}

export const CadenceMovementPlayer: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<CadencePatternType>('straight');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const PATTERNS: Record<
    CadencePatternType,
    {
      title: string;
      subtitle: string;
      desc: string;
      syllables: SyllableEvent[];
    }
  > = {
    straight: {
      title: 'Pattern A: Straight Delivery',
      subtitle: 'Even 8th-Note Distribution',
      desc: 'Predictable, foundational, steady. Syllables land evenly on every eighth note with calm rhythmic certainty.',
      syllables: [
        { text: 'I', gridStep: 0, stress: false },
        { text: 'pull', gridStep: 2, stress: true },
        { text: 'up', gridStep: 4, stress: false },
        { text: 'in', gridStep: 6, stress: false },
        { text: 'the', gridStep: 8, stress: false },
        { text: 'dark', gridStep: 10, stress: true },
        { text: 'with', gridStep: 12, stress: false },
        { text: 'no', gridStep: 14, stress: false }
      ]
    },
    compressed: {
      title: 'Pattern B: Staccato / Compressed',
      subtitle: 'Front-Loaded Density + 2.5 Beats Dead Air',
      desc: 'Aggressive, breathless stutter. All syllables are crammed into the first beat and a half, leaving the rest completely empty to weaponize silence.',
      syllables: [
        { text: 'I', gridStep: 0, stress: true },
        { text: 'pull', gridStep: 1, stress: true },
        { text: 'up', gridStep: 2, stress: false },
        { text: 'in', gridStep: 3, stress: false },
        { text: 'the', gridStep: 4, stress: false },
        { text: 'dark', gridStep: 5, stress: true },
        { text: 'with', gridStep: 6, stress: false },
        { text: 'no', gridStep: 7, stress: false },
        { text: 'lights', gridStep: 8, stress: true },
        { text: 'on', gridStep: 9, stress: true }
      ]
    },
    floating: {
      title: 'Pattern C: Stretched / Floating',
      subtitle: 'Post-Downbeat Offset + Vowel Glides',
      desc: 'Relaxed, menacing atmosphere. Initiating milliseconds after the downbeat and floating across sixteenth-note subdivisions.',
      syllables: [
        { text: 'I', gridStep: 1, stress: false },
        { text: 'pull...', gridStep: 3, stress: true },
        { text: 'up', gridStep: 7, stress: false },
        { text: 'in the', gridStep: 9, stress: false },
        { text: 'dark...', gridStep: 11, stress: true },
        { text: 'no lights on', gridStep: 14, stress: true }
      ]
    }
  };

  const pattern = PATTERNS[selectedPattern];

  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = 85;
    const stepDurationMs = ((60 / bpm) * 4 * 1000) / 16;
    let step = 0;

    const playStep = (s: number) => {
      setCurrentStep(s);

      // Drum foundation (Kick on 1 & 3, Snare on 2 & 4)
      if (s === 0 || s === 8) {
        soundEngine.playKick(undefined, 100, true);
      }
      if (s === 4 || s === 12) {
        soundEngine.playSnare(undefined, 105);
      }
      if (s % 2 === 0) {
        soundEngine.playHiHat(undefined, 40);
      }

      // Vocal syllable
      const syl = pattern.syllables.find((item) => item.gridStep === s);
      if (syl) {
        soundEngine.playTone(syl.stress ? 240 : 180, 0.12, syl.stress ? 'sawtooth' : 'triangle', syl.stress ? 125 : 75);
        soundEngine.speakCadenceWord(syl.text, syl.stress);
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
  }, [isPlaying, selectedPattern]);

  return (
    <div id="cadence-movement-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.3
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Cadence Is Movement: The Same Text, 3 Ways
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F3F0] rounded-xl border border-[#E5E1DA]">
          {(['straight', 'compressed', 'floating'] as CadencePatternType[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPattern(key);
                setCurrentStep(-1);
              }}
              className={`px-3 py-1 rounded-lg text-xs capitalize font-semibold transition-all cursor-pointer ${
                selectedPattern === key
                  ? 'bg-[#1A1A1A] text-white shadow-sm'
                  : 'text-[#8B8378] hover:text-[#1A1A1A]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Target Baseline Text Display */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA] flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B8378]">
            Baseline Target Lyric
          </span>
          <p className="text-base font-serif italic font-semibold text-[#1A1A1A] mt-0.5">
            &ldquo;I pull up in the dark with no lights on&rdquo;
          </p>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5E1DA] text-[#8B8378]">
          85 BPM (4/4 Bar)
        </span>
      </div>

      {/* 16-Step Timeline Grid with Syllables */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[#8B8378] px-1 font-mono">
          <span>Beat 1</span>
          <span>Beat 2 (Snare)</span>
          <span>Beat 3</span>
          <span>Beat 4 (Snare)</span>
        </div>

        <div className="grid grid-cols-16 gap-1">
          {Array.from({ length: 16 }).map((_, idx) => {
            const isActive = isPlaying && currentStep === idx;
            const syl = pattern.syllables.find((s) => s.gridStep === idx);
            const isDownbeat = idx % 4 === 0;
            const isSnare = idx === 4 || idx === 12;

            return (
              <div
                key={idx}
                className={`min-h-[72px] flex flex-col items-center justify-between p-1 rounded-lg border text-center transition-all ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105 shadow-md z-10'
                    : isDownbeat
                    ? 'bg-[#F7F3F0] border-[#E5E1DA]'
                    : 'bg-[#FDFCFB] border-[#E5E1DA] text-[#8B8378]'
                }`}
              >
                <span className="text-[9px] font-mono opacity-60">{idx + 1}</span>

                {syl ? (
                  <span
                    className={`text-[10px] font-serif font-bold px-1 py-0.5 rounded leading-tight ${
                      syl.stress
                        ? 'bg-[#C5A059] text-white'
                        : 'bg-[#F7F3F0] border border-[#E5E1DA] text-[#1A1A1A]'
                    }`}
                  >
                    {syl.text}
                  </span>
                ) : (
                  <span className="text-[9px] text-[#A69D91]">&bull;</span>
                )}

                <span className="text-[8px] font-mono uppercase tracking-tighter opacity-80">
                  {isSnare ? 'SNARE' : isDownbeat ? 'KICK' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Breakdown */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-1.5 font-serif">
        <div className="flex items-center justify-between font-sans mb-1">
          <h5 className="font-bold text-sm text-[#1A1A1A]">{pattern.title}</h5>
          <span className="text-xs text-[#8B8378] font-mono">{pattern.subtitle}</span>
        </div>
        <p className="text-xs text-[#4A453E] leading-relaxed">{pattern.desc}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying
              ? 'bg-[#991B1B] text-white'
              : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Playback' : `Listen to ${pattern.title.split(':')[0]}`}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          Transient density manipulates emotional tension and listener suspense.
        </span>
      </div>
    </div>
  );
};
