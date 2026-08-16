import React, { useState, useEffect, useRef } from 'react';
import { Play, Square } from 'lucide-react';
import { soundEngine } from '../../audio/soundEngine';

export const NotesFrequencyWidget: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(110);
  const [waveType, setWaveType] = useState<OscillatorType>('sine');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const getFrequencyCategory = (hz: number) => {
    if (hz <= 60) return { band: 'Sub-Bass (20–60 Hz)', feel: 'Physical chest compression & subwoofer rumble' };
    if (hz <= 250) return { band: 'Bass (60–250 Hz)', feel: 'Warmth, low-end punch & bassline body' };
    if (hz <= 500) return { band: 'Low-Mid Mud Zone (250–500 Hz)', feel: 'Body, boxiness & mix mud buildup' };
    if (hz <= 2000) return { band: 'Midrange Vocal Core (500 Hz–2 kHz)', feel: 'Intelligibility, lead vocals & acoustic presence' };
    if (hz <= 6000) return { band: 'High-Midrange (2–6 kHz)', feel: 'Presence, vocal bite & clarity' };
    return { band: 'Treble / Air (6–20 kHz)', feel: 'Hi-hat sizzle, breath & acoustic shimmer' };
  };

  const category = getFrequencyCategory(frequency);

  const togglePlay = () => {
    soundEngine.init();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    let intervalId: number;
    soundEngine.playTone(frequency, 0.45, waveType, 90);
    intervalId = window.setInterval(() => {
      soundEngine.playTone(frequency, 0.45, waveType, 90);
    }, 400);

    const canvas = canvasRef.current;
    const analyser = soundEngine.getAnalyser();

    if (canvas && analyser) {
      const ctx = canvas.getContext('2d');
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        analyser.getByteTimeDomainData(dataArray);

        if (ctx) {
          ctx.fillStyle = '#1A1A1A';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.lineWidth = 2;
          ctx.strokeStyle = '#C5A059';
          ctx.beginPath();

          const sliceWidth = (canvas.width * 1.0) / bufferLength;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }

          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();
        }

        animFrameRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => {
      clearInterval(intervalId);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, frequency, waveType]);

  return (
    <div id="notes-frequency-widget" className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059]">
            Interactive Drill 2.2
          </span>
          <h4 className="text-xl font-serif font-bold text-[#1A1A1A]">
            Notes Are Frequencies: Physical Hertz & Oscillations
          </h4>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-[#F7F3F0] rounded-xl border border-[#E5E1DA] text-xs">
          {(['sine', 'triangle', 'sawtooth', 'square'] as OscillatorType[]).map((type) => (
            <button
              key={type}
              onClick={() => setWaveType(type)}
              className={`px-3 py-1 rounded-lg capitalize font-semibold transition-all cursor-pointer ${
                waveType === type ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#8B8378] hover:text-[#1A1A1A]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Live Oscilloscope Screen */}
      <div className="relative rounded-xl overflow-hidden border border-[#E5E1DA] bg-[#1A1A1A] p-2 shadow-inner">
        <canvas ref={canvasRef} width={600} height={120} className="w-full h-28 rounded-lg" />
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isPlaying ? 'bg-[#C5A059]' : 'bg-[#8B8378]'}`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-[#C5A059]' : 'bg-[#8B8378]'}`} />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#A69D91]">
            {isPlaying ? 'Live Physical Waveform Output' : 'Oscilloscope Idle'}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 text-xs font-mono font-bold text-[#C5A059] bg-[#2D2A26] px-2.5 py-1 rounded border border-[#4A453E]">
          {frequency} Hz
        </div>
      </div>

      {/* Frequency Slider & Category Card */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-[#8B8378] font-mono">
          <span>20 Hz (Sub-Bass)</span>
          <span className="font-bold text-[#1A1A1A]">{frequency} Hz ({category.band.split(' ')[0]})</span>
          <span>10,000 Hz (Air / Treble)</span>
        </div>
        <input
          id="frequency-hz-slider"
          type="range"
          min="20"
          max="8000"
          step="5"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full h-2 bg-[#E5E1DA] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
        />
      </div>

      {/* Physical Sensation Card */}
      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] space-y-1 font-serif">
        <div className="flex items-center justify-between font-sans">
          <span className="text-xs font-bold text-[#1A1A1A]">{category.band}</span>
          <span className="text-[10px] font-mono text-[#8B8378]">{(1000 / frequency).toFixed(1)}ms per cycle</span>
        </div>
        <p className="text-xs text-[#4A453E]">
          <strong>Physical Sensation:</strong> {category.feel}
        </p>
      </div>

      {/* Quick Preset Jumps */}
      <div className="flex flex-wrap gap-2 text-xs font-sans">
        <span className="text-[#8B8378] self-center text-[11px] font-mono">Presets:</span>
        <button
          onClick={() => setFrequency(40)}
          className="px-2.5 py-1 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] text-[#1A1A1A] border border-[#E5E1DA] font-mono text-[11px] cursor-pointer"
        >
          40 Hz (808 Sub)
        </button>
        <button
          onClick={() => setFrequency(130)}
          className="px-2.5 py-1 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] text-[#1A1A1A] border border-[#E5E1DA] font-mono text-[11px] cursor-pointer"
        >
          130 Hz (C3 Bass)
        </button>
        <button
          onClick={() => setFrequency(300)}
          className="px-2.5 py-1 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] text-[#1A1A1A] border border-[#E5E1DA] font-mono text-[11px] cursor-pointer"
        >
          300 Hz (Mud Zone)
        </button>
        <button
          onClick={() => setFrequency(1000)}
          className="px-2.5 py-1 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] text-[#1A1A1A] border border-[#E5E1DA] font-mono text-[11px] cursor-pointer"
        >
          1 kHz (Vocal Core)
        </button>
        <button
          onClick={() => setFrequency(8000)}
          className="px-2.5 py-1 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] text-[#1A1A1A] border border-[#E5E1DA] font-mono text-[11px] cursor-pointer"
        >
          8 kHz (Hi-Hat Sizzle)
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-1 font-sans">
        <button
          onClick={togglePlay}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
            isPlaying ? 'bg-[#991B1B] text-white' : 'bg-[#1A1A1A] hover:bg-[#2D2A26] text-white'
          }`}
        >
          {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current text-[#C5A059]" />}
          {isPlaying ? 'Stop Tone' : 'Generate Continuous Frequency'}
        </button>

        <span className="text-xs text-[#8B8378] font-serif italic hidden sm:inline">
          Higher frequency = faster wave oscillation.
        </span>
      </div>
    </div>
  );
};
