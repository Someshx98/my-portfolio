import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Github, Terminal, ArrowUpRight, Sparkles } from 'lucide-react';
import { PythonRuntime } from '../components/PythonRuntime';
import { MetricCard } from '../components/MetricCard';
import { PROFILE } from '../data/profile';

interface HeroProps {
  onExploreClick: () => void;
  onOpenCLI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenCLI }) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLeetcode = () => {
    document.getElementById('leetcode')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAchievements = () => {
    document.getElementById('achievements')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-between overflow-hidden bg-tech-grid"
    >
      {/* Background Radial Glow behind Hero Terminal */}
      <div className="pointer-events-none absolute inset-0 bg-radial-hero" />

      {/* Main Hero Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 my-auto">
        {/* Top Developer Identity Intro */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Status Indicator / Whoami Command */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 font-mono text-xs text-[#94A3B8] mb-3 select-none text-center"
          >
            <span className="flex items-center gap-1.5 text-[#22C55E]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span>system.ready</span>
            </span>
            <span className="text-[#4B5563]">·</span>
            <span className="text-[#3776AB]">$ whoami</span>
            <span className="text-[#4B5563]">·</span>
            <span className="text-[#94A3B8]">vssut.burla</span>
          </motion.div>

          {/* Large Hero Name */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl min-[360px]:text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-sans select-none"
          >
            SOMESH
          </motion.h1>

          {/* AI/ML Engineer Technical Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 flex items-center justify-center gap-2 sm:gap-3 font-mono text-sm min-[360px]:text-base sm:text-xl lg:text-2xl font-semibold tracking-wider text-[#3776AB] flex-wrap"
          >
            <span className="text-[#8B5CF6]">&gt;&gt;</span>
            <span className="text-[#FFD43B]">AI / ML</span>
            <span className="text-[#E5E7EB]">ENGINEER</span>
            <span className="text-[#8B5CF6]">&lt;&lt;</span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-xl font-sans leading-relaxed px-2 sm:px-0"
          >
            "{PROFILE.tagline}"
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center gap-2 rounded-lg bg-[#3776AB] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-semibold text-white shadow-[0_0_20px_rgba(55,118,171,0.35)] transition-all hover:bg-[#2d628f] hover:shadow-[0_0_30px_rgba(55,118,171,0.6)] active:scale-95 cursor-pointer"
            >
              <span>[ VIEW PROJECTS ]</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-[#1F2937] bg-[#0B0F14] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-mono font-medium text-[#E5E7EB] transition-all hover:border-[#3776AB] hover:text-[#FFD43B] hover:bg-[#0e141c] active:scale-95"
            >
              <Github className="w-4 h-4 text-[#94A3B8] group-hover:text-[#FFD43B]" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FFD43B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={onOpenCLI}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#1F2937] bg-[#0B0F14] px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-mono text-[#94A3B8] transition-all hover:border-[#8B5CF6] hover:text-[#A78BFA] active:scale-95 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>$ term</span>
            </button>
          </motion.div>
        </div>

        {/* Signature Python Runtime Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 sm:mt-12 max-w-3xl mx-auto"
        >
          <PythonRuntime />
        </motion.div>

        {/* Compact Terminal Metric Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {/* Card 1: GitHub */}
          <MetricCard
            command="github --status"
            metric={PROFILE.metrics.projectsCount}
            label="PROJECTS"
            accentColor="#3776AB"
            onClick={scrollToProjects}
          />

          {/* Card 2: LeetCode */}
          <MetricCard
            command="leetcode --stats"
            metric={PROFILE.metrics.leetcodeSolved}
            label="SOLVED"
            subMetric={PROFILE.metrics.leetcodeAcceptance}
            subLabel="ACCEPTANCE"
            accentColor="#FFD43B"
            onClick={scrollToLeetcode}
          />

          {/* Card 3: Hackathon */}
          <MetricCard
            command="hackathon --status"
            metric="SIH 2025"
            label="FINALIST"
            badge="NATIONAL"
            accentColor="#8B5CF6"
            onClick={scrollToAchievements}
          />
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="w-full flex justify-center pt-8 pb-2 relative z-10"
      >
        <button
          onClick={onExploreClick}
          className="group flex flex-col items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-[#FFD43B] transition-colors focus:outline-none"
        >
          <span className="flex items-center gap-1">
            <span className="text-[#3776AB]">$</span>
            <span>ls portfolio/</span>
            <span className="text-[11px] text-[#64748B] group-hover:text-[#94A3B8]">
              (scroll to explore)
            </span>
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#3776AB] group-hover:text-[#FFD43B]" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
