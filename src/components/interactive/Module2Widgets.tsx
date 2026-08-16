import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

// 1. Chromatic Keyboard
export const ChromaticKeyboardWidget: React.FC = () => {
  const keys = [
    { name: 'C', midi: 60, isBlack: false },
    { name: 'C#', midi: 61, isBlack: true },
    { name: 'D', midi: 62, isBlack: false },
    { name: 'D#', midi: 63, isBlack: true },
    { name: 'E', midi: 64, isBlack: false },
    { name: 'F', midi: 65, isBlack: false },
    { name: 'F#', midi: 66, isBlack: true },
    { name: 'G', midi: 67, isBlack: false },
    { name: 'G#', midi: 68, isBlack: true },
    { name: 'A', midi: 69, isBlack: false },
    { name: 'A#', midi: 70, isBlack: true },
    { name: 'B', midi: 71, isBlack: false },
    { name: 'C (2x)', midi: 72, isBlack: false }
  ];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.3
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            The 12-Note Chromatic Octave
          </h4>
        </div>
        <span className="text-xs font-mono text-[#1A1A1A] bg-[#F7F3F0] border border-[#E5E1DA] px-3 py-1 rounded-full">
          12 Semitones / Octave
        </span>
      </div>
      <p className="text-xs text-[#4A453E] font-serif leading-relaxed">
        Click any key to audition its frequency. An octave doubles physical oscillation speed (C4 = 261.63 Hz, C5 = 523.25 Hz).
      </p>
      <div className="flex justify-center p-4 bg-[#F7F3F0] rounded-xl border border-[#E5E1DA] overflow-x-auto">
        <div className="flex gap-1 items-end">
          {keys.map((k) => (
            <button
              key={k.midi}
              onClick={() => soundEngine.playNote(k.midi, 0.4, 100, 'triangle')}
              className={`rounded-b-lg font-bold text-xs flex flex-col justify-end p-2 transition-transform active:scale-95 cursor-pointer ${
                k.isBlack
                  ? 'w-8 h-24 bg-[#1A1A1A] text-white -mx-3.5 z-10 border border-[#1A1A1A] shadow-md'
                  : 'w-11 h-36 bg-[#FFFFFF] text-[#1A1A1A] border border-[#E5E1DA] shadow-xs'
              }`}
            >
              <span className="text-[10px] font-mono">{k.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// 2. Scale Lock Explorer (Major vs Minor)
export const ScaleLockExplorer: React.FC = () => {
  const [scaleType, setScaleType] = useState<'major' | 'minor'>('minor');

  const scales = {
    major: {
      name: 'C Major Scale',
      formula: 'W — W — H — W — W — W — H',
      notes: [60, 62, 64, 65, 67, 69, 71, 72],
      mood: 'Triumphant, Bright, Uplifting & Resolved'
    },
    minor: {
      name: 'C Natural Minor',
      formula: 'W — H — W — W — H — W — W',
      notes: [60, 62, 63, 65, 67, 68, 70, 72],
      mood: 'Dark, Moody, Tension-Filled (Hip-Hop/Trap Essential)'
    }
  };

  const current = scales[scaleType];

  const playScale = () => {
    soundEngine.init();
    current.notes.forEach((midi, idx) => {
      setTimeout(() => soundEngine.playNote(midi, 0.35, 100, 'triangle'), idx * 220);
    });
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.4
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Scales as Restricted Harmonic Territory
          </h4>
        </div>
        <div className="flex gap-1 bg-[#F7F3F0] p-1 rounded-xl border border-[#E5E1DA] text-xs">
          <button
            onClick={() => setScaleType('minor')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              scaleType === 'minor' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            Natural Minor
          </button>
          <button
            onClick={() => setScaleType('major')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              scaleType === 'major' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            Major Scale
          </button>
        </div>
      </div>
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-2 font-serif">
        <div className="flex justify-between items-center text-xs font-sans">
          <span className="font-bold text-[#1A1A1A]">{current.name}</span>
          <span className="font-mono text-[#C5A059] font-bold">{current.formula}</span>
        </div>
        <p className="text-xs text-[#4A453E]">
          <strong>Aesthetic Mood:</strong> {current.mood}
        </p>
      </div>
      <button
        onClick={playScale}
        className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#1A1A1A] hover:bg-[#2D2A26] text-white flex items-center gap-2 transition-colors cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" /> Audition 8-Note {current.name} Run
      </button>
    </div>
  );
};

// 3. Chord Triad Builder (Major vs Minor Triad Physics)
export const ChordTriadBuilder: React.FC = () => {
  const [isMinor, setIsMinor] = useState<boolean>(true);

  const playTriad = () => {
    soundEngine.init();
    const thirdMidi = isMinor ? 51 : 52;
    soundEngine.playChord([48, thirdMidi, 55], 1.0, 100);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.5
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Chords as Simultaneous Triads
          </h4>
        </div>
        <button
          onClick={() => setIsMinor(!isMinor)}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#F7F3F0] text-[#1A1A1A] border border-[#E5E1DA] hover:bg-[#E5E1DA] transition-colors cursor-pointer"
        >
          Toggle: {isMinor ? 'C Minor Triad' : 'C Major Triad'}
        </button>
      </div>
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-2 text-xs font-serif">
        <div className="font-mono text-[#1A1A1A] font-bold text-[11px]">
          {isMinor
            ? 'Minor Triad: Root (C3) ──(+3 st)── Minor Third (E♭3) ──(+4 st)── Fifth (G3)'
            : 'Major Triad: Root (C3) ──(+4 st)── Major Third (E3) ──(+3 st)── Fifth (G3)'}
        </div>
        <p className="text-[#4A453E] leading-relaxed">
          Notice how shifting the third by just 1 semitone completely alters the psychological emotion from bright and victorious to introspective and melancholic.
        </p>
      </div>
      <button
        onClick={playTriad}
        className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#1A1A1A] hover:bg-[#2D2A26] text-white flex items-center gap-2 transition-colors cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" /> Play Strummed {isMinor ? 'C Minor' : 'C Major'} Triad
      </button>
    </div>
  );
};

// 4. Velocity Lane Editor (Ghost hits vs Accents)
export const VelocityLaneWidget: React.FC = () => {
  const [velocities, setVelocities] = useState<number[]>([100, 35, 70, 35, 115, 35, 65, 35, 100, 35, 75, 35, 120, 35, 60, 35]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [step, setStep] = useState<number>(-1);
  const timerRef = useRef<number | null>(null);

  const setFlat100 = () => setVelocities(Array(16).fill(100));
  const setGroovePreset = () => setVelocities([115, 30, 65, 30, 120, 30, 70, 30, 115, 30, 65, 30, 125, 30, 70, 30]);

  useEffect(() => {
    if (!isPlaying) {
      setStep(-1);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    soundEngine.init();
    let s = 0;
    const interval = ((60 / 100) * 4 * 1000) / 16;
    timerRef.current = window.setInterval(() => {
      setStep(s);
      soundEngine.playHiHat(undefined, velocities[s]);
      s = (s + 1) % 16;
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, velocities]);

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.7
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Velocity Stalks (1–127 Kinetic Impact)
          </h4>
        </div>
        <div className="flex gap-2">
          <button
            onClick={setFlat100}
            className="px-3 py-1 rounded-lg bg-[#F7F3F0] border border-[#E5E1DA] text-xs font-mono text-[#8B8378] hover:text-[#1A1A1A] transition-colors cursor-pointer"
          >
            Flat 100s (Mechanical)
          </button>
          <button
            onClick={setGroovePreset}
            className="px-3 py-1 rounded-lg bg-[#F7F3F0] text-[#1A1A1A] border border-[#C5A059] text-xs font-mono font-bold hover:bg-[#E5E1DA] transition-colors cursor-pointer"
          >
            Human Stalks
          </button>
        </div>
      </div>
      <div className="h-28 bg-[#F7F3F0] p-3 rounded-xl border border-[#E5E1DA] flex items-end gap-1.5 shadow-inner">
        {velocities.map((vel, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
            <div
              style={{ height: `${(vel / 127) * 100}%` }}
              className={`w-full rounded-t transition-all ${
                step === idx
                  ? 'bg-[#1A1A1A] shadow-md'
                  : vel > 100
                  ? 'bg-[#C5A059]'
                  : vel < 50
                  ? 'bg-[#D8D2C7]'
                  : 'bg-[#8B8378]'
              }`}
            />
            <span className="text-[8px] font-mono text-[#8B8378] mt-1">{vel}</span>
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
        {isPlaying ? 'Stop Hi-Hat Roll' : 'Play Hi-Hats with Velocity Dynamics'}
      </button>
    </div>
  );
};

// 5. Frequency Ranges & 300 Hz Mud Cut
export const FrequencyRangesEQ: React.FC = () => {
  const [mudCutActive, setMudCutActive] = useState<boolean>(true);

  const auditionMudCut = () => {
    soundEngine.init();
    const filter = soundEngine.createParametricEQNode(mudCutActive, 300);
    soundEngine.playTone(300, 0.8, 'sawtooth', 90, filter ?? undefined);
    soundEngine.playTone(150, 0.8, 'sine', 100);
    soundEngine.playTone(1200, 0.8, 'triangle', 80);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-5 font-sans">
      <div className="flex flex-wrap justify-between items-center gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.9
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Parametric EQ & 300 Hz Mud Cut
          </h4>
        </div>
        <button
          onClick={() => setMudCutActive(!mudCutActive)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
            mudCutActive
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-[#991B1B] text-white'
          }`}
        >
          {mudCutActive ? '300 Hz Cut: ACTIVE (-3 dB)' : '300 Hz Cut: OFF (Mud Buildup)'}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
        <div className="p-3 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="block font-bold text-[#1A1A1A]">Sub-Bass</span>
          <span className="text-[10px] font-mono text-[#8B8378]">20–60 Hz</span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="block font-bold text-[#1A1A1A]">Bass</span>
          <span className="text-[10px] font-mono text-[#8B8378]">60–250 Hz</span>
        </div>
        <div className="p-3 rounded-xl bg-[#FFFFFF] border-2 border-[#C5A059] shadow-xs">
          <span className="block font-bold text-[#C5A059]">Mud Zone</span>
          <span className="text-[10px] font-mono text-[#8B8378]">250–500 Hz</span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="block font-bold text-[#1A1A1A]">Vocal Core</span>
          <span className="text-[10px] font-mono text-[#8B8378]">500–2 kHz</span>
        </div>
        <div className="p-3 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="block font-bold text-[#1A1A1A]">Treble/Air</span>
          <span className="text-[10px] font-mono text-[#8B8378]">2–20 kHz</span>
        </div>
      </div>
      <button
        onClick={auditionMudCut}
        className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#1A1A1A] hover:bg-[#2D2A26] text-white flex items-center gap-2 transition-colors cursor-pointer"
      >
        <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" /> Audition Mix with {mudCutActive ? 'Mud Cut' : 'Mud Boost'}
      </button>
    </div>
  );
};
