import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navigation } from './components/Navigation';
import { CommandTerminal } from './components/CommandTerminal';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Achievements } from './sections/Achievements';
import { LeetCode } from './sections/LeetCode';
import { GitHubSection } from './sections/GitHub';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { Terminal } from 'lucide-react';

export default function App() {
  const [cliOpen, setCliOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Active section observer
  useEffect(() => {
    const sectionIds = [
      'hero',
      'about',
      'education',
      'skills',
      'projects',
      'achievements',
      'leetcode',
      'github',
      'contact',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcut to open terminal (Ctrl+` or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === '`') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        setCliOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setCliOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E5E7EB] font-sans selection:bg-[#3776AB]/30 selection:text-[#FFD43B]">
      {/* Top minimal navigation */}
      <Navigation
        onOpenCLI={() => setCliOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onExploreClick={() => handleNavigate('about')}
          onOpenCLI={() => setCliOpen(true)}
        />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Achievements />
        <LeetCode />
        <GitHubSection />
        <Contact />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Command Line Terminal Modal */}
      <CommandTerminal
        isOpen={cliOpen}
        onClose={() => setCliOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Floating CLI Toggle Action */}
      <button
        onClick={() => setCliOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 rounded-xl border border-[#1F2937] bg-[#0B0F14]/90 px-3 py-2 sm:px-3.5 sm:py-2.5 font-mono text-xs text-[#94A3B8] shadow-2xl backdrop-blur-md transition-all hover:border-[#3776AB] hover:text-[#FFD43B] hover:shadow-[0_0_20px_rgba(55,118,171,0.25)] active:scale-95 group cursor-pointer"
        title="Open Terminal Overlay (Ctrl + ` or Cmd + K)"
      >
        <Terminal className="w-4 h-4 text-[#3776AB] group-hover:text-[#FFD43B] transition-colors" />
        <span className="hidden sm:inline">&gt;_ CLI</span>
        <span className="text-[10px] text-[#4B5563] hidden sm:inline">[Cmd+K]</span>
      </button>

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
