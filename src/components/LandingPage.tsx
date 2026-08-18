import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Square,
  Activity,
  Grid,
  Terminal,
  BookOpen,
  RotateCcw,
  Volume2,
  VolumeX,
  Sliders,
  Radio,
  Layers,
  Sparkles,
  ChevronRight,
  Headphones,
  Cpu,
  Waves,
  Zap,
  Clock,
  ArrowRight,
  Download
} from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { ModuleId, LessonId } from '../types';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { DownloadMatrixComponent } from './DownloadMatrixComponent';

interface LandingPageProps {
  onEnterCurriculum: (moduleId?: ModuleId, lessonId?: LessonId) => void;
  completedLessonsCount: number;
}

type UrbanVibe = 'boombap' | 'trap' | 'lofi' | 'drill';

interface MidiNoteParticle {
  id: number;
  lane: number;
  pitchName: string;
  midi: number;
  y: number;
  speed: number;
  length: number;
  color: string;
  velocity: number;
  type: 'kick' | 'snare' | 'hihat' | 'bass' | 'chord' | 'lead';
}

interface PadDefinition {
  id: number;
  label: string;
  sub: string;
  midi: number;
  type: 'kick' | 'snare' | 'hihat' | 'bass' | 'chord';
  color: string;
  keyHint: string;
}

