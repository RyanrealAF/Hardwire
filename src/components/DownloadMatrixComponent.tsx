import React, { useState } from 'react';
import { Download, Check, Copy } from 'lucide-react';

export const DownloadMatrixComponent: React.FC = () => {
  const [copiedPdf, setCopiedPdf] = useState(false);
  const [copiedDocx, setCopiedDocx] = useState(false);

  const handleCopy = (path: string, type: 'pdf' | 'docx') => {
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      if (type === 'pdf') {
        setCopiedPdf(true);
        setTimeout(() => setCopiedPdf(false), 2000);
      } else {
        setCopiedDocx(true);
        setTimeout(() => setCopiedDocx(false), 2000);
      }
    }).catch(() => {
      alert(`${type.toUpperCase()} Link: ${fullUrl}`);
    });
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8 bg-zinc-950 text-zinc-100 font-sans border border-zinc-800 rounded-lg shadow-2xl">
      {/* Section Header */}
      <div className="border-b border-zinc-800 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Curriculum Distribution Hub
          </h2>
          <p className="text-xs text-zinc-400 font-mono mt-1">Direct download vectors for textbook & offline materials</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 text-xs font-mono bg-zinc-900 border border-zinc-700 text-zinc-300 rounded self-start sm:self-auto">
          Status: Production / Live
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Card 1: Printable PDF */}
        <div className="flex flex-col justify-between p-5 bg-zinc-900/60 border border-zinc-800 rounded-md hover:border-zinc-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 rounded">
                Print & Desktop
              </span>
              <span className="text-xs font-mono text-zinc-500">FORMAT: .PDF</span>
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-1">Printable Master PDF</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              High-resolution fixed layout formatted with standard page margins for direct printing or high-density offline tablet viewing.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <a 
              href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf" 
              download="THE_HARDWIRE_METHOD_TEXTBOOK.pdf"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 12l-5-5h3V2h4v5h3l-5 5zm-7 4h14v2H3v-2z"/>
              </svg>
              Download PDF
            </a>
            <button 
              onClick={() => handleCopy('/THE_HARDWIRE_METHOD_TEXTBOOK.pdf', 'pdf')}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono rounded border border-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
              title="Copy direct download link"
            >
              {copiedPdf ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPdf ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Card 2: Editable / eBook Document (.docx) */}
        <div className="flex flex-col justify-between p-5 bg-zinc-900/60 border border-zinc-800 rounded-md hover:border-zinc-700 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/80 rounded">
                eReader & Edit
              </span>
              <span className="text-xs font-mono text-zinc-500">FORMAT: .DOCX</span>
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight mb-1">Editable Textbook Document</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Source text payload suitable for conversion to .EPUB, screen-readers, or offline modular note-taking inside word processors.
            </p>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <a 
              href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx" 
              download="THE_HARDWIRE_METHOD_TEXTBOOK.docx"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M10 12l-5-5h3V2h4v5h3l-5 5zm-7 4h14v2H3v-2z"/>
              </svg>
              Download DOCX
            </a>
            <button 
              onClick={() => handleCopy('/THE_HARDWIRE_METHOD_TEXTBOOK.docx', 'docx')}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono rounded border border-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-1"
              title="Copy direct download link"
            >
              {copiedDocx ? <Check className="w-3.5 h-3.5 text-sky-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedDocx ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Footer Metadata & PWA Status */}
      <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-500 font-mono gap-2">
        <span>HOST: Cloudflare Pages Edge CDN</span>
        <span>CACHE: Progressive Offline Ready</span>
      </div>

    </section>
  );
};
