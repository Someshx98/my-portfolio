import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ACHIEVEMENTS_LIST } from '../data/profile';
import { Trophy, Award, CheckCircle, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export const Achievements: React.FC = () => {
  const mainAchievement = ACHIEVEMENTS_LIST.find((a) => a.highlight) || ACHIEVEMENTS_LIST[0];
  const secondaryAchievements = ACHIEVEMENTS_LIST.filter((a) => !a.highlight);

  return (
    <section id="achievements" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="python3 -c 'import achievements; achievements.show()'"
          title="achievements.py"
          subtitle="Competitive hackathon milestones, verified coursework specializations, and algorithmic problem-solving benchmarks."
          tag="MILESTONES"
        />

        {/* Featured Main Achievement: Smart India Hackathon 2025 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-xl border-2 border-[#8B5CF6]/60 bg-[#0B0F14] p-6 sm:p-8 mb-8 relative overflow-hidden shadow-[0_0_35px_rgba(139,92,246,0.15)] transition-all duration-300 hover:border-[#8B5CF6]/90 hover:-translate-y-0.5"
        >
          {/* Subtle accent glow */}
          <div className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full bg-[#8B5CF6]/10 blur-3xl" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#A78BFA] shrink-0">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#8B5CF6] flex items-center gap-1.5 font-bold tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#FFD43B]" />
                  <span>PREMIER NATIONAL HACKATHON</span>
                </div>
                <h3 className="font-mono text-xl sm:text-2xl font-bold text-white">
                  {mainAchievement.title}
                </h3>
              </div>
            </div>

            <div className="font-mono text-xs sm:text-sm font-bold text-[#FFD43B] bg-[#FFD43B]/10 border border-[#FFD43B]/30 px-3.5 py-1.5 rounded-lg w-fit shrink-0">
              ★ {mainAchievement.tag}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#D1D5DB] font-sans leading-relaxed max-w-3xl">
            {mainAchievement.details}
          </p>

          <div className="mt-5 pt-4 border-t border-[#1F2937] font-mono text-xs text-[#94A3B8] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#3776AB]">&gt;&gt;&gt;</span>
              <span>Organization: <strong className="text-white">{mainAchievement.organization}</strong></span>
            </div>
            <span className="text-[#22C55E]">Status: Verified Finalist Selection</span>
          </div>
        </motion.div>

        {/* Secondary Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryAchievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: idx * 0.08, ease: 'easeOut' }}
              className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#3776AB]/70 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-[#8B5CF6] font-semibold">[{String(idx + 2).padStart(2, '0')}]</span>
                  <span className="text-[#38BDF8] font-mono text-[11px] bg-[#38BDF8]/10 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-[#3776AB] mb-1">
                  <Award className="w-3.5 h-3.5 text-[#FFD43B]" />
                  <span>{item.organization}</span>
                </div>

                <h4 className="font-mono text-base font-bold text-white mb-2">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
                  {item.details}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1F2937]/60 font-mono text-[11px] text-[#22C55E] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Curriculum & benchmark completed</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
