import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Volume2, RotateCcw, Activity } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const MetronomeDrill: React.FC = () => {
  const [bpm, setBpm] = useState<number>(85);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const [tapTimestamps, setTapTimestamps] = useState<number[]>([]);
  const [tapAccuracy, setTapAccuracy] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const startMetronome = () => {
    soundEngine.init();
    setIsPlaying(true);
  };

  const stopMetronome = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentBeat(0);
  };

  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = (60 / bpm) * 1000;
    let beat = 0;

    soundEngine.playMetronome(undefined, true);
    setCurrentBeat(1);

    timerRef.current = window.setInterval(() => {
      beat = (beat % 4) + 1;
      setCurrentBeat(beat);
      soundEngine.playMetronome(undefined, beat === 1);
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm]);

  const handleManualTap = () => {
    const now = Date.now();
    soundEngine.playKick(undefined, 90, false);
    const newTaps = [...tapTimestamps, now].slice(-4);
    setTapTimestamps(newTaps);

    if (newTaps.length >= 2) {
      const intervals = [];
      for (let i = 1; i < newTaps.length; i++) {
        intervals.push(newTaps[i] - newTaps[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const targetInterval = (60 / bpm) * 1000;
      const diffMs = Math.abs(avgInterval - targetInterval);

      if (diffMs < 35) {
        setTapAccuracy('Dead-Center Locked (±' + Math.round(diffMs) + 'ms)');
      } else if (diffMs < 80) {
        setTapAccuracy('In the Pocket (±' + Math.round(diffMs) + 'ms)');
      } else {
        setTapAccuracy('Drifting (±' + Math.round(diffMs) + 'ms)');
      }
    }
  };

  return (
    <div id="metronome-drill-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.1
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Motor-Vocal Independence Trainer
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-[#F7F3F0] text-[#1A1A1A] font-mono border border-[#E5E1DA]">
            {bpm} BPM ({(60000 / bpm).toFixed(0)} ms / beat)
          </span>
        </div>
      </div>

      {/* Visual Integer Road (1 - 2 - 3 - 4) */}
      <div className="grid grid-cols-4 gap-3">
        {[1, 2, 3, 4].map((beatNum) => {
          const isActive = isPlaying && currentBeat === beatNum;
          const isDown = beatNum === 1;
          return (
            <div
              key={beatNum}
              className={`flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-100 ${
                isActive
                  ? isDown
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] scale-105 shadow-md'
                    : 'bg-[#C5A059] text-white border-[#C5A059] scale-105 shadow-md'
                  : 'bg-[#F7F3F0] border-[#E5E1DA] text-[#8B8378]'
              }`}
            >
              <span className="text-3xl font-serif font-bold">{beatNum}</span>
              <span className="text-[9px] uppercase font-bold tracking-widest mt-1">
                {isDown ? 'Downbeat' : 'Pulse'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Drill Instruction Card */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] text-xs font-serif text-[#4A453E] space-y-1.5">
        <p className="font-sans font-bold text-[#1A1A1A] flex items-center gap-1.5 text-xs uppercase tracking-wider">
          <Activity className="w-4 h-4 text-[#C5A059]" /> Physical Execution Drill:
        </p>
        <p className="leading-relaxed">
          1. Turn on the master clock. Tap your dominant hand on every integer beat (1, 2, 3, 4).<br />
          2. While maintaining that unyielding physical clock, speak this phrase out loud at double speed:<br />
          <span className="text-[#1A1A1A] font-serif italic text-sm mt-1 block">
            &ldquo;Run it back we out the door, moving fast across the floor.&rdquo;
          </span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-3">
          <button
            id="metronome-toggle-btn"
            onClick={isPlaying ? stopMetronome : startMetronome}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white'
                : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
            }`}
          >
            {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
            {isPlaying ? 'Stop Clock' : 'Start Master Clock'}
          </button>

          <button
            id="tap-along-btn"
            onClick={handleManualTap}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-[#F7F3F0] hover:bg-[#E5E1DA] text-[#1A1A1A] border border-[#E5E1DA] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-[#C5A059]" /> Tap Hand Pulse
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8B8378] uppercase tracking-wider font-bold">Tempo:</span>
          <input
            id="metronome-bpm-slider"
            type="range"
            min="60"
            max="160"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-28 accent-[#C5A059] cursor-pointer"
          />
          <button
            onClick={() => setBpm(85)}
            title="Reset to 85 BPM"
            className="p-1.5 text-[#8B8378] hover:text-[#1A1A1A] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {tapAccuracy && (
        <div className="text-xs text-center font-mono py-2 px-4 rounded-lg bg-[#F7F3F0] border border-[#E5E1DA] text-[#2D2A26]">
          Hand Tap Accuracy: <span className="font-bold text-[#C5A059]">{tapAccuracy}</span>
        </div>
      )}
    </div>
  );
};
