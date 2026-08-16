import { ModuleInfo } from '../types';

export const CURRICULUM_MODULES: ModuleInfo[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'THE POCKET',
    subtitle: 'Rap Cadence, Subdivision & Rhythmic Control',
    tagline: 'FEEL → MAP → CONTROL',
    coreQuestion: 'Where does a rapper actually put the words?',
    description:
      'Music theory fails when it begins with paper notation. For the street-level creator operating on a zero-dollar mobile toolchain, the entry point is never a clef or a staff; it is the physical impact of a transient on a speaker cone. The beat becomes the road. The cadence becomes how you move through traffic. The pocket becomes the place where your movement and the beat lock together.',
    color: 'from-amber-500 to-orange-600',
    accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-500/30',
    lessons: [
      {
        id: 'm1-l1',
        moduleId: 'module-1',
        lessonNumber: 1,
        title: 'The Beat Is the Road',
        subtitle: 'The Architecture of Time and Internal Clock Entrainment',
        coreQuestion: 'How does time work inside a song before any words exist?',
        summary:
          'Introduce the beat as a repeating timeline. Master the integer pulse ONE — TWO — THREE — FOUR and decouple your vocal delivery from physical foot-tapping.',
        pedagogicalStage: 'feel',
        interactiveWidgetId: 'metronome-drill',
        sections: [
          {
            heading: '1.1 The Architecture of Time and Internal Clock Entrainment',
            content: `The foundation of all digital audio production, modern beatmaking, and vocal delivery is the repeating timeline. A beat is not a static object or an abstract piece of sheet music; it is a moving physical highway divided into uniform mathematical sections. In standard contemporary production—from Boom-Bap to Trap, Drill, and R&B—this highway is structured in 4/4 time (four quarter-note beats per measure or bar).

● The Integer Pulse: The primary spine of the track. Counted as ONE — TWO — THREE — FOUR. Every kick, snare, sub-bass note, and vocal syllable is anchored to these four coordinates.
● The Bar (Measure): A complete cycle of four beats before the cycle repeats. When a producer says "give me a 16-bar verse," they are asking for sixteen iterations of this four-beat cycle.
● Tempo / BPM (Beats Per Minute): The velocity of the timeline. BPM dictates the exact number of quarter notes that pass within a sixty-second window.

Mathematically, you can calculate the exact temporal duration of each quarter-note beat using the Universal Beat-Window Formula:

    Beat Duration (ms) = (60,000 / BPM)

At 85 BPM (classic Boom-Bap / East Coast groove):
    60,000 / 85 ≈ 705.88 milliseconds per beat.
    One 4-beat bar lasts approximately 2,823.5 milliseconds (2.82 seconds).

At 140 BPM (contemporary Trap / Drill half-time):
    60,000 / 140 ≈ 428.57 milliseconds per beat.
    One 4-beat bar lasts approximately 1,714.28 milliseconds (1.71 seconds).

Understanding this millisecond architecture removes the mystery of recording vocals. You do not have infinite space to speak; you have a specific, measurable window of time to deliver syllables before the snare transient drops.`,
            diagram: {
              type: 'timeline',
              code: `Timeline:  |-------------------|-------------------|-------------------|-------------------| (4/4 Grid at 85 BPM)
Integer:            1                   2                   3                   4
Duration:       [~706 ms]           [~706 ms]           [~706 ms]           [~706 ms]
Motor Tap:       [DOWN]              [DOWN]              [DOWN]              [DOWN]    (Unyielding Pulse)
Vocal Take:     "Run it             back, we            out the             door"      (Independent Flow State)`
            },
            keyTakeaway:
              'A bar is 4 beats. BPM dictates how many milliseconds you have to place your words. At 85 BPM, you have exactly 705.88ms per beat.'
          },
          {
            heading: '1.2 The Mechanics of Motor-Vocal Independence',
            content: `The single greatest failure mode for developing vocalists, rappers, and live beatmakers is rhythmic dependency—the neurological coupling of vocal cadence to the muscular contraction of foot-tapping or head-nodding.

When an amateur rapper taps their foot on the downbeat, their brain subconsciously locks the syllable count directly to the foot's muscular impact. If the rapper attempts a fast 16th-note syllable burst, their foot unintentionally accelerates, dragging the tempo of the entire song. Conversely, when they pause or leave a rest, their foot stops tapping, and they lose the downbeat entirely.

True studio control requires absolute Motor-Vocal Independence—decoupling your internal biological oscillator (the clock) from your vocal delivery apparatus (the diaphragm, vocal cords, and tongue).

The Motor-Vocal Decoupling Protocol:
1. Physical Anchor: Establish an unyielding physical pulse with your dominant hand (tapping your thigh or desk strictly on 1, 2, 3, 4 at 80 BPM).
2. Continuous Loop: Do not stop this physical movement for 60 seconds under any circumstances.
3. Asymmetric Phrasing: While maintaining the continuous 4-beat hand pulse, speak random sentences at conversational speed, then double speed, then whisper, then pause for 2 full beats, then resume on the off-beat.
4. Objective: The hand never speeds up when the mouth accelerates, and never freezes when the mouth goes silent.

Neurologically, this trains the cerebellum to maintain the timing loop automatically in the background, freeing your prefrontal cortex to focus entirely on linguistic agility, dynamic emphasis, and pocket placement.`,
            keyTakeaway:
              'Never let your vocal syllable weight drag your physical motor tempo. The body maintains the clock; the voice moves freely through it.'
          },
          {
            heading: '1.3 Historical Context: From the Human Drummer to the 808 Grid',
            content: `Before the invention of drum machines in the late 1970s and 1980s (such as the Roland TR-808, TR-909, and Linn LM-1), rhythmic time in recorded music was elastic. Live drummers naturally accelerated during choruses and slowed down during verses by 2 to 5 BPM.

Hip-hop culture was born from the breakbeat—DJs like Kool Herc and Grandmaster Flash looping identical 4-bar drum breaks on two turntables. When digital samplers (E-mu SP-1200, Akai MPC60) arrived, time became quantized and absolute. Modern rap was forged on the unyielding precision of the looped grid. Understanding the rigid grid allows you to deliberately play against it, rather than being trapped by it.`
          }
        ],
        toolMapping: {
          dawFeature: 'Metronome / Click Track / Master BPM Transport',
          description:
            'The foundational timing generator found in every digital audio workstation (BandLab, GarageBand, FL Studio, Ableton Live, Logic Pro). It produces an audible transient (usually a high woodblock or sine click on beat 1, and lower clicks on 2, 3, 4) at the exact project tempo.',
          proTip:
            'Always track vocals with the click track enabled during initial rehearsal takes. Once your internal clock locks with the drum bounce, disable the click track so the metronome bleed does not spill into high-gain condenser microphones.'
        },
        exercise: {
          instruction:
            'Lock the interactive metronome to 85 BPM. Tap your dominant hand strictly on every integer (1, 2, 3, 4). While maintaining that unyielding clock without speeding up or stopping, speak the phrase "I see the city through the tinted glass at midnight" at normal speed, then double-time, then pause for exactly 2 beats without losing your hand tap.',
          objective: 'Maintain a steady motor beat while speaking completely independently of it.',
          actionLabel: 'Launch Metronome & Motor Drill'
        },
        quiz: {
          question: 'At 85 BPM in 4/4 time, approximately how many milliseconds elapse between each quarter-note beat?',
          options: ['~705.88 ms', '~250.00 ms', '~1200.50 ms', '~85.00 ms'],
          correctIndex: 0,
          explanation: '60,000 milliseconds / 85 BPM = 705.88 milliseconds per beat window.'
        }
      },
      {
        id: 'm1-l2',
        moduleId: 'module-1',
        lessonNumber: 2,
        title: 'Subdivision: Breaking the Road Into Lanes',
        subtitle: 'Eighth Notes, Sixteenth Notes, and Triplets',
        coreQuestion: 'How do you squeeze fast syllables or trap hats between beats without losing time?',
        summary:
          'Quarter notes provide the highway; subdivisions provide the lanes. Divide integers into eighth notes, sixteenth notes, and triplets to create rhythmic density.',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'subdivision-visualizer',
        sections: [
          {
            heading: '2.1 The Mathematics of Spatial Division',
            content: `Quarter notes provide the structural highway; subdivisions provide the micro-lanes. To execute rapid-fire syllables, rolling trap hi-hats, intricate syncopations, or double-time flows, you must carve the open temporal space between integer downbeats into equal mathematical micro-segments.

In digital audio production, there are three primary subdivision frameworks:

1. Eighth Notes (1/8 Division — 2 lanes per beat / 8 per bar):
   Spoken Count: ONE — and — TWO — and — THREE — and — FOUR — and
   Temporal Window at 90 BPM: ~333.3 ms per eighth note.
   Use Case: Classic boom-bap flows (Nas, Rakim), baseline basslines, standard pop melodies.

2. Sixteenth Notes (1/16 Division — 4 lanes per beat / 16 per bar):
   Spoken Count: ONE — e — and — a — TWO — e — and — a — THREE — e — and — a — FOUR — e — and — a
   Temporal Window at 90 BPM: ~166.6 ms per sixteenth note.
   Use Case: Chopper rap (Twista, Tech N9ne, Eminem), rolling hi-hat trap patterns, intricate snare fills.

3. Triplet / Sextuplet Division (1/8T & 1/16T — 3 or 6 lanes per beat / 12 or 24 per bar):
   Spoken Count: ONE — trip — let — TWO — trip — let — THREE — trip — let — FOUR — trip — let
   Temporal Window at 90 BPM: ~222.2 ms per triplet eighth note.
   Use Case: The Atlanta "Migos Flow", trap hi-hat rolls, reggae dancehall swing, blues shuffle grooves.`,
            diagram: {
              type: 'grid',
              code: `Beat (1/4):   1                               2                               3                               4
Eighth (1/8): 1               &               2               &               3               &               4               &
16th (1/16):  1   e   &   a   2   e   &   a   3   e   &   a   4   e   &   a
Timeline:     |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---| (16-Step Quantize Grid)
Triplets:     |-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----| (12-Step Poly-Grid)
              1  trip  let      2  trip  let      3  trip  let      4  trip  let`
            },
            keyTakeaway:
              'Grid lines in your DAW are subdivision lanes made visible. Each line is an address for a note or syllable.'
          },
          {
            heading: '2.2 Visual Grid Translation on the DAW Piano Roll',
            content: `When you open a MIDI editor or piano roll in any DAW (such as BandLab, FL Studio, GarageBand, Ableton, or Logic), you are looking at time subdivisions made visible as a coordinate grid.

- 1/4 Grid: Displays 4 vertical lines per bar. Only downbeats can be snapped.
- 1/8 Grid: Displays 8 vertical lines per bar. Gives you the "and" off-beats.
- 1/16 Grid: Displays 16 vertical lines per bar. Standard default for hip-hop and trap programming.
- 1/32 & 1/64 Grid: Displays micro-subdivisions for stuttering trap hi-hat rolls and vocal glitch effects.
- Triplet (1/8T / 1/16T): Alters the grid spacing so three equal notes fit into the space normally occupied by two.

Understanding the visual grid allows you to diagnose why a hi-hat pattern or vocal take feels wrong. If you are trying to program a Migos-style triplet roll on a standard 1/16 grid, the notes will snap to the wrong coordinates and sound completely out of time. You must switch the grid snap setting to 1/8 Triplet or 1/16 Triplet.`
          },
          {
            heading: '2.3 Psychoacoustics of Subdivision: Density vs. Velocity',
            content: `The human ear perceives tempo through two distinct mechanisms: macro-tempo (the metronome BPM) and micro-density (how many transient events occur per second).

If a song is set to 75 BPM, but the vocalist delivers rapid 1/16th-note syllables accompanied by 1/32nd-note hi-hats, the listener's brain registers high cognitive excitement and physical speed. Conversely, if a song is set to 150 BPM, but the vocalist only speaks once every four beats on whole notes, the track feels spacious and heavy. Master producers manipulate subdivision density to control listener adrenaline without changing project tempo.`
          }
        ],
        toolMapping: {
          dawFeature: 'Grid Snap Resolution (1/4, 1/8, 1/16, 1/32, 1/8T, 1/16T)',
          description:
            'The quantization magnet setting in the DAW timeline and MIDI piano roll that determines where notes snap when dragged, drawn, or recorded.',
          proTip:
            'When programming trap hi-hats in FL Studio or BandLab, keep the primary hats on a 1/8 grid, but highlight specific 2-beat sections and switch snap to 1/16T or 1/32 to draw rapid rolling turnaround fills.'
        },
        exercise: {
          instruction:
            'Set your metronome to 75 BPM. Count the sixteenth-note grid out loud, emphasizing the "a" of every beat: One-e-and-[A] Two-e-and-[A]. Clap synchronously with your voice on the "a" syllable only.',
          objective: 'Hear and physically identify sixteenth-note subdivisions and off-beat positions.',
          actionLabel: 'Launch Subdivision Lanes'
        },
        quiz: {
          question: 'How many sixteenth-note subdivisions exist within a single 4/4 bar?',
          options: ['16 subdivisions', '8 subdivisions', '4 subdivisions', '32 subdivisions'],
          correctIndex: 0,
          explanation: '4 beats per bar × 4 subdivisions per beat = 16 sixteenth-note slots per bar.'
        }
      },
      {
        id: 'm1-l3',
        moduleId: 'module-1',
        lessonNumber: 3,
        title: 'Cadence Is Movement',
        subtitle: 'Speed, Emphasis, and Space in Lyrical Delivery',
        coreQuestion: 'How can the exact same sentence sound dangerous, lazy, or aggressive without changing a word?',
        summary:
          'Cadence is the rhythmic vehicle carrying your lyrics. Master the three variables: Transient Density (Speed), Dynamic Stress (Emphasis), and Acoustic Rest (Space).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'cadence-movement',
        sections: [
          {
            heading: '3.1 The Three Variables of Delivery',
            content: `Cadence is the acoustic vehicle that carries your lyrics across the timeline. You can transform the emotional posture, genre identity, and perceived intent of a written line without changing a single word by manipulating three core acoustic variables:

1. Transient Density (Speed / Subdivision Allocation):
   Spreading syllables evenly across wide quarter/eighth-note lanes versus compressing them into tightly clustered sixteenth-note bursts. High density creates urgency and technical mastery; low density creates poise and authority.

2. Dynamic Stress (Emphasis / Velocity Profiling):
   Which syllables receive vocal air-pressure, pitch inflection, and volume spikes. Landing hard on predictable integer downbeats sounds grounded and anthemic; landing hard on unexpected off-beat subdivisions creates syncopation and bounce.

3. Acoustic Rest (Space / Calculated Silence):
   The placement of dead air. Silence is not the absence of music; it is an active rhythmic instruction that builds suspense, forces the listener's brain to anticipate resolution, and prevents acoustic ear fatigue.`
          },
          {
            heading: '3.2 Case Study: The Same Lyric, Three Different Worlds',
            content: `Consider the baseline lyric: "I pull up in the dark with no lights on" (10 syllables).

● Delivery Pattern A (Straight / Foundational 1/8th-Note Flow):
  Syllables are distributed evenly across every eighth note starting on Beat 1.
  Rhythm: [I pull] [up in] [the dark] [with no] [lights on] [REST]
  Aesthetic Effect: Predictable, classic 90s boom-bap feel. Sounds conversational, steady, and clear.

● Delivery Pattern B (Staccato / Compressed Front-Loaded Burst):
  All 10 syllables are compressed into rapid 1/16th notes across Beats 1 and 2, followed by two full beats of dead silence.
  Rhythm: [I-pull-up-in-the-dark-with-no-lights-on] [REST --- SILENCE FOR 2 FULL BEATS]
  Aesthetic Effect: Aggressive, breathless, modern UK Drill / Grime impact. The sudden dead air amplifies the threat.

● Delivery Pattern C (Stretched / Floating Off-Beat Glide):
  The vocalist waits for Beat 1 to pass in total silence, dropping the first word on the "and" of Beat 1, stretching the vowel sounds across Beats 2, 3, and 4 into the next bar.
  Rhythm: [REST on 1] [and-I] [puuull-up] [in the daaark] [lights on...]
  Aesthetic Effect: Confident, menacing, laid-back West Coast / Southern trap swagger. Demonstrates utter mastery over the beat.`
          },
          {
            heading: '3.3 Engineering Cadence: Formant Shaping and Vocal Compression',
            content: `From an audio engineering perspective, rapid staccato cadences (Pattern B) create high transient spikes that trigger compressors aggressively. If your vocal has fast syllable bursts, set your vocal compressor's attack time slightly slower (10ms to 20ms) to allow the initial consonant consonants (P, T, K) to punch through before compression clamps down.

For stretched, melodic cadences (Pattern C), use an opto-style compressor (like an LA-2A emulation) with slow optical release to smoothly glue the sustained vowel formants without pumping artifacts.`
          }
        ],
        toolMapping: {
          dawFeature: 'Audio Waveform Transient Marker / Vocal Editing Razor',
          description:
            'Visual representation of recorded audio displaying transient spikes (consonants) and sustained bodies (vowels) on the timeline.',
          proTip:
            'Zoom into your vocal waveform in BandLab or Logic. Check where your consonant spikes land relative to the vertical grid lines. If your syllables are drifting late, use the split/razor tool to tighten the timing.'
        },
        exercise: {
          instruction:
            'Record or speak the phrase "I pull up in the dark with no lights on" using all three patterns: 1. Straight 8th notes, 2. Compressed 16th burst with 2 beats of silence, 3. Laid-back floating off-beat glide. Listen back and analyze the emotional shift.',
          objective: 'Demonstrate how altering cadence transforms the emotional meaning and genre identity of identical lyrics.',
          actionLabel: 'Open Cadence Movement Lab'
        },
        quiz: {
          question: 'What emotional effect is produced by compressing all syllables into the first 1.5 beats and leaving the remaining 2.5 beats empty?',
          options: [
            'An aggressive, breathless stutter effect with high dead-air suspense',
            'A relaxed country ballad feel',
            'A robotic march that removes all dynamic impact',
            'A pitch shift up one octave'
          ],
          correctIndex: 0,
          explanation: 'Front-loading transients creates explosive speed, while sudden silence weaponizes dead air to amplify tension.'
        }
      },
      {
        id: 'm1-l4',
        moduleId: 'module-1',
        lessonNumber: 4,
        title: 'The Anapestic Engine',
        subtitle: 'Rhythmic Momentum and Forward Inertia',
        coreQuestion: 'What gives a rap verse that unstoppable rolling momentum that pulls you forward?',
        summary:
          'Classical poetry calls it an anapest: two short syllables followed by one heavy stressed accent (da-da-DUM). It acts as an inertial slingshot across the bar line.',
        pedagogicalStage: 'feel',
        interactiveWidgetId: 'anapestic-engine',
        sections: [
          {
            heading: '4.1 Rhythmic Momentum and the Anapest',
            content: `In classical Greek and Latin prosody, an anapest is a metrical foot composed of two short/unstressed syllables followed by one long/stressed syllable:

    da — da — DUM  |  da — da — DUM  |  da — da — DUM

In street cadence and modern hip-hop flow architecture, the Anapestic Engine is the secret behind rolling, unstoppable forward momentum.

When a cadence hits on even, predictable downbeats (DUM — DUM — DUM — DUM), it marches like a military soldier. While effective for simple chants, it lacks kinetic acceleration. The anapest, by contrast, functions like a rhythmic slingshot: the two quick, unstressed syllables build kinetic pressure that discharges with heavy dynamic weight on the third hit.`,
            diagram: {
              type: 'anapest',
              code: `Metric Foot:    [ da ]        [ da ]        [ DUM ]       |    [ da ]        [ da ]        [ DUM ]
Syllable Role:  Unstressed    Unstressed     STRESSED          Unstressed    Unstressed     STRESSED
Velocity:       (vel 40)      (vel 45)       (vel 120)         (vel 40)      (vel 45)       (vel 120)
Momentum:       >> kinetic buildup >>        [ IMPACT ]        >> kinetic buildup >>        [ IMPACT ]`
            },
            keyTakeaway:
              'The anapest (da-da-DUM) converts rhythmic inertia into forward momentum. Use it to accelerate a verse across the bar line.'
          },
          {
            heading: '4.2 Master Case Studies: Eminem, Kendrick Lamar, and Migos',
            content: `The anapestic engine is ubiquitous across the greatest vocalists in rap history:

- Eminem ("The Way I Am", "Stan"): Utilizes relentless anapestic phrasing to create an anxious, surging momentum that feels like a runaway train. ("And they WALK in the DOOR and they TALK to the PHONES...")
- Kendrick Lamar ("Swimming Pools", "DNA"): Shifts into anapestic triplet clusters to suddenly increase the perceived speed of a verse before resolving on a brutal downbeat snare hit.
- Migos ("Versace", "Bad and Boujee"): The iconic "triplet flow" is essentially a continuous anapestic loop where the third syllable of every triplet carries the dynamic accent and rhyme scheme.

When you master the anapestic foot, you can make an 80 BPM slow beat feel faster than a 140 BPM EDM track because the linguistic motor inside the verse is constantly pulling the listener forward.`
          }
        ],
        toolMapping: {
          dawFeature: 'Triplet Quantize / 1/8T MIDI Stride',
          description:
            'Adjusting MIDI note durations to 3 equal subdivisions per beat, programming velocity stalks to low-low-HIGH (e.g., 40-40-120).',
          proTip:
            'In your DAW piano roll, draw three consecutive 1/8T hi-hat notes. Set the first two notes to velocity 40 and the third note to velocity 127. Duplicate this block across the entire bar to generate instant rolling momentum.'
        },
        exercise: {
          instruction:
            'Speak the phrase "And the walls kept closing in" with an explicit da-da-DUM dynamic cadence: "And the WALLS / kept clo-SING / in the DARK". Ensure the third syllable of each group lands with maximum physical vocal impact.',
          objective: 'Internalize the kinetic acceleration of the anapestic metrical foot.',
          actionLabel: 'Launch Anapestic Engine Drill'
        },
        quiz: {
          question: 'What is the syllable stress structure of an anapest in metrical cadence?',
          options: [
            'Two unstressed syllables followed by one stressed syllable (da-da-DUM)',
            'One stressed followed by two unstressed syllables (DUM-da-da)',
            'Four identical stressed downbeats (DUM-DUM-DUM-DUM)',
            'Complete silence followed by a single whisper'
          ],
          correctIndex: 0,
          explanation: 'The anapest consists of two short/unstressed preparatory syllables resolving into a heavy stressed impact (da-da-DUM).'
        }
      },
      {
        id: 'm1-l5',
        moduleId: 'module-1',
        lessonNumber: 5,
        title: 'The Pocket',
        subtitle: 'Defining the Pocket & Millisecond Offsets',
        coreQuestion: 'Why does the same beat feel aggressive in Drill, natural in Pop, and laid-back in Boom-Bap?',
        summary:
          'The pocket is the micro-spatial relationship between your vocal transient and the drum transient. Explore On-Top (0ms), Inside (+15ms), and Behind (+50ms).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'pocket-explorer',
        sections: [
          {
            heading: '5.1 Defining the Pocket & Millisecond Offsets',
            content: `In music production and audio engineering, "The Pocket" is defined as the micro-temporal spatial relationship between your vocal transient (the exact millisecond your consonant hits) and the structural drum transient (the kick and snare downbeats).

The pocket is not a fixed mathematical point; it is an aesthetic coordinate spectrum spanning from -20 milliseconds (rushing/ahead) to +60 milliseconds (laid-back/dragging).

The Three Primary Pocket Archetypes:

1. On-Top-of-the-Beat (0 ms offset — Dead Center Grid):
   The vocal transient aligns precisely with the leading edge of the drum transient.
   Emotional Feel: Urgent, hyper-focused, aggressive, militaristic.
   Genres: Battle Rap, UK Drill, Grime, Fast Trap (Eminem, Busta Rhymes, Pop Smoke).

2. Inside-the-Beat (+10 ms to +20 ms offset — Natural Human Pocket):
   The vocal transient lands just after the initial snap of the drum skin, sitting comfortably inside the body of the drum hit.
   Emotional Feel: Conversational, confident, transparent, effortless.
   Genres: Contemporary Hip-Hop, Pop Rap, Modern R&B (Drake, Kendrick Lamar, J. Cole).

3. Behind-the-Beat / Laid-Back (+35 ms to +60 ms offset — Dragging Pocket):
   The vocal transient lands noticeably late, dragging behind the snare transient without slowing down the global tempo.
   Emotional Feel: Extremely relaxed, cool, untouchable, menacing swagger.
   Genres: Classic 90s Boom-Bap, Neo-Soul, West Coast G-Funk, Lo-Fi Hip Hop (Snoop Dogg, The Notorious B.I.G., D’Angelo, MF DOOM).`,
            diagram: {
              type: 'pocket',
              code: `Timeline Grid Line:   | (Beat 2 Snare Transient Center - 0ms)
On-Top Profile:       |[Vocal Transient]                     (0ms offset — Aggressive / Drill)
Inside Profile:       |   [Vocal Transient]                  (+15ms offset — Natural / Pop)
Behind-the-Beat:      |            [Vocal Transient]         (+50ms offset — Laid-Back / Boom-Bap)
Dragging Boundary:    |                           [Vocal]    (+80ms offset — ERROR: Falling off beat)`
            },
            keyTakeaway:
              'A 30ms to 50ms drag creates relaxed swagger without changing the underlying tempo. Master the millisecond offset.'
          },
          {
            heading: '5.2 DAW Engineering: Track Delay & Nudge Manipulation',
            content: `Professional mixing engineers and producers do not rely on vocalists to perform with sub-millisecond precision manually. Instead, they use digital track delay and manual audio nudging during post-production:

How to Dial in the Pocket in Any DAW:
1. Record your vocal take with solid natural timing.
2. Zoom into the timeline waveform until you can see individual millisecond markers.
3. Select the vocal audio region and disable Grid Snapping.
4. Nudge the entire vocal region to the right by +25ms to +45ms.
5. Hit play with the drums unmuted. Notice how the track instantly acquires an effortless bounce without changing a single pitch or word.
6. Warning: If you nudge past +70ms, the vocal will cross the psychological boundary of groove and simply sound sloppy and late.`
          }
        ],
        toolMapping: {
          dawFeature: 'Track Delay Parameter / Millisecond Audio Nudge',
          description:
            'A track-level millisecond delay compensation field (e.g., Track Delay in Ableton, Logic, or manual clip nudging in BandLab and Pro Tools) that shifts an entire audio channel forward or backward in time.',
          proTip:
            'Add a +30ms track delay on your lead vocal channel during mixing. It creates an instant separation from the instrumental transients, allowing the kick and snare to punch clearly without vocal masking.'
        },
        exercise: {
          instruction:
            'Using the Pocket Explorer interactive widget, drag the vocal offset slider from 0ms (On-Top) to +20ms (Inside) to +50ms (Behind-the-Beat). Listen closely to how the vocal transient interacts with the snare drum.',
          objective: 'Hear and control millisecond vocal placement to deliberately dictate genre feel.',
          actionLabel: 'Launch Pocket Explorer Lab'
        },
        quiz: {
          question: 'What millisecond offset characterizes a classic behind-the-beat laid-back boom-bap pocket?',
          options: [
            '+35 ms to +60 ms after the drum transient',
            '0 ms dead-center alignment',
            '-100 ms early rush',
            '+500 ms delay (half a second late)'
          ],
          correctIndex: 0,
          explanation: 'A +35ms to +60ms offset creates relaxed spatial swagger without causing the performance to fall off the beat.'
        }
      },
      {
        id: 'm1-l6',
        moduleId: 'module-1',
        lessonNumber: 6,
        title: 'Silence Is a Rhythm',
        subtitle: 'The Weaponization of Rest and Acoustic Space',
        coreQuestion: 'Why does erasing words often make a rap verse hit ten times harder?',
        summary:
          'Amateurs fear silence; pros weaponize it. A rest is an active rhythmic instruction that builds tension and doubles the impact of whatever follows.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'silence-weaponizer',
        sections: [
          {
            heading: '6.1 The Weaponization of Rest',
            content: `Amateur producers and vocalists fear empty space. They believe that every sixteenth-note subdivision of a bar must be saturated with words, synth layers, ad-libs, or sound effects.

The inevitable result of wall-to-wall saturation is Acoustic Ear Fatigue. When sound is constant, dynamic contrast collapses to zero, and nothing feels heavy or exciting anymore.

Professional producers weaponize the Rest. In digital audio, a rest is not a void or a mistake; it is an active rhythmic instruction. When you stop speaking for two beats, the human brain involuntarily leans forward, wondering what will happen next. When the next word finally drops, its emotional impact is doubled because it cuts through silence.`,
            keyTakeaway:
              'Silence creates acoustic contrast. Erasing syllables gives the remaining words double the perceived dynamic power.'
          },
          {
            heading: '6.2 The Subtraction Protocol in Lyrical Writing',
            content: `The easiest way to elevate a mediocre 16-bar verse into a professional masterwork is the Subtraction Protocol:

1. Write a standard 16-syllable bar that fills every beat.
2. Identify the most critical punchline or visual metaphor in that bar.
3. Erase 4 to 6 syllables immediately preceding or following that punchline.
4. Replace those deleted words with dead silence while keeping your internal 1-2-3-4 clock running.
5. Re-record the take. Notice how the punchline now explodes out of the mix because it has room to breathe.

As Quincy Jones famously said: "The music is in the cracks between the notes."`
          }
        ],
        toolMapping: {
          dawFeature: 'Noise Gate / Mute Automation / Audio Strip Silence',
          description:
            'A digital dynamics processor or DAW editing tool that automatically mutes audio below a certain decibel threshold, cutting background room noise and creating pristine silence between vocal phrases.',
          proTip:
            'Set a high-ratio Noise Gate on rap vocals with a fast release time (50ms) so that breaths and headphone bleed are cut during rests, leaving absolute pitch-black silence between punchlines.'
        },
        exercise: {
          instruction:
            'Take a dense 16-syllable sentence. In the interactive editor, mute 6 strategic syllables to create two 1-beat rests. Hit play and observe how the remaining words gain massive punch.',
          objective: 'Treat rests as active musical choices rather than empty dead space.',
          actionLabel: 'Open Silence Weaponizer'
        },
        quiz: {
          question: 'What psychoacoustic phenomenon occurs when you leave calculated rests in a vocal cadence?',
          options: [
            'The listener leans in, acoustic fatigue vanishes, and subsequent words double in dynamic impact',
            'The master tempo automatically slows down',
            'The digital audio signal introduces clipping distortion',
            'The pitch of the track shifts downward'
          ],
          correctIndex: 0,
          explanation: 'Rest resets the auditory cortex and builds psychological expectation, amplifying the power of the next transient.'
        }
      },
      {
        id: 'm1-l7',
        moduleId: 'module-1',
        lessonNumber: 7,
        title: 'Syncopation and Displacement',
        subtitle: 'Breaking Expected Patterns and Anticipating Downbeats',
        coreQuestion: 'How do you stop a rhythm from marching like a soldier and start it dancing?',
        summary:
          'Syncopation subverts downbeat expectation by accenting weak subdivisions (the "&" or "e/a"). Displacement shifts expected rhymes early or late.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'syncopation-lab',
        sections: [
          {
            heading: '7.1 Breaking Expected Downbeat Patterns',
            content: `The human brain is an organic pattern-recognition machine. When a rhythm plays, the brain immediately expects primary dynamic accents to land on strong metric pulses: Beat 1 and Beat 3.

If every rhyme and snare hit lands predictably on Beats 1 and 3, the groove feels stiff, mechanical, and rigid—like a military march.

Syncopation is the deliberate artistic technique of subverting metric expectation by placing heavy dynamic accents on weak subdivisions (the "and", the "e", or the "a" of a beat).

- Standard Metric Accent: Accent on [1] ... [2] ... [3] ... [4] (Predictable, straight)
- Syncopated Off-Beat Accent: Accent on 1 [&] 2 [&] 3 [&] 4 [&] (Bouncy, infectious, buoyant)
- Sixteenth-Note Syncopation: Accent on 1 [e] & [a] 2 [e] & [a] (Funk, afrobeat, contemporary trap bounce)`
          },
          {
            heading: '7.2 Metric Displacement: The Anticipation Technique',
            content: `Metric Displacement occurs when a phrase or rhyming syllable that normally belongs on Beat 1 is deliberately shifted one sixteenth note early (an Anticipation / Push) or one sixteenth note late (a Delayed Landing).

The Anticipation Push:
Landing a heavy rhyming syllable on the "a" of Beat 4 (one sixteenth note before the next bar begins) creates an exhilarating pulling sensation that launches the song into the next section. Every great funk, reggae, and hip-hop track relies on metric anticipation to make listeners dance.`
          }
        ],
        toolMapping: {
          dawFeature: 'Off-Beat MIDI Step Sequencing / Syncopation Shift',
          description:
            'Programming MIDI trigger events exclusively on off-beat subdivision markers (the 2nd and 4th sixteenth-note slots).',
          proTip:
            'When programming open hi-hats, place them strictly on the "and" of every beat (the off-beat eighth note). This single syncopation trick instantly unlocks classic house, boom-bap, and disco bounce.'
        },
        exercise: {
          instruction:
            'Shift your accent from strong beats (1 and 3) to the off-beat "and" on a 16-step grid. Listen to how the groove immediately begins to bounce.',
          objective: 'Hear and apply syncopation and metric displacement to create groove.',
          actionLabel: 'Open Syncopation Lab'
        },
        quiz: {
          question: 'What is an anticipation in rhythmic cadence?',
          options: [
            'Landing a rhyming syllable or accent slightly earlier than the expected downbeat (e.g. on the sixteenth note before)',
            'Waiting 10 bars before starting to rap',
            'Singing one octave higher than the beat',
            'Muting the master channel completely'
          ],
          correctIndex: 0,
          explanation: 'Anticipation places the accent on the weak subdivision just prior to the downbeat, pulling the listener forward.'
        }
      },
      {
        id: 'm1-l8',
        moduleId: 'module-1',
        lessonNumber: 8,
        title: 'Tempo Versus Perceived Speed',
        subtitle: 'Separating Math from Psychology',
        coreQuestion: 'Why can an 85 BPM Boom-Bap beat feel faster and more frantic than a 140 BPM Trap song?',
        summary:
          'BPM is an objective mathematical number; perceived speed is a psychological illusion governed by syllabic and transient density.',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'tempo-perceived-speed',
        sections: [
          {
            heading: '8.1 Separating Math from Psychology',
            content: `One of the most profound paradoxes in music production is the complete divergence between mathematical tempo (BPM) and psychological perceived speed (Transient Density).

- Mathematical Tempo: The objective clock frequency measured in beats per minute.
- Perceived Speed: The subjective psychological sensation of velocity experienced by the human nervous system, governed entirely by how many audio events occur per second.

Case A: The Frantic 85 BPM Boom-Bap Track:
The metronome is set to a slow 85 BPM. However, the rapper delivers 32 syllables across two bars in rapid sixteenth-note triplets, while the drummer plays ghost snares and rapid 16th-note hi-hat rolls.
Psychological Result: The track feels lightning-fast, intense, and adrenaline-charged.

Case B: The Floating 140 BPM Trap Track:
The metronome is set to a blistering 140 BPM. However, because modern trap uses a half-time snare placement (snare hits on Beat 3 instead of Beats 2 and 4), the macro-pulse feels like 70 BPM. The vocalist speaks slow, stretched whole notes with wide 2-bar pauses.
Psychological Result: The track feels spacious, relaxed, heavy, and slow.`
          },
          {
            heading: '8.2 Practical DAW & AI Prompt Translation',
            content: `When working with digital audio workstations or modern AI music models (e.g., Suno, Udio), understanding the difference between BPM and perceived speed is essential:

- In DAWs: If you want a trap beat to feel slow and spacious, set the BPM to 140, but place your snare on Beat 3 (Half-Time Feel).
- In AI Prompts: Typing "fast 140 BPM" will often generate energetic EDM. If you want laid-back trap, you must explicitly prompt: "140 BPM, half-time drums, spacious cadence, relaxed vocal pacing."`
          }
        ],
        toolMapping: {
          dawFeature: 'Half-Time / Double-Time Engine (e.g., Cableguys HalfTime, Gross Beat)',
          description:
            'A real-time DSP time-stretching effect that halves or doubles the playback speed of an audio or MIDI stream while maintaining project tempo.',
          proTip:
            'Apply a Half-Time plugin to a fast 140 BPM piano melody. It immediately drops the perceived speed to 70 BPM, transforming a busy classical loop into a dark, atmospheric trap foundation.'
        },
        exercise: {
          instruction:
            'Toggle between 85 BPM (Double-Time Density) and 140 BPM (Half-Time Floating). Compare what your brain feels against what the metronome display shows.',
          objective: 'Separate mathematical clock tempo from psychological perceived velocity.',
          actionLabel: 'Launch Tempo vs Speed Lab'
        },
        quiz: {
          question: 'What creates the sensation of high velocity in a song running at a slow 80 BPM tempo?',
          options: [
            'High syllabic and subdivision density (rapid 16th notes and triplets packed into the space)',
            'Cranking the master volume to maximum',
            'Using only whole notes and long rests',
            'Applying a low-pass filter to the master bus'
          ],
          correctIndex: 0,
          explanation: 'Transient density—how many micro-events happen per second—dictates perceived speed regardless of BPM.'
        }
      },
      {
        id: 'm1-capstone',
        moduleId: 'module-1',
        lessonNumber: 'Capstone',
        title: 'Module 1 Capstone: Build a Pocket',
        subtitle: 'Mastering Rhythmic Placement Across 8 Bars',
        coreQuestion: 'Can you hear, describe, perform, and intentionally manipulate rhythmic placement from scratch?',
        summary:
          'Synthesize all 8 lessons of Module 1: Build an 8-bar pocket routine covering On-Top, Behind-the-Beat, Anapestic roll, and intentional rests.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'm1-capstone-workbench',
        sections: [
          {
            heading: 'Module 1 Capstone Objectives & Verification Standard',
            content: `To complete Module 1 and prove full rhythmic mastery, you must execute and verify the following 8-bar studio vocal cadence routine:

1. Project Setup: Lock your DAW or interactive metronome to 90 BPM.
2. Structural Constraints:
   - Bars 1–2: Execute an On-Top-of-the-Beat cadence (maximum transient alignment, 0ms offset, crisp urgency).
   - Bars 3–4: Transition into a Behind-the-Beat laid-back pocket (+40ms offset, relaxed drag without losing time).
   - Bars 5–6: Execute an Anapestic Triplet Roll (da-da-DUM metric foot, surging kinetic momentum).
   - Bars 7–8: Incorporate at least three intentional 1-beat rests, weaponizing silence before resolving on the final downbeat.
3. Verification Standard: Play back the vocal take against the bare click track. If your timing does not rush or drag the project BPM, you have cleared Module 1.`
          }
        ],
        exercise: {
          instruction:
            'Use the Capstone 1 Workbench to program and record your 8-bar rhythmic pocket routine adhering to all four structural constraints.',
          objective: 'Demonstrate complete control over timing, subdivisions, pocket offsets, and silence.',
          actionLabel: 'Launch Module 1 Capstone Workbench'
        }
      }
    ]
  },
  {
    id: 'module-2',
    number: 2,
    title: 'MIDI FOR DUMMIES',
    subtitle: 'The Grid, Pitch, Velocity & Frequency',
    tagline: 'FEEL → MAP → CONTROL',
    coreQuestion: 'How do you turn something you hear into something the computer can understand?',
    description:
      'Module 1 mapped your rhythm onto a physical timeline. Module 2 translates biological instinct into digital coordinates. The computer does not hear audio; it reads instruction sets. The piano roll is a two-dimensional matrix where time runs horizontally and frequency sits vertically. Learn to command this grid with mathematical certainty.',
    color: 'from-blue-500 to-indigo-600',
    accentBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-500/30',
    lessons: [
      {
        id: 'm2-l1',
        moduleId: 'module-2',
        lessonNumber: 1,
        title: 'The Piano Roll Is a Map',
        subtitle: 'The Two-Dimensional Coordinate Matrix',
        coreQuestion: 'What are the two axes that every digital music program in the world is built upon?',
        summary:
          'The piano roll is a 2D Cartesian coordinate system: X = Time (bars, beats, subdivisions), Y = Pitch (frequencies/keys), Length = Duration, and Velocity = Impact.',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'piano-roll-map',
        sections: [
          {
            heading: '1.1 The Two-Dimensional Coordinate Matrix',
            content: `Every Digital Audio Workstation in existence—from mobile apps like BandLab and GarageBand to professional studio standards like FL Studio, Ableton Live, Logic Pro, and Pro Tools—shares a universal graphical note editor known as the Piano Roll.

The Piano Roll is a two-dimensional Cartesian coordinate system:

1. Horizontal Axis (X-Axis = Time):
   Progresses from left to right, divided into Bars, Beats (Quarter Notes), and Subdivisions (Sixteenth Notes). The X coordinate dictates WHEN a note triggers.

2. Vertical Axis (Y-Axis = Pitch / Frequency):
   Progresses from bottom (low bass frequencies) to top (high treble frequencies), indexed to a vertical keyboard showing standard piano keys (C0 through C8). The Y coordinate dictates WHAT note sounds.

3. Note Block Length (Duration):
   The horizontal width of the note block dictates HOW LONG the note sustains before releasing.

4. Note Velocity (Dynamic Impact):
   A 7-bit numerical value from 1 to 127 attached to each note block, dictating HOW HARD the virtual hammer strikes the instrument.`,
            diagram: {
              type: 'matrix',
              code: `High Pitch (C6) ──── + ┌──────────┐
                       │          │  (Note Block: X=Start, Y=Pitch, Width=Duration)
Low Pitch (C1)  ───── - └──────────┘
               Time ──> [Bar 1.1] ────> [Bar 1.2] ────> [Bar 1.3] (X-Axis)`
            },
            keyTakeaway:
              'X is WHEN. Y is WHAT. Width is HOW LONG. Velocity is HOW HARD. Everything in digital music boils down to these four parameters.'
          },
          {
            heading: '1.2 MIDI Is Data, Not Sound',
            content: `The most crucial concept to internalize is that MIDI files (.mid) contains ZERO audio waveforms. There are no sound waves, no recorded vocals, and no speaker vibrations stored inside a MIDI note.

MIDI (Musical Instrument Digital Interface) is pure digital instruction data. When you click a note on the piano roll at coordinate (X = Bar 1, Beat 2; Y = C3), you are creating a lightweight data packet:

    { Event: "Note-On", Note: 60 (C3), Timestamp: 500ms, Velocity: 100, Channel: 1 }

The computer sends this instruction to a Virtual Instrument (synthesizer, sampler, 808 soundfont), which then synthesizes the actual acoustic waveform.`
          }
        ],
        toolMapping: {
          dawFeature: 'Piano Roll Editor / MIDI Event List',
          description:
            'The primary graphical workspace where MIDI notes are drawn, resized, transposed, and arranged across time.',
          proTip:
            'Learn your DAW piano roll shortcuts: Shift+Click to duplicate notes, Alt+Scroll to adjust note velocity, and Ctrl+B to duplicate entire 4-bar blocks instantly.'
        },
        exercise: {
          instruction:
            'Draw three notes on the interactive piano roll. Point to the X-axis coordinate (time), the Y-axis coordinate (pitch), and drag the note edge to adjust duration.',
          objective: 'Navigate the 2D Cartesian coordinate system of the piano roll without hesitation.',
          actionLabel: 'Open Piano Roll Coordinate Lab'
        },
        quiz: {
          question: 'In any standard DAW piano roll, what does the vertical (Y) axis represent?',
          options: [
            'Frequency / Pitch height (low notes at bottom, high notes at top)',
            'Master volume in decibels',
            'Time progression in seconds',
            'Reverb wet mix percentage'
          ],
          correctIndex: 0,
          explanation: 'The Y-axis represents musical pitch (frequency), while the X-axis represents time.'
        }
      },
      {
        id: 'm2-l2',
        moduleId: 'module-2',
        lessonNumber: 2,
        title: 'Notes Are Frequencies',
        subtitle: 'The Physics of Oscillation and Hertz',
        coreQuestion: 'What is pitch physically, and why do 808 sub-basses hit your chest while hi-hats hit your ears?',
        summary:
          'Pitch is measurable physical vibration in Hertz (cycles per second). Sub-bass vibrates at 20–60 Hz, mid vocals at 500–2000 Hz, and treble transients at 8–20 kHz.',
        pedagogicalStage: 'hear',
        interactiveWidgetId: 'frequency-physics',
        sections: [
          {
            heading: '2.1 The Physics of Oscillation and Hertz',
            content: `Musical notes are not abstract spiritual entities; they are measurable physical vibrations in the air. When an object vibrates (a speaker cone, a guitar string, or human vocal cords), it compresses and rarefies surrounding air molecules at a specific speed.

Frequency is measured in Hertz (Hz)—the number of complete acoustic cycles per second:

    Frequency f = 1 / Period T  (Hz)

- Sub-Bass Frequencies (20 Hz – 60 Hz):
  Vibrates slowly (20 to 60 times per second). Creates massive, wide physical sound waves that pass through walls and physically compress human chest cavities. This is where 808 sub-basses live.
- Midrange Frequencies (500 Hz – 2,000 Hz):
  Vibrates hundreds of times per second. This is where human speech formants, piano fundamentals, and snare bodies reside.
- Treble Frequencies (5,000 Hz – 20,000 Hz):
  Vibrates thousands of times per second. Produces razor-sharp, piercing transients, hi-hat ticks, and vocal "air" sparkle.`
          },
          {
            heading: '2.2 The Reference Pitch: A4 = 440 Hz',
            content: `In 1939, the international acoustic standard established that the musical note A4 (A above middle C) is defined as exactly 440 Hz (440 complete cycles per second).

Every other note on the piano roll is mathematically derived from this 440 Hz standard. When you transpose a note up or down, you are simply multiplying or dividing its acoustic oscillation frequency.`
          }
        ],
        toolMapping: {
          dawFeature: 'Oscilloscope / Spectrum Analyzer (e.g., Voxengo SPAN)',
          description:
            'A visual metering plugin that displays real-time frequency distribution and physical sound waveforms across the 20 Hz to 20,000 Hz spectrum.',
          proTip:
            'Put a free Spectrum Analyzer (like Voxengo SPAN) on your master bus. Look at the sub-bass peak of your 808 kick. If it peaks at 45 Hz, it will rattle subwoofers; if it peaks at 150 Hz, it is a punchy kick without true sub weight.'
        },
        exercise: {
          instruction:
            'Sweep the interactive frequency oscillator from 30 Hz (Sub-Bass) up to 10,000 Hz (Treble). Watch the oscilloscope waveform compress as frequency increases.',
          objective: 'Connect note position on the grid to physical acoustic frequency in Hertz.',
          actionLabel: 'Launch Frequency Physics Lab'
        },
        quiz: {
          question: 'What frequency range produces deep, physical sub-bass chest compression?',
          options: ['20 Hz to 60 Hz', '10,000 Hz to 20,000 Hz', '1,000 Hz to 2,000 Hz', '500 Hz to 800 Hz'],
          correctIndex: 0,
          explanation: '20 Hz to 60 Hz represents the sub-bass spectrum felt physically in the body.'
        }
      },
      {
        id: 'm2-l3',
        moduleId: 'module-2',
        lessonNumber: 3,
        title: 'The Chromatic Neighborhood',
        subtitle: 'The Twelve-Note Repeating Cycle and Octaves',
        coreQuestion: 'How many total notes exist in digital music before they repeat?',
        summary:
          'Western music divides the spectrum into 12 semitones per octave (C, C#, D, D#, E, F, F#, G, G#, A, A#, B). An octave is a 2:1 frequency doubling.',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'chromatic-wheel',
        sections: [
          {
            heading: '3.1 The Twelve-Note Repeating Cycle',
            content: `Despite the infinite complexity of modern music, all Western digital production—every melody by Metro Boomin, every chord progression by Tyler the Creator, and every bassline by Dr. Dre—is built from exactly TWELVE notes:

    C — C# (D♭) — D — D# (E♭) — E — F — F# (G♭) — G — G# (A♭) — A — A# (B♭) — B

Once you reach B, the cycle begins again on C at the next octave level.

- Semitone (Half Step): The smallest distance between any two adjacent keys on the piano roll (e.g., from C to C#, or E to F).
- Whole Step: A jump of two semitones (e.g., from C to D, or F to G).`
          },
          {
            heading: '3.2 The Octave: The 2:1 Frequency Ratio',
            content: `An Octave is the most pure, consonant harmonic interval in physics. When you jump up one octave (from C3 to C4, or A3 to A4), you are exactly doubling the physical frequency of the note:

    A3 = 220 Hz
    A4 = 440 Hz (2 × 220 Hz)
    A5 = 880 Hz (2 × 440 Hz)

Because the sound waves align in a perfect 2:1 ratio, the human brain perceives them as the "same" note, just higher or lower in space. This is why male and female vocalists can sing the identical melody together in octaves effortlessly.`
          }
        ],
        toolMapping: {
          dawFeature: 'Octave Transpose (Shift + Up/Down Arrow)',
          description:
            'Quick keyboard shortcut in all DAWs that transposes selected MIDI notes up or down by 12 semitones (+12 / -12).',
          proTip:
            'Duplicate your main synth melody, paste it onto a secondary track, and transpose it down by -12 semitones (one octave) to add instant body and thickness to your lead sound.'
        },
        exercise: {
          instruction:
            'Play through all 12 chromatic notes on the virtual keyboard. Watch how C3 (130.81 Hz) doubles to C4 (261.63 Hz) in the next octave.',
          objective: 'Recognize the twelve-note repeating chromatic cycle by ear and on the grid.',
          actionLabel: 'Launch Chromatic Wheel'
        },
        quiz: {
          question: 'What is the physical frequency relationship between two notes that are one octave apart (e.g., A3 at 220 Hz and A4 at 440 Hz)?',
          options: [
            'A 2:1 frequency ratio (frequency is exactly doubled or halved)',
            'An unpredictable random offset',
            'A 10:1 frequency ratio',
            'They share identical frequencies'
          ],
          correctIndex: 0,
          explanation: 'An octave represents a 2:1 harmonic ratio, doubling the frequency of oscillation.'
        }
      },
      {
        id: 'm2-l4',
        moduleId: 'module-2',
        lessonNumber: 4,
        title: 'Scales as Restricted Territory',
        subtitle: 'Organizing the Pitch Collection (Major vs. Minor)',
        coreQuestion: 'How do producers guarantee that every note they hit sounds emotional and never out of tune?',
        summary:
          'A scale is a restricted 7-note subset of the 12 notes. Major follows W-W-H-W-W-W-H (triumphant); Natural Minor lowers degrees 3, 6, and 7 (dark, moody).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'scale-lock-studio',
        sections: [
          {
            heading: '4.1 Organizing the Pitch Collection',
            content: `If you draw random notes across all 12 chromatic keys on the piano roll, your song will sound dissonant, chaotic, and jarring.

A Scale is a restricted territory—a curated subset of 7 notes chosen from the chromatic 12 to establish a coherent emotional landscape. When you restrict yourself to a scale, every note you click sounds in harmony with the rest of the song.

The Two Foundational Scale Formulas:

1. The Major Scale (Bright, Triumphant, Uplifting):
   Step Formula: Whole — Whole — Half — Whole — Whole — Whole — Half (W-W-H-W-W-W-H)
   Example in C Major: C — D — E — F — G — A — B (All white keys)

2. The Natural Minor Scale (Dark, Moody, Emotional, Melancholic):
   Step Formula: Whole — Half — Whole — Whole — Half — Whole — Whole (W-H-W-W-H-W-W)
   Example in A Minor: A — B — C — D — E — F — G (All white keys starting on A)
   Example in C Minor: C — D — E♭ — F — G — A♭ — B♭ (Lowered 3rd, 6th, and 7th degrees)

90% of contemporary trap, hip-hop, drill, and dark R&B is composed strictly in Minor Scales (Natural Minor, Harmonic Minor, or Minor Pentatonic) to maintain a gritty, emotional aesthetic.`
          },
          {
            heading: '4.2 The Scale Lock Feature in Modern Production',
            content: `Modern DAWs eliminate the need to memorize all 24 key signatures through a feature called Scale Snapping or Scale Highlighting.

When you enable "Scale Lock: C Minor" in BandLab, FL Studio, or Ableton, the software literally dims or locks all out-of-scale keys. Even if you randomly mash your computer keyboard, the software automatically quantizes your clicks to the correct minor scale notes. Use this tool as a creative safety net.`
          }
        ],
        toolMapping: {
          dawFeature: 'Scale Lock / Key Snapping / Ghost Notes',
          description:
            'A piano roll mode that visually highlights only in-key notes and prevents out-of-scale notes from triggering.',
          proTip:
            'Enable "Key Highlight" in FL Studio (View > Scale Highlighting) or "Scale Mode" in Ableton. Set it to the key of your 808 sub-bass so you never write a melody that clashes with the bassline.'
        },
        exercise: {
          instruction:
            'Toggle between C Major and C Minor scale locks in the interactive studio. Click notes on the piano roll to hear how the emotional tone shifts from bright triumph to dark moodiness.',
          objective: 'Hear and visualize the difference between Major and Minor scale territory.',
          actionLabel: 'Open Scale Lock Studio'
        },
        quiz: {
          question: 'What is the step formula for a standard Major Scale?',
          options: [
            'W — W — H — W — W — W — H',
            'H — H — H — H — H — H — H',
            'W — H — W — W — H — W — W',
            'W — W — W — W — W — W — W'
          ],
          correctIndex: 0,
          explanation: 'Whole-Whole-Half-Whole-Whole-Whole-Half creates the bright, consonant Major scale.'
        }
      },
      {
        id: 'm2-l5',
        moduleId: 'module-2',
        lessonNumber: 5,
        title: 'Chords as Simultaneous Relationships',
        subtitle: 'Vertical Stacking and Major vs. Minor Triads',
        coreQuestion: 'What is a chord, and what single semitone change shifts a chord from happy to sad?',
        summary:
          'While melodies move horizontally across time, chords stack notes vertically. A triad consists of Root, 3rd, and 5th. Dropping the 3rd by 1 semitone turns Major into Minor.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'chord-builder',
        sections: [
          {
            heading: '5.1 Vertical Stacking on the Grid',
            content: `While a melody moves horizontally across the X-axis (one note at a time), Chords stack multiple notes vertically on the Y-axis to sound simultaneously at the exact same millisecond.

The Triad (The 3-Note Foundation):
The standard building block of all Western harmony is the Triad, built by stacking three notes in thirds (skipping every other scale degree):

1. The Root: The foundational name and anchor of the chord (e.g., C).
2. The Third: The emotional defining note that dictates Major vs. Minor.
3. The Fifth: The harmonic anchor that provides structural stability.

The Universal Triad Formulas:

- Major Triad: Root + 4 Semitones (Major 3rd) + 3 Semitones (Minor 3rd)
  Example (C Major): C ──(+4 st)── E ──(+3 st)── G (Interval: C to E is 4 semitones)
  Sound: Stable, bright, open.

- Minor Triad: Root + 3 Semitones (Minor 3rd) + 4 Semitones (Major 3rd)
  Example (C Minor): C ──(+3 st)── E♭ ──(+4 st)── G (Interval: C to E♭ is 3 semitones)
  Sound: Dark, introspective, moody.`
          },
          {
            heading: '5.2 Extended Chords: 7ths and 9ths in Neo-Soul & Lo-Fi',
            content: `In Lo-Fi Hip Hop, Neo-Soul, and contemporary R&B (think J Dilla, Drake, SZA), basic triads often sound too plain. Producers build Extended Chords by continuing to stack thirds vertically:

- Minor 7th Chord: Root + Minor 3rd + Perfect 5th + Minor 7th (e.g., C - E♭ - G - B♭)
  Sound: Smoky, jazzy, sophisticated, nostalgic.
- Minor 9th Chord: Minor 7th + Major 9th (e.g., C - E♭ - G - B♭ - D)
  Sound: Lush, cinematic, deeply emotional.

To build a professional lo-fi chord progression, simply take standard minor triads and add the 7th degree on top of every chord.`
          }
        ],
        toolMapping: {
          dawFeature: 'Chord Stamp Tool / MIDI Chord Generator',
          description:
            'A piano roll utility that automatically draws full chords (Maj7, Min9, Sus4) with a single mouse click.',
          proTip:
            'In BandLab or FL Studio, use the Chord Stamp tool to draw "Minor 7th" chords. Duplicate the pattern across 4 bars and adjust only the root notes to create instant atmospheric R&B progressions.'
        },
        exercise: {
          instruction:
            'Build a C Major triad (C-E-G), then drop the middle note by 1 semitone to E♭ (C-E♭-G) to transform it into C Minor. Listen to the dramatic emotional shift.',
          objective: 'Construct Major and Minor triads by counting semitone intervals on the grid.',
          actionLabel: 'Launch Chord Builder Lab'
        },
        quiz: {
          question: 'In a triad chord, which note dictates whether the chord sounds Major (bright) or Minor (dark)?',
          options: [
            'The Third (lowering it by 1 semitone makes the chord minor)',
            'The Root note only',
            'The Fifth note only',
            'The master tempo setting'
          ],
          correctIndex: 0,
          explanation: 'The interval between the Root and the Third defines the chord quality (4 semitones = Major, 3 semitones = Minor).'
        }
      },
      {
        id: 'm2-l6',
        moduleId: 'module-2',
        lessonNumber: 6,
        title: 'Rhythm Enters the Grid',
        subtitle: 'Translating Spoken Cadence to MIDI Coordinates',
        coreQuestion: 'How do you turn a freestyle vocal rhythm into a MIDI synth or hi-hat track?',
        summary:
          'Bridge Module 1 cadences with Module 2 MIDI: Map your spoken syllable transients directly to horizontal grid note positions.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'cadence-to-midi',
        sections: [
          {
            heading: '6.1 Translating Spoken Cadence to MIDI Coordinates',
            content: `The ultimate power move in modern production is bridging vocal cadence (Module 1) with MIDI grid mapping (Module 2).

Every spoken vocal freestyle has an inherent MIDI rhythm. If you can speak a flow, you can program a hit synth lead, bassline, or hi-hat pattern.

The Vocal-to-MIDI Translation Method:
1. Speak a rhythm out loud with percussive syllables: "Ta... ta-ta-TA... ta... ta-TA".
2. Open an empty piano roll track loaded with a synth pluck or 808 sound.
3. Set your grid snap to 1/16th notes.
4. Draw short MIDI note blocks on the exact X coordinates where your vocal syllables landed.
5. Hit play. Your spoken cadence is now a fully realized synthesizer melody.`
          }
        ],
        toolMapping: {
          dawFeature: 'Audio-to-MIDI Conversion / Tap Tempo Step Record',
          description:
            'A DSP feature in modern DAWs (Ableton, Logic, Melodyne) that analyzes an audio recording of your voice and converts vocal transients directly into editable MIDI note blocks.',
          proTip:
            'Record yourself beatboxing a drum or hi-hat pattern into your phone mic. Drop the audio file into your DAW and click "Convert Audio to Drum MIDI" to generate instant organic MIDI grooves.'
        },
        exercise: {
          instruction:
            'Speak a rhythmic cadence into your mind, then place short MIDI note blocks onto the 16-step grid matching the exact transient hits.',
          objective: 'Translate human vocal rhythm into digital MIDI coordinates.',
          actionLabel: 'Open Cadence to MIDI Lab'
        },
        quiz: {
          question: 'What is the primary benefit of translating a spoken vocal cadence into MIDI note coordinates?',
          options: [
            'It creates tight instrumental melodies that match the rhythmic bounce of the vocalist',
            'It automatically tunes the vocal track',
            'It reduces CPU load on the computer',
            'It eliminates the need for drum tracks'
          ],
          correctIndex: 0,
          explanation: 'Mapping spoken cadences to MIDI produces cohesive arrangements where leads and vocals lock together.'
        }
      },
      {
        id: 'm2-l7',
        moduleId: 'module-2',
        lessonNumber: 7,
        title: 'Velocity Is Impact',
        subtitle: 'Beyond Volume: The Dynamic Performance Parameter',
        coreQuestion: 'Why do flat MIDI drum patterns sound like a robot machine gun?',
        summary:
          'Velocity is a 1–127 performance parameter. Novices leave all notes at 100; producers sculpt ghost hits (20–40) and hard accents (115–127) to create groove.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'velocity-sculptor',
        sections: [
          {
            heading: '7.1 Beyond Volume: The Dynamic Parameter',
            content: `In MIDI architecture, Velocity is a numerical parameter ranging from 1 to 127 attached to the start of every note event.

Amateur producers mistake velocity for a simple track volume fader. However, in modern synthesizers, sample libraries, and drum engines, velocity alters physical acoustic behavior:

- Low Velocity (20 – 50 / Ghost Notes):
  Triggers softer, warmer, darker samples with subdued high frequencies. Essential for background snare ghost hits and rolling off-beat hi-hats.
- Medium Velocity (70 – 95 / Conversational Hits):
  Standard baseline body for primary musical phrases.
- Maximum Velocity (110 – 127 / Accented Hits):
  Triggers aggressive, bright, cutting samples with maximum harmonic distortion and transient snap.

The Machine Gun Trap:
If every 16th-note hi-hat in your trap beat is set to a flat velocity of 100, your beat will sound like a cheap, robotic toy machine gun. Real human drummers naturally strike accented downbeats with force and graze off-beat subdivisions softly.`,
            diagram: {
              type: 'velocity',
              code: `Flat Machine Gun (Robotic):    [100][100][100][100][100][100][100][100]  (Sterile, exhausting)
Dynamic Human Groove:          [120] [35] [85] [40] [115] [30] [90] [45]  (Infectious, rolling bounce)
Velocity Lane Stalks:          █    ▂    ▆    ▂    █     ▂    ▆    ▂`
            },
            keyTakeaway:
              'Velocity is physical impact, not just volume. Alternate between heavy accents (110-127) and quiet ghost notes (25-45) to create bounce.'
          }
        ],
        toolMapping: {
          dawFeature: 'Velocity Stalk Lane / MIDI Humanize Velocity Randomizer',
          description:
            'The vertical stalk editor located beneath the piano roll keys displaying the velocity value of each individual note.',
          proTip:
            'Highlight your entire hi-hat track, select every alternating off-beat note, and drag their velocity stalks down to 40. This creates an instant rolling bounce in under 5 seconds.'
        },
        exercise: {
          instruction:
            'Adjust the velocity stalks of a flat 16-step hi-hat pattern from uniform 100s to alternating accented downbeats (120) and soft ghost hits (35). Listen to how the groove comes alive.',
          objective: 'Sculpt MIDI velocity to transform robotic patterns into dynamic, breathing grooves.',
          actionLabel: 'Launch Velocity Sculptor Lab'
        },
        quiz: {
          question: 'What velocity range is typically utilized for subtle "ghost notes" on snares and hi-hats?',
          options: ['Velocity 20 to 50', 'Velocity 127 only', 'Velocity 0', 'Velocity 255'],
          correctIndex: 0,
          explanation: 'Velocity 20 to 50 provides quiet, textured dynamic support without overpowering primary accents.'
        }
      },
      {
        id: 'm2-l8',
        moduleId: 'module-2',
        lessonNumber: 8,
        title: 'Note Length Is Behavior',
        subtitle: 'Sustained vs. Staccato Dynamics',
        coreQuestion: 'How does dragging the end of a note block change the groove without changing the pitch?',
        summary:
          'Note duration dictates behavior: Short staccato ticks create bouncy percussive agility, while sustained legato blocks create atmospheric pads and deep sub-bass weight.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'note-length-lab',
        sections: [
          {
            heading: '8.1 Sustained vs. Staccato Dynamics',
            content: `A note on the piano roll is not defined solely by when it begins (X) or what pitch it plays (Y); it is critically defined by its Gate Duration (Note Length).

- Staccato (Short, Clipped Note Blocks):
  Notes that end almost immediately after triggering (1/16th or 1/32nd note duration).
  Aesthetic Effect: High rhythmic agility, bouncy, percussive, leaves wide acoustic space for vocals and drums.
  Instruments: Pluck synths, muted guitars, stab horns, 808 trap rolls.

- Legato / Sustained (Long, Continuous Note Blocks):
  Notes that sustain across full beats or overlap across bar boundaries.
  Aesthetic Effect: Heavy, atmospheric, emotional, provides sonic glue that holds a mix together.
  Instruments: Sub-bass 808 slides, string pads, ambient synthesizers.`
          }
        ],
        toolMapping: {
          dawFeature: 'MIDI Note Legato / Trim / Note Gate Parameter',
          description:
            'Keyboard shortcuts that extend note tails to touch the next note (Legato) or chop them into uniform short lengths (Staccato).',
          proTip:
            'If your 808 sub-bass is clashing with your kick drum, shorten the length of the 808 note block so it cuts off before the next kick hits, preventing low-end rumble.'
        },
        exercise: {
          instruction:
            'Shorten bass notes to 16th-note ticks (staccato), then stretch them to full 4-beat measure blocks (sustained). Observe how the perceived weight and room fill change.',
          objective: 'Control note duration to manipulate acoustic space and groove density.',
          actionLabel: 'Launch Note Length Lab'
        },
        quiz: {
          question: 'What is the primary aesthetic effect of using short, staccato note blocks in a melody?',
          options: [
            'It creates bouncy rhythmic agility and leaves open space for other instruments and vocals',
            'It makes the song sound out of tune',
            'It automatically boosts the sub-bass frequencies',
            'It slows down the master tempo'
          ],
          correctIndex: 0,
          explanation: 'Staccato notes minimize sonic crowding, providing rhythmic agility and leaving acoustic room for vocals.'
        }
      },
      {
        id: 'm2-l9',
        moduleId: 'module-2',
        lessonNumber: 9,
        title: 'Frequency Ranges & EQ Real Estate',
        subtitle: 'The Sonic Spectrum Breakdown & EQ Discipline',
        coreQuestion: 'Why does your mix sound muddy in cheap headphones, and how do you clean it up?',
        summary:
          'Every sound must occupy its own lane: Sub-bass (20–60Hz), Bass (60–250Hz), Low-Mid mud zone (250–500Hz), Midrange vocal core (500–2kHz), and Treble (2–20kHz).',
        pedagogicalStage: 'hear',
        interactiveWidgetId: 'frequency-spectrum-eq',
        sections: [
          {
            heading: '9.1 The Sonic Spectrum Breakdown',
            content: `The master audio bus has a finite amount of acoustic real estate spanning from 20 Hz to 20,000 Hz. If multiple instruments compete for the exact same frequency band at the exact same time, your mix collapses into a distorted, indistinct soup known as Mud.

The 5 Core Frequency Territories:

1. Sub-Bass (20 Hz – 60 Hz):
   Residents: 808 Sub fundamental, low kick thump.
   Rule: ONLY ONE instrument should occupy this territory at a time. High-pass filter everything else.

2. Bass & Low-End (60 Hz – 250 Hz):
   Residents: Bass guitar, kick body, snare weight.
   Rule: Provides structural warmth. Keep centered in mono.

3. Low-Midrange "Mud Zone" (250 Hz – 500 Hz):
   Residents: Piano fundamentals, synth bodies, vocal warmth.
   Rule: The most dangerous zone in audio engineering. Clutter here causes boxiness and lack of clarity.

4. Midrange "Vocal Core" (500 Hz – 2,000 Hz / 2 kHz):
   Residents: Lead vocal formants, snare crack, guitar leads.
   Rule: The frequency zone the human ear is most sensitive to. Keep clean for vocal intelligibility.

5. High-Mids & Treble (2,000 Hz – 20,000 Hz):
   Residents: Hi-hats, vocal consonants (S, T), cymbal sizzle, air sheen.
   Rule: Provides brightness and spatial presence. Boost carefully to avoid harsh sibilance.`
          },
          {
            heading: '9.2 The Legendary 300 Hz Mud Cut',
            content: `If your vocal sounds muffled or gets buried by the beat, do not simply turn the vocal volume up. Instead, apply the 300 Hz Mud Cut:

1. Open a Parametric EQ on your instrumental / beat track.
2. Create a bell curve filter centered at 300 Hz with a Q bandwidth of 1.5.
3. Cut the frequency by -3 dB to -4 dB.
4. Hit play with the vocal unmuted.
Notice how the vocal suddenly pops out with pristine clarity without touching the vocal fader. You carved out acoustic room for the vocal to live in.`
          }
        ],
        toolMapping: {
          dawFeature: 'Parametric EQ (e.g., FabFilter Pro-Q, FL Studio Parametric EQ 2)',
          description:
            'A digital equalizer plugin displaying real-time frequency curves, allowing producers to cut unwanted frequencies and boost clarity.',
          proTip:
            'Always apply a High-Pass Filter (Low Cut) at 30 Hz on your master bus to eliminate sub-audible subsonic rumble that wastes amplifier power without adding musical value.'
        },
        exercise: {
          instruction:
            'Using the interactive Parametric EQ, sweep a narrow bell filter through 300 Hz on an instrumental track. Toggle a 3 dB cut and hear the vocal pop into sharp focus.',
          objective: 'Identify frequency clutter and carve out dedicated spectral real estate using EQ.',
          actionLabel: 'Launch Frequency Spectrum & EQ Lab'
        },
        quiz: {
          question: 'Which frequency band is universally recognized by mix engineers as the "Mud Zone" where clutter ruins clarity?',
          options: ['250 Hz to 500 Hz (Low-Midrange)', '20 Hz to 40 Hz', '10 kHz to 15 kHz', '5 kHz to 8 kHz'],
          correctIndex: 0,
          explanation: 'The 250 Hz to 500 Hz region collects excessive acoustic energy from synths, vocals, and bass, creating muddy mixes.'
        }
      },
      {
        id: 'm2-l10',
        moduleId: 'module-2',
        lessonNumber: 10,
        title: 'From MIDI to Audio',
        subtitle: 'The Signal Chain Architecture',
        coreQuestion: 'What actually happens between pressing a key on your phone and sound hitting your eardrum?',
        summary:
          'Trace the 4-stage signal chain: 1. MIDI Coordinate Instruction → 2. Synthesizer/Sampler Engine → 3. Audio Waveform Stream → 4. Speaker Air Displacement.',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'signal-chain-flow',
        sections: [
          {
            heading: '10.1 The 4-Stage Signal Chain Architecture',
            content: `To become a self-reliant producer and engineer, you must understand the exact technological path sound takes from digital instruction to acoustic vibration:

Stage 1: MIDI Instruction Generation (The Brain)
You tap a key on your MIDI controller or screen. The software generates numerical data: Note Number, Timestamp, Velocity.

Stage 2: Virtual Instrument DSP Engine (The Voice)
The MIDI data packet arrives at a Virtual Instrument (synthesizer oscillator or multi-sampled audio buffer). The DSP engine calculates the digital waveform equations in real time.

Stage 3: Audio Effects & Mixing Bus (The Processing)
The digital audio stream passes through EQ, compression, distortion, delay, and reverb plugins, shaping frequency, dynamics, and space.

Stage 4: Digital-to-Analog Converter & Transducer (The Physical Ear)
The 24-bit / 48kHz digital binary numbers are converted into electrical voltage fluctuations by your audio interface (DAC). These electrical voltages drive the magnet and voice coil of your speaker or headphone diaphragm, physically pushing air molecules into your eardrum.`
          }
        ],
        toolMapping: {
          dawFeature: 'Mixer Signal Routing / Audio Track Bouncing (Freeze / Flatten)',
          description:
            'Routing digital audio channels through bus sends and converting CPU-heavy MIDI synth tracks into permanent static audio waveforms.',
          proTip:
            'Once you finish programming a complex MIDI synth part, "Bounce to Audio" (or Freeze Track). This locks in your sound, frees up 90% of your computer CPU, and prevents accidental MIDI editing mistakes.'
        },
        exercise: {
          instruction:
            'Trigger a note on the interactive pad and trace its visual journey through the 4-stage signal chain from raw MIDI data to speaker air displacement.',
          objective: 'Explain the complete signal chain from MIDI data to physical acoustic vibration.',
          actionLabel: 'Launch Signal Chain Flow Lab'
        },
        quiz: {
          question: 'What is the role of the Digital-to-Analog Converter (DAC) in the music production signal chain?',
          options: [
            'It converts binary digital numbers into electrical voltage that moves the physical speaker cone',
            'It automatically quantizes MIDI notes to the grid',
            'It removes vocal breaths from audio recordings',
            'It increases the tempo of the project'
          ],
          correctIndex: 0,
          explanation: 'The DAC translates digital computer audio calculations into physical electrical voltage to drive speakers.'
        }
      },
      {
        id: 'm2-capstone',
        moduleId: 'module-2',
        lessonNumber: 'Capstone',
        title: 'Module 2 Capstone: Build the Skeleton',
        subtitle: 'Programming a 4-Track Production from MIDI Coordinates',
        coreQuestion: 'Can you construct a complete musical skeleton with drums, sub-bass, chords, and melody?',
        summary:
          'Construct a 4-track skeleton: 4-beat drums with hi-hat velocity variation, sub-bass locked to 30–100 Hz, 3-chord minor triad progression, and mixed-length melody.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'm2-capstone-workbench',
        sections: [
          {
            heading: 'Module 2 Capstone Production Requirements',
            content: `To complete Module 2 and unlock Module 3, program and verify a complete 4-track musical skeleton adhering strictly to the following parameters:

1. Track 1 (Drum Groove):
   4-beat drum pattern with kick, snare, and 1/16th-note hi-hats. Hi-hats MUST demonstrate explicit velocity sculpting (alternating between 115+ accents and 35-45 ghost notes).

2. Track 2 (Sub-Bass Line):
   Sub-bass 808 pattern locked strictly to the 30 Hz – 90 Hz frequency window, rooted to the fundamental key of your scale.

3. Track 3 (Harmonic Chords):
   A 3-chord minor progression utilizing vertically stacked triads or minor 7th chords in the low-mid spectrum (200 Hz – 800 Hz).

4. Track 4 (Top-Line Melody):
   A lead melody utilizing mixed note lengths (alternating staccato plucks and sustained legato phrases) with no notes clashing out-of-scale.

5. Frequency Verification: Check with a spectrum analyzer to confirm that no instruments clutter the critical 300 Hz mud zone or 500 Hz – 2 kHz vocal pocket.`
          }
        ],
        exercise: {
          instruction:
            'Open the Capstone 2 Workbench and construct your complete 4-track production skeleton meeting all theoretical constraints.',
          objective: 'Master multi-track MIDI arrangement, frequency distribution, velocity sculpting, and scale harmony.',
          actionLabel: 'Launch Module 2 Capstone Studio'
        }
      }
    ]
  },
  {
    id: 'module-3',
    number: 3,
    title: 'THE INTERPLAY',
    subtitle: 'Human Feel, Quantization & Controlled Imperfection',
    tagline: 'FEEL → MAP → CONTROL',
    coreQuestion: 'When should the human obey the grid, and when should the grid get out of the way?',
    description:
      'Modules 1 and 2 established temporal placement and digital coordinate mapping. Module 3 addresses the central tension of digital production: the collision between machine precision and human variance. The grid provides structural architecture; the performer provides organic character. Neither is inherently correct. The producer decides.',
    color: 'from-emerald-500 to-teal-600',
    accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-500/30',
    lessons: [
      {
        id: 'm3-l1',
        moduleId: 'module-3',
        lessonNumber: 1,
        title: 'The Grid Is a Ruler',
        subtitle: 'The Mathematics of Quantization',
        coreQuestion: 'What does the "Quantize" button actually do mathematically, and what does it destroy?',
        summary:
          'Quantization snaps timing deviations to the nearest mathematical grid line. While it fixes sloppiness, 100% hard quantize strips away organic human life.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'quantize-ruler',
        sections: [
          {
            heading: '1.1 The Mathematics of Quantization',
            content: `Quantization is the digital process of shifting recorded musical events (MIDI note-ons or audio transients) toward predetermined, mathematically rigid rhythmic grid coordinates.

How Quantization Works Mathematically:
When you perform live on MIDI pads, your human fingers strike notes with natural micro-timing drift:
- Note 1 lands at timestamp: 0.002s (+2ms late)
- Note 2 lands at timestamp: 0.231s (-19ms early)
- Note 3 lands at timestamp: 0.518s (+18ms late)

When you hit "Quantize 100% (1/16)":
The software calculates the nearest sixteenth-note grid boundary for every event and forces its start timestamp to align dead-center on the line (0.000s, 0.250s, 0.500s).

The Dual-Edged Sword:
- The Benefit: Eliminates human sloppiness, fixes fatal timing errors, and locks heavy kick drums into unyielding synchronization.
- The Danger: Eradicates all organic human micro-timing variations. When every single track is 100% hard-quantized, the music loses its pulse and sounds sterile, lifeless, and robotic.`
          },
          {
            heading: '1.2 Quantize Strength: The 50% Compromise',
            content: `Professional producers rarely use 100% hard quantization. Instead, they use Quantize Strength (Iterative Quantization):

- 100% Strength: Moves note 100% of the distance to the grid line (pure robot).
- 50% Strength: Moves note exactly halfway between where you played it and where the grid line sits.

Applying 50% quantize strength tightens loose timing mistakes while preserving the subtle, organic human character of your original performance.`
          }
        ],
        toolMapping: {
          dawFeature: 'Quantize Strength / Iterative Quantize (Alt + Q)',
          description:
            'A quantization dialog parameter allowing producers to dial in partial alignment strength (e.g., 40% to 70%) rather than snapping 100%.',
          proTip:
            'Never quantize live-recorded piano, rhodes, or acoustic guitar to 100%. Select the MIDI, set Quantize Strength to 45%, and apply. It tightens the groove while retaining human warmth.'
        },
        exercise: {
          instruction:
            'Adjust the Quantization Strength slider from 0% (Loose Human) to 50% (Tight Pocket) to 100% (Machine Locked). Audit how the stiffness changes.',
          objective: 'Understand quantization as mathematical error correction and recognize its artistic trade-offs.',
          actionLabel: 'Open Quantize Ruler Lab'
        },
        quiz: {
          question: 'What is the primary risk of applying 100% global hard quantization across every track in a song?',
          options: [
            'It strips away organic micro-timing variations, making the song sound sterile and robotic',
            'It detunes the pitches of all notes by a semitone',
            'It introduces severe digital audio clipping distortion',
            'It deletes all low-end frequencies below 100 Hz'
          ],
          correctIndex: 0,
          explanation: '100% hard quantization eliminates the natural micro-timing discrepancies where organic groove lives.'
        }
      },
      {
        id: 'm3-l2',
        moduleId: 'module-3',
        lessonNumber: 2,
        title: 'Quantization Is Not Groove',
        subtitle: 'Mathematical Alignment vs. Effective Timing',
        coreQuestion: 'Why can a drum loop be 100% mathematically in time but completely boring to listen to?',
        summary:
          'A performance can be mathematically flawless on the grid yet utterly devoid of groove. True bounce emerges from micro-timing discrepancies between elements.',
        pedagogicalStage: 'hear',
        interactiveWidgetId: 'groove-ab-tester',
        sections: [
          {
            heading: '2.1 Mathematical Alignment vs. Effective Timing',
            content: `A common myth among amateur producers is that "good timing" equals "mathematical grid perfection."

In reality, a drum loop can be 100% aligned to the grid yet feel completely stiff, exhausting, and uninspired.

Groove does not live on the grid lines; groove lives in the deliberate, consistent micro-timing discrepancies between different instruments in the arrangement:
- The kick drum sits dead-center on the grid (providing the anchor).
- The snare lands +25ms behind the beat (providing relaxed swagger).
- The hi-hats anticipate the off-beat by -10ms (providing forward propulsion).

When these three micro-timing offsets interact, they create an elastic push-and-pull dynamic that makes the human body want to dance.`
          }
        ],
        toolMapping: {
          dawFeature: 'Groove Pool / Extract Groove Template',
          description:
            'A feature in Ableton Live, Logic Pro, and Reason that extracts the micro-timing and velocity profile of classic funk/soul records and applies it to your quantized MIDI tracks.',
          proTip:
            'Extract the groove from a classic James Brown drum break (like Clyde Stubblefield on "Funky Drummer") and apply that groove template to your trap hi-hats at 35% intensity.'
        },
        exercise: {
          instruction:
            'Perform an instant A/B switch between a 100% Quantized robotic drum loop and a Relational Pocket groove. Listen to the breathing room between kick and snare.',
          objective: 'Distinguish between mathematically perfect alignment and effective organic groove.',
          actionLabel: 'Launch Groove A/B Tester'
        },
        quiz: {
          question: 'Where does musical "bounce" and groove primarily originate in digital production?',
          options: [
            'In the deliberate, consistent micro-timing discrepancies between interacting instruments',
            'In locking every note dead-center to the 1/16th grid',
            'In turning the master volume up to maximum',
            'In using only one instrument throughout the entire song'
          ],
          correctIndex: 0,
          explanation: 'Groove emerges from the elastic push-and-pull between elements (e.g. laid-back snare against on-grid kick).'
        }
      },
      {
        id: 'm3-l3',
        moduleId: 'module-3',
        lessonNumber: 3,
        title: 'Swing',
        subtitle: 'Altering Subdivision Timing Relationships',
        coreQuestion: 'What turns a stiff military march into a head-nodding hip-hop bounce?',
        summary:
          'Swing delays the second subdivision in a pair (e.g. the "&" of the beat), creating an uneven long-short ratio (50% straight up to 66% triplet bias).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'swing-shaper',
        sections: [
          {
            heading: '3.1 Altering Subdivision Relationships',
            content: `Swing is the intentional mathematical manipulation of the temporal relationship between paired subdivisions.

In Straight Timing (50% Swing):
The two eighth notes in a beat are spaced in a perfect 1:1 mathematical ratio (50% of the time window for the first note, 50% for the second note).
Spoken Sound: EVEN — EVEN — EVEN — EVEN (Military march, techno, kraftwerk)

In Swung Timing (55% to 66% Swing):
The second subdivision is delayed later in time, creating an uneven LONG — short — LONG — short ratio:
- 54% Swing: Subtle human warmth (Contemporary R&B)
- 58% – 62% Swing: The classic Boom-Bap head-nod zone (J Dilla, DJ Premier, Pete Rock)
- 66% Swing: Perfect Triplet Shuffle (Blues, 90s G-Funk, UK Garage)`
          },
          {
            heading: '3.2 The MPC Swing Algorithm (Roger Linn Physics)',
            content: `In 1988, legendary engineer Roger Linn designed the Akai MPC60 drum machine. His hardware swing algorithm became the foundational heartbeat of 90s hip-hop.

Linn’s formula calculates the millisecond delay applied to every even-numbered sixteenth note:

    Delay Offset Δt = Sixteenth Note Window × ((Swing% - 50%) / 50%)

At 90 BPM (1/16th note = 166.67 ms):
- At 50% Swing: Offset = 0.0 ms (Dead straight)
- At 60% Swing: Offset = +33.3 ms delay on every off-beat 16th note.

This +33.3ms delay is the exact mathematical reason why 90s golden-era hip-hop makes listeners nod their heads automatically.`
          }
        ],
        toolMapping: {
          dawFeature: 'Global Swing Fader / Groove Quantize Swing %',
          description:
            'A master groove fader in all modern DAWs (e.g., FL Studio Swing Slider, Ableton Groove Pool) that delays off-beat subdivisions across selected tracks.',
          proTip:
            'In FL Studio, push the global swing slider in the Channel Rack to 58%. It immediately transforms rigid drum loops into classic East Coast golden-era bounce.'
        },
        exercise: {
          instruction:
            'Slide the Swing parameter from 50% (Straight) to 60% (Boom-Bap Nod) to 70% (Heavy Shuffle). Watch the hi-hat markers shift dynamically across the timeline.',
          objective: 'Calculate and apply swing percentages to transform straight subdivisions into head-nodding bounce.',
          actionLabel: 'Launch Swing Shaper Lab'
        },
        quiz: {
          question: 'What happens to the second note in a subdivision pair when swing percentage is increased from 50% to 60%?',
          options: [
            'It is delayed slightly later in time, creating an uneven long-short bounce',
            'It is played 10 dB louder',
            'It is shifted higher in pitch by one octave',
            'It is shifted earlier in time before the beat'
          ],
          correctIndex: 0,
          explanation: 'Swing delays the second (off-beat) subdivision, creating the classic long-short groove ratio.'
        }
      },
      {
        id: 'm3-l4',
        moduleId: 'module-3',
        lessonNumber: 4,
        title: 'Microtiming',
        subtitle: 'Sub-Millisecond Deviations on Individual Tracks',
        coreQuestion: 'How does nudging just the snare by 25 milliseconds change the entire emotional posture of a song?',
        summary:
          'Microtiming involves applying microscopic shifts (+5ms to +45ms) to individual instruments. Pushing snares late relaxes the groove; pushing kicks early drives momentum.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'microtiming-nudge',
        sections: [
          {
            heading: '4.1 Sub-Millisecond Deviations on Individual Tracks',
            content: `While Swing applies a global formula across paired subdivisions, Microtiming is the surgical art of shifting individual instruments or specific hits forward or backward by microscopic millisecond offsets:

1. The Laid-Back Snare (+15 ms to +35 ms late):
   Shifting Beat 2 and Beat 4 snares slightly behind the kick drum transient.
   Aesthetic Effect: Unlocks immense spatial relaxation and heavy swagger. The track feels wide and confident.

2. The Driving Kick (-5 ms to -15 ms early):
   Shifting the kick drum slightly ahead of the grid.
   Aesthetic Effect: Creates aggressive urgency and forward propulsion, common in punk, drill, and fast club music.

3. The Floating Hi-Hat (+10 ms late with random ±5ms jitter):
   Creates a loose, human, organic shaker texture that dances around the rigid kick.`
          }
        ],
        toolMapping: {
          dawFeature: 'Nudge Tool / Track Time Shift / Sub-Frame Offset',
          description:
            'Moving audio or MIDI regions left/right by discrete millisecond or sample values without snapping to the visual grid.',
          proTip:
            'Disable grid snap, zoom in to your snare track, and drag the snare clip 20ms to the right of the grid line. Unmute your vocals and hear how much wider the entire mix feels.'
        },
        exercise: {
          instruction:
            'Nudge the snare from 0ms (Dead Grid) to +25ms behind the kick in real time. Listen closely to how the pocket opens up and breathes.',
          objective: 'Apply surgical micro-timing shifts to individual tracks to sculpt groove posture.',
          actionLabel: 'Launch Microtiming Nudge Lab'
        },
        quiz: {
          question: 'What emotional effect is created by shifting only the snare drum +25 milliseconds behind the grid?',
          options: [
            'It creates relaxed swagger and opens up spatial room without slowing down the song tempo',
            'It causes the entire track to fall out of sync',
            'It distorts the high frequencies of the snare',
            'It shifts the key of the song into minor'
          ],
          correctIndex: 0,
          explanation: 'Nudging the snare slightly late creates an effortless, laid-back pocket while the kick maintains the clock.'
        }
      },
      {
        id: 'm3-l5',
        moduleId: 'module-3',
        lessonNumber: 5,
        title: 'Humanization',
        subtitle: 'Controlled Variation vs. Randomization',
        coreQuestion: 'Why does clicking a randomizer button sound sloppy while real drummers sound amazing?',
        summary:
          'Random is not human. Real musicians follow consistent tendencies: physical fatigue, emotional accent spikes, and bounded micro-timing (±5ms, ±10 velocity).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'humanization-matrix',
        sections: [
          {
            heading: '5.1 Controlled Variation vs. Chaotic Randomization',
            content: `Amateur producers often try to escape robotic quantization by clicking a "Randomize" button in their DAW.

The result is almost always disastrous. True human musicians do NOT play with random chaos. A human drummer does not accidentally hit a hi-hat 200ms late at velocity 12, followed by a snare 150ms early at velocity 127.

Real human performance exhibits Bounded, Tendency-Driven Micro-Variation:
- Tendency 1: Strong beats (Beats 1 & 3) are struck with higher physical velocity than weak off-beats.
- Tendency 2: As a verse progresses, excitement causes slight velocity acceleration.
- Tendency 3: Hand dominance means the right hand strikes slightly harder and earlier than the left hand.

The Controlled Humanization Rule:
Apply bounded micro-variation: Timing variation should NEVER exceed ±5ms to ±8ms, and velocity variation should stay within a controlled ±8 to ±12 value range.`
          }
        ],
        toolMapping: {
          dawFeature: 'MIDI Humanize Plugin / Bounded Randomizer',
          description:
            'A MIDI processing utility that introduces subtle, bounded variations to note start times, velocities, and note lengths.',
          proTip:
            'In Logic or Reaper, open the Humanize dialog. Set Timing variation to a strict maximum of ±6 ticks and Velocity variation to ±8. This delivers authentic human warmth without introducing sloppy timing errors.'
        },
        exercise: {
          instruction:
            'Compare three playback modes: 1. Robotic Static (0% variation), 2. Chaotic Randomizer (unbounded noise), 3. Controlled Humanization (bounded ±5ms / ±10 vel).',
          objective: 'Apply bounded, intentional variation to simulate authentic human performance.',
          actionLabel: 'Launch Humanization Matrix'
        },
        quiz: {
          question: 'Why does unconstrained random timing variation fail to sound like a real human performance?',
          options: [
            'Real musicians follow consistent physical tendencies and bounded timing windows, not random mathematical noise',
            'Because computers cannot generate true random numbers',
            'Because human drummers always play at 100% velocity',
            'Because random timing detunes the pitch of the drums'
          ],
          correctIndex: 0,
          explanation: 'Human performance is governed by physiological tendencies and bounded micro-variations, not chaotic random noise.'
        }
      },
      {
        id: 'm3-l6',
        moduleId: 'module-3',
        lessonNumber: 6,
        title: 'Groove Is Relational',
        subtitle: 'The Interdependent Sonic Ecosystem',
        coreQuestion: 'Who leads, who follows, who leaves space, and who creates tension in a beat?',
        summary:
          'Groove is never a solitary metric; it emerges from relationships among kick, snare, hi-hat, bass, and vocals.',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'relational-groove-mixer',
        sections: [
          {
            heading: '6.1 The Interdependent Sonic Ecosystem',
            content: `Groove is never an isolated property of a single instrument. You cannot create groove on a solo snare track in isolation.

Groove is an interdependent conversation between five structural pillars:

1. The Kick Drum (The Anchor / Foundation):
   Locks down the primary integer downbeats (Beat 1 and Beat 3.5), establishing the unyielding physical spine.

2. The Snare / Clap (The Release Point):
   Frames the resolution of every cycle on Beat 2 and Beat 4. Its micro-timing offset dictates whether the track feels urgent (on-grid) or laid-back (late).

3. The Hi-Hats / Percussion (The Subdivision Engine):
   Drives the perceived velocity through continuous 8th, 16th, or triplet subdivisions.

4. The Sub-Bass / 808 (The Low-End Glue):
   Locks into the kick drum transient while weaving melodic roots through the low-end spectrum.

5. The Lead Vocal (The Emotional Commander):
   Weaves across the instrumental landscape, using the empty spaces left by the snare and bass to deliver lyrical punchlines.`
          }
        ],
        toolMapping: {
          dawFeature: 'Sidechain Compression / Dynamic Sidechain Ducking',
          description:
            'A mixing technique where the signal of one track (e.g. Kick) automatically turns down the volume of another track (e.g. Sub-Bass) for a few milliseconds to prevent frequency masking.',
          proTip:
            'Route your kick drum into a fast-release Sidechain Compressor on your 808 bass track. Every time the kick punches, the 808 ducks by -4 dB for 40ms, allowing the kick transient to hit clean without muddy distortion.'
        },
        exercise: {
          instruction:
            'Mute and solo individual tracks in the 5-track relational mixer. Observe how muting the hi-hat immediately changes how fast the bassline feels to your ears.',
          objective: 'Analyze and sculpt groove as an interdependent relationship between multiple tracks.',
          actionLabel: 'Open Relational Groove Mixer'
        },
        quiz: {
          question: 'What is the primary purpose of applying sidechain compression between the kick drum and 808 sub-bass?',
          options: [
            'To duck the bass volume momentarily so the kick transient hits clean without low-end clutter',
            'To tune the kick drum up one octave',
            'To make the hi-hats sound wider in stereo',
            'To increase the master tempo during choruses'
          ],
          correctIndex: 0,
          explanation: 'Sidechain ducking temporarily lowers competing low-end bass frequencies during the kick transient impact.'
        }
      },
      {
        id: 'm3-l7',
        moduleId: 'module-3',
        lessonNumber: 7,
        title: 'The Human Versus the Machine',
        subtitle: 'Defining Core Capabilities and Roles',
        coreQuestion: 'What does the computer do best, and what must the human never surrender to software?',
        summary:
          'Machine strengths: Infinite repetition, absolute precision, zero fatigue, rapid editing. Human strengths: Emotional interpretation, micro-variation, dynamic context. The producer decides.',
        pedagogicalStage: 'name',
        interactiveWidgetId: 'capability-matrix',
        sections: [
          {
            heading: '7.1 Defining Core Capabilities and Roles',
            content: `The modern music producer is not a pure acoustic musician, nor a passive button-pusher; they are the commander of a human-machine collaboration.

To produce masterworks, you must understand what to delegate to the machine and what must remain fiercely human:

● Machine Strengths (Delegate to Software):
  1. Infinite exact repetition (looping a 4-bar break for 4 minutes without slowing down).
  2. Sub-millisecond timing precision and absolute pitch mathematical calculation.
  3. Zero physical fatigue or cognitive degradation over 12-hour studio sessions.
  4. Rapid non-destructive editing, arrangement restructuring, and audio rendering.

● Human Strengths (Never Surrender to Algorithms):
  1. Emotional intent, cultural context, and storytelling vulnerability.
  2. Real-time contextual timing decisions based on how the room feels.
  3. Dynamic vocal delivery, timbre modulation, and linguistic emphasis.
  4. Taste—the artistic judgment to know when a track is finished or when an imperfection is beautiful.`
          }
        ],
        toolMapping: {
          dawFeature: 'Automation Lanes (Volume, Filter Cutoff, Reverb Send)',
          description:
            'Drawing continuous parameter curves over time to inject dynamic human expression into static digital synth and drum tracks.',
          proTip:
            'Use a physical MIDI fader or modulation wheel to manually perform filter sweeps in real time while recording automation, rather than drawing sterile straight lines with a mouse.'
        },
        exercise: {
          instruction:
            'Sort musical production tasks into Machine-Assisted vs. Human-Driven categories in the interactive matrix.',
          objective: 'Articulate the distinct roles and strengths of human artistry and computer precision.',
          actionLabel: 'Open Capability Matrix'
        },
        quiz: {
          question: 'Which of the following musical elements should NEVER be fully surrendered to automated software algorithms?',
          options: [
            'Emotional intent, dynamic vocal expression, and artistic taste',
            'Sub-millisecond sample rate conversion math',
            'Looping a 4-bar drum audio file',
            'Saving digital project backups to cloud storage'
          ],
          correctIndex: 0,
          explanation: 'Emotional context, artistic taste, and dynamic human expression are uniquely human domains.'
        }
      },
      {
        id: 'm3-l8',
        moduleId: 'module-3',
        lessonNumber: 8,
        title: 'Controlled Imperfection',
        subtitle: 'The Comparative Triad Protocol',
        coreQuestion: 'How do master producers test and dial in the perfect amount of human imperfection?',
        summary:
          'Build and audit three distinct versions of one pattern: Version A (Machine/Quantized), Version B (Randomized/Loose), and Version C (Humanized/Controlled).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'controlled-imperfection-triad',
        sections: [
          {
            heading: '8.1 The Comparative Triad Protocol',
            content: `Master producers do not guess how much human feel to add; they use the Comparative Triad Protocol to audit and calibrate groove:

Build Three Distinct Versions of the Exact Same 4-Bar Beat:

1. Version A (The Machine Version):
   - 100% hard-quantized to the 1/16th grid.
   - All note velocities locked to a uniform 100.
   - 0% swing, 0ms microtiming offsets.
   - Quality: Clinical, loud, aggressive, but emotionally sterile.

2. Version B (The Chaotic / Sloppy Version):
   - Unconstrained random timing offsets (±35ms).
   - Uncontrolled random velocities (ranging from 10 to 127).
   - Quality: Muddy, loose, unstable, amateurish.

3. Version C (The Controlled Character Version):
   - Kick locked to grid (Anchor).
   - Snare nudged +25ms behind the beat (Swagger).
   - Hi-hats programmed with 58% swing and dynamic velocity stalks (120 accent / 40 ghost).
   - Quality: Breathing, infectious, professional, undeniable bounce.`
          }
        ],
        toolMapping: {
          dawFeature: 'A/B Version Snapshot / Track Alternatives',
          description:
            'A DAW workflow feature (Logic Track Alternatives, Pro Tools Playlists, Ableton Takes) allowing instant zero-latency toggling between different production arrangements.',
          proTip:
            'Always set up an instant A/B key command to toggle between your quantized Version A and humanized Version C. If Version C does not make your head nod instantly, re-adjust the snare micro-timing offset.'
        },
        exercise: {
          instruction:
            'Switch instantly between Version A (Machine), Version B (Random), and Version C (Controlled Character) on the same beat using the Triad Player.',
          objective: 'Build, audit, and compare quantized, random, and humanized versions of a production idea.',
          actionLabel: 'Launch Triad Comparison Player'
        },
        quiz: {
          question: 'In the Comparative Triad Protocol, what defines Version C (The Controlled Character Version)?',
          options: [
            'Intentional microtiming, selective swing, and sculpted dynamic velocity applied with strict boundaries',
            '100% hard quantization on all tracks with zero velocity changes',
            'Completely random unconstrained timing and velocity chaos',
            'Muting all drum tracks and leaving only a vocal'
          ],
          correctIndex: 0,
          explanation: 'Version C combines structural machine stability (kick) with intentional human micro-timing and velocity dynamics.'
        }
      },
      {
        id: 'm3-l9',
        moduleId: 'module-3',
        lessonNumber: 9,
        title: 'Arrangement as Conversation',
        subtitle: 'Call-and-Response and Spatial Real Estate',
        coreQuestion: 'How do you prevent instruments from stepping on the vocals and cluttering the track?',
        summary:
          'Arrangement is not merely stacking audio blocks vertically; it is an active conversation between elements (Call-and-Response, punctuation, and frequency sharing).',
        pedagogicalStage: 'see',
        interactiveWidgetId: 'arrangement-conversation',
        sections: [
          {
            heading: '9.1 Sonic Interaction and Call-and-Response',
            content: `Amateur arrangement consists of stacking 30 audio blocks vertically on top of each other on the timeline, hitting play, and letting all 30 sounds fight for attention simultaneously.

Professional arrangement is an active acoustic conversation based on the ancient musical principle of Call-and-Response:

1. The Call (The Vocal Phrase):
   The lead vocal delivers a 2-bar lyric across Beats 1, 2, and 3. During this time, lead synthesizers and secondary guitars remain silent or play simple background pads.

2. The Response (The Instrumental Answer):
   On Beat 4 and the following downbeat rest, the vocal goes silent. A lead synth riff, brass stab, or vocal chop triggers in the newly opened space to answer the vocal line.

By arranging instruments in an alternating Call-and-Response dialogue, every element is heard with pristine clarity without competing for vocal real estate.`
          }
        ],
        toolMapping: {
          dawFeature: 'Arrangement Timeline / Section Markers / Track Mute Automation',
          description:
            'The macro arrangement window where verses, hooks, bridges, and drops are mapped out across time.',
          proTip:
            'Solo your vocal track and your lead synth track. Wherever you see vocal waveform audio, mute the lead synth. Wherever the vocal leaves a rest, unmute the synth to create instant professional call-and-response.'
        },
        exercise: {
          instruction:
            'In the Call-and-Response interactive lab, place lead synth answers strictly into the empty rests left by the vocal line. Hear how the track opens up.',
          objective: 'Structure arrangements as an interactive conversation rather than vertical block stacking.',
          actionLabel: 'Open Call & Response Lab'
        },
        quiz: {
          question: 'What is the primary benefit of utilizing Call-and-Response in song arrangement?',
          options: [
            'It prevents instruments from cluttering the vocal line, ensuring both vocals and leads are heard clearly in turn',
            'It automatically tunes out-of-pitch instruments',
            'It doubles the master tempo of the chorus',
            'It eliminates the need for equalizers and compressors'
          ],
          correctIndex: 0,
          explanation: 'Call-and-Response spaces out melodic elements across time so they never crowd each other or mask the lead vocal.'
        }
      },
      {
        id: 'm3-l10',
        moduleId: 'module-3',
        lessonNumber: 10,
        title: 'Tension and Release',
        subtitle: 'Unifying Rhythm and Harmony',
        coreQuestion: 'What makes a drop hit with maximum emotional payoff?',
        summary:
          'Tension and release operate across time and frequency: syncopation, unexpected rests, filter sweeps, and harmonic delay, resolving back onto the downbeat.',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'tension-release-widget',
        sections: [
          {
            heading: '10.1 Unifying Rhythm and Harmony for Maximum Impact',
            content: `The ultimate goal of all music composition, beat production, and vocal delivery is the mastery of Tension and Release (The Build and The Drop).

Music creates emotion by manipulating psychological expectation:

1. Building Rhythmic Tension:
   - Accelerating subdivisions: Progressing from 1/4 notes to 1/8 notes to 1/16 notes to rapid 1/32nd snare rolls.
   - Metric syncopation: Shifting accents to off-beat subdivisions, destabilizing the listener's internal clock.
   - The Pre-Drop Void: Muting all drums and sub-bass for the final beat of a buildup (pure silence).

2. Building Harmonic & Frequency Tension:
   - High-Pass Filter Sweeps: Cutting out all bass frequencies below 300 Hz during the buildup, starving the listener's body of low-end weight.
   - Harmonic dissonance: Holding an unresolved chord (like a Dominant 7th or Suspended 4th).

3. The Explosive Release (The Drop on Beat 1):
   - The instantaneous return of full sub-bass, unquantized drum transient impact, and root tonic chord on Beat 1. The psychological payoff delivers an overwhelming dopamine surge to the listener.`
          }
        ],
        toolMapping: {
          dawFeature: 'Filter Cutoff Automation / Master Pre-Drop Mute Razor',
          description:
            'Automating a Low-Pass / High-Pass filter cutoff frequency and slicing out 1 beat of audio immediately before the chorus downbeat.',
          proTip:
            'Cut a 1-beat hole of total silence on all instrumental tracks right before Beat 1 of your chorus. When the sub-bass drops back in on the downbeat, its perceived physical impact will be massive.'
        },
        exercise: {
          instruction:
            'Build up tension using the high-pass filter riser and 16th-note snare roll, weaponize the 1-beat pre-drop silence, then trigger the Drop on Beat 1.',
          objective: 'Connect rhythm, frequency filtering, and silence to execute explosive tension and release drops.',
          actionLabel: 'Launch Tension & Drop Builder'
        },
        quiz: {
          question: 'Why does cutting all sub-bass frequencies and inserting a 1-beat silence before the chorus make the drop hit harder?',
          options: [
            'It starves the listener of low-end energy, creating massive contrast when the sub-bass explodes back on Beat 1',
            'It speeds up the metronome automatically',
            'It removes harmonic distortion from the audio',
            'It shifts the key of the entire track up a half-step'
          ],
          correctIndex: 0,
          explanation: 'Extreme dynamic and frequency contrast starves the ear, amplifying the physical explosion of the drop.'
        }
      },
      {
        id: 'm3-capstone',
        moduleId: 'module-3',
        lessonNumber: 'Capstone',
        title: 'Module 3 Capstone: Break the Grid Without Losing the Beat',
        subtitle: 'The Three-Version Production Audit',
        coreQuestion: 'Can you deliberately manipulate timing, velocity, swing, and microtiming while preserving structure?',
        summary:
          'Synthesize all of Module 3: Program a 4-bar drum groove, 30-100Hz sub-bass, minor chords, and cadence, exporting Version A (Machine), Version B (Human), and Version C (Character).',
        pedagogicalStage: 'control',
        interactiveWidgetId: 'm3-capstone-workbench',
        sections: [
          {
            heading: 'Module 3 Capstone Production Requirements & Final Audit',
            content: `To graduate from The Hardwire Method curriculum and claim full certified production mastery, construct and export a complete multi-version production adhering to the following specifications:

1. Multitrack Foundation:
   - Track 1: 4-bar drum loop with deep sub-kick, crisp snare, and hi-hats with sculpted dynamic velocity.
   - Track 2: Sub-bass line locked to the 30 Hz – 90 Hz window.
   - Track 3: Minor 7th chord progression occupying the mid-range.
   - Track 4: Lyrical vocal cadence incorporating anapestic forward roll and intentional rests.

2. The Three-Version Export & Verification:
   - Version A: 100% hard-quantized machine version (baseline reference).
   - Version B: Humanized version with swing (58%) and bounded velocity variations.
   - Version C: Character Masterpiece featuring +25ms snare microtiming, call-and-response arrangement, and pre-drop silence.

3. Final Verification Standard: Articulate your engineering choices using the complete Hardwire Vocabulary (Feel → Map → Control).`
          }
        ],
        exercise: {
          instruction:
            'Build your complete multi-version production in the Capstone 3 Workbench and perform the 3-way version audit to complete the curriculum.',
          objective: 'Master deliberate microtiming, swing, displacement, and humanization.',
          actionLabel: 'Enter Module 3 Capstone Studio'
        }
      }
    ]
  }
];
