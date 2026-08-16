import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, VolumeX, Flame } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

// 1. Swing Slider Widget (50% Straight to 75% Swung)
export const SwingSliderWidget: React.FC = () => {
  const [swingPercent, setSwingPercent] = useState<number>(62);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [step, setStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      setStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    soundEngine.init();
    const bpm = 90;
    const beatIntervalMs = (60 / bpm) * 1000;
    let s = 0;

    const runLoop = () => {
      const isOffbeat = s % 2 === 1;
      const swingOffsetMs = isOffbeat ? ((swingPercent - 50) / 100) * (beatIntervalMs / 2) : 0;

      setTimeout(() => {
        if (!isPlaying) return;
        setStep(s);
        soundEngine.playHiHat(undefined, isOffbeat ? 60 : 110);
        if (s === 0 || s === 4) soundEngine.playKick(undefined, 100, true);
        if (s === 2 || s === 6) soundEngine.playSnare(undefined, 105);
      }, Math.max(0, swingOffsetMs));

      s = (s + 1) % 8;
    };

    const stepInterval = beatIntervalMs / 2;
    runLoop();
    timerRef.current = window.setInterval(runLoop, stepInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, swingPercent]);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 3.3
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Swing Ratio (50% Straight to 75% Triplet Bias)
          </h4>
        </div>
        <span className="text-xs font-mono text-[#1A1A1A] bg-[#F7F3F0] border border-[#E5E1DA] px-3 py-1 rounded-full">
          {swingPercent}% Swing Ratio
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#8B8378] font-mono">
          <span>50% (Straight 1:1 March)</span>
          <span className="font-bold text-[#1A1A1A] font-serif italic">
            {swingPercent}% ({swingPercent > 60 ? 'Heavy Hip-Hop Bounce' : 'Subtle Groove'})
          </span>
          <span>75% (Triplet Bias)</span>
        </div>
        <input
          type="range"
          min="50"
          max="75"
          value={swingPercent}
          onChange={(e) => setSwingPercent(Number(e.target.value))}
          className="w-full h-2 bg-[#E5E1DA] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
        />
      </div>
      <div className="grid grid-cols-8 gap-1">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className={`h-12 rounded-lg border flex items-center justify-center font-mono text-xs transition-all ${
              step === idx
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-black scale-105 shadow-md'
                : 'bg-[#F7F3F0] border-[#E5E1DA] text-[#8B8378]'
            }`}
          >
            {idx % 2 === 0 ? `${idx / 2 + 1}` : '&'}
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
          isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
        }`}
      >
        {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
        {isPlaying ? 'Stop Swing Engine' : 'Listen to Live Swing'}
      </button>
    </div>
  );
};

// 2. Microtiming Nudge Widget
export const MicrotimingNudgeWidget: React.FC = () => {
  const [snareOffsetMs, setSnareOffsetMs] = useState<number>(25);

  const auditionNudge = () => {
    soundEngine.init();
    soundEngine.playKick(undefined, 110, true);
    setTimeout(() => {
      soundEngine.playSnare(undefined, 115);
    }, 350 + snareOffsetMs);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 3.4
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Snare Microtiming Nudge (+{snareOffsetMs}ms)
          </h4>
        </div>
        <span className="text-xs font-mono text-[#C5A059] font-bold">
          +{snareOffsetMs} ms Offset
        </span>
      </div>
      <p className="text-xs text-[#4A453E] font-serif leading-relaxed">
        Nudging the snare 20–35ms behind the grid line creates breathing space between the kick and snare without dragging tempo.
      </p>
      <input
        type="range"
        min="0"
        max="60"
        value={snareOffsetMs}
        onChange={(e) => setSnareOffsetMs(Number(e.target.value))}
        className="w-full h-2 bg-[#E5E1DA] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
      />
      <button
        onClick={auditionNudge}
        className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#1A1A1A] hover:bg-[#2D2A26] text-white flex items-center gap-2 transition-colors cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" /> Audition Kick & Snare with +{snareOffsetMs}ms Offset
      </button>
    </div>
  );
};

// 3. Relational 5-Stem Mixer
export const RelationalGrooveMixer: React.FC = () => {
  const [mutes, setMutes] = useState({ kick: false, snare: false, hihat: false, bass: false, vocal: false });
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [step, setStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const toggleMute = (track: keyof typeof mutes) => {
    setMutes((prev) => ({ ...prev, [track]: !prev[track] }));
  };

  useEffect(() => {
    if (!isPlaying) {
      setStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    soundEngine.init();
    let s = 0;
    const bpm = 88;
    const interval = ((60 / bpm) * 4 * 1000) / 16;

    timerRef.current = window.setInterval(() => {
      setStep(s);
      if (!mutes.kick && (s === 0 || s === 7 || s === 10)) soundEngine.playKick(undefined, 110, true);
      if (!mutes.snare && (s === 4 || s === 12)) soundEngine.playSnare(undefined, 115);
      if (!mutes.hihat) soundEngine.playHiHat(undefined, s % 2 === 0 ? 80 : 40);
      if (!mutes.bass && (s === 0 || s === 6 || s === 10)) soundEngine.playBassNote(55, 0.3, 100);
      if (!mutes.vocal && (s === 0 || s === 4 || s === 8)) soundEngine.playTone(260, 0.1, 'triangle', 80);
      s = (s + 1) % 16;
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, mutes]);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 3.6
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Groove Is Relational (5-Stem Mixer)
          </h4>
        </div>
        <span className="text-xs font-mono text-[#8B8378]">Interdependent Ecosystem</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {(['kick', 'snare', 'hihat', 'bass', 'vocal'] as (keyof typeof mutes)[]).map((track) => (
          <button
            key={track}
            onClick={() => toggleMute(track)}
            className={`p-3.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              mutes[track]
                ? 'bg-[#F7F3F0] border-[#E5E1DA] text-[#A69D91] opacity-60'
                : 'bg-[#FFFFFF] border-[#C5A059] text-[#1A1A1A] font-bold shadow-xs'
            }`}
          >
            {mutes[track] ? <VolumeX className="w-4 h-4 text-[#8B8378]" /> : <Volume2 className="w-4 h-4 text-[#C5A059]" />}
            <span className="text-xs uppercase font-mono tracking-wider">{track}</span>
            <span className="text-[9px] font-mono text-[#8B8378]">{mutes[track] ? 'MUTED' : 'ACTIVE'}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
          isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
        }`}
      >
        {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
        {isPlaying ? 'Stop Mixer' : 'Play Relational Loop'}
      </button>
    </div>
  );
};

