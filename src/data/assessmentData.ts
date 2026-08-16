export interface AssessmentQuestion {
  id: number;
  question: string;
  category: 'Module 1: The Pocket' | 'Module 2: MIDI for Dummies' | 'Module 3: The Interplay' | 'Philosophy & Strategy';
  options: string[];
  correctIndex: number;
  explanation: string;
  hardwireVocabularyTerms: string[];
}

export const FINAL_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: 'Where is the beat, and what is its role on the production highway?',
    category: 'Module 1: The Pocket',
    options: [
      'The beat is the repeating integer pulse (1-2-3-4) providing the steady highway upon which all cadences and subdivisions travel.',
      'The beat is a random volume spike occurring whenever the bass drops.',
      'The beat only exists if a melody is actively singing.',
      'The beat is an unchangeable 140 BPM constant across all music.'
    ],
    correctIndex: 0,
    explanation: 'In the Hardwire framework, the beat is the unyielding highway timeline divided into uniform 4/4 sections.',
    hardwireVocabularyTerms: ['Beat', 'Bar', 'Tempo / BPM', '4/4']
  },
  {
    id: 2,
    question: 'What is subdivision, and how is it visualized inside a DAW piano roll?',
    category: 'Module 1: The Pocket',
    options: [
      'Subdivision is breaking the space between integer beats into equal lanes (8ths, 16ths, triplets), rendered as vertical grid lines.',
      'Subdivision is turning down the volume of the snare.',
      'Subdivision is playing notes backwards.',
      'Subdivision is the number of tracks in your mixer.'
    ],
    correctIndex: 0,
    explanation: 'Subdivisions are the micro-lanes between beats, represented as vertical snap lines on the piano roll.',
    hardwireVocabularyTerms: ['Subdivision', 'Eighth notes', 'Sixteenth notes']
  },
  {
    id: 3,
    question: 'What is "the pocket", and what millisecond offset defines a relaxed, behind-the-beat boom-bap delivery?',
    category: 'Module 1: The Pocket',
    options: [
      'The pocket is the micro-spatial relationship between vocal and drum transients; behind-the-beat sits +35ms to +60ms after the drum hit.',
      'The pocket is the master volume fader set to 0 dB.',
      'The pocket is a 100% hard quantize with 0ms offset.',
      'The pocket means recording in a quiet room.'
    ],
    correctIndex: 0,
    explanation: 'Behind-the-beat drops +35ms to +60ms after the transient, creating spatial depth and relaxed swagger.',
    hardwireVocabularyTerms: ['Pocket', 'Cadence', 'Anticipation', 'Displacement']
  },
  {
    id: 4,
    question: 'What is the "anapestic engine", and how does it create forward momentum across the bar line?',
    category: 'Module 1: The Pocket',
    options: [
      'A da-da-DUM metric foot (two unstressed syllables followed by one stressed accent) that acts as an inertial slingshot.',
      'A digital compressor plugin that distorts sub-bass.',
      'A metronome that speeds up by 10 BPM every bar.',
      'An automatic autotune algorithm.'
    ],
    correctIndex: 0,
    explanation: 'Anapestic phrasing creates kinetic energy that pulls the listener across the bar line into the downbeat.',
    hardwireVocabularyTerms: ['Anapest', 'Stress', 'Prosody']
  },
  {
    id: 5,
    question: 'Why do professional producers weaponize acoustic rest (silence) in cadences and arrangements?',
    category: 'Module 1: The Pocket',
    options: [
      'Intentional rests eliminate acoustic fatigue, create elastic tension, and double the impact of following words/drops.',
      'Rests are only used when the rapper runs out of breath.',
      'Rests save CPU power on mobile phones.',
      'Rests make the track play twice as fast.'
    ],
    correctIndex: 0,
    explanation: 'Silence is an active rhythmic choice; the brain leans in during rests and experiences a release on impact.',
    hardwireVocabularyTerms: ['Rest', 'Tension', 'Release']
  },
  {
    id: 6,
    question: 'What are the two fundamental axes of any standard piano roll coordinate map?',
    category: 'Module 2: MIDI for Dummies',
    options: [
      'Horizontal (X) = Time; Vertical (Y) = Pitch / Frequency height.',
      'Horizontal (X) = Volume; Vertical (Y) = Panning.',
      'Horizontal (X) = Reverb; Vertical (Y) = Compression.',
      'Horizontal (X) = Bass; Vertical (Y) = Treble.'
    ],
    correctIndex: 0,
    explanation: 'X tells you WHEN (time), Y tells you WHAT (pitch frequency), length is duration, and velocity is impact.',
    hardwireVocabularyTerms: ['Piano roll', 'Pitch', 'MIDI', 'Frequency']
  },
  {
    id: 7,
    question: 'What single semitone change transforms a triumphant Major Triad into a dark Minor Triad?',
    category: 'Module 2: MIDI for Dummies',
    options: [
      'Dropping the middle note (the Third) down by 1 semitone (from +4 st to +3 st).',
      'Raising the Root note by 2 octaves.',
      'Dropping the Fifth note by 3 semitones.',
      'Turning up the velocity to 127.'
    ],
    correctIndex: 0,
    explanation: 'In a triad, the Third defines the quality: Major has 4 semitones between Root and 3rd; Minor has 3 semitones.',
    hardwireVocabularyTerms: ['Triad', 'Chord', 'Major', 'Minor', 'Root', 'Third', 'Fifth']
  },
  {
    id: 8,
    question: 'What does MIDI velocity (1–127) accomplish beyond simply changing volume?',
    category: 'Module 2: MIDI for Dummies',
    options: [
      'It modifies physical impact and human performance dynamics (e.g. ghost hits 20-50 vs accented cracks 100-127).',
      'It changes the pitch of the note by one whole step.',
      'It quantizes the note to the nearest grid line.',
      'It speeds up the master tempo.'
    ],
    correctIndex: 0,
    explanation: 'Velocity models the physical energy of a hit, turning flat robotic repetition into breathing groove.',
    hardwireVocabularyTerms: ['Velocity', 'MIDI', 'Duration']
  },
  {
    id: 9,
    question: 'Why is the 250 Hz – 500 Hz frequency band known as the "mud zone", and how do you fix it?',
    category: 'Module 2: MIDI for Dummies',
    options: [
      'Low-mid resonances from bass, keys, and vocals build up here; cutting 2-4 dB at ~300 Hz restores vocal clarity.',
      'It is where sub-bass kicks reside, and you must boost it by 12 dB.',
      'It causes human hearing loss if played on speakers.',
      'It is reserved exclusively for high-hat transients.'
    ],
    correctIndex: 0,
    explanation: 'Cutting the 250–500 Hz buildup on instrumental tracks clears room for the vocal core to sit forward.',
    hardwireVocabularyTerms: ['Frequency', 'Hertz', 'Low-Midrange', 'Treble']
  },
  {
    id: 10,
    question: 'What is swing, and how does it manipulate subdivision relationships?',
    category: 'Module 3: The Interplay',
    options: [
      'It delays the second subdivision in a pair, shifting 1:1 straight spacing into an uneven long-short nodding groove.',
      'It randomly pans hi-hats between left and right speakers.',
      'It increases the tempo by 50% on every fourth bar.',
      'It forces all notes to snap 100% to the grid.'
    ],
    correctIndex: 0,
    explanation: 'Swing delays off-beat subdivisions, giving music a bouncy head-nodding feel.',
    hardwireVocabularyTerms: ['Swing', 'Subdivision', 'Groove']
  },
  {
    id: 11,
    question: 'What is the crucial difference between Humanization and Randomization?',
    category: 'Module 3: The Interplay',
    options: [
      'Humanization applies bounded, intentional tendencies (±5ms, ±10 velocity), while Randomization is unconstrained noise.',
      'Randomization sounds like a professional drummer; Humanization sounds like a machine.',
      'There is no difference; both are random number generators.',
      'Humanization only affects pitch, not timing.'
    ],
    correctIndex: 0,
    explanation: 'Real musicians exhibit consistent biological tendencies, not chaotic random numbers.',
    hardwireVocabularyTerms: ['Humanization', 'Microtiming', 'Quantization']
  },
  {
    id: 12,
    question: 'What is the core 5-step Pedagogical Loop of The Hardwire Method?',
    category: 'Philosophy & Strategy',
    options: [
      '1. Hear It → 2. Feel It → 3. Name It → 4. See It → 5. Control It',
      '1. Read Books → 2. Memorize Clefs → 3. Take Written Exam → 4. Buy Gear → 5. Produce',
      '1. Autotune → 2. Compress → 3. Limit → 4. Export → 5. Upload',
      '1. 100% Quantize → 2. Flatten → 3. Distort → 4. Mute → 5. Play'
    ],
    correctIndex: 0,
    explanation: 'The Hardwire Method connects sound to instinct before introducing notation: Feel it first, Name it second, Manipulate it third.',
    hardwireVocabularyTerms: ['Hear It', 'Feel It', 'Name It', 'See It', 'Control It']
  }
];
