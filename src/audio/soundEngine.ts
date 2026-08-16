// Web Audio Sound Engine for The Hardwire Method
// 100% Client-side synthetic sound generation for zero external asset latency

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.8;

  constructor() {
    // Lazy initialize on user gesture
  }

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.masterVolume, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAnalyser(): AnalyserNode | null {
    this.init();
    return this.analyser;
  }

  public setMasterVolume(val: number) {
    this.masterVolume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.masterVolume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setMasterVolume(this.masterVolume);
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentTime(): number {
    this.init();
    return this.ctx ? this.ctx.currentTime : 0;
  }

  // --- DRUM SYNTHESIZERS ---

  public playKick(time?: number, velocity: number = 100, isSub: boolean = true) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time ?? this.ctx.currentTime;
    const vel = velocity / 127;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = isSub ? 150 : 180;
    const endFreq = isSub ? 38 : 50;

    osc.frequency.setValueAtTime(startFreq, t);
    osc.frequency.exponentialRampToValueAtTime(endFreq, t + 0.08);

    gain.gain.setValueAtTime(1.0 * vel, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isSub ? 0.45 : 0.25));

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.5);
  }

  public playSnare(time?: number, velocity: number = 100, toneFreq: number = 180) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time ?? this.ctx.currentTime;
    const vel = velocity / 127;

    // Noise buffer for snap
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1000, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.7 * vel, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    // Body tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(toneFreq, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.08);

    oscGain.gain.setValueAtTime(0.5 * vel, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(oscGain);
    oscGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.2);
    osc.start(t);
    osc.stop(t + 0.15);
  }

  public playHiHat(time?: number, velocity: number = 100, isOpen: boolean = false) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time ?? this.ctx.currentTime;
    const vel = Math.max(0.05, velocity / 127);

    const bufferSize = this.ctx.sampleRate * (isOpen ? 0.4 : 0.05);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(8000, t);
    filter.Q.setValueAtTime(3.0, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6 * vel, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isOpen ? 0.35 : 0.045));

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + (isOpen ? 0.4 : 0.06));
  }

  public playMetronome(time?: number, isDownbeat: boolean = false) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time ?? this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isDownbeat ? 1200 : 800, t);

    gain.gain.setValueAtTime(isDownbeat ? 0.8 : 0.4, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  // --- MELODIC / HARMONIC SYNTHESIZERS ---

  public playTone(freq: number, duration: number = 0.3, type: OscillatorType = 'sine', velocity: number = 100, customFilter?: BiquadFilterNode) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    const vel = velocity / 127;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.4 * vel, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    if (customFilter) {
      osc.connect(gain);
      gain.connect(customFilter);
      customFilter.connect(this.masterGain);
    } else {
      osc.connect(gain);
      gain.connect(this.masterGain);
    }

    osc.start(t);
    osc.stop(t + duration + 0.05);
  }

  public playNote(midiNote: number, duration: number = 0.4, velocity: number = 100, type: OscillatorType = 'triangle') {
    const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
    this.playTone(freq, duration, type, velocity);
  }

  public playBassNote(freq: number, duration: number = 0.5, velocity: number = 100) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;
    const vel = velocity / 127;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq, t);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, t);

    gain.gain.setValueAtTime(0.7 * vel, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + duration);
    osc2.stop(t + duration);
  }

  public playChord(midiNotes: number[], duration: number = 0.8, velocity: number = 90) {
    midiNotes.forEach(note => {
      this.playNote(note, duration, velocity, 'triangle');
    });
  }

  // --- SPEECH & CADENCE AUDIO SIMULATOR ---

  public speakCadenceWord(word: string, stress: boolean = false, pitchMultiplier: number = 1.0) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = stress ? 1.1 : 1.3;
      utterance.pitch = (stress ? 1.25 : 0.95) * pitchMultiplier;
      utterance.volume = stress ? 1.0 : 0.6;
      window.speechSynthesis.speak(utterance);
    }
  }

  public playCadenceSyllables(
    pattern: { text: string; offsetMs: number; stress: boolean; note?: number }[],
    bpm: number,
    pocketOffsetMs: number = 0,
    onStep?: (index: number) => void
  ) {
    this.init();
    if (!this.ctx) return;

    const beatInterval = (60 / bpm) * 1000;

    pattern.forEach((syllable, idx) => {
      const targetTime = syllable.offsetMs + pocketOffsetMs;
      setTimeout(() => {
        if (onStep) onStep(idx);
        
        // Play acoustic percussive vocal surrogate
        const freq = syllable.stress ? 260 : 180;
        this.playTone(freq, syllable.stress ? 0.15 : 0.08, syllable.stress ? 'sawtooth' : 'sine', syllable.stress ? 120 : 60);

        // Optional speech synthesis overlay
        if (syllable.text) {
          this.speakCadenceWord(syllable.text, syllable.stress);
        }
      }, Math.max(0, targetTime));
    });
  }

  // --- LANDING PAGE QUICK PREVIEWS ---
  public playPocketLoop() {
    this.init();
    this.playKick(undefined, 120, true);
    setTimeout(() => this.playHiHat(undefined, 70), 170);
    setTimeout(() => this.playSnare(undefined, 115), 340);
    setTimeout(() => this.playHiHat(undefined, 85), 510);
    setTimeout(() => this.playKick(undefined, 105, true), 680);
    setTimeout(() => this.playSnare(undefined, 120), 1020);
  }

  public playSwingGroove(swingPercent: number = 68) {
    this.init();
    const bpm = 86;
    const beatMs = (60 / bpm) * 1000;
    const swingOffset = ((swingPercent - 50) / 100) * (beatMs / 2);

    this.playKick(undefined, 120, true);
    this.playHiHat(undefined, 100);

    setTimeout(() => {
      this.playHiHat(undefined, 60);
    }, beatMs / 2 + swingOffset);

    setTimeout(() => {
      this.playSnare(undefined, 115);
      this.playHiHat(undefined, 95);
    }, beatMs);

    setTimeout(() => {
      this.playHiHat(undefined, 65);
    }, beatMs + beatMs / 2 + swingOffset);
  }

  // --- PARAMETRIC EQ AUDIO FILTER HELPER ---
  public createParametricEQNode(mudCutActive: boolean, sweepFreq: number = 300): BiquadFilterNode | null {
    this.init();
    if (!this.ctx) return null;
    const filter = this.ctx.createBiquadFilter();
    if (mudCutActive) {
      filter.type = 'peaking';
      filter.frequency.value = sweepFreq;
      filter.Q.value = 2.0;
      filter.gain.value = -6.0; // Cut 6dB
    } else {
      filter.type = 'peaking';
      filter.frequency.value = sweepFreq;
      filter.Q.value = 2.0;
      filter.gain.value = +4.0; // Mud boost
    }
    return filter;
  }
}

export const soundEngine = new SoundEngine();
