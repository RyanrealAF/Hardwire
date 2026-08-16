import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Zap } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const AnapesticEngineWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const anapesticPhrases = [
    { text: 'And the', isStressed: false },
    { text: 'walls', isStressed: false },
    { text: 'KEPT', isStressed: true },
    { text: 'clos-ing', isStressed: false },
    { text: 'in', isStressed: false },
    { text: 'TIGHT', isStressed: true }
  ];

  useEffect(() => {
    if (!isPlaying) {
      setActiveStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = 90;
    const tripletIntervalMs = (60 / bpm / 3) * 1000;
    let index = 0;

    const playTriad = (idx: number) => {
      setActiveStep(idx);
      const isStress = idx % 3 === 2;

      if (isStress) {
        soundEngine.playKick(undefined, 115, true);
        soundEngine.playSnare(undefined, 110);
        soundEngine.playTone(280, 0.15, 'sawtooth', 127);
      } else {
        soundEngine.playHiHat(undefined, 60);
        soundEngine.playTone(180, 0.08, 'sine', 60);
      }
    };

    playTriad(0);
    timerRef.current = window.setInterval(() => {
      index = (index + 1) % 6;
      playTriad(index);
    }, tripletIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  return (
    <div id="anapestic-engine-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.4
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            The Anapestic Slingshot Engine (da-da-DUM)
          </h4>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-[#F7F3F0] text-[#1A1A1A] font-mono border border-[#E5E1DA]">
          Triplet Pulse Inertia
        </span>
      </div>

      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-3 font-serif">
        <p className="text-xs text-[#4A453E] leading-relaxed">
          Instead of marching evenly (DUM-DUM-DUM-DUM), anapestic phrasing creates an inertial slingshot: two quick unstressed syllables launch into a heavy dynamic impact.
        </p>

        {/* Visual da - da - DUM blocks */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 font-sans">
          {anapesticPhrases.map((phrase, idx) => {
            const isActive = isPlaying && activeStep === idx;
            const isStressed = phrase.isStressed;

            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? isStressed
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-110 shadow-md font-black'
                      : 'bg-[#C5A059] text-white border-[#C5A059] scale-105 font-bold'
                    : isStressed
                    ? 'bg-[#FFFFFF] border-[#C5A059] text-[#1A1A1A] font-bold shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E5E1DA] text-[#8B8378]'
                }`}
              >
                <span className="text-[9px] uppercase font-mono tracking-wider">
                  {isStressed ? 'DUM (Acc)' : 'da'}
                </span>
                <span className="text-sm font-serif font-bold mt-1 text-[#1A1A1A]">{phrase.text}</span>
                <span className="text-[8px] font-mono opacity-70 mt-0.5">
                  {isStressed ? 'Heavy Impact' : 'Lead-in'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Engine' : 'Listen to da-da-DUM Slingshot'}
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#8B8378] font-serif italic">
          <Zap className="w-4 h-4 text-[#C5A059]" />
          <span>Notice how it pulls you across the bar line</span>
        </div>
      </div>
    </div>
  );
};
