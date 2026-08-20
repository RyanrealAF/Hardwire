import React from 'react';
import { ModuleInfo, LessonId, ModuleId } from '../types';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { BookOpen, CheckCircle, Award, Home, Compass, Music, Sliders, Volume2, Sparkles } from 'lucide-react';
import { useInternalAdmin } from '../hooks/useInternalAdmin';
import { AdminDistributionPanel } from './AdminDistributionPanel';
import { AuthButton } from './AuthButton';

interface SidebarProps {
  currentLessonId: LessonId;
  currentModuleId: ModuleId;
  onSelectLesson: (lessonId: LessonId, moduleId: ModuleId) => void;
  completedLessons: string[];
  isOpen: boolean;
  onClose: () => void;
  onGoHome?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLessonId,
  currentModuleId,
  onSelectLesson,
  completedLessons,
  isOpen,
  onClose,
  onGoHome
}) => {
  const totalLessons = 28;
  const progressPercent = Math.round((completedLessons.length / totalLessons) * 100);
  const { isAdmin } = useInternalAdmin();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 md:w-80 bg-[#F7F3F0] border-r border-[#E5E1DA] z-50 flex flex-col transition-transform duration-300 font-sans ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Editorial Brand Header */}
        <div className="p-6 md:p-8 border-b border-[#E5E1DA]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8B8378]">
              Volume I &bull; Theory
            </span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
              v2.0
            </span>
          </div>
          <h2
            onClick={onGoHome}
            className={`text-xl font-bold mt-1.5 tracking-tight text-[#2D2A26] font-serif ${onGoHome ? 'cursor-pointer hover:text-[#C5A059] transition-colors' : ''}`}
          >
            THE HARDWIRE METHOD
          </h2>
          <p className="text-xs text-[#8B8378] font-serif italic mt-0.5">
            Music Theory for the Streets
          </p>

          {onGoHome && (
            <button
              onClick={() => {
                onGoHome();
                onClose();
              }}
              className="mt-3 w-full py-1.5 px-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#E5E1DA] border border-[#E5E1DA] text-xs font-bold text-[#1A1A1A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Landing Page & MIDI Console</span>
            </button>
          )}

          <div className="mt-3">
            <AuthButton />
          </div>

          <div className="mt-4 pt-3 border-t border-[#E5E1DA] flex items-center justify-between text-[10px] uppercase tracking-widest text-[#8B8378] font-semibold">
            <span>FEEL &rarr; MAP &rarr; CONTROL</span>
            <span className="text-[#2D2A26] font-mono font-bold">{progressPercent}% Mastered</span>
          </div>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {/* 3 Modules */}
          {CURRICULUM_MODULES.map((mod) => (
            <div key={mod.id} className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91]">
                  Module 0{mod.number}
                </p>
                <span className="text-[9px] font-mono text-[#8B8378]">
                  {mod.lessons.length} Lessons
                </span>
              </div>

              <ul className="space-y-1 text-xs">
                {mod.lessons.map((lesson) => {
                  const isSelected = currentLessonId === lesson.id;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => {
                          onSelectLesson(lesson.id, mod.id);
                          onClose();
                        }}
                        className={`w-full text-left py-2 px-3 rounded-lg transition-all flex items-center justify-between ${
                          isSelected
                            ? 'text-[#1A1A1A] font-semibold bg-[#FFFFFF] border-l-2 border-[#C5A059] shadow-sm'
                            : 'text-[#8B8378] hover:text-[#1A1A1A] hover:bg-[#FFFFFF]/50'
                        }`}
                      >
                        <span className="truncate pr-2 font-serif text-[13px]">
                          {typeof lesson.lessonNumber === 'number' ? `${lesson.lessonNumber}. ` : ''}
                          {lesson.title}
                        </span>
                        {isDone && (
                          <CheckCircle className={`w-3.5 h-3.5 flex-shrink-0 ${isSelected ? 'text-[#C5A059]' : 'text-[#8B8378]'}`} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Reference & Assessments */}
          <div className="pt-4 border-t border-[#E5E1DA] space-y-2">
            <p className="px-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[#A69D91]">
              Compendium & Exam
            </p>

            <ul className="space-y-1 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectLesson('glossary', 'glossary');
                    onClose();
                  }}
                  className={`w-full text-left py-2 px-3 rounded-lg transition-all flex items-center gap-2.5 ${
                    currentLessonId === 'glossary'
                      ? 'text-[#1A1A1A] font-semibold bg-[#FFFFFF] border-l-2 border-[#C5A059] shadow-sm'
                      : 'text-[#8B8378] hover:text-[#1A1A1A] hover:bg-[#FFFFFF]/50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-serif text-[13px]">Vocabulary Index</span>
                </button>
              </li>

              <li>
                <button
                  onClick={() => {
                    onSelectLesson('assessment', 'assessment');
                    onClose();
                  }}
                  className={`w-full text-left py-2 px-3 rounded-lg transition-all flex items-center gap-2.5 ${
                    currentLessonId === 'assessment'
                      ? 'text-[#1A1A1A] font-semibold bg-[#FFFFFF] border-l-2 border-[#C5A059] shadow-sm'
                      : 'text-[#8B8378] hover:text-[#1A1A1A] hover:bg-[#FFFFFF]/50'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-serif text-[13px]">Certification Exam</span>
                </button>
              </li>

              <li>
                <a
                  href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
                  download="THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
                  className="w-full text-left py-2 px-3 rounded-lg transition-all flex items-center gap-2.5 text-[#FF5A1F] hover:text-[#E04B14] hover:bg-[#FFFFFF]/80 font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span className="font-serif text-[13px]">Printable PDF</span>
                </a>
              </li>

              <li>
                <a
                  href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx"
                  download="THE_HARDWIRE_METHOD_TEXTBOOK.docx"
                  className="w-full text-left py-2 px-3 rounded-lg transition-all flex items-center gap-2.5 text-[#C5A059] hover:text-[#9A7B38] hover:bg-[#FFFFFF]/80 font-medium"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-serif text-[13px]">Download eBook</span>
                </a>
              </li>
            </ul>

            {/* Hidden Admin Distribution Debug Panel */}
            {isAdmin && <AdminDistributionPanel />}
          </div>
        </div>

        {/* Editorial Footer User/Progress */}
        <div className="p-5 border-t border-[#E5E1DA] bg-[#F7F3F0]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C5A059] flex items-center justify-center text-white font-serif font-bold text-xs shadow-sm">
              HW
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-[#2D2A26]">Street Producer</p>
              <p className="text-[10px] text-[#8B8378] font-mono">
                {completedLessons.length} of {totalLessons} Units Cleared
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
