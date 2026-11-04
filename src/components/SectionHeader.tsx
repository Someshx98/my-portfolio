import React from 'react';

interface SectionHeaderProps {
  command: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  command,
  title,
  subtitle,
  tag,
}) => {
  return (
    <div className="mb-8 sm:mb-12">
      {/* Command prompt kicker */}
      <div className="flex items-center gap-2 font-mono text-xs text-[#94A3B8] mb-2 flex-wrap">
        <span className="text-[#8B5CF6] font-semibold shrink-0">$</span>
        <span className="text-[#3776AB] break-all">{command}</span>
        {tag && (
          <span className="text-[#94A3B8] shrink-0">
            · <span className="text-[#FFD43B]">{tag}</span>
          </span>
        )}
      </div>

      {/* Main title */}
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <h2 className="font-mono text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-[#3776AB] shrink-0">&gt;</span>
          <span className="break-words">{title}</span>
        </h2>
      </div>

      {/* Optional human-readable subtitle */}
      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm md:text-base text-[#94A3B8] max-w-2xl font-sans leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Divider line */}
      <div className="mt-4 h-px w-full bg-gradient-to-r from-[#1F2937] via-[#3776AB]/30 to-transparent" />
    </div>
  );
};
