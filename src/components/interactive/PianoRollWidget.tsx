import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Trash2 } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

interface NoteBlock {
  pitch: string;
  midi: number;
  step: number;
}

export const PianoRollWidget: React.FC = () => {
  const [notes, setNotes] = useState<NoteBlock[]>([
    { pitch: 'C4', midi: 60, step: 0 },
    { pitch: 'E4', midi: 64, step: 4 },
    { pitch: 'G4', midi: 67, step: 8 },
    { pitch: 'B4', midi: 71, step: 12 }
  ]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const pitches = [
    { label: 'C5', midi: 72, isBlack: false },
    { label: 'B4', midi: 71, isBlack: false },
    { label: 'A#4', midi: 70, isBlack: true },
    { label: 'A4', midi: 69, isBlack: false },
    { label: 'G#4', midi: 68, isBlack: true },
    { label: 'G4', midi: 67, isBlack: false },
    { label: 'F#4', midi: 66, isBlack: true },
    { label: 'F4', midi: 65, isBlack: false },
    { label: 'E4', midi: 64, isBlack: false },
    { label: 'D#4', midi: 63, isBlack: true },
    { label: 'D4', midi: 62, isBlack: false },
    { label: 'C#4', midi: 61, isBlack: true },
    { label: 'C4', midi: 60, isBlack: false }
  ];

  const toggleNote = (pitch: string, midi: number, step: number) => {
    soundEngine.init();
    const exists = notes.some((n) => n.midi === midi && n.step === step);
    if (exists) {
      setNotes((prev) => prev.filter((n) => !(n.midi === midi && n.step === step)));
    } else {
      soundEngine.playNote(midi, 0.3, 100, 'triangle');
      setNotes((prev) => [...prev, { pitch, midi, step }]);
    }
  };

  const clearGrid = () => {
    setNotes([]);
  };

  useEffect(() => {
    if (!isPlaying) {
      setCurrentStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    soundEngine.init();
    const bpm = 100;
    const stepDurationMs = ((60 / bpm) * 4 * 1000) / 16;
    let step = 0;

    const playStep = (s: number) => {
      setCurrentStep(s);

      const stepNotes = notes.filter((n) => n.step === s);
      stepNotes.forEach((n) => {
        soundEngine.playNote(n.midi, 0.25, 110, 'sawtooth');
      });

      if (s % 4 === 0) soundEngine.playMetronome(undefined, s === 0);
    };

    playStep(0);
    timerRef.current = window.setInterval(() => {
      step = (step + 1) % 16;
      playStep(step);
    }, stepDurationMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, notes]);

  return (
    <div id="piano-roll-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.1
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            The 2D Piano Roll Coordinate Matrix
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F7F3F0] text-[#1A1A1A] border border-[#E5E1DA]">
            X = Time (16th notes) &bull; Y = Pitch (C4–C5)
          </span>
          <button
            onClick={clearGrid}
            className="p-1.5 rounded-lg bg-[#F7F3F0] text-[#8B8378] hover:text-[#1A1A1A] border border-[#E5E1DA] transition-colors cursor-pointer"
            title="Clear Notes"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Piano Roll Grid Component */}
      <div className="bg-[#F7F3F0] rounded-xl border border-[#E5E1DA] p-3 overflow-x-auto">
        <div className="min-w-[520px]">
          {/* Top Time Ruler */}
          <div className="flex items-center ml-14 mb-1 text-[9px] font-mono text-[#8B8378]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 text-center ${i % 4 === 0 ? 'text-[#1A1A1A] font-bold' : 'opacity-60'}`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Grid Rows */}
          <div className="space-y-1">
            {pitches.map((p) => (
              <div key={p.midi} className="flex items-center gap-1">
                {/* Piano Key */}
                <button
                  onClick={() => soundEngine.playNote(p.midi, 0.4, 100, 'triangle')}
                  className={`w-12 h-6 rounded flex items-center justify-end px-1.5 text-[10px] font-mono font-bold transition-transform active:scale-95 cursor-pointer ${
                    p.isBlack
                      ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A]'
                      : 'bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E1DA]'
                  }`}
                >
                  {p.label}
                </button>

                {/* 16 Step Cells */}
                <div className="flex-1 grid grid-cols-16 gap-0.5">
                  {Array.from({ length: 16 }).map((_, stepIdx) => {
                    const isSelected = notes.some((n) => n.midi === p.midi && n.step === stepIdx);
                    const isCurrentPlayhead = isPlaying && currentStep === stepIdx;
                    const isQuarter = stepIdx % 4 === 0;

                    return (
                      <button
                        key={stepIdx}
                        onClick={() => toggleNote(p.label, p.midi, stepIdx)}
                        className={`h-6 rounded-xs border transition-all cursor-pointer ${
                          isSelected
                            ? isCurrentPlayhead
                              ? 'bg-[#1A1A1A] border-[#1A1A1A] scale-105 shadow-md text-white'
                              : 'bg-[#C5A059] border-[#C5A059] shadow-xs'
                            : isCurrentPlayhead
                            ? 'bg-[#1A1A1A]/10 border-[#1A1A1A]'
                            : isQuarter
                            ? 'bg-[#FFFFFF] border-[#D8D2C7]'
                            : 'bg-[#FDFCFB] border-[#E5E1DA]'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Playback' : 'Play Piano Roll Loop'}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          Click any cell to toggle note coordinates on the grid.
        </span>
      </div>
    </div>
  );
};
