import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PROFILE } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1F2937] bg-[#070A0E] py-10 sm:py-12 text-xs font-mono text-[#94A3B8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          {/* Left info */}
          <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] shrink-0" />
            <span className="text-white font-semibold">{PROFILE.name}</span>
            <span className="text-[#4B5563]">|</span>
            <span className="text-[#3776AB]">AI/ML Engineer</span>
            <span className="text-[#4B5563]">|</span>
            <span>VSSUT Burla</span>
          </div>

          {/* Center environment stats */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-[#64748B] flex-wrap">
            <span>runtime: python 3.12</span>
            <span>·</span>
            <span>arch: x86_64</span>
            <span>·</span>
            <span>status: 0 errors</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1F2937] hover:border-[#3776AB] hover:text-[#FFD43B] transition-colors cursor-pointer"
            >
              <span>^ TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#1F2937]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#64748B] text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Somesh Chandra Behera. Built for intelligent systems with Python.
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href={PROFILE.leetcode} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LeetCode
            </a>
            <a href={`mailto:${PROFILE.email}`} className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
