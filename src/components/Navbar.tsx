import React, { useState } from 'react';
import { Menu, Volume2, VolumeX, Home, BookOpen, Download } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { ModuleId } from '../types';
import { AuthButton } from './AuthButton';
import { HtmlBookReaderModal } from './HtmlBookReaderModal';

interface NavbarProps {
  onToggleSidebar: () => void;
  currentModuleId: ModuleId;
  onSelectModule: (modId: ModuleId) => void;
  onGoLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleSidebar,
  currentModuleId,
  onSelectModule,
  onGoLanding
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isHtmlReaderOpen, setIsHtmlReaderOpen] = useState<boolean>(false);

  const toggleMasterSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const getModuleSectionLabel = (modId: ModuleId) => {
    switch (modId) {
      case 'module-1':
        return 'Volume I • Module 01: The Pocket';
      case 'module-2':
        return 'Volume I • Module 02: MIDI & Coordinates';
      case 'module-3':
        return 'Volume I • Module 03: The Interplay';
      case 'glossary':
        return 'Volume I • Compendium & Glossary';
      case 'assessment':
        return 'Volume I • Certification Examination';
      default:
        return 'Volume I • The Hardwire Method';
    }
  };

  return (
    <>
      <HtmlBookReaderModal
        isOpen={isHtmlReaderOpen}
        onClose={() => setIsHtmlReaderOpen(false)}
      />

      <header className="sticky top-0 z-30 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#E5E1DA] px-4 md:px-8 py-3.5 flex items-center justify-between font-sans">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-[#F7F3F0] border border-[#E5E1DA] text-[#2D2A26] lg:hidden hover:bg-[#E5E1DA]/50 transition-colors cursor-pointer"
            aria-label="Open Curriculum Index"
          >
            <Menu className="w-4 h-4" />
          </button>

          {onGoLanding && (
            <button
              onClick={onGoLanding}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] border border-[#E5E1DA] text-xs font-bold text-[#1A1A1A] transition-colors cursor-pointer"
              title="Return to Landing Page & Urban MIDI Visualizer"
            >
              <Home className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Landing Lab</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-widest text-[#8B8378] font-bold">
              {getModuleSectionLabel(currentModuleId)}
            </span>
          </div>
        </div>

        {/* Module Navigation Tabs */}
        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
          <button
            onClick={() => onSelectModule('module-1')}
            className={`pb-1 transition-all cursor-pointer ${
              currentModuleId === 'module-1'
                ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            01. The Pocket
          </button>
          <button
            onClick={() => onSelectModule('module-2')}
            className={`pb-1 transition-all cursor-pointer ${
              currentModuleId === 'module-2'
                ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            02. MIDI
          </button>
          <button
            onClick={() => onSelectModule('module-3')}
            className={`pb-1 transition-all cursor-pointer ${
              currentModuleId === 'module-3'
                ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
                : 'text-[#8B8378] hover:text-[#1A1A1A]'
            }`}
          >
            03. Interplay
          </button>
        </div>

        {/* Audio Engine Live Switch & Download Menu */}
        <div className="flex items-center gap-2">
          {/* Consolidated Downloads Menu */}
          <div className="relative group">
            <button
              className="px-3 py-1.5 rounded-lg border border-[#E5E1DA] bg-[#F7F3F0] text-[#2D2A26] hover:bg-[#E5E1DA] transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              title="Download Textbook & Formats"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[10px] uppercase tracking-wider font-bold hidden sm:inline">Downloads</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-[#E5E1DA] rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none group-hover:pointer-events-auto z-50 p-1 font-sans">
              <button
                onClick={() => setIsHtmlReaderOpen(true)}
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F3F0] rounded flex items-center justify-between cursor-pointer"
              >
                <span>Read eBook</span>
                <span className="text-[10px] font-mono text-teal-600 font-bold">HTML</span>
              </button>
              <a
                href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
                download="THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F3F0] rounded flex items-center justify-between"
              >
                <span>Master PDF</span>
                <span className="text-[10px] font-mono text-amber-600 font-bold">PDF</span>
              </a>
              <a
                href="/THE_HARDWIRE_METHOD_TEXTBOOK.epub"
                download="THE_HARDWIRE_METHOD_TEXTBOOK.epub"
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F3F0] rounded flex items-center justify-between"
              >
                <span>eReader File</span>
                <span className="text-[10px] font-mono text-purple-600 font-bold">EPUB</span>
              </a>
              <a
                href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx"
                download="THE_HARDWIRE_METHOD_TEXTBOOK.docx"
                className="w-full text-left px-3 py-2 text-xs font-medium text-[#1A1A1A] hover:bg-[#F7F3F0] rounded flex items-center justify-between"
              >
                <span>Word Document</span>
                <span className="text-[10px] font-mono text-blue-600 font-bold">DOCX</span>
              </a>
            </div>
          </div>

          <button
            onClick={toggleMasterSound}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isMuted
                ? 'bg-[#F7F3F0] text-[#8B8378] border-[#E5E1DA]'
                : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-[#2D2A26]'
            }`}
            title={isMuted ? 'Unmute Audio Engine' : 'Audio Engine Active'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />}
            <span className="text-[10px] uppercase tracking-wider font-mono hidden sm:inline">
              {isMuted ? 'Muted' : 'Audio Live'}
            </span>
          </button>

          <AuthButton compact />
        </div>
      </header>
    </>
  );
};
