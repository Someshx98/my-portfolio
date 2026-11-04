import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Code2 } from 'lucide-react';

interface NavigationProps {
  onOpenCLI: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCLI, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'about.py', href: '#about', id: 'about' },
    { label: 'education.py', href: '#education', id: 'education' },
    { label: 'skills.py', href: '#skills', id: 'skills' },
    { label: 'projects/', href: '#projects', id: 'projects' },
    { label: 'achievements.py', href: '#achievements', id: 'achievements' },
    { label: 'leetcode.py', href: '#leetcode', id: 'leetcode' },
    { label: 'contact.py', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#1F2937]/80 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-4.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo File */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 font-mono text-sm tracking-tight text-[#E5E7EB] hover:text-white transition-colors"
        >
          <span className="flex items-center justify-center w-6 h-6 rounded bg-[#0B0F14] border border-[#1F2937] text-[#3776AB] group-hover:border-[#3776AB] group-hover:text-[#FFD43B] transition-colors">
            <Code2 className="w-3.5 h-3.5" />
          </span>
          <span className="font-semibold text-white">somesh</span>
          <span className="text-[#3776AB]">.py</span>
          <span className="text-xs text-[#94A3B8] hidden sm:inline font-mono">
            (dev)
          </span>
        </a>

        {/* Desktop Navigation Links - responsive gap between tablet and desktop */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-5 font-mono text-xs lg:text-[13px]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`group relative py-1 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#FFD43B] font-medium'
                    : 'text-[#94A3B8] hover:text-[#E5E7EB]'
                }`}
              >
                <span className="flex items-center gap-1">
                  {isActive && <span className="text-[#3776AB]">&gt;</span>}
                  <span>{item.label}</span>
                </span>
                {/* Active or Hover underline indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] transition-all duration-200 ${
                    isActive
                      ? 'w-full bg-[#FFD43B]'
                      : 'w-0 bg-[#3776AB] group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Right Action: Interactive CLI Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCLI}
            title="Open Interactive Terminal (CLI)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1F2937] bg-[#0B0F14] text-xs font-mono text-[#94A3B8] hover:border-[#3776AB] hover:text-[#FFD43B] hover:bg-[#0E141C] transition-all active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-[#3776AB]" />
            <span className="hidden sm:inline">&gt;_ CLI</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#94A3B8] hover:text-white rounded border border-[#1F2937] bg-[#0B0F14]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Terminal Directory Layout) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#1F2937] bg-[#0B0F14]/98 px-4 sm:px-6 py-4 backdrop-blur-lg">
          <div className="text-[11px] font-mono text-[#94A3B8] mb-3 pb-2 border-b border-[#1F2937] flex items-center justify-between">
            <span>$ ls -l portfolio/</span>
            <span className="text-[#3776AB]">venv: active</span>
          </div>
          <div className="flex flex-col gap-2 font-mono text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.href)}
                className={`flex items-center justify-between py-1.5 text-left transition-colors ${
                  activeSection === item.id
                    ? 'text-[#FFD43B] font-medium pl-2 border-l-2 border-[#FFD43B]'
                    : 'text-[#94A3B8] hover:text-white hover:pl-1'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-[#3776AB]">&gt;</span>
                  <span>{item.label}</span>
                </span>
                <span className="text-[11px] text-[#4B5563]">rwxr-xr-x</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
