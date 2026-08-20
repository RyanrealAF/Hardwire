import React, { useState } from 'react';
import { distributionMetadata } from '../utils/distribution';
import { Shield, Key, Eye, EyeOff, Copy, Check, Download, PackageCheck } from 'lucide-react';

export const AdminDistributionPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      });
    }
  };

  return (
    <div className="pt-3 border-t border-red-900/30 bg-red-950/20 rounded-lg p-3 my-2 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-red-700">
          <Shield className="w-3.5 h-3.5" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
            Admin Debug
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[10px] font-mono px-2 py-0.5 bg-red-900/40 hover:bg-red-900/60 text-red-800 rounded border border-red-800/50 flex items-center gap-1 transition-colors cursor-pointer"
        >
          {isOpen ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          <span>{isOpen ? 'Hide' : 'Inspect'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-red-900/20 text-xs space-y-3 font-mono">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-red-800 block mb-1">
              Marketplace Target
            </span>
            <div className="p-2 bg-black/40 rounded border border-zinc-800 text-zinc-300 text-[11px] space-y-1">
              <p><strong className="text-zinc-400">Title:</strong> {distributionMetadata.marketplace.title}</p>
              <p><strong className="text-zinc-400">Subtitle:</strong> {distributionMetadata.marketplace.subtitle}</p>
              <p><strong className="text-zinc-400">Author:</strong> {distributionMetadata.marketplace.author}</p>
              <p><strong className="text-zinc-400">Territories:</strong> {distributionMetadata.marketplace.territories}</p>
            </div>
          </div>

          <div>
            <span className="text-[9px] uppercase tracking-wider text-red-800 block mb-1">
              Ingestion Packages & Covers ({distributionMetadata.kdpAssets.length})
            </span>
            <div className="space-y-1.5">
              {distributionMetadata.kdpAssets.map((asset) => (
                <div
                  key={asset.fileName}
                  className="p-2 bg-black/50 rounded border border-zinc-800 flex items-center justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-zinc-200 text-[11px] font-bold truncate">{asset.label}</p>
                    <p className="text-[10px] text-zinc-500">
                      {asset.dimensions.widthPx}x{asset.dimensions.heightPx}px
                      {asset.dimensions.ratio ? ` (${asset.dimensions.ratio})` : ''}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <a
                      href={asset.publicPath}
                      download={asset.downloadName}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors"
                      title="Download raw asset"
                    >
                      <Download className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => handleCopy(window.location.origin + asset.publicPath, asset.fileName)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors cursor-pointer"
                      title="Copy asset URL"
                    >
                      {copiedKey === asset.fileName ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
