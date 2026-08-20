import React, { useState } from 'react';
import { Menu, Volume2, VolumeX, Home, Sparkles, BookOpen, Compass, Sliders, Download } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { ModuleId } from '../types';
import { AuthButton } from './AuthButton';

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
    <header className="sticky top-0 z-30 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-[#E5E1DA] px-4 md:px-8 py-3.5 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg bg-[#F7F3F0] border border-[#E5E1DA] text-[#2D2A26] lg:hidden hover:bg-[#E5E1DA]/50 transition-colors"
          aria-label="Open Curriculum Index"
        >
          <Menu className="w-4 h-4" />
        </button>

        {onGoLanding && (
          <button
            onClick={onGoLanding}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7F3F0] hover:bg-[#E5E1DA] border border-[#E5E1DA] text-xs font-bold text-[#1A1A1A] transition-colors"
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
          className={`pb-1 transition-all ${
            currentModuleId === 'module-1'
              ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
              : 'text-[#8B8378] hover:text-[#1A1A1A]'
          }`}
        >
          01. The Pocket
        </button>
        <button
          onClick={() => onSelectModule('module-2')}
          className={`pb-1 transition-all ${
            currentModuleId === 'module-2'
              ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
              : 'text-[#8B8378] hover:text-[#1A1A1A]'
          }`}
        >
          02. MIDI
        </button>
        <button
          onClick={() => onSelectModule('module-3')}
          className={`pb-1 transition-all ${
            currentModuleId === 'module-3'
              ? 'border-b-2 border-[#1A1A1A] text-[#1A1A1A]'
              : 'text-[#8B8378] hover:text-[#1A1A1A]'
          }`}
        >
          03. Interplay
        </button>
      </div>

      {/* Audio Engine Live Switch & PDF / EPUB / HTML / eBook Download */}
      <div className="flex items-center gap-2">
        <a
          href="/THE_HARDWIRE_METHOD_TEXTBOOK.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#0D9488]/40 bg-[#0D9488]/10 text-[#0D9488] hover:bg-[#0D9488]/20 transition-colors text-xs font-semibold font-mono"
          title="Open Standalone HTML eBook Edition"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">HTML</span>
        </a>

        <a
          href="/THE_HARDWIRE_METHOD_TEXTBOOK.epub"
          download="THE_HARDWIRE_METHOD_TEXTBOOK.epub"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 transition-colors text-xs font-semibold font-mono"
          title="Download Consumer EPUB (Apple Books / KDP / Kobo)"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">EPUB</span>
        </a>

        <a
          href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
          download="THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#FF5A1F]/40 bg-[#FF5A1F]/10 text-[#FF5A1F] hover:bg-[#FF5A1F]/20 transition-colors text-xs font-semibold font-mono"
          title="Download Standalone Printable PDF (62 Pages)"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">PDF</span>
        </a>

        <a
          href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx"
          download="THE_HARDWIRE_METHOD_TEXTBOOK.docx"
          className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A059]/40 bg-[#C5A059]/10 text-[#C5A059] hover:bg-[#C5A059]/20 transition-colors text-xs font-semibold font-mono"
          title="Download Source Word Document (.docx)"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="text-[10px] uppercase tracking-wider font-bold">DOCX</span>
        </a>

        <button
          onClick={toggleMasterSound}
          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            isMuted
              ? 'bg-[#F7F3F0] text-[#8B8378] border-[#E5E1DA]'
              : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-[#2D2A26]'
          }`}
          title={isMuted ? 'Unmute Audio Engine' : 'Audio Engine Active'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />}
          <span className="text-[10px] uppercase tracking-wider font-mono">
            {isMuted ? 'Muted' : 'Audio Live'}
          </span>
        </button>

        <AuthButton compact />
      </div>
    </header>
  );
};