interface StemTrack {
  id: string;
  name: string;
  role: string;
  color: string;
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
  meterLevel: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterCurriculum,
  completedLessonsCount
}) => {
  // Split cover state
  const [isCoverOpen, setIsCoverOpen] = useState<boolean>(false);
  const [isCoverDone, setIsCoverDone] = useState<boolean>(false);
  const [seamFlash, setSeamFlash] = useState<boolean>(false);

  // Audio & Master Transport state
  const [isEngineActive, setIsEngineActive] = useState<boolean>(false);
  const [activeVibe, setActiveVibe] = useState<UrbanVibe>('boombap');
  const [bpm, setBpm] = useState<number>(86);
  const [swingPercent, setSwingPercent] = useState<number>(62);
  const [pocketOffsetMs, setPocketOffsetMs] = useState<number>(35); // +35ms drag
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [masterVol, setMasterVol] = useState<number>(80);

  // Interactive UI Tabs / Active elements
  const [activePads, setActivePads] = useState<number[]>([]);
  const [activePedagogyNode, setActivePedagogyNode] = useState<number>(2); // "NAME IT"
  const [activeSyllableDrill, setActiveSyllableDrill] = useState<string>('anapest');
  const [activeSubdivisionTest, setActiveSubdivisionTest] = useState<string>('16th');
  const [activeFreqBand, setActiveFreqBand] = useState<string>('sub');
  const [activeSwingPreset, setActiveSwingPreset] = useState<number>(62);
  const [selectedHexNote, setSelectedHexNote] = useState<{ note: string; midi: number; hex: string; vel: number }>({
    note: 'C3 (Minor 9th Root)',
    midi: 60,
    hex: '0x90 0x3C 0x6E',
    vel: 110
  });

  // Stem Mixer Track States
  const [stems, setStems] = useState<StemTrack[]>([
    { id: 'vox', name: 'VOX / CADENCE', role: 'Syllabic Delivery & Accents', color: '#ff5a1f', volume: 85, isMuted: false, isSolo: false, meterLevel: 0 },
    { id: 'bass', name: '808 SUB BASS', role: '38Hz - 55Hz Pitch Slide', color: '#e0a030', volume: 90, isMuted: false, isSolo: false, meterLevel: 0 },
    { id: 'kick', name: 'KICK PUNCH', role: '90Hz Transient Knocker', color: '#2fd9c4', volume: 85, isMuted: false, isSolo: false, meterLevel: 0 },
    { id: 'snare', name: 'SNARE / CLAP', role: '2.5kHz Crisp Snap', color: '#ece7dd', volume: 80, isMuted: false, isSolo: false, meterLevel: 0 },
    { id: 'hihat', name: 'MPC HI-HATS', role: '16th Swing Micro-Shuffles', color: '#8a888f', volume: 75, isMuted: false, isSolo: false, meterLevel: 0 },
    { id: 'keys', name: 'RHODES KEYS', role: 'Minor 9th Neo-Soul Voicings', color: '#ff5a1f', volume: 80, isMuted: false, isSolo: false, meterLevel: 0 }
  ]);

  const [midiLog, setMidiLog] = useState<string[]>([
    '[SYS_INIT] HARDWIRE GRANULAR MIDI CORE READY',
    '[CLK_SRC] INTERNAL 96 PPQN HARMONIC MATRIX LOCKED',
    '[STATUS] AWAITING MASTER TRANSPORT ENGAGE'
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const particlesRef = useRef<MidiNoteParticle[]>([]);
  const nextParticleId = useRef<number>(1);

  const VIBES_CONFIG: Record<
    UrbanVibe,
    {
      title: string;
      bpm: number;
      swing: number;
      dragMs: number;
      tagline: string;
      accentColor: string;
      desc: string;
      subdivisionStyle: string;
    }
  > = {
    boombap: {
      title: '90s Boom-Bap Grid',
      bpm: 86,
      swing: 62,
      dragMs: 40,
      tagline: 'Heavy MPC 3000 swing, snappy vinyl snares, low-pass Rhodes chords.',
      accentColor: '#ff5a1f',
      desc: 'The unshakeable backbone of classic hip-hop. Pocket drag +40ms behind the grid line with lazy unquantized snare drag.',
      subdivisionStyle: 'Heavy 16th swing with delayed snare ghost hits'
    },
    trap: {
      title: 'Atlanta 808 Slide',
      bpm: 140,
      swing: 50,
      dragMs: 0,
      tagline: 'Half-time punch, rolling 32nd-note hi-hats, distorted 808 sub glides.',
      accentColor: '#2fd9c4',
      desc: '140 BPM mathematical clock with spacious half-time snare placement strictly on beat 3 and high-speed triplet bursts.',
      subdivisionStyle: 'Straight 16th base with 1/8T triplet and 1/32 hi-hat rolls'
    },
    lofi: {
      title: 'Late Night Lo-Fi Soul',
      bpm: 76,
      swing: 68,
      dragMs: 48,
      tagline: 'Fluttering tape saturation, minor 9th chords, lazy unquantized bounce.',
      accentColor: '#e0a030',
      desc: 'Relaxed introspective groove built on microtiming humanization, vinyl surface crackle, and rootless jazz harmony.',
      subdivisionStyle: 'Extreme 68% swing with soft velocity ghost tapers'
    },
    drill: {
      title: 'UK / NY Drill Bounce',
      bpm: 142,
      swing: 54,
      dragMs: -12,
      tagline: 'Sliding 808 pitch ramps, anticipated offbeat snares (hits on 3 & 8).',
      accentColor: '#ff5a1f',
      desc: 'Aggressive syncopation that skips the downbeat and attacks the offbeat sixteenths with sliding pitch envelopes.',
      subdivisionStyle: 'Syncopated 3rd & 8th sixteenth accents with pitch glides'
    }
  };

  const currentVibeConfig = VIBES_CONFIG[activeVibe];

  // MPC 16-Pad Grid Mapping
  const MPC_PADS: PadDefinition[] = [
    { id: 0, label: '808 SUB', sub: 'C1 (36Hz Sine)', midi: 36, type: 'bass', color: '#ff5a1f', keyHint: '1' },
    { id: 1, label: '808 GLIDE', sub: 'D1 (45Hz Saw)', midi: 38, type: 'bass', color: '#ff5a1f', keyHint: '2' },
    { id: 2, label: 'KICK PUNCH', sub: 'C1 (90Hz Thump)', midi: 36, type: 'kick', color: '#2fd9c4', keyHint: '3' },
    { id: 3, label: 'KICK BOUNCE', sub: 'B0 (60Hz Low)', midi: 35, type: 'kick', color: '#2fd9c4', keyHint: '4' },

    { id: 4, label: 'FAT SNARE', sub: 'D2 (190Hz Tone)', midi: 38, type: 'snare', color: '#ece7dd', keyHint: 'Q' },
    { id: 5, label: 'RIMSHOT', sub: 'C#2 (260Hz Snap)', midi: 37, type: 'snare', color: '#ece7dd', keyHint: 'W' },
    { id: 6, label: 'CLAP STACK', sub: 'D#2 (Layered)', midi: 39, type: 'snare', color: '#ece7dd', keyHint: 'E' },
    { id: 7, label: 'GHOST SNAP', sub: 'E2 (Low Vel)', midi: 40, type: 'snare', color: '#ece7dd', keyHint: 'R' },

    { id: 8, label: 'TIGHT HAT', sub: 'F#2 (8kHz Band)', midi: 42, type: 'hihat', color: '#8a888f', keyHint: 'A' },
    { id: 9, label: 'OPEN HAT', sub: 'A#2 (Sustain)', midi: 46, type: 'hihat', color: '#8a888f', keyHint: 'S' },
    { id: 10, label: 'TRIPLET HAT', sub: 'F#2 (1/8T Roll)', midi: 42, type: 'hihat', color: '#8a888f', keyHint: 'D' },
    { id: 11, label: 'PERC SHAKER', sub: 'F2 (Vinyl Wood)', midi: 41, type: 'hihat', color: '#8a888f', keyHint: 'F' },

    { id: 12, label: 'C MINOR 9', sub: 'C3/Eb3/G3/Bb3', midi: 60, type: 'chord', color: '#ff5a1f', keyHint: 'Z' },
    { id: 13, label: 'F MINOR 7', sub: 'F3/Ab3/C4/Eb4', midi: 65, type: 'chord', color: '#2fd9c4', keyHint: 'X' },
    { id: 14, label: 'G DOM 7b9', sub: 'G3/B3/D4/F4', midi: 67, type: 'chord', color: '#ff5a1f', keyHint: 'C' },
    { id: 15, label: 'VOCAL CHOP', sub: 'VOX ("YEAH")', midi: 88, type: 'chord', color: '#ece7dd', keyHint: 'V' }
  ];

  const logMidiEvent = (msg: string) => {
    setMidiLog((prev) => [msg, ...prev.slice(0, 8)]);
  };

  // Open Cover Handler (Split Curtain)
  const openCover = () => {
    if (isCoverOpen) return;
    soundEngine.init();
    setSeamFlash(true);
    setIsCoverOpen(true);

    soundEngine.playKick(undefined, 125, true);
    soundEngine.playChord([48, 55, 60, 67], 1.2, 105);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reduced ? 400 : 850;

    setTimeout(() => {
      setIsCoverDone(true);
      const contentEl = document.getElementById('content');
      if (contentEl) {
        contentEl.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    }, delay);
  };

  const closeCover = () => {
    setIsCoverDone(false);
    setTimeout(() => {
      setIsCoverOpen(false);
      setSeamFlash(false);
    }, 50);
  };

  // Trigger Pad Hit with Stem Level Updates
  const triggerPadHit = (pad: PadDefinition, velocity: number = 110, isAuto: boolean = false) => {
    soundEngine.init();

    setActivePads((prev) => [...prev, pad.id]);
    setTimeout(() => {
      setActivePads((prev) => prev.filter((id) => id !== pad.id));
    }, 120);

    spawnMidiParticle(pad.id % 8, pad.label, pad.midi, pad.type, pad.color, velocity);

    const hexStatus = '0x90';
    const hexNote = '0x' + pad.midi.toString(16).toUpperCase().padStart(2, '0');
    const hexVel = '0x' + velocity.toString(16).toUpperCase().padStart(2, '0');
    setSelectedHexNote({
      note: pad.label,
      midi: pad.midi,
      hex: `${hexStatus} ${hexNote} ${hexVel}`,
      vel: velocity
    });

    logMidiEvent(`[MIDI_IN] ${hexStatus} ${hexNote} ${hexVel} ── ${pad.label} (Vel:${velocity})`);

    // Check if stem is muted or soloed
    const hasSolo = stems.some((s) => s.isSolo);
    const stemType =
      pad.type === 'kick' ? 'kick' :
      pad.type === 'snare' ? 'snare' :
      pad.type === 'hihat' ? 'hihat' :
      pad.type === 'bass' ? 'bass' : 'keys';

    const targetStem = stems.find((s) => s.id === stemType);
    if (targetStem) {
      if (targetStem.isMuted || (hasSolo && !targetStem.isSolo)) {
        return;
      }
    }

    const effectiveVel = targetStem ? Math.round((velocity * targetStem.volume) / 100) : velocity;

    if (pad.type === 'kick') {
      soundEngine.playKick(undefined, effectiveVel, true);
    } else if (pad.type === 'snare') {
      soundEngine.playSnare(undefined, effectiveVel, pad.id === 5 ? 260 : 190);
    } else if (pad.type === 'hihat') {
      soundEngine.playHiHat(undefined, effectiveVel, pad.id === 9);
    } else if (pad.type === 'bass') {
      soundEngine.playBassNote(pad.id === 0 ? 45 : 55, 0.6, effectiveVel);
    } else if (pad.type === 'chord') {
      if (pad.id === 12) soundEngine.playChord([48, 51, 55, 58], 0.7, effectiveVel);
      else if (pad.id === 13) soundEngine.playChord([53, 56, 60, 63], 0.7, effectiveVel);
      else if (pad.id === 14) soundEngine.playChord([55, 59, 62, 65], 0.7, effectiveVel);
      else {
        soundEngine.playTone(440, 0.25, 'sawtooth', effectiveVel);
        soundEngine.speakCadenceWord('YEAH', true);
      }
    }
  };

  const spawnMidiParticle = (
    lane: number,
    pitchName: string,
    midi: number,
    type: MidiNoteParticle['type'],
    color: string,
    velocity: number
  ) => {
    particlesRef.current.push({
      id: nextParticleId.current++,
      lane,
      pitchName,
      midi,
      y: 0,
      speed: 3 + (velocity / 127) * 3.8,
      length: 26 + (velocity / 127) * 26,
      color,
      velocity,
      type
    });
  };

  const handleSelectVibe = (vibe: UrbanVibe) => {
    setActiveVibe(vibe);
    setBpm(VIBES_CONFIG[vibe].bpm);
    setSwingPercent(VIBES_CONFIG[vibe].swing);
    setPocketOffsetMs(VIBES_CONFIG[vibe].dragMs);
    logMidiEvent(`[CLOCK_CHG] TEMPO SET TO ${VIBES_CONFIG[vibe].bpm} BPM (${vibe.toUpperCase()})`);
  };

  const handleToggleEngine = () => {
    soundEngine.init();
    if (!isEngineActive) {
      setIsEngineActive(true);
      logMidiEvent('[CORE_START] URBAN MIDI ENGINE ONLINE & STREAMING');
      soundEngine.playKick(undefined, 120, true);
      soundEngine.playChord([48, 55, 60, 67], 1.2, 100);
    } else {
      setIsEngineActive(false);
      logMidiEvent('[CORE_STOP] ENGINE PAUSED');
    }
  };

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleMasterVol = (v: number) => {
    setMasterVol(v);
    soundEngine.setMasterVolume(v / 100);
  };

  const toggleStemMute = (stemId: string) => {
    setStems((prev) =>
      prev.map((s) => (s.id === stemId ? { ...s, isMuted: !s.isMuted } : s))
    );
  };

  const toggleStemSolo = (stemId: string) => {
    setStems((prev) =>
      prev.map((s) => (s.id === stemId ? { ...s, isSolo: !s.isSolo } : s))
    );
  };

  const setStemVolume = (stemId: string, vol: number) => {
    setStems((prev) =>
      prev.map((s) => (s.id === stemId ? { ...s, volume: vol } : s))
    );
  };

  // Keyboard shortcut listener for cover & MPC pads
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCoverOpen && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        openCover();
        return;
      }

      const pad = MPC_PADS.find((p) => p.keyHint.toLowerCase() === e.key.toLowerCase());
      if (pad && isCoverOpen) {
        triggerPadHit(pad, 120);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCoverOpen, stems]);

  // Main 16-Step Sequencer Loop for Urban Vibes with Dynamic Swing and Drag
  useEffect(() => {
    if (!isEngineActive) {
      setCurrentStep(0);
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const currentBpm = bpm;
    const baseStepMs = ((60 / currentBpm) * 4 * 1000) / 16;
    let step = 0;

    const playSequencerStep = (s: number) => {
      setCurrentStep(s);

      // Calculate swing offset on even steps
      const isEvenStep = s % 2 === 1;
      const swingDelayMs = isEvenStep ? ((swingPercent - 50) / 50) * (baseStepMs * 0.45) : 0;
      const effectiveDelay = Math.max(0, swingDelayMs + (s % 4 === 2 ? pocketOffsetMs * 0.5 : 0));

      setTimeout(() => {
        if (activeVibe === 'boombap') {
          if (s === 0 || s === 7 || s === 10) triggerPadHit(MPC_PADS[2], s === 0 ? 126 : 100, true);
          if (s === 4 || s === 12) triggerPadHit(MPC_PADS[4], 122, true);
          if (s % 2 === 0 || s % 3 === 0) triggerPadHit(MPC_PADS[8], s % 4 === 0 ? 95 : 55, true);
          if (s === 0) triggerPadHit(MPC_PADS[12], 85, true);
          if (s === 8) triggerPadHit(MPC_PADS[13], 85, true);
        } else if (activeVibe === 'trap') {
          if (s === 0 || s === 6 || s === 11) triggerPadHit(MPC_PADS[0], 127, true);
          if (s === 8) triggerPadHit(MPC_PADS[6], 125, true);
          if (s % 1 === 0) triggerPadHit(MPC_PADS[8], s % 4 === 0 ? 110 : 60, true);
          if (s === 12 || s === 14) triggerPadHit(MPC_PADS[10], 85, true);
          if (s === 4) triggerPadHit(MPC_PADS[1], 115, true);
        } else if (activeVibe === 'lofi') {
          if (s === 0 || s === 9) triggerPadHit(MPC_PADS[3], 95, true);
          if (s === 4 || s === 12) triggerPadHit(MPC_PADS[5], 90, true);
          if (s % 2 === 0) triggerPadHit(MPC_PADS[8], 45, true);
          if (s === 0) triggerPadHit(MPC_PADS[12], 80, true);
          if (s === 6) triggerPadHit(MPC_PADS[14], 80, true);
        } else if (activeVibe === 'drill') {
          if (s === 0 || s === 10) triggerPadHit(MPC_PADS[0], 127, true);
          if (s === 3 || s === 8 || s === 14) triggerPadHit(MPC_PADS[4], 120, true);
          if (s % 2 === 0) triggerPadHit(MPC_PADS[8], 80, true);
          if (s === 6) triggerPadHit(MPC_PADS[1], 120, true);
        }
      }, effectiveDelay);
    };

    playSequencerStep(0);
    timerRef.current = window.setInterval(() => {
      step = (step + 1) % 16;
      playSequencerStep(step);
    }, baseStepMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isEngineActive, activeVibe, bpm, swingPercent, pocketOffsetMs, stems]);

  // Canvas MIDI Animation Loop: Waterfall Piano Roll + Cityscape VU Equalizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 320);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 320;
      }
    };
    window.addEventListener('resize', handleResize);

    const lanesCount = 8;
    const laneWidth = width / lanesCount;

    const buildings = [
      { xRatio: 0.03, wRatio: 0.11, hRatio: 0.45, windows: 4 },
      { xRatio: 0.16, wRatio: 0.12, hRatio: 0.65, windows: 6 },
      { xRatio: 0.30, wRatio: 0.13, hRatio: 0.38, windows: 3 },
      { xRatio: 0.45, wRatio: 0.15, hRatio: 0.78, windows: 8 },
      { xRatio: 0.62, wRatio: 0.11, hRatio: 0.52, windows: 5 },
      { xRatio: 0.75, wRatio: 0.14, hRatio: 0.88, windows: 9 },
      { xRatio: 0.90, wRatio: 0.08, hRatio: 0.42, windows: 4 }
    ];

    const render = () => {
      ctx.fillStyle = '#0a0a0b';
      ctx.fillRect(0, 0, width, height);

      // Grid vertical lanes
      ctx.strokeStyle = '#232327';
      ctx.lineWidth = 1;
      for (let i = 1; i < lanesCount; i++) {
        const x = i * laneWidth;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal subtle measure bars
      ctx.strokeStyle = '#18181c';
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Urban Skyline Backdrop
      buildings.forEach((b, idx) => {
        const bx = b.xRatio * width;
        const bw = b.wRatio * width;
        const bh = b.hRatio * (height * 0.52);
        const by = height - bh;

        ctx.fillStyle = '#131316';
        ctx.fillRect(bx, by, bw, bh);

        ctx.strokeStyle = '#37373d';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + bw / 2, by);
        ctx.lineTo(bx + bw / 2, by - 16);
        ctx.stroke();

        if (isEngineActive && idx % 2 === currentStep % 2) {
          ctx.fillStyle = '#ff5a1f';
          ctx.beginPath();
          ctx.arc(bx + bw / 2, by - 16, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        const winCols = 2;
        const winRows = b.windows;
        for (let r = 0; r < winRows; r++) {
          for (let c = 0; c < winCols; c++) {
            const wx = bx + 6 + c * ((bw - 16) / winCols);
            const wy = by + 10 + r * 13;
            const isLit = (idx + r + c + currentStep) % 3 === 0;

            ctx.fillStyle = isEngineActive && isLit ? '#ff5a1f' : '#232327';
            ctx.fillRect(wx, wy, 4, 5);
          }
        }
      });

      // Falling MIDI Note Blocks
      const activeParticles = particlesRef.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.y += p.speed;

        const px = p.lane * laneWidth + 4;
        const pw = laneWidth - 8;

        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.roundRect(px, p.y, pw, p.length, 3);
        ctx.fill();

        ctx.fillStyle = '#0a0a0b';
        ctx.font = 'bold 9px "JetBrains Mono", monospace';
        ctx.fillText(p.pitchName, px + 3, p.y + 13);
        ctx.restore();

        if (p.y + p.length >= height - 20) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px + pw / 2, height - 15, 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        if (p.y > height) {
          activeParticles.splice(i, 1);
        }
      }

      // Bottom Hit Zone Line
      ctx.strokeStyle = isEngineActive ? '#ff5a1f' : '#37373d';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, height - 15);
      ctx.lineTo(width, height - 15);
      ctx.stroke();

      if (isEngineActive) {
        ctx.fillStyle = 'rgba(255, 90, 31, 0.18)';
        ctx.fillRect(0, height - 18, width, 6);
      }

      // Step Playhead Bar
      if (isEngineActive) {
        const playheadX = (currentStep / 16) * width;
        ctx.strokeStyle = '#ece7dd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(playheadX, 0);
        ctx.lineTo(playheadX, height);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isEngineActive, currentStep]);

  // Spectrum Visualizer
  useEffect(() => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const analyser = soundEngine.getAnalyser();

    const drawSpectrum = () => {
      animId = requestAnimationFrame(drawSpectrum);
      const w = (canvas.width = canvas.parentElement?.clientWidth || 300);
      const h = (canvas.height = 70);

      ctx.fillStyle = '#0a0a0b';
      ctx.fillRect(0, 0, w, h);

      if (!analyser || !isEngineActive) {
        ctx.strokeStyle = '#232327';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = (w / bufferLength) * 2.2;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * (h - 6);
        const hue = i < 8 ? '#ff5a1f' : i < 32 ? '#2fd9c4' : '#ece7dd';

        ctx.fillStyle = hue;
        ctx.fillRect(x, h - barHeight, barWidth - 1, barHeight);
        x += barWidth;
      }
    };

    drawSpectrum();
    return () => cancelAnimationFrame(animId);
  }, [isEngineActive]);

  // Audition Pedagogical Loop Nodes
  const auditionLoopNode = (idx: number, name: string) => {
    soundEngine.init();
    setActivePedagogyNode(idx);
    if (idx === 0) soundEngine.playChord([48, 55, 60, 67], 0.8, 110);
    if (idx === 1) soundEngine.playBassNote(45, 0.5, 120);
    if (idx === 2) soundEngine.speakCadenceWord('BOOM', true);
    if (idx === 3) soundEngine.playHiHat(undefined, 100);
    if (idx === 4) {
      soundEngine.playKick(undefined, 125, true);
      soundEngine.playSnare(undefined, 120);
    }
  };

  // Audition Syllabic Meter
  const auditionSyllableMeter = (type: string) => {
    soundEngine.init();
    setActiveSyllableDrill(type);
    if (type === 'anapest') {
      soundEngine.playCadenceSyllables(
        [
          { text: 'In', offsetMs: 0, stress: false },
          { text: 'the', offsetMs: 160, stress: false },
          { text: 'POCKET', offsetMs: 320, stress: true }
        ],
        86
      );
    } else if (type === 'dactyl') {
      soundEngine.playCadenceSyllables(
        [
          { text: 'HIT', offsetMs: 0, stress: true },
          { text: 'with', offsetMs: 160, stress: false },
          { text: 'the', offsetMs: 320, stress: false }
        ],
        86
      );
    } else if (type === 'hemiola') {
      soundEngine.playCadenceSyllables(
        [
          { text: 'ONE', offsetMs: 0, stress: true },
          { text: 'two', offsetMs: 180, stress: false },
          { text: 'THREE', offsetMs: 360, stress: true },
          { text: 'four', offsetMs: 540, stress: false },
          { text: 'FIVE', offsetMs: 720, stress: true }
        ],
        86
      );
    }
  };

  // Audition Subdivision
  const auditionSubdivision = (sub: string) => {
    soundEngine.init();
    setActiveSubdivisionTest(sub);
    const now = soundEngine.getCurrentTime();
    if (sub === 'quarter') {
      for (let i = 0; i < 4; i++) {
        soundEngine.playKick(now + i * 0.7, 110, true);
        soundEngine.playHiHat(now + i * 0.7, 90);
      }
    } else if (sub === '8th') {
      for (let i = 0; i < 8; i++) {
        soundEngine.playHiHat(now + i * 0.35, i % 2 === 0 ? 105 : 65);
        if (i % 2 === 0) soundEngine.playKick(now + i * 0.35, 100, true);
      }
    } else if (sub === '16th') {
      for (let i = 0; i < 16; i++) {
        soundEngine.playHiHat(now + i * 0.175, i % 4 === 0 ? 115 : 55);
        if (i === 0 || i === 8) soundEngine.playKick(now + i * 0.175, 110, true);
        if (i === 4 || i === 12) soundEngine.playSnare(now + i * 0.175, 110);
      }
    } else if (sub === 'triplet') {
      for (let i = 0; i < 12; i++) {
        soundEngine.playHiHat(now + i * 0.233, i % 3 === 0 ? 120 : 60);
      }
    }
  };

  // Audition Frequency Band
  const auditionFreqBand = (band: string) => {
    soundEngine.init();
    setActiveFreqBand(band);
    if (band === 'sub') soundEngine.playBassNote(40, 0.9, 125);
    if (band === 'bass') soundEngine.playKick(undefined, 120, false);
    if (band === 'mud') soundEngine.playTone(320, 0.6, 'sawtooth', 110);
    if (band === 'warmth') soundEngine.playChord([55, 59, 62], 0.7, 100);
    if (band === 'snap') soundEngine.playSnare(undefined, 125, 260);
    if (band === 'air') soundEngine.playHiHat(undefined, 120, true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#ece7dd] font-work selection:bg-[#ff5a1f] selection:text-[#0a0a0b] relative overflow-x-hidden">
      {/* Transient Seam Flash Line */}
      <div id="seam" className={seamFlash ? 'flash' : ''} />

      {/* ========================================================================= */}
      {/* COVER (EXACT HTML & CSS STRUCTURE) */}
      {/* ========================================================================= */}
      <div
        id="cover"
        className={`grid-bg ${isCoverOpen ? 'open' : ''} ${isCoverDone ? 'done' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Open the Hardwire Method"
        onClick={openCover}
      >
        <div className="panel top grid-bg">
          <div className="panel-inner">
            <div className="cover-meta meta-bpm">BPM 86 &middot; 4/4</div>
            <div className="cover-meta meta-track">
              MODULE 01–03<br />THE HARDWIRE METHOD
            </div>
            <div className="cover-title">
              MUSIC THEORY<br />
              <span className="line2">FOR THE STREETS</span>
            </div>
          </div>
        </div>
        <div className="panel bottom grid-bg">
          <div className="panel-inner">
            <div className="cover-sub">Feel &rarr; Map &rarr; Control</div>
            <div className="cover-meta meta-tap">
              <span className="cursor"></span>click anywhere to open
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TOP COMPANION BAR (Deep-Link, Transport & Audio Master) */}
      {/* ========================================================================= */}
      <header className="border-b border-[#232327] bg-[#0a0a0b]/95 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#ff5a1f] text-[#0a0a0b] flex items-center justify-center font-shoulders font-black text-lg shadow-sm">
            HW
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#ff5a1f] block leading-none">
              THE HARDWIRE METHOD
            </span>
            <span className="text-xs font-mono text-[#8a888f]">Music Theory for the Streets</span>
          </div>
        </div>

        {/* Global Master Audio Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded bg-[#131316] border border-[#232327] text-xs font-mono">
            <button
              onClick={handleToggleMute}
              className="text-[#8a888f] hover:text-[#ece7dd] transition-colors"
              title="Toggle Audio Engine Mute"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#ff5a1f]" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={masterVol}
              onChange={(e) => handleMasterVol(Number(e.target.value))}
              className="w-16 h-1 bg-[#232327] accent-[#ff5a1f] cursor-pointer"
            />
            <span className="text-[10px] text-[#8a888f] w-7 text-right">{masterVol}%</span>
          </div>

          <a
            href="/THE_HARDWIRE_METHOD_TEXTBOOK.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#131316] hover:bg-[#232327] border border-[#0D9488]/40 text-xs font-mono text-[#2FD9C4] transition-colors"
            title="Open Standalone HTML eBook"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">HTML eBook</span>
          </a>

          <button
            onClick={closeCover}
            className="px-2.5 py-1.5 rounded bg-[#131316] hover:bg-[#232327] border border-[#37373d] text-xs font-mono text-[#8a888f] hover:text-[#ece7dd] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Show Cover Curtain"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cover</span>
          </button>

          <button
            onClick={() => onEnterCurriculum('module-1', 'm1-l1')}
            className="px-4 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-[#ff5a1f] hover:bg-[#ff723f] text-[#0a0a0b] flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Enter Textbook</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN EXPANDED CONTENT (EXACT HARDWIRE ARCHITECTURE) */}
      {/* ========================================================================= */}
      <main id="content" className="landing-main">
        {/* HERO SECTION */}
        <section>
          <p className="eyebrow">The Hardwire Method</p>
          <h1 className="hero-h1">You already got the ear. This gives it a name.</h1>
          <p className="hero-lede">
            No sheet music. No gatekeeping. This curriculum starts with what you already
            know — your voice, your timing, your instinct for when a beat hits right —
            and builds the technical vocabulary underneath it.{' '}
            <strong>Feel it first. Name it second. Control it third.</strong>
          </p>
        </section>

        {/* ======================================================================= */}
        {/* INTERACTIVE MULTI-TRACK URBAN STEM WORKBENCH */}
        {/* ======================================================================= */}
        <section className="mt-12 rounded-2xl bg-[#131316] border border-[#37373d] p-5 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Header Control Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#232327] pb-4">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleToggleEngine}
                className={`px-5 py-2 rounded font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                  isEngineActive
                    ? 'bg-[#ff5a1f] hover:bg-[#ff723f] text-[#0a0a0b]'
                    : 'bg-[#232327] hover:bg-[#37373d] text-[#ece7dd]'
                }`}
              >
                {isEngineActive ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Halt MIDI Stream</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-[#ff5a1f]" />
                    <span>Play MIDI Stream</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 font-mono text-xs text-[#8a888f] bg-[#0a0a0b] px-3 py-1.5 rounded border border-[#232327]">
                <Activity className="w-3.5 h-3.5 text-[#ff5a1f]" />
                <span>{bpm} BPM</span>
                <span className="opacity-40">|</span>
                <span>SWING: {swingPercent}%</span>
                <span className="opacity-40">|</span>
                <span className={pocketOffsetMs > 0 ? 'text-[#ff5a1f]' : pocketOffsetMs < 0 ? 'text-[#2fd9c4]' : ''}>
                  DRAG: {pocketOffsetMs > 0 ? `+${pocketOffsetMs}` : pocketOffsetMs}ms
                </span>
              </div>
            </div>

            {/* Vibe Presets */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0a0a0b] rounded border border-[#232327] text-xs font-mono">
              {(['boombap', 'trap', 'lofi', 'drill'] as UrbanVibe[]).map((vibe) => (
                <button
                  key={vibe}
                  onClick={() => handleSelectVibe(vibe)}
                  className={`px-3 py-1 rounded capitalize font-bold transition-all cursor-pointer ${
                    activeVibe === vibe
                      ? 'bg-[#ff5a1f] text-[#0a0a0b]'
                      : 'text-[#8a888f] hover:text-[#ece7dd]'
                  }`}
                >
                  {vibe === 'boombap' ? 'Boom-Bap' : vibe === 'lofi' ? 'Lo-Fi' : vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Spectrum & Waterfall Canvas Container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Waterfall Canvas */}
            <div
              onClick={!isEngineActive ? handleToggleEngine : undefined}
              className="lg:col-span-3 relative rounded-xl overflow-hidden border border-[#232327] bg-[#0a0a0b] shadow-inner cursor-pointer group"
            >
              <canvas ref={canvasRef} className="w-full h-60 sm:h-68 block" />

              {!isEngineActive && (
                <div className="absolute inset-0 bg-[#0a0a0b]/85 flex flex-col items-center justify-center p-6 text-center space-y-2 group-hover:bg-[#0a0a0b]/75 transition-all">
                  <div className="w-14 h-14 rounded-full bg-[#ff5a1f] text-[#0a0a0b] flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <h3 className="font-shoulders font-bold text-2xl text-[#ece7dd] tracking-tight">
                    Click to Engage Urban MIDI Waterfall Engine
                  </h3>
                  <p className="text-xs font-mono text-[#8a888f] max-w-sm">
                    Cascading MIDI streams, reactive skyline visualizers & authentic street drum synthesis.
                  </p>
                </div>
              )}
            </div>

            {/* Live FFT Spectrum & Real-Time Hex Bytecode Monitor */}
            <div className="lg:col-span-1 flex flex-col justify-between gap-3 p-3.5 rounded-xl bg-[#0a0a0b] border border-[#232327]">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8a888f] mb-1.5">
                  <span className="flex items-center gap-1">
                    <Waves className="w-3.5 h-3.5 text-[#2fd9c4]" /> FFT SPECTRUM
                  </span>
                  <span className="text-[#ff5a1f] text-[9px] uppercase font-bold">20Hz - 20kHz</span>
                </div>
                <div className="rounded overflow-hidden border border-[#1a1a1f] bg-[#070708]">
                  <canvas ref={spectrumCanvasRef} className="w-full h-16 block" />
                </div>
              </div>

              {/* Decoded Bytecode Inspector */}
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="text-[#8a888f] flex items-center justify-between border-b border-[#1a1a1f] pb-1">
                  <span>LAST MIDI PACKET</span>
                  <span className="text-[#2fd9c4]">{selectedHexNote.note}</span>
                </div>
                <div className="p-2 rounded bg-[#131316] border border-[#232327] text-[#ece7dd] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8a888f]">HEX:</span>
                    <span className="text-[#ff5a1f] font-bold">{selectedHexNote.hex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a888f]">MIDI NOTE:</span>
                    <span>{selectedHexNote.midi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a888f]">VELOCITY:</span>
                    <span className="text-[#2fd9c4]">{selectedHexNote.vel} / 127</span>
                  </div>
                </div>
              </div>

              {/* Microtiming Fine Drag Adjuster */}
              <div className="space-y-1 font-mono text-[10px]">
                <div className="flex justify-between text-[#8a888f]">
                  <span>POCKET OFFSET:</span>
                  <span className="text-[#ff5a1f] font-bold">{pocketOffsetMs} ms</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="60"
                  value={pocketOffsetMs}
                  onChange={(e) => setPocketOffsetMs(Number(e.target.value))}
                  className="w-full h-1 bg-[#232327] accent-[#ff5a1f] cursor-pointer"
                />
                <div className="flex justify-between text-[8px] text-[#8a888f]">
                  <span>-50ms (Rush)</span>
                  <span>0ms (Grid)</span>
                  <span>+60ms (Drag)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6-Track Stem Console (Mute / Solo / Faders) */}
          <div className="p-3.5 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#ece7dd] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#ff5a1f]" /> 6-Track Stem Console (Live Multi-Bus)
              </span>
              <span className="text-[10px] text-[#8a888f]">Independent Stem Isolation & Level Automation</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {stems.map((stem) => (
                <div
                  key={stem.id}
                  className={`p-2.5 rounded border transition-all text-xs font-mono flex flex-col justify-between ${
                    stem.isMuted
                      ? 'bg-[#131316]/50 border-[#232327] opacity-60'
                      : stem.isSolo
                      ? 'bg-[#1a1412] border-[#ff5a1f] shadow-sm'
                      : 'bg-[#131316] border-[#232327]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[10px] truncate" style={{ color: stem.color }}>
                      {stem.name}
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: stem.isMuted ? '#8a888f' : stem.color }}
                    />
                  </div>

                  <div className="flex items-center gap-1 my-2">
                    <button
                      onClick={() => toggleStemMute(stem.id)}
                      className={`flex-1 py-0.5 rounded text-[9px] font-bold uppercase transition-colors ${
                        stem.isMuted ? 'bg-[#ff5a1f] text-[#0a0a0b]' : 'bg-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                      }`}
                    >
                      M
                    </button>
                    <button
                      onClick={() => toggleStemSolo(stem.id)}
                      className={`flex-1 py-0.5 rounded text-[9px] font-bold uppercase transition-colors ${
                        stem.isSolo ? 'bg-[#2fd9c4] text-[#0a0a0b]' : 'bg-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                      }`}
                    >
                      S
                    </button>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[8px] text-[#8a888f]">
                      <span>VOL</span>
                      <span>{stem.volume}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stem.volume}
                      disabled={stem.isMuted}
                      onChange={(e) => setStemVolume(stem.id, Number(e.target.value))}
                      className="w-full h-1 bg-[#232327] accent-[#ff5a1f] cursor-pointer disabled:opacity-30"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 16 MPC Rubber Pads */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#ece7dd] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Grid className="w-3.5 h-3.5 text-[#ff5a1f]" /> MPC 4x4 Velocity Rubber Pads (Interactive)
              </span>
              <span className="text-[10px] text-[#8a888f]">Press hotkeys or tap pads</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {MPC_PADS.map((pad) => {
                const isLit = activePads.includes(pad.id);
                return (
                  <button
                    key={pad.id}
                    onClick={() => triggerPadHit(pad, 120)}
                    className={`h-14 rounded p-1.5 flex flex-col items-center justify-between border transition-all text-center cursor-pointer select-none active:scale-95 ${
                      isLit
                        ? 'bg-[#ece7dd] text-[#0a0a0b] border-[#ece7dd] scale-105 font-bold shadow-lg'
                        : 'bg-[#0a0a0b] hover:bg-[#1a1a1f] border-[#232327] text-[#ece7dd]'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[8px] font-mono opacity-60">
                      <span>{pad.keyHint}</span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pad.color }} />
                    </div>
                    <span className="text-[9px] font-mono font-bold leading-tight truncate w-full">
                      {pad.label}
                    </span>
                    <span className="text-[7px] font-mono opacity-50 uppercase truncate w-full">
                      {pad.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live MIDI Byte stream log */}
          <div className="p-3 rounded bg-[#0a0a0b] border border-[#232327] flex items-center justify-between text-[10px] font-mono text-[#8a888f]">
            <span className="flex items-center gap-1.5 truncate">
              <Terminal className="w-3 h-3 text-[#ff5a1f] shrink-0" /> {midiLog[0]}
            </span>
            <span className="text-[#ff5a1f] shrink-0 font-bold ml-2">
              {currentVibeConfig.title} &bull; {bpm} BPM
            </span>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* THE PEDAGOGICAL LOOP */}
        {/* ======================================================================= */}
        <section className="loop">
          <p className="loop-label">The pedagogical loop</p>
          <div className="loop-track">
            <div
              className={`loop-node ${activePedagogyNode === 0 ? 'hot' : ''}`}
              onClick={() => auditionLoopNode(0, 'HEAR IT')}
            >
              HEAR IT
            </div>
            <span className="loop-arrow">&rarr;</span>
            <div
              className={`loop-node ${activePedagogyNode === 1 ? 'hot' : ''}`}
              onClick={() => auditionLoopNode(1, 'FEEL IT')}
            >
              FEEL IT
            </div>
            <span className="loop-arrow">&rarr;</span>
            <div
              className={`loop-node ${activePedagogyNode === 2 ? 'hot' : ''}`}
              onClick={() => auditionLoopNode(2, 'NAME IT')}
            >
              NAME IT
            </div>
            <span className="loop-arrow">&rarr;</span>
            <div
              className={`loop-node ${activePedagogyNode === 3 ? 'hot' : ''}`}
              onClick={() => auditionLoopNode(3, 'SEE IT')}
            >
              SEE IT
            </div>
            <span className="loop-arrow">&rarr;</span>
            <div
              className={`loop-node ${activePedagogyNode === 4 ? 'hot' : ''}`}
              onClick={() => auditionLoopNode(4, 'CONTROL IT')}
            >
              CONTROL IT
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* THREE TRACKS. ONE RECORD. (GRANULAR EXPANDED DEEP-DIVE) */}
        {/* ======================================================================= */}
        <section className="tracks space-y-16">
          <div className="border-b border-[#232327] pb-4">
            <h2 className="tracks-h2">Three tracks. One record.</h2>
            <p className="text-sm font-mono text-[#8a888f]">
              A comprehensive three-fold technical breakdown bridging acoustic instincts, digital MIDI protocols, and groove physics.
            </p>
          </div>

          {/* ===================================================================== */}
          {/* TRACK 01: THE POCKET (DEEP-DIVE GRANULAR ANALYSIS) */}
          {/* ===================================================================== */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#131316] border border-[#37373d] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232327] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#ff5a1f] text-[#0a0a0b] flex items-center justify-center font-shoulders font-black text-2xl">
                  01
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#ff5a1f] block">
                    MODULE 01 &bull; RHYTHMIC TIMELINES
                  </span>
                  <h3 className="font-shoulders font-bold text-2xl text-[#ece7dd]">
                    THE POCKET: Rap Cadence, Subdivision & Microtiming Control
                  </h3>
                </div>
              </div>

              <button
                onClick={() => onEnterCurriculum('module-1', 'm1-l1')}
                className="px-3.5 py-1.5 rounded bg-[#232327] hover:bg-[#37373d] text-xs font-mono text-[#ff5a1f] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Module 01 (8 Lessons)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="track-desc text-sm leading-relaxed text-[#ece7dd]/90">
              Where does a rapper actually put the words? Start with the beat as a repeating timeline, break it into subdivisions, then learn to place your cadence on top of, inside, or behind the beat — on purpose.
            </p>

            {/* Granular Section 1.1: Millisecond Temporal Calculus */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#ff5a1f] uppercase font-bold flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> 1.1 Temporal Pulse Equation
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  T_beat = 60,000 / BPM (ms)
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  At 85 BPM, exactly 705.8ms elapses per quarter-note integer. This integer pulse is the unshakeable foundation of your internal oscillator.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#2fd9c4] uppercase font-bold flex items-center gap-1.5">
                  <Activity className="w-3 h-3" /> 1.2 Motor-Vocal Independence
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Decoupled Neurological Clocks
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  Amateur vocalists speed up when syllables condense. True masters keep hand/foot motor clocks locked at 1x while vocal speech shifts to 4x or 3T.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#e0a030] uppercase font-bold flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> 1.3 Microtiming Pocket Lag
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Behind the Beat: +20ms to +55ms
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  Placing vocal consonants 35ms behind the snare creates the signature relaxed, heavy head-nod bounce of boom-bap and modern drill.
                </p>
              </div>
            </div>

            {/* Interactive Cadence & Syllabic Meter Workbench */}
            <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#ece7dd] flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-[#ff5a1f]" /> Interactive Syllabic Meter & Cadence Audition
                </span>
                <span className="text-[10px] font-mono text-[#8a888f]">Click meter to trigger speech cadence engine</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => auditionSyllableMeter('anapest')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    activeSyllableDrill === 'anapest'
                      ? 'bg-[#1a1412] border-[#ff5a1f] text-[#ece7dd]'
                      : 'bg-[#131316] border-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#ff5a1f] uppercase font-bold">Anapestic (ta-ta-TUM)</div>
                  <div className="font-mono text-xs text-[#ece7dd] my-1 font-bold">"In the POCKET"</div>
                  <div className="text-[10px] opacity-70">Weak &rarr; Weak &rarr; STRONG (Punch landing on 1)</div>
                </button>

                <button
                  onClick={() => auditionSyllableMeter('dactyl')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    activeSyllableDrill === 'dactyl'
                      ? 'bg-[#1a1412] border-[#ff5a1f] text-[#ece7dd]'
                      : 'bg-[#131316] border-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#2fd9c4] uppercase font-bold">Dactylic (TUM-ta-ta)</div>
                  <div className="font-mono text-xs text-[#ece7dd] my-1 font-bold">"HIT with the"</div>
                  <div className="text-[10px] opacity-70">STRONG &rarr; Weak &rarr; Weak (Front-loaded attack)</div>
                </button>

                <button
                  onClick={() => auditionSyllableMeter('hemiola')}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    activeSyllableDrill === 'hemiola'
                      ? 'bg-[#1a1412] border-[#ff5a1f] text-[#ece7dd]'
                      : 'bg-[#131316] border-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#e0a030] uppercase font-bold">3-Over-4 Hemiola Cross</div>
                  <div className="font-mono text-xs text-[#ece7dd] my-1 font-bold">"ONE two THREE four FIVE"</div>
                  <div className="text-[10px] opacity-70">3-syllable grouping floating across 4/4 grid lines</div>
                </button>
              </div>

              {/* Granular Subdivision Ladder Auditions */}
              <div className="pt-2 border-t border-[#1a1a1f] flex flex-wrap items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-[#8a888f]">Subdivision Audition:</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {(['quarter', '8th', '16th', 'triplet'] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => auditionSubdivision(sub)}
                      className={`px-2.5 py-1 rounded capitalize border transition-all cursor-pointer ${
                        activeSubdivisionTest === sub
                          ? 'bg-[#ff5a1f] text-[#0a0a0b] border-[#ff5a1f] font-bold'
                          : 'bg-[#131316] border-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                      }`}
                    >
                      {sub === 'quarter' ? '1/4 Beat' : sub === '8th' ? '1/8 Note' : sub === '16th' ? '1/16 Note' : '1/8T Triplet'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Velocity Bar Audio Trigger */}
            <div
              className="velocity-row"
              onClick={() => soundEngine.playPocketLoop()}
              title="Click to audition cadence velocity pattern"
            >
              <span style={{ height: '60%' }}></span><span style={{ height: '100%' }}></span><span style={{ height: '40%' }}></span>
              <span style={{ height: '80%' }}></span><span style={{ height: '30%' }}></span><span style={{ height: '90%' }}></span>
              <span style={{ height: '50%' }}></span><span style={{ height: '70%' }}></span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* TRACK 02: MIDI FOR DUMMIES (DEEP-DIVE GRANULAR ANALYSIS) */}
          {/* ===================================================================== */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#131316] border border-[#37373d] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232327] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#2fd9c4] text-[#0a0a0b] flex items-center justify-center font-shoulders font-black text-2xl">
                  02
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#2fd9c4] block">
                    MODULE 02 &bull; MACHINE PROTOCOLS & HARMONY
                  </span>
                  <h3 className="font-shoulders font-bold text-2xl text-[#ece7dd]">
                    MIDI FOR DUMMIES: The Grid, Pitch, Velocity & Acoustic Spectrum
                  </h3>
                </div>
              </div>

              <button
                onClick={() => onEnterCurriculum('module-2', 'm2-l1')}
                className="px-3.5 py-1.5 rounded bg-[#232327] hover:bg-[#37373d] text-xs font-mono text-[#2fd9c4] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Module 02 (10 Lessons)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="track-desc text-sm leading-relaxed text-[#ece7dd]/90">
              The piano roll is a map, not a wall of tiny rectangles. Horizontal is when. Vertical is what pitch. Length is how long. Velocity is how hard. Learn to translate what you hear into coordinates the machine can read.
            </p>

            {/* Granular Section 2.1: The 7-Bit Machine Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#2fd9c4] uppercase font-bold flex items-center gap-1.5">
                  <Cpu className="w-3 h-3" /> 2.1 Low-Level Hex Protocol
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Status + Data 1 + Data 2
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  A Note-On event is transmitted as a 3-byte packet: <code className="text-[#2fd9c4]">0x90 (NoteOn Ch1)</code>, <code className="text-[#ff5a1f]">0x3C (C3)</code>, <code className="text-[#ece7dd]">0x7F (127 Vel)</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#ff5a1f] uppercase font-bold flex items-center gap-1.5">
                  <Grid className="w-3 h-3" /> 2.2 Cartesian Grid Coordinate
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  X (Ticks) &times; Y (Semitones)
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  DAWs render time on X (subdivisions per beat) and pitch frequency on Y (f = 440 * 2^((MIDI - 69)/12) Hz). Length is note duration (gate time).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#e0a030] uppercase font-bold flex items-center gap-1.5">
                  <Waves className="w-3 h-3" /> 2.3 250Hz - 400Hz Mud Cutoff
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Acoustic Spectrum Carving
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  Notching -4dB at 300Hz eliminates cardboard boxiness, allowing 40Hz 808 subs and 2.5kHz snare transients to translate cleanly to phone speakers.
                </p>
              </div>
            </div>

            {/* Interactive Acoustic Spectrum Analyzer */}
            <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#ece7dd] flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#2fd9c4]" /> 6-Band Frequency Spectrum & Audition Matrix
                </span>
                <span className="text-[10px] font-mono text-[#8a888f]">Click any band to audition its acoustic role</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {[
                  { id: 'sub', name: 'SUB BASS', range: '20 - 60 Hz', role: 'Felt, not heard (808)', color: '#ff5a1f' },
                  { id: 'bass', name: 'KICK THUMP', range: '60 - 250 Hz', role: 'Chest knock punch', color: '#2fd9c4' },
                  { id: 'mud', name: 'MUD ZONE', range: '250 - 500 Hz', role: 'Notch sweep area', color: '#e0a030' },
                  { id: 'warmth', name: 'WARMTH', range: '500 - 2 kHz', role: 'Vocal/Rhodes body', color: '#ece7dd' },
                  { id: 'snap', name: 'SNAP CRACK', range: '2 - 6 kHz', role: 'Snare transient attack', color: '#ff5a1f' },
                  { id: 'air', name: 'AIR & SHEEN', range: '6 - 20 kHz', role: 'Hi-hat & vocal breath', color: '#8a888f' }
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => auditionFreqBand(b.id)}
                    className={`p-2.5 rounded border text-left font-mono transition-all cursor-pointer ${
                      activeFreqBand === b.id
                        ? 'bg-[#1a1412] border-[#2fd9c4] text-[#ece7dd] shadow-sm'
                        : 'bg-[#131316] border-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                    }`}
                  >
                    <div className="text-[9px] font-bold uppercase truncate" style={{ color: b.color }}>
                      {b.name}
                    </div>
                    <div className="text-[10px] text-[#ece7dd] font-bold my-0.5">{b.range}</div>
                    <div className="text-[8px] opacity-70 truncate">{b.role}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity Bar Audio Trigger */}
            <div
              className="velocity-row"
              onClick={() => soundEngine.playChord([48, 51, 55, 58], 0.8, 110)}
              title="Click to audition piano roll chord"
            >
              <span style={{ height: '45%' }}></span><span style={{ height: '65%' }}></span><span style={{ height: '100%' }}></span>
              <span style={{ height: '55%' }}></span><span style={{ height: '75%' }}></span><span style={{ height: '35%' }}></span>
              <span style={{ height: '85%' }}></span><span style={{ height: '60%' }}></span>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* TRACK 03: THE INTERPLAY (DEEP-DIVE GRANULAR ANALYSIS) */}
          {/* ===================================================================== */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#131316] border border-[#37373d] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232327] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#e0a030] text-[#0a0a0b] flex items-center justify-center font-shoulders font-black text-2xl">
                  03
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#e0a030] block">
                    MODULE 03 &bull; GROOVE MECHANICS & MASTERING
                  </span>
                  <h3 className="font-shoulders font-bold text-2xl text-[#ece7dd]">
                    THE INTERPLAY: Quantization, Swing, Microtiming & Humanization
                  </h3>
                </div>
              </div>

              <button
                onClick={() => onEnterCurriculum('module-3', 'm3-l1')}
                className="px-3.5 py-1.5 rounded bg-[#232327] hover:bg-[#37373d] text-xs font-mono text-[#e0a030] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Module 03 (10 Lessons)</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="track-desc text-sm leading-relaxed text-[#ece7dd]/90">
              The grid is a ruler, not a prison. Learn when to snap to it and when to bend it — and the difference between timing that's mathematically correct and timing that actually grooves.
            </p>

            {/* Granular Section 3.1: Roger Linn MPC Swing Math */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#e0a030] uppercase font-bold flex items-center gap-1.5">
                  <Sliders className="w-3 h-3" /> 3.1 The MPC Swing Formula
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Delta_t = T_16th * (Swing% - 50%) / 50%
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  Delays every even-numbered sixteenth note (s2, s4, s6). 50% is dead straight, 62% is MPC boom-bap, 72% is J Dilla drunken swing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#ff5a1f] uppercase font-bold flex items-center gap-1.5">
                  <Radio className="w-3 h-3" /> 3.2 Sidechain Ducking Envelope
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Kick &rarr; 808 Dynamic Space
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  Triggering a 35ms -6dB gain reduction on the 808 sub whenever the kick hits eliminates phase cancellation in the sub 60Hz register.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-2">
                <div className="text-[10px] font-mono text-[#2fd9c4] uppercase font-bold flex items-center gap-1.5">
                  <Headphones className="w-3 h-3" /> 3.3 The Car & Phone Test
                </div>
                <div className="font-mono text-sm text-[#ece7dd] font-bold">
                  Mono-Summed Saturation
                </div>
                <p className="text-xs text-[#8a888f] leading-normal">
                  Sub-bass must have subtle 2nd and 3rd harmonic saturation (120Hz-240Hz) or it will disappear completely on small iPhone speakers.
                </p>
              </div>
            </div>

            {/* Interactive Roger Linn Swing Calculator & Audition Strip */}
            <div className="p-4 rounded-xl bg-[#0a0a0b] border border-[#232327] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase text-[#ece7dd] flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#e0a030]" /> Interactive Swing Ratio & Microtiming Lab
                </span>
                <span className="text-[10px] font-mono text-[#8a888f]">Audition exact MPC swing values</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {[
                  { swing: 50, label: '50% Straight', sub: 'Trap / Drill Clock' },
                  { swing: 54, label: '54% Subtle', sub: 'Modern Bounce' },
                  { swing: 62, label: '62% Classic', sub: 'MPC 3000 Boom-Bap' },
                  { swing: 66, label: '66% Triplet', sub: 'True 3:2 Shuffle' },
                  { swing: 72, label: '72% Drunk', sub: 'J Dilla Slump' }
                ].map((s) => (
                  <button
                    key={s.swing}
                    onClick={() => {
                      setActiveSwingPreset(s.swing);
                      setSwingPercent(s.swing);
                      soundEngine.playSwingGroove(s.swing);
                    }}
                    className={`p-2.5 rounded border text-left transition-all cursor-pointer ${
                      activeSwingPreset === s.swing
                        ? 'bg-[#1a1412] border-[#e0a030] text-[#ece7dd]'
                        : 'bg-[#131316] border-[#232327] text-[#8a888f] hover:text-[#ece7dd]'
                    }`}
                  >
                    <div className="text-[10px] text-[#e0a030] font-bold">{s.label}</div>
                    <div className="text-[8px] opacity-70 truncate">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Velocity Bar Audio Trigger */}
            <div
              className="velocity-row"
              onClick={() => soundEngine.playSwingGroove(68)}
              title="Click to audition swing microtiming"
            >
              <span style={{ height: '70%' }}></span><span style={{ height: '50%' }}></span><span style={{ height: '90%' }}></span>
              <span style={{ height: '40%' }}></span><span style={{ height: '100%' }}></span><span style={{ height: '55%' }}></span>
              <span style={{ height: '65%' }}></span><span style={{ height: '45%' }}></span>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* COMPLETE 28-LESSON CURRICULUM SYLLABUS (GRANULAR EXPANDED INDEX) */}
        {/* ======================================================================= */}
        <section className="mt-20 border-t border-[#232327] pt-12 space-y-8">
          <div>
            <span className="eyebrow">Exhaustive Curriculum Roadmap</span>
            <h2 className="tracks-h2 mb-2">28 Granular Lessons. Zero Gatekeeping.</h2>
            <p className="text-sm font-mono text-[#8a888f] max-w-2xl">
              From the mechanics of internal biological clocks to advanced sidechain compression and mobile mix translation, every single lesson bridges street production with formal engineering principles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#131316] border border-[#C5A059]/30">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5A1F] font-bold">
                  Definitive Printable Editions
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
                  Version 2.5
                </span>
              </div>
              <p className="text-xs font-mono text-[#ECE7DD]">
                Download the complete standalone textbook with all 28 lessons, ASCII timeline matrices, and audio glossary.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
                download="THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FF5A1F] hover:bg-[#E04B14] text-[#0A0A0B] text-xs font-mono font-bold transition-colors"
                title="Download Standalone Printable PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Printable PDF</span>
              </a>

              <a
                href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx"
                download="THE_HARDWIRE_METHOD_TEXTBOOK.docx"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#232327] hover:bg-[#2D2D33] text-[#ECE7DD] border border-[#37373D] text-xs font-mono font-bold transition-colors"
                title="Download eBook (.docx)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>eBook</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURRICULUM_MODULES.map((mod) => (
              <div
                key={mod.id}
                className="rounded-2xl bg-[#131316] border border-[#232327] p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#232327] pb-2">
                    <span className="text-xs font-mono font-bold uppercase text-[#ff5a1f]">
                      MODULE 0{mod.number}
                    </span>
                    <span className="text-[10px] font-mono text-[#8a888f]">
                      {mod.lessons.length} LESSONS
                    </span>
                  </div>

                  <h3 className="font-shoulders font-bold text-xl text-[#ece7dd]">{mod.title}</h3>
                  <p className="text-xs font-mono text-[#8a888f] leading-relaxed line-clamp-3">
                    {mod.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-[#1a1a1f]">
                    {mod.lessons.slice(0, 5).map((l, idx) => (
                      <div
                        key={l.id}
                        onClick={() => onEnterCurriculum(mod.id, l.id)}
                        className="flex items-center justify-between p-1.5 rounded hover:bg-[#1a1a1f] text-xs font-mono cursor-pointer transition-colors group"
                      >
                        <span className="text-[#8a888f] group-hover:text-[#ece7dd] truncate">
                          {idx + 1}. {l.title}
                        </span>
                        <ArrowRight className="w-3 h-3 text-[#37373d] group-hover:text-[#ff5a1f] shrink-0 ml-1 transition-colors" />
                      </div>
                    ))}
                    {mod.lessons.length > 5 && (
                      <div className="text-[10px] font-mono text-[#8a888f] pl-1.5 pt-1">
                        + {mod.lessons.length - 5} more advanced lessons & capstone lab
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onEnterCurriculum(mod.id, mod.lessons[0].id)}
                  className="w-full py-2 rounded text-xs font-mono font-bold uppercase tracking-wider bg-[#232327] hover:bg-[#ff5a1f] hover:text-[#0a0a0b] text-[#ece7dd] transition-all cursor-pointer text-center"
                >
                  Start Module 0{mod.number} &rarr;
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================================= */}
        {/* INTERACTIVE STREET THEORY GLOSSARY QUICK-AUDITION MATRIX */}
        {/* ======================================================================= */}
        <section className="mt-16 rounded-2xl bg-[#131316] border border-[#232327] p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#232327] pb-3">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-[0.2em] text-[#ff5a1f] block">
                STREET THEORY GLOSSARY
              </span>
              <h3 className="font-shoulders font-bold text-2xl text-[#ece7dd]">
                Essential Terminology with 1-Click Audio Proofs
              </h3>
            </div>
            <button
              onClick={() => onEnterCurriculum('glossary')}
              className="text-xs font-mono text-[#ff5a1f] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Full A-Z Encyclopedia</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                term: 'The Pocket',
                def: 'The temporal micro-window (+25ms behind the beat) where cadence and drums lock into visceral groove.',
                action: () => soundEngine.playPocketLoop(),
                badge: 'RHYTHM'
              },
              {
                term: '808 Glide',
                def: 'Pitch envelope portamento sliding between sub-bass semitones (38Hz to 55Hz).',
                action: () => soundEngine.playBassNote(45, 0.6, 125),
                badge: 'BASS'
              },
              {
                term: 'Ghost Note',
                def: 'Low-velocity transient (Vel 30-50) providing rhythmic texture without competing with the main snare.',
                action: () => soundEngine.playSnare(undefined, 45, 220),
                badge: 'VELOCITY'
              },
              {
                term: 'Sidechain Duck',
                def: 'Automated volume suppression of the 808 during the kick attack to prevent low-end mud.',
                action: () => {
                  soundEngine.playKick(undefined, 127, true);
                  setTimeout(() => soundEngine.playBassNote(40, 0.6, 110), 40);
                },
                badge: 'DYNAMIC'
              }
            ].map((card) => (
              <div
                key={card.term}
                onClick={card.action}
                className="p-3.5 rounded-xl bg-[#0a0a0b] border border-[#232327] hover:border-[#ff5a1f] transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#ece7dd] group-hover:text-[#ff5a1f] transition-colors">
                    {card.term}
                  </span>
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#131316] text-[#8a888f] border border-[#232327]">
                    {card.badge}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#8a888f] leading-normal line-clamp-2">
                  {card.def}
                </p>
                <div className="text-[9px] font-mono text-[#ff5a1f] flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <Play className="w-2.5 h-2.5 fill-current" /> Tap to Audition
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================================= */}
        {/* DOWNLOAD MATRIX & CURRICULUM DISTRIBUTION HUB */}
        {/* ======================================================================= */}
        <div className="mt-12">
          <DownloadMatrixComponent />
        </div>

        {/* ======================================================================= */}
        {/* FINAL CTA & FOOTER */}
        {/* ======================================================================= */}
        <div className="cta space-y-4">
          <button
            className="cta-btn"
            onClick={() => onEnterCurriculum('module-1', 'm1-l1')}
          >
            Begin Module 01: The Pocket &rarr;
          </button>
          <div className="text-xs font-mono text-[#8a888f] flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="/THE_HARDWIRE_METHOD_TEXTBOOK.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#2fd9c4] hover:underline font-bold flex items-center gap-1"
            >
              <span>Read HTML eBook &rarr;</span>
            </a>
            <span className="opacity-40">&bull;</span>
            <a
              href="/THE_HARDWIRE_METHOD_TEXTBOOK.epub"
              download="THE_HARDWIRE_METHOD_TEXTBOOK.epub"
              className="text-[#8b5cf6] hover:underline font-bold"
              title="Standard EPUB Format (Apple Books, Kobo, Kindle)"
            >
              Download EPUB
            </a>
            <span className="opacity-40">&bull;</span>
            <a
              href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
              download
              className="text-[#ff5a1f] hover:underline font-bold"
              title="Printable 62-Page PDF"
            >
              Printable PDF (62p)
            </a>
            <span className="opacity-40">&bull;</span>
            <a
              href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx"
              download
              className="text-[#c5a059] hover:underline font-bold"
            >
              Word (.docx)
            </a>
          </div>
        </div>

        <footer className="landing-footer">Feel it. Name it. See it. Control it.</footer>
      </main>
    </div>
  );
};

// Helper Icon for Microphone
function Mic(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}
