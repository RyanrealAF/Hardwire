import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

type PocketPreset = 'ontop' | 'inside' | 'behind';

export const PocketOffsetSimulator: React.FC = () => {
  const [offsetMs, setOffsetMs] = useState<number>(45);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeBeat, setActiveBeat] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  const getPresetFromOffset = (ms: number): PocketPreset => {
    if (ms <= 5) return 'ontop';
    if (ms <= 25) return 'inside';
    return 'behind';
  };

  const currentPreset = getPresetFromOffset(offsetMs);

  const PRESETS: Record<PocketPreset, { title: string; genre: string; desc: string }> = {
    ontop: {
      title: 'On-Top-of-the-Beat (0ms offset)',
      genre: 'Drill, Battle Rap, Fast-paced Bangers',
      desc: 'Dead-center alignment with the drum transient. Maximum mechanical urgency, cutting precision, and forward drive.'
    },
    inside: {
      title: 'Inside-the-Beat (+15ms offset)',
      genre: 'Pop, Melodic Rap, Contemporary Trap',
      desc: 'Natural, transparent, conversational pocket. Balanced right in the pocket without rushing or dragging.'
    },
    behind: {
      title: 'Behind-the-Beat (+40ms to +60ms offset)',
      genre: 'Boom-Bap, West Coast, Lo-Fi, Neo-Soul',
      desc: 'Drops milliseconds after the snare transient. Generates immense spatial depth, confident swagger, and relaxed neck-nodding bounce.'
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      setActiveBeat(0);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = 85;
    const beatIntervalMs = (60 / bpm) * 1000;
    let beat = 0;

    const playBeat = () => {
      beat = (beat % 4) + 1;
      setActiveBeat(beat);

      // Drum Transients
      if (beat === 1 || beat === 3) {
        soundEngine.playKick(undefined, 110, true);
      }
      if (beat === 2 || beat === 4) {
        soundEngine.playSnare(undefined, 110);
      }
      soundEngine.playHiHat(undefined, 50);

      // Vocal Transient offset in milliseconds
      setTimeout(() => {
        if (isPlaying) {
          soundEngine.playTone(220, 0.1, 'triangle', 100);
        }
      }, offsetMs);
    };

    playBeat();
    timerRef.current = window.setInterval(playBeat, beatIntervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, offsetMs]);

  return (
    <div id="pocket-offset-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 1.5
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            The Pocket: Sub-Millisecond Vocal Offset Simulator
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F3F0] rounded-xl border border-[#E5E1DA] text-xs">
          <button
            onClick={() => setOffsetMs(0)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              offsetMs === 0 ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            0ms (On-Top)
          </button>
          <button
            onClick={() => setOffsetMs(15)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              offsetMs === 15 ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            +15ms (Inside)
          </button>
          <button
            onClick={() => setOffsetMs(50)}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              offsetMs === 50 ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            +50ms (Behind)
          </button>
        </div>
      </div>

      {/* Visual Transient Waveform Timeline */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA] space-y-3">
        <div className="flex items-center justify-between text-xs text-[#8B8378] font-mono">
          <span>Drum Grid Anchor (0ms)</span>
          <span className="text-[#C5A059] font-bold">Offset: +{offsetMs} ms</span>
        </div>

        {/* Transient Graph */}
        <div className="relative h-20 bg-[#FFFFFF] rounded-xl border border-[#E5E1DA] overflow-hidden flex items-center px-6 shadow-inner">
          <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-[#1A1A1A] z-10">
            <span className="absolute -top-0.5 left-2 text-[9px] font-mono text-[#8B8378] uppercase font-bold">
              Grid Line (0ms)
            </span>
          </div>

          <div
            className="absolute top-2.5 bottom-2.5 w-14 rounded-lg bg-[#C5A059] text-white flex flex-col items-center justify-center transition-all duration-100 shadow-md z-20"
            style={{ left: `calc(4rem + ${(offsetMs / 70) * 160}px)` }}
          >
            <span className="text-[10px] font-bold leading-none">VOCAL</span>
            <span className="text-[8px] font-mono leading-none mt-0.5">+{offsetMs}ms</span>
          </div>
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#8B8378] font-mono">
          <span>0ms (Dead-Center Urgent)</span>
          <span className="font-bold text-[#1A1A1A]">+{offsetMs} Milliseconds</span>
          <span>+70ms (Deep West-Coast Drag)</span>
        </div>
        <input
          id="pocket-offset-slider"
          type="range"
          min="0"
          max="70"
          value={offsetMs}
          onChange={(e) => setOffsetMs(Number(e.target.value))}
          className="w-full h-2 bg-[#E5E1DA] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
        />
      </div>

      {/* Preset Details Card */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-1.5 font-serif">
        <div className="flex items-center justify-between mb-1 font-sans">
          <h5 className="font-bold text-sm text-[#1A1A1A]">{PRESETS[currentPreset].title}</h5>
          <span className="text-xs text-[#8B8378] font-mono font-medium">Style: {PRESETS[currentPreset].genre}</span>
        </div>
        <p className="text-xs text-[#4A453E] leading-relaxed">{PRESETS[currentPreset].desc}</p>
      </div>

      {/* Play Controls */}
      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Pocket Audit' : 'Listen to Pocket in Real Time'}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          Dragging the vocal +45ms creates bounce without altering BPM.
        </span>
      </div>
    </div>
  );
};
