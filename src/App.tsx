import React, { useState, useEffect } from 'react';
import { CURRICULUM_MODULES } from './data/curriculumData';
import { ModuleId, LessonId } from './types';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ChapterView } from './components/ChapterView';
import { HardwireGlossary, FinalAssessmentQuiz } from './components/CapstonesAndAssessments';
import { LandingPage } from './components/LandingPage';
import { soundEngine } from './audio/soundEngine';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'curriculum'>('landing');
  const [currentModuleId, setCurrentModuleId] = useState<ModuleId>('module-1');
  const [currentLessonId, setCurrentLessonId] = useState<LessonId>('m1-l1');
  const [completedLessons, setCompletedLessons] = useState<string[]>(['m1-l1']);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Scroll to top immediately whenever the page/lesson/module or view mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentLessonId, currentModuleId, viewMode]);

  // Flatten all lessons for linear page indexing
  const allLessons = CURRICULUM_MODULES.flatMap((m) => m.lessons);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === currentLessonId) + 1;
  const totalLessonsCount = allLessons.length;

  // Find the current active lesson and module
  const currentModule = CURRICULUM_MODULES.find((m) => m.id === currentModuleId) || CURRICULUM_MODULES[0];
  const currentLesson = currentModule.lessons.find((l) => l.id === currentLessonId) || currentModule.lessons[0];

  const handleEnterCurriculum = (moduleId?: ModuleId, lessonId?: LessonId) => {
    if (moduleId) setCurrentModuleId(moduleId);
    if (lessonId) {
      setCurrentLessonId(lessonId);
      if (!completedLessons.includes(lessonId) && lessonId !== 'glossary' && lessonId !== 'assessment') {
        setCompletedLessons((prev) => [...prev, lessonId]);
      }
    }
    setViewMode('curriculum');
  };

  const handleSelectLesson = (lessonId: LessonId, moduleId: ModuleId) => {
    setCurrentLessonId(lessonId);
    setCurrentModuleId(moduleId);
    setViewMode('curriculum');
    if (!completedLessons.includes(lessonId) && lessonId !== 'glossary' && lessonId !== 'assessment') {
      setCompletedLessons((prev) => [...prev, lessonId]);
    }
  };

  const handleSelectModule = (modId: ModuleId) => {
    setCurrentModuleId(modId);
    setViewMode('curriculum');
    if (modId === 'glossary') {
      setCurrentLessonId('glossary');
      return;
    }
    if (modId === 'assessment') {
      setCurrentLessonId('assessment');
      return;
    }
    const mod = CURRICULUM_MODULES.find((m) => m.id === modId);
    if (mod && mod.lessons.length > 0) {
      setCurrentLessonId(mod.lessons[0].id);
    }
  };

  const handleNextLesson = () => {
    const currentIdx = allLessons.findIndex((l) => l.id === currentLessonId);
    if (currentIdx >= 0 && currentIdx < allLessons.length - 1) {
      const next = allLessons[currentIdx + 1];
      const parentMod = CURRICULUM_MODULES.find((m) => m.lessons.some((l) => l.id === next.id));
      if (parentMod) {
        handleSelectLesson(next.id, parentMod.id);
      }
    } else {
      handleSelectLesson('assessment', 'assessment');
    }
  };

  const handlePrevLesson = () => {
    const currentIdx = allLessons.findIndex((l) => l.id === currentLessonId);
    if (currentIdx > 0) {
      const prev = allLessons[currentIdx - 1];
      const parentMod = CURRICULUM_MODULES.find((m) => m.lessons.some((l) => l.id === prev.id));
      if (parentMod) {
        handleSelectLesson(prev.id, parentMod.id);
      }
    }
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onEnterCurriculum={handleEnterCurriculum}
        completedLessonsCount={completedLessons.length}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#C5A059] selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        currentLessonId={currentLessonId}
        currentModuleId={currentModuleId}
        onSelectLesson={handleSelectLesson}
        completedLessons={completedLessons}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onGoHome={() => setViewMode('landing')}
      />

      {/* Main Content Layout */}
      <div className="lg:pl-72 md:lg:pl-80 flex-1 flex flex-col min-w-0">
        <Navbar
          onToggleSidebar={() => setSidebarOpen(true)}
          currentModuleId={currentModuleId}
          onSelectModule={handleSelectModule}
          onGoLanding={() => setViewMode('landing')}
        />

        <main className="flex-1 px-4 sm:px-8 md:px-12 py-8 max-w-5xl mx-auto w-full">
          {currentLessonId === 'glossary' ? (
            <HardwireGlossary />
          ) : currentLessonId === 'assessment' ? (
            <FinalAssessmentQuiz />
          ) : (
            <ChapterView
              lesson={currentLesson}
              module={currentModule}
              onNextLesson={handleNextLesson}
              onPrevLesson={currentLessonIndex > 1 ? handlePrevLesson : undefined}
              lessonIndex={currentLessonIndex}
              totalLessons={totalLessonsCount}
            />
          )}
        </main>
      </div>
    </div>
  );
}

