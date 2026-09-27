import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

export interface CrossReferenceData {
  title: string;
  description: string;
  href: string;
  label?: string;
  category?: 'theoretical' | 'practical' | 'instructional';
}

interface CrossReferenceCardProps {
  reference: CrossReferenceData;
  className?: string;
}

export const CrossReferenceCard: React.FC<CrossReferenceCardProps> = ({
  reference,
  className = ''
}) => {
  const { title, description, href, label, category } = reference;

  return (
    <div
      className={`p-4 md:p-5 rounded-xl bg-[#F7F3F0] border border-[#E5E1DA] font-sans text-xs transition-all hover:border-[#C5A059]/50 ${className}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-[#8B8378]">
          <BookOpen className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Go deeper &bull; Seuss
          </span>
          {category && (
            <span className="text-[9px] uppercase tracking-wider font-mono text-[#8B8378] bg-[#E5E1DA]/50 px-1.5 py-0.5 rounded">
              {category}
            </span>
          )}
        </div>
        {label && (
          <span className="text-[10px] font-mono font-semibold text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded-full">
            {label}
          </span>
        )}
      </div>

      <h5 className="font-serif font-bold text-sm md:text-base text-[#1A1A1A] mb-1">
        {title}
      </h5>

      <p className="font-serif text-[#4A453E] leading-relaxed mb-3 text-xs md:text-sm">
        {description}
      </p>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] hover:text-[#C5A059] transition-colors group"
      >
        <span>Read {label || 'in Seuss'}</span>
        <ExternalLink className="w-3 h-3 text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
};
