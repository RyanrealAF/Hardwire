import React, { useEffect, useState } from 'react';
import { X, Maximize2, Minimize2, Download, ExternalLink, Copy, Check, BookOpen, RotateCw } from 'lucide-react';

interface HtmlBookReaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlBookReaderModal: React.FC<HtmlBookReaderModalProps> = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFullscreen, onClose]);

  if (!isOpen) return null;

  const htmlUrl = '/THE_HARDWIRE_METHOD_TEXTBOOK.html';

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${htmlUrl}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenNewTab = () => {
    const win = window.open(htmlUrl, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // If popup was blocked, fallback to direct anchor click
      const a = document.createElement('a');
      a.href = htmlUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = htmlUrl;
    a.download = 'THE_HARDWIRE_METHOD_TEXTBOOK.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`bg-[#0A0A0B] border border-[#26262B] rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${
          isFullscreen
            ? 'w-full h-full rounded-none border-none'
            : 'w-full max-w-6xl h-[92vh] max-h-[1000px]'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#131316] border-b border-[#26262B] text-zinc-200 select-none">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#0D9488]/10 border border-[#0D9488]/30 text-[#2FD9C4]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold font-serif text-white tracking-wide flex items-center gap-2">
                THE HARDWIRE METHOD <span className="text-[10px] font-mono text-[#0D9488] bg-[#0D9488]/10 px-1.5 py-0.5 rounded uppercase">HTML Reader</span>
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">
                Standalone 62-Page Interactive Book • Music Theory for the Streets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIframeKey((prev) => prev + 1)}
              className="p-1.5 rounded bg-[#1C1C21] hover:bg-[#2A2A32] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Reload HTML Reader"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#1C1C21] hover:bg-[#2A2A32] text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              title="Copy link to HTML book"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#1C1C21] hover:bg-[#2A2A32] text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
              title="Download standalone .html file"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Save .HTML</span>
            </button>

            <button
              onClick={handleOpenNewTab}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#0D9488]/20 hover:bg-[#0D9488]/30 border border-[#0D9488]/40 text-[#2FD9C4] text-xs font-mono font-bold transition-colors cursor-pointer"
              title="Open book in a standalone browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Tab</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded bg-[#1C1C21] hover:bg-[#2A2A32] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Reader'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-300 hover:text-red-100 border border-red-800/50 transition-colors ml-1 cursor-pointer"
              title="Close reader"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe Reader */}
        <div className="flex-1 w-full h-full bg-[#0A0A0B] relative">
          <iframe
            key={iframeKey}
            src={htmlUrl}
            title="The Hardwire Method - Standalone HTML eBook"
            className="w-full h-full border-0 bg-[#FDFCFB]"
            allow="fullscreen; clipboard-read; clipboard-write; autoplay"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
          />
        </div>
      </div>
    </div>
  );
};
