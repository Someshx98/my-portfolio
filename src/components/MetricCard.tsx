import React from 'react';
import { motion } from 'motion/react';

interface MetricCardProps {
  command: string;
  metric: string;
  label: string;
  subMetric?: string;
  subLabel?: string;
  accentColor?: string;
  onClick?: () => void;
  badge?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  command,
  metric,
  label,
  subMetric,
  subLabel,
  accentColor = '#3776AB',
  onClick,
  badge,
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg border border-[#1F2937] bg-[#0B0F14]/90 p-4 transition-all duration-300 hover:border-[#3776AB]/70 hover:bg-[#0e141c] hover:shadow-[0_0_25px_rgba(55,118,171,0.15)]"
      style={{
        borderLeftWidth: '3px',
        borderLeftColor: accentColor,
      }}
    >
      {/* Subtle scanline line */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Terminal prompt header */}
      <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-2.5">
        <span className="flex items-center gap-1.5 text-[#3776AB] group-hover:text-[#FFD43B] transition-colors">
          <span className="text-[#8B5CF6]">$</span>
          <span>{command}</span>
        </span>
        {badge ? (
          <span className="text-[10px] tracking-wider uppercase font-mono text-[#FFD43B] bg-[#FFD43B]/10 px-1.5 py-0.5 rounded">
            {badge}
          </span>
        ) : (
          <span className="inline-block w-1.5 h-3 bg-[#3776AB] opacity-0 group-hover:opacity-100 animate-pulse" />
        )}
      </div>

      {/* Main Metric */}
      <div className="flex items-baseline justify-between">
        <div>
          <div className="font-mono text-2xl font-bold tracking-tight text-[#E5E7EB] group-hover:text-white transition-colors">
            {metric}
          </div>
          <div className="text-[11px] font-mono tracking-wider uppercase text-[#94A3B8] mt-0.5">
            {label}
          </div>
        </div>

        {subMetric && (
          <div className="text-right border-l border-[#1F2937] pl-3">
            <div className="font-mono text-base font-semibold text-[#22C55E]">
              {subMetric}
            </div>
            {subLabel && (
              <div className="text-[10px] font-mono tracking-wider uppercase text-[#94A3B8]">
                {subLabel}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
