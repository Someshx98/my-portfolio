import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { EDUCATION_LIST } from '../data/profile';
import { GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="cat education.py | grep -A 10 'Timeline'"
          title="education.py"
          subtitle="Formal academic trajectory establishing strong roots in algorithms, computational systems, and mathematical reasoning."
          tag="ACADEMIC MILESTONES"
        />

        <div className="relative">
          {EDUCATION_LIST.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === EDUCATION_LIST.length - 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                className="relative flex items-stretch gap-3 sm:gap-6 group"
              >
                {/* Timeline Axis Column: Perfectly centered line & node dot */}
                <div className="flex flex-col items-center shrink-0 w-6 sm:w-7 select-none">
                  {/* Top connecting segment (only for nodes after the first) */}
                  {isFirst ? (
                    <div className="h-5 sm:h-6 shrink-0" aria-hidden="true" />
                  ) : (
                    <div className="w-[2px] h-5 sm:h-6 bg-[#1F2937] shrink-0" aria-hidden="true" />
                  )}

                  {/* Circular Node Dot: centered inner yellow circle with blue outline */}
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-full bg-[#0B0F14] border-2 border-[#3776AB] group-hover:border-[#FFD43B] shrink-0 z-10 transition-colors duration-300 shadow-sm"
                    aria-hidden="true"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FFD43B] group-hover:bg-[#22C55E] transition-colors duration-300" />
                  </div>

                  {/* Bottom connecting segment (continuous until the final node) */}
                  {!isLast ? (
                    <div className="w-[2px] flex-1 bg-[#1F2937]" aria-hidden="true" />
                  ) : (
                    <div className="flex-1" aria-hidden="true" />
                  )}
                </div>

                {/* Card Container */}
                <div className={`flex-1 min-w-0 ${!isLast ? 'pb-8 sm:pb-10' : 'pb-0'}`}>
                  <div className="rounded-xl border border-[#1F2937] bg-[#0B0F14]/90 p-4 sm:p-6 transition-all duration-300 hover:border-[#3776AB]/70 hover:bg-[#0E141C] hover:shadow-[0_4px_25px_rgba(55,118,171,0.12)] hover:-translate-y-0.5">
                    {/* Header row with degree and score badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-[#3776AB] shrink-0" />
                        <h3 className="font-mono text-base sm:text-lg font-bold text-white group-hover:text-[#FFD43B] transition-colors">
                          {item.degree}
                        </h3>
                      </div>

                      <div className="font-mono text-xs sm:text-sm font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-3 py-1 rounded w-fit shrink-0">
                        {item.score}
                      </div>
                    </div>

                    {/* Institution & Location */}
                    <div className="text-sm font-medium text-[#E5E7EB] mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span>{item.institution}</span>
                      <span className="text-[#4B5563]">·</span>
                      <span className="text-xs text-[#94A3B8] flex items-center gap-1 font-mono">
                        <MapPin className="w-3 h-3 text-[#3776AB] shrink-0" />
                        {item.location}
                      </span>
                    </div>

                    {/* Additional notes / focus */}
                    {item.notes && (
                      <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed pt-2 border-t border-[#1F2937]/60">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