// 4. Tension and Release Drop Builder
export const TensionReleaseWidget: React.FC = () => {
  const [isBuilding, setIsBuilding] = useState<boolean>(false);

  const triggerDropSequence = () => {
    soundEngine.init();
    setIsBuilding(true);
    for (let i = 0; i < 16; i++) {
      setTimeout(() => {
        soundEngine.playSnare(undefined, 50 + i * 4, 180 + i * 10);
        soundEngine.playHiHat(undefined, 40 + i * 5);
      }, i * 120);
    }
    setTimeout(() => {
      setIsBuilding(false);
      soundEngine.playKick(undefined, 127, true);
      soundEngine.playBassNote(40, 1.2, 127);
      soundEngine.playChord([48, 51, 55], 1.5, 110);
    }, 16 * 120 + 200);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 3.10
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Tension & Release (The Drop)
          </h4>
        </div>
        <span className="text-xs font-mono text-[#C5A059] flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-[#C5A059]" /> Kinetic Release
        </span>
      </div>
      <p className="text-xs text-[#4A453E] font-serif leading-relaxed">
        Rhythmic tension is engineered by accelerating subdivisions and rising snare pitch, released by sudden silence into the heavy downbeat 808 drop.
      </p>
      <button
        onClick={triggerDropSequence}
        disabled={isBuilding}
        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#1A1A1A] hover:bg-[#2D2A26] disabled:opacity-50 text-white flex items-center gap-2 shadow-sm transition-all cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" /> {isBuilding ? 'Building Tension...' : 'Trigger Riser & The Drop'}
      </button>
    </div>
  );
};
