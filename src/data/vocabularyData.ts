import { VocabularyTerm } from '../types';

export const VOCABULARY_LIST: VocabularyTerm[] = [
  // Module 1 Terms
  {
    term: 'Beat',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'The fundamental pulse and atomic unit of musical time. In 4/4 time, four beats form one complete bar.',
    practicalApplication: 'The steady heartbeat you tap your foot to or against which you align lyrics.',
    dawFeature: 'Metronome click, vertical bar beat markers in DAW timeline.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Bar (Measure)',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'A complete cycle of metric pulses (commonly 4 quarter notes) before the metric counter resets.',
    practicalApplication: 'A standard rap phrase or chord progression repeats in 2, 4, 8, or 16-bar increments.',
    dawFeature: 'Numbered measure markers across the top timeline (1.1, 2.1, 3.1).',
    audioCategory: 'rhythm'
  },
  {
    term: 'Tempo / BPM',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Beats Per Minute: the mathematical velocity of the timeline. Controls the millisecond window between beats.',
    practicalApplication: 'At 85 BPM, a bar is ~2.82s (705ms/beat); at 140 BPM, a bar is ~1.71s (428ms/beat).',
    dawFeature: 'Master tempo field in transport bar.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Meter & 4/4 Time',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'The time signature defining four quarter-note beats per measure. Standard in hip-hop, trap, and contemporary music.',
    practicalApplication: 'Provides the repeating 1-2-3-4 highway framework.',
    dawFeature: 'Project time signature setting (4/4 default).',
    audioCategory: 'rhythm'
  },
  {
    term: 'Subdivision',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Dividing the space between whole beats into equal micro-segments (eighths, sixteenths, triplets).',
    practicalApplication: 'Allows rapid-fire lyric delivery, hi-hat rolls, and intricate syncopated bounces.',
    dawFeature: 'Grid snap resolution (1/4, 1/8, 1/16, 1/32, 1/8T).',
    audioCategory: 'rhythm'
  },
  {
    term: 'Eighth Notes',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Two equal subdivisions per beat: counted as "ONE-and-TWO-and-THREE-and-FOUR-and".',
    practicalApplication: 'Standard conversational vocal delivery speed.',
    dawFeature: '1/8 Grid snapping.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Sixteenth Notes',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Four equal subdivisions per beat: counted as "1-e-and-a 2-e-and-a 3-e-and-a 4-e-and-a".',
    practicalApplication: 'Fast double-time rap flows and trap hi-hat rolls.',
    dawFeature: '1/16 Grid snapping in piano roll.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Rest (Acoustic Silence)',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'An active, deliberate silence where no sound or syllable occurs while the internal clock continues.',
    practicalApplication: 'Weaponizing silence to double the impact of the following punchline or drop.',
    dawFeature: 'Empty spaces between MIDI note blocks or audio clips.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Syncopation',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Placing primary dynamic accents or syllable hits on weak subdivisions or off-beats rather than strong downbeats.',
    practicalApplication: 'Transforms a stiff marching cadence into an infectious, nodding bounce.',
    dawFeature: 'Placing notes on the "and" (&) or "e/a" grid lines.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Cadence',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'The rhythmic delivery vehicle carrying lyrics, composed of speed (density), emphasis (stress), and space (rests).',
    practicalApplication: 'Enables changing the emotional impact of identical words.',
    dawFeature: 'Audio vocal track waveform placement on the arrangement timeline.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Prosody & Stress',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'The natural speech inflection and dynamic accentuation given to key syllables over secondary ones.',
    practicalApplication: 'Aligning natural speech stresses with musical accent points for organic flow.',
    dawFeature: 'Velocity stalk height on MIDI notes or vocal volume automation.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Anapest / Anapestic Engine',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'A three-part metric foot with two short/unstressed syllables followed by one heavy stressed accent (da-da-DUM).',
    practicalApplication: 'Creates an inertial slingshot effect that accelerates a verse across the barline without changing BPM.',
    dawFeature: 'Triplet or 16th-note groupings leading into an accented downbeat.',
    audioCategory: 'rhythm'
  },
  {
    term: 'The Pocket',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'The micro-spatial offset between the vocal transient and the underlying drum transient (kick/snare).',
    practicalApplication: 'On-top (0ms offset) for urgency/drill; inside (+15ms) for natural flow; behind (+40ms to +60ms) for laid-back boom-bap.',
    dawFeature: 'Nudging audio/MIDI clips slightly left or right without grid snap.',
    audioCategory: 'groove'
  },
  {
    term: 'Anticipation',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Hitting a rhyming word or note a 16th-note earlier than the listener expects the downbeat to land.',
    practicalApplication: 'Pulls the listener forward and builds aggressive momentum.',
    dawFeature: 'Shifting note block 1 grid unit left of the bar line.',
    audioCategory: 'rhythm'
  },
  {
    term: 'Displacement',
    moduleId: 'module-1',
    moduleName: 'The Pocket',
    definition: 'Moving an entire expected rhythmic motif or accent one subdivision ahead or behind its usual position.',
    practicalApplication: 'Subverts expectation and keeps the groove exciting across repetitions.',
    dawFeature: 'Selecting and shifting a group of MIDI notes by 1 or 2 subdivision ticks.',
    audioCategory: 'rhythm'
  },

  // Module 2 Terms
  {
    term: 'Pitch',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'The perceived highness or lowness of a sound, governed by physical oscillation frequency.',
    practicalApplication: 'Determines whether a note is a low sub-bass (40 Hz) or a piercing lead melody (1000 Hz).',
    dawFeature: 'Vertical position (Y-axis) in the piano roll.',
    audioCategory: 'pitch'
  },
  {
    term: 'Frequency & Hertz (Hz)',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'Cycles per second of acoustic vibration. Audible human hearing spans 20 Hz to 20,000 Hz.',
    practicalApplication: 'Sub-bass shakes chest at 30–60 Hz; vocals sit clear at 1–3 kHz; snare sizzle at 8 kHz.',
    dawFeature: 'Parametric EQ spectrum analyzer X-axis.',
    audioCategory: 'pitch'
  },
  {
    term: 'Semitone (Half Step)',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'The smallest step in 12-tone Western music, moving one adjacent key on the piano roll.',
    practicalApplication: 'Moving C to C#, or E to F.',
    dawFeature: 'One vertical grid row in piano roll.',
    audioCategory: 'pitch'
  },
  {
    term: 'Whole Step',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'A distance of two semitones (two piano roll grid rows).',
    practicalApplication: 'Moving C to D, or F to G.',
    dawFeature: 'Two vertical grid rows in piano roll.',
    audioCategory: 'pitch'
  },
  {
    term: 'Octave',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'A 2:1 frequency ratio where notes share the exact same letter name at double or half frequency (12 semitones apart).',
    practicalApplication: 'Layering sub-bass at C1 with a mid-bass pluck at C2 and a melody at C4.',
    dawFeature: 'C1, C2, C3, C4 octave labels on the piano roll keyboard.',
    audioCategory: 'pitch'
  },
  {
    term: 'Scale',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'A restricted subset of notes (usually 7) chosen from the chromatic 12 to establish a mood.',
    practicalApplication: 'Major (W-W-H-W-W-W-H) for bright/triumphant; Minor (W-H-W-W-H-W-W) for dark/moody.',
    dawFeature: 'Scale Lock / Scale Snap in BandLab, FL Studio, Logic, Ableton.',
    audioCategory: 'pitch'
  },
  {
    term: 'Triad & Chord',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'Three notes sounding simultaneously: Root, Third, and Fifth. Stacked vertically on the grid.',
    practicalApplication: 'Major triad (Root + 4 st + 3 st) vs Minor triad (Root + 3 st + 4 st).',
    dawFeature: 'Chord stamp tool or vertical stacking in piano roll.',
    audioCategory: 'pitch'
  },
  {
    term: 'MIDI (Musical Instrument Digital Interface)',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'Numerical control data (Which note, When, How long, How hard). MIDI is instructions, NOT audio.',
    practicalApplication: 'Allows swapping a piano sound for a synthesizer without replaying the notes.',
    dawFeature: 'MIDI clip, piano roll note events, .mid export.',
    audioCategory: 'pitch'
  },
  {
    term: 'Velocity',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'A performance parameter from 1 to 127 dictating how hard or aggressively a note is struck.',
    practicalApplication: 'Ghost hi-hats (20–40) vs main snare crack (115–127). Gives music human bounce.',
    dawFeature: 'Velocity stalks / lane at bottom of piano roll.',
    audioCategory: 'groove'
  },
  {
    term: 'Duration / Note Length',
    moduleId: 'module-2',
    moduleName: 'MIDI for Dummies',
    definition: 'The time duration between Note On and Note Off. Dictates staccato vs sustained behavior.',
    practicalApplication: 'Short 16th-note ticks for bouncy bass vs full whole-note holds for sub-bass weight.',
    dawFeature: 'Horizontal length of note block in piano roll.',
    audioCategory: 'pitch'
  },

  // Module 3 Terms
  {
    term: 'Quantization',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'The mathematical snapping of recorded notes or transients to the nearest strict grid subdivision.',
    practicalApplication: '100% hard quantize eliminates timing mistakes but risks robotic feel; 50% partial quantize tightens while preserving human life.',
    dawFeature: 'Quantize / Snap-to-Grid / "Q" button.',
    audioCategory: 'groove'
  },
  {
    term: 'Swing / Groove',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'Altering the timing relationship between paired subdivisions, delaying the off-beat for a long-short nod.',
    practicalApplication: 'Transforms a rigid military march (50% straight) into an infectious bounce (58%–66% swing).',
    dawFeature: 'Global swing slider or groove pool in DAW.',
    audioCategory: 'groove'
  },
  {
    term: 'Microtiming',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'Sub-millisecond manual shifts (+5ms to +45ms) applied deliberately to individual instruments.',
    practicalApplication: 'Pushing snares +25ms behind kick creates room and a confident head-nod.',
    dawFeature: 'Zooming into timeline and disabling grid snap to drag note blocks.',
    audioCategory: 'groove'
  },
  {
    term: 'Humanization',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'Applying bounded, organic variance to timing (±5ms) and velocity (±10) to simulate biological feel.',
    practicalApplication: 'Simulates the natural micro-variations of a real drummer without losing the beat.',
    dawFeature: 'Humanize function or manual velocity/timing nudging.',
    audioCategory: 'groove'
  },
  {
    term: 'Relational Groove',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'The concept that groove is not a single track metric, but an ecosystem of push-and-pull between kick, snare, hi-hat, bass, and vocal.',
    practicalApplication: 'Hi-hat drives speed; kick anchors downbeat; snare lays back; bass wraps around the kick.',
    dawFeature: 'Multitrack mixer with solo/mute buttons.',
    audioCategory: 'groove'
  },
  {
    term: 'Tension & Release',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'The musical heartbeat created by delaying an expected resolution through syncopation, filters, rests, or unresolved chords, followed by a satisfying drop.',
    practicalApplication: 'Drop cutouts, drum roll risers, high-pass sweeps before the 808 hits on beat 1.',
    dawFeature: 'Automation lanes (filter cutoff, volume drops) and arrangement mutes.',
    audioCategory: 'groove'
  },
  {
    term: 'Arrangement as Conversation',
    moduleId: 'module-3',
    moduleName: 'The Interplay',
    definition: 'Structuring tracks as interactive call-and-response rather than static vertical block stacking.',
    practicalApplication: 'Vocal line asks a question; synth lead answers in the space provided; elements share sonic real estate.',
    dawFeature: 'Arrangement timeline view and track muting.',
    audioCategory: 'groove'
  }
];
