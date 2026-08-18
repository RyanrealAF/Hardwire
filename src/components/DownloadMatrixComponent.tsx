import React, { useState } from 'react';
import { Download, Check, Copy, BookOpen } from 'lucide-react';

export const DownloadMatrixComponent: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (path: string, key: string) => {
    const fullUrl = `${window.location.origin}${path}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(fullUrl).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }).catch(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    } else {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const downloads = [
    {
      id: 'pdf',
      format: 'FORMAT: .PDF',
      tag: 'Print & Desktop',
      tagColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500 text-zinc-950',
      title: 'Printable Master PDF',
      desc: 'High-resolution 62-page fixed layout formatted with standard margins for direct printing or high-density offline tablet study.',
      url: '/THE_HARDWIRE_METHOD_TEXTBOOK.pdf',
      filename: 'THE_HARDWIRE_METHOD_TEXTBOOK.pdf',
      btnText: 'Download PDF',
    },
    {
      id: 'epub',
      format: 'FORMAT: .EPUB',
      tag: 'eReader Mobile',
      tagColor: 'text-amber-400 bg-amber-950/60 border-amber-800/80',
      btnColor: 'bg-amber-600 hover:bg-amber-500 text-zinc-950',
      title: 'Standard EPUB eBook',
      desc: 'Reflowable layout compiled with RyanrealAF metadata schema. Optimized for Apple Books, Kindle, Kobo, and mobile e-readers.',
      url: '/THE_HARDWIRE_METHOD_TEXTBOOK.epub',
      filename: 'THE_HARDWIRE_METHOD_TEXTBOOK.epub',
      btnText: 'Download EPUB',
    },
    {
      id: 'docx',
      format: 'FORMAT: .DOCX',
      tag: 'Editable Document',
      tagColor: 'text-sky-400 bg-sky-950/60 border-sky-800/80',
      btnColor: 'bg-sky-600 hover:bg-sky-500 text-zinc-950',
      title: 'Editable Source Document',
      desc: 'Source text payload formatted for Word processors, annotation, classroom remixing, or text-to-speech screen readers.',
      url: '/THE_HARDWIRE_METHOD_TEXTBOOK.docx',
      filename: 'THE_HARDWIRE_METHOD_TEXTBOOK.docx',
      btnText: 'Download DOCX',
    },
    {
      id: 'html',
      format: 'FORMAT: .HTML',
      tag: 'Standalone Reader',
      tagColor: 'text-teal-400 bg-teal-950/60 border-teal-800/80',
      btnColor: 'bg-teal-600 hover:bg-teal-500 text-zinc-950',
      title: 'Self-Contained HTML Book',
      desc: 'Zero-dependency standalone digital book readable in any web browser without internet connection or external CSS.',
      url: '/THE_HARDWIRE_METHOD_TEXTBOOK.html',
      filename: 'THE_HARDWIRE_METHOD_TEXTBOOK.html',
      btnText: 'Open HTML Book',
      isExternal: true,
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8 bg-zinc-950 text-zinc-100 font-sans border border-zinc-800 rounded-lg shadow-2xl">
      {/* Section Header */}
      <div className="border-b border-zinc-800 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2 font-display">
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
        {downloads.map((item) => {
          const isCopied = copiedKey === item.id;
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between p-5 bg-zinc-900/60 border border-zinc-800 rounded-md hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border rounded ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{item.format}</span>
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <a
                  href={item.url}
                  {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : { download: item.filename })}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 font-bold text-xs uppercase tracking-wider rounded transition-colors ${item.btnColor}`}
                >
                  {item.isExternal ? (
                    <BookOpen className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  {item.btnText}
                </a>
                <button
                  onClick={() => handleCopy(item.url, item.id)}
                  className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono rounded border border-zinc-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Copy direct download link"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Metadata & PWA Status */}
      <div className="mt-6 pt-4 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-500 font-mono gap-2">
        <span>HOST: Cloudflare Pages Edge CDN (buildwhilebleeding.com)</span>
        <span>CACHE: Progressive Offline Ready (sw.js active)</span>
      </div>

      {/* Amazon KDP Ingestion Assets & Cover Artwork Section */}
      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Amazon KDP Marketplace Assets & Cover Art
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">High-resolution cover assets formatted for Kindle Direct Publishing & Paperback</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-950/60 text-amber-300 border border-amber-800/80 rounded self-start sm:self-auto">
            Ready for Upload
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Kindle Cover Card */}
          <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-white uppercase">Kindle eBook Front Cover</span>
                <span className="text-[10px] font-mono text-zinc-400">2560 x 1600 px (1.6:1)</span>
              </div>
              <div className="w-full h-44 bg-zinc-950 border border-zinc-800 rounded overflow-hidden mb-3 relative flex items-center justify-center">
                <img
                  src="/kdp-kindle-cover.jpg"
                  alt="Amazon KDP Kindle eBook Cover"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Full-resolution portrait cover asset for digital Kindle store listings with high-contrast cyber-minimalist typography.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <a
                href="/kdp-kindle-cover.jpg"
                download="THE_HARDWIRE_METHOD_KDP_KINDLE_COVER.jpg"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-amber-600 hover:bg-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download eBook Cover
              </a>
            </div>
          </div>

          {/* Paperback Full-Wrap Card */}
          <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-white uppercase">Paperback Full-Wrap Cover</span>
                <span className="text-[10px] font-mono text-zinc-400">6"x9" (3717 x 2775 px @ 300 DPI)</span>
              </div>
              <div className="w-full h-44 bg-zinc-950 border border-zinc-800 rounded overflow-hidden mb-3 relative flex items-center justify-center">
                <img
                  src="/kdp-paperback-wrap.jpg"
                  alt="Amazon KDP Paperback Full-Wrap Cover"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Full-wrap cover with front panel, 0.14" spine for 62 pages, back cover summary, and barcode clearance zone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <a
                href="/kdp-paperback-wrap.jpg"
                download="THE_HARDWIRE_METHOD_KDP_PAPERBACK_WRAP.jpg"
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download Full Wrap
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
