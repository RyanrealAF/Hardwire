import React, { useState } from 'react';
import { Play, CheckCircle, Award, Volume2, Search, Sparkles, BookOpen, Layers, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../audio/soundEngine';
import { FINAL_ASSESSMENT_QUESTIONS } from '../data/assessmentData';
import { VOCABULARY_LIST } from '../data/vocabularyData';

// 1. Capstone 1: Pocket Builder
export const Module1Capstone: React.FC = () => {
  const [activePreset, setActivePreset] = useState<'ontop' | 'behind' | 'anapest' | 'rests'>('behind');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const presets = {
    ontop: { name: 'Bars 1-2: On-Top (0ms Urgent Drill)', offset: 0, text: 'Straight precision, 0ms alignment on the grid line' },
    behind: { name: 'Bars 3-4: Behind-The-Beat (+45ms Boom-Bap)', offset: 45, text: 'Laid-back drag creating immense spatial swagger' },
    anapest: { name: 'Bars 5-6: Anapestic Roll (da-da-DUM)', offset: 20, text: 'Triplet slingshot pulling across the bar line' },
    rests: { name: 'Bars 7-8: Intentional Silent Rests', offset: 15, text: 'Erased syllables doubling subsequent punchline impact' }
  };

  const handleAudit = () => {
    soundEngine.init();
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
      setIsCompleted(true);
      confetti({ particleCount: 40, spread: 60 });
    }, 4000);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] font-sans">
            Module 01 Capstone Lab
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
            Build a Pocket: 8-Bar Master Routine
          </h3>
        </div>
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full font-sans">
            <CheckCircle className="w-4 h-4" /> Cleared
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-sans">
        {(Object.keys(presets) as (keyof typeof presets)[]).map((key) => (
          <button
            key={key}
            onClick={() => setActivePreset(key)}
            className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
              activePreset === key
                ? 'bg-[#F7F3F0] text-[#1A1A1A] font-bold border-[#C5A059] shadow-sm'
                : 'bg-[#FFFFFF] border-[#E5E1DA] text-[#8B8378] hover:border-[#C5A059]'
            }`}
          >
            <span className="block font-bold text-xs">{presets[key].name.split(':')[0]}</span>
            <span className="text-[10px] text-[#8B8378] mt-1 block font-serif italic">
              {presets[key].name.split(':')[1]}
            </span>
          </button>
        ))}
      </div>

      <div className="p-5 rounded-xl bg-[#F7F3F0] border-l-4 border-[#C5A059] text-xs font-serif space-y-1">
        <span className="font-sans font-bold text-[#1A1A1A] block">{presets[activePreset].name}</span>
        <p className="text-[#4A453E] text-sm leading-relaxed">{presets[activePreset].text}</p>
      </div>

      <button
        onClick={handleAudit}
        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-sans bg-[#1A1A1A] hover:bg-[#2D2A26] text-white flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
      >
        <Play className="w-4 h-4 fill-current text-[#C5A059]" />
        {isPlaying ? 'Auditing 8-Bar Pocket...' : 'Audit & Clear Module 1 Capstone'}
      </button>
    </div>
  );
};

// 2. Capstone 2: 4-Track Skeleton
export const Module2Capstone: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const triggerSkeleton = () => {
    soundEngine.init();
    setIsPlaying(true);
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        soundEngine.playKick(undefined, 110, true);
        soundEngine.playHiHat(undefined, i % 2 === 0 ? 100 : 35);
        if (i % 2 === 1) soundEngine.playSnare(undefined, 110);
        soundEngine.playBassNote(45, 0.4, 110);
        if (i % 4 === 0) soundEngine.playChord([60, 63, 67], 0.8, 80);
      }, i * 350);
    }
    setTimeout(() => {
      setIsPlaying(false);
      setIsCompleted(true);
      confetti({ particleCount: 50, spread: 70 });
    }, 8 * 350 + 200);
  };

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-6">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] font-sans">
            Module 02 Capstone Lab
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#1A1A1A]">
            Build the Skeleton: 4-Track MIDI Coordinates
          </h3>
        </div>
        {isCompleted && (
          <span className="flex items-center gap-1 text-xs font-bold text-[#15803D] bg-[#DCFCE7] px-3 py-1 rounded-full font-sans">
            <CheckCircle className="w-4 h-4" /> Cleared
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center font-sans">
        <div className="p-4 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="font-bold text-[#1A1A1A] block">1. Drums</span>
          <span className="text-[10px] text-[#8B8378]">Uneven Velocity Hi-Hats</span>
        </div>
        <div className="p-4 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="font-bold text-[#1A1A1A] block">2. Sub-Bass</span>
          <span className="text-[10px] text-[#8B8378]">30–100 Hz Window</span>
        </div>
        <div className="p-4 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="font-bold text-[#1A1A1A] block">3. Chords</span>
          <span className="text-[10px] text-[#8B8378]">3-Chord Minor Triad</span>
        </div>
        <div className="p-4 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA]">
          <span className="font-bold text-[#1A1A1A] block">4. Melody</span>
          <span className="text-[10px] text-[#8B8378]">Staccato/Sustained Mix</span>
        </div>
      </div>

      <button
        onClick={triggerSkeleton}
        className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-sans bg-[#1A1A1A] hover:bg-[#2D2A26] text-white flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
      >
        <Play className="w-4 h-4 fill-current text-[#C5A059]" />
        {isPlaying ? 'Playing Skeleton DAW...' : 'Audition & Verify Skeleton'}
      </button>
    </div>
  );
};

// 3. Final Assessment Quiz (12 Questions with Certification)
export const FinalAssessmentQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentQ = FINAL_ASSESSMENT_QUESTIONS[currentIndex];

  const handleSelect = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optIndex });
  };

  const calculateScore = () => {
    let score = 0;
    FINAL_ASSESSMENT_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (score >= 9) {
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
    }
  };

  const score = calculateScore();

  return (
    <div id="final-assessment" className="max-w-4xl mx-auto p-6 md:p-10 rounded-2xl bg-[#FFFFFF] border border-[#E5E1DA] shadow-sm space-y-8 font-sans">
      <div className="flex justify-between items-center border-b border-[#E5E1DA] pb-4">
        <div>
          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">
            Volume I &bull; Final Examination
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] mt-1">
            The Hardwire Method Certification Exam
          </h2>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F7F3F0] text-[#8B8378] border border-[#E5E1DA]">
          Question {currentIndex + 1} of {FINAL_ASSESSMENT_QUESTIONS.length}
        </span>
      </div>

      {!isSubmitted ? (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA] space-y-2">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase font-bold tracking-wider">
              {currentQ.category}
            </span>
            <h4 className="text-lg md:text-xl font-serif font-bold text-[#1A1A1A] leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isChosen = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all border flex items-start gap-3.5 ${
                    isChosen
                      ? 'bg-[#F7F3F0] border-[#C5A059] text-[#1A1A1A] font-semibold shadow-sm'
                      : 'bg-[#FFFFFF] border-[#E5E1DA] text-[#4A453E] hover:border-[#C5A059]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${
                      isChosen ? 'bg-[#C5A059] text-white border-[#C5A059]' : 'border-[#E5E1DA] text-[#8B8378]'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="font-serif text-sm leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-[#E5E1DA]">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#F7F3F0] border border-[#E5E1DA] text-[#4A453E] disabled:opacity-40 hover:bg-[#E5E1DA]"
            >
              Previous Question
            </button>

            {currentIndex < FINAL_ASSESSMENT_QUESTIONS.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((p) => p + 1)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1A1A1A] text-white hover:bg-[#2D2A26] transition-colors"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#C5A059] text-white hover:bg-[#B38F48] transition-colors"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-[#F7F3F0] border border-[#C5A059] text-center space-y-5">
          <Award className="w-16 h-16 mx-auto text-[#C5A059]" />
          <h3 className="text-3xl font-serif font-bold text-[#1A1A1A]">Assessment Complete</h3>
          <p className="text-xl font-mono text-[#1A1A1A] font-bold">
            Score: {score} / {FINAL_ASSESSMENT_QUESTIONS.length} ({((score / FINAL_ASSESSMENT_QUESTIONS.length) * 100).toFixed(0)}%)
          </p>
          <p className="text-sm font-serif italic text-[#4A453E] max-w-md mx-auto leading-relaxed">
            {score >= 9
              ? 'Certified Hardwire Producer: You have mastered the coordinate system and internalized Feel → Map → Control.'
              : 'Keep reviewing the modules and drills to solidify your Hardwire vocabulary.'}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setCurrentIndex(0);
              setSelectedAnswers({});
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1A1A1A] text-white hover:bg-[#2D2A26]"
          >
            Retake Exam
          </button>
        </div>
      )}
    </div>
  );
};

// 4. Hardwire Glossary & Encyclopedia
export const HardwireGlossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<string>('all');

  const filtered = VOCABULARY_LIST.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.streetDefinition && item.streetDefinition.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMod = selectedModule === 'all' || item.moduleId === selectedModule;
    return matchesSearch && matchesMod;
  });

  const playTermSound = (term: string) => {
    soundEngine.init();
    if (term.includes('Sub-Bass') || term.includes('Pitch') || term.includes('808')) {
      soundEngine.playBassNote(36, 0.8, 127);
    } else if (term.includes('The Pocket') || term.includes('Swing') || term.includes('Microtiming')) {
      soundEngine.playKick();
      setTimeout(() => soundEngine.playSnare(undefined, 110), 220);
    } else if (term.includes('Ghost') || term.includes('Transient') || term.includes('Subdivision')) {
      soundEngine.playHiHat(undefined, 60);
      setTimeout(() => soundEngine.playHiHat(undefined, 120), 120);
    } else if (term.includes('Phrygian')) {
      soundEngine.playChord([60, 61, 63, 65], 0.8, 105);
    } else if (term.includes('Dorian')) {
      soundEngine.playChord([60, 62, 63, 65, 69], 0.8, 105);
    } else if (term.includes('Extended') || term.includes('Triad') || term.includes('Inversion')) {
      soundEngine.playChord([60, 63, 67, 70, 74], 0.9, 110);
    } else {
      soundEngine.playChord([60, 63, 67], 0.7, 100);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 rounded-2xl bg-[#FFFFFF] dark:bg-[#121214] border border-[#E5E1DA] dark:border-[#26262a] shadow-sm space-y-8 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E1DA] dark:border-[#26262a] pb-6">
        <div>
          <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.25em]">
            Reference Compendium & Appendix
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A] dark:text-white mt-1">
            Master Street-to-DAW Audio Glossary (Terms 01–36)
          </h2>
          <p className="text-xs text-[#6B655C] dark:text-zinc-400 mt-1">
            Standardized operational parameters, acoustic physics, and street translations for all 36 core terms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8B8378]" />
            <input
              type="text"
              placeholder="Search terms, physics, parameters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg bg-[#F7F3F0] dark:bg-[#18181b] border border-[#E5E1DA] dark:border-[#2a2a30] text-xs text-[#1A1A1A] dark:text-white focus:outline-none focus:border-[#C5A059] w-56 font-sans"
            />
          </div>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[#F7F3F0] dark:bg-[#18181b] border border-[#E5E1DA] dark:border-[#2a2a30] text-xs text-[#2D2A26] dark:text-zinc-200 focus:outline-none font-sans"
          >
            <option value="all">All Modules (36 Terms)</option>
            <option value="module-1">Module 01: The Pocket</option>
            <option value="module-2">Module 02: MIDI for Dummies</option>
            <option value="module-3">Module 03: The Interplay</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-[#F7F3F0] dark:bg-[#161618] border border-[#E5E1DA] dark:border-[#26262a] hover:border-[#C5A059] dark:hover:border-[#C5A059] transition-all space-y-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                {item.index && (
                  <span className="text-[11px] font-mono font-bold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                    #{String(item.index).padStart(2, '0')}
                  </span>
                )}
                <div>
                  <h4 className="text-base font-serif font-bold text-[#1A1A1A] dark:text-white flex items-center gap-2">
                    {item.term}
                    <button
                      onClick={() => playTermSound(item.term)}
                      className="p-1 rounded bg-[#FFFFFF] dark:bg-[#202024] border border-[#E5E1DA] dark:border-[#33333a] hover:bg-[#E5E1DA] text-[#C5A059] transition-colors"
                      title="Audition synthesized acoustic signature"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </h4>
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase">{item.moduleName}</span>
                </div>
              </div>
              {item.category && (
                <span className="text-[9px] font-mono bg-[#FFFFFF] dark:bg-[#202024] border border-[#E5E1DA] dark:border-[#33333a] px-2 py-0.5 rounded text-[#8B8378] dark:text-zinc-400">
                  {item.category}
                </span>
              )}
            </div>

            {item.streetDefinition && (
              <div className="text-xs bg-[#FFFFFF] dark:bg-[#1f1f23] p-2.5 rounded-lg border border-[#E5E1DA]/80 dark:border-[#2c2c34]">
                <span className="font-mono text-[9px] font-bold uppercase text-[#C5A059] block tracking-wider">
                  Street Definition:
                </span>
                <p className="text-xs font-serif italic text-[#1A1A1A] dark:text-zinc-200 mt-0.5">
                  "{item.streetDefinition}"
                </p>
              </div>
            )}

            {item.acousticScience && (
              <div className="text-xs text-[#4A453E] dark:text-zinc-300">
                <span className="font-mono text-[9px] font-bold uppercase text-[#736B5E] dark:text-zinc-400 block tracking-wider">
                  Acoustic / DAW Science:
                </span>
                <p className="text-xs font-mono text-[#2D2A26] dark:text-zinc-200 mt-0.5">
                  {item.acousticScience}
                </p>
              </div>
            )}

            <div className="text-xs text-[#4A453E] dark:text-zinc-300">
              <span className="font-mono text-[9px] font-bold uppercase text-[#736B5E] dark:text-zinc-400 block tracking-wider">
                Parameter Mapping:
              </span>
              <code className="text-[11px] font-mono text-[#C5A059] bg-[#FFFFFF] dark:bg-[#1c1c20] px-1.5 py-0.5 rounded border border-[#E5E1DA] dark:border-[#2a2a32] block mt-0.5 truncate">
                {item.dawFeature}
              </code>
            </div>

            <div className="pt-2 border-t border-[#E5E1DA] dark:border-[#26262a] text-xs font-serif text-[#4A453E] dark:text-zinc-300">
              <strong className="font-sans text-[9px] uppercase tracking-widest text-[#1A1A1A] dark:text-zinc-200 block">
                Practical DAW Application:
              </strong>
              <p className="italic text-[#2D2A26] dark:text-zinc-300 mt-0.5">{item.practicalApplication}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
