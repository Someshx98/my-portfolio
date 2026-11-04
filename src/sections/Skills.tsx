import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PIP_PACKAGES, SKILL_CATEGORIES, PipPackage } from '../data/skills';
import { Terminal, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export const Skills: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<PipPackage>(PIP_PACKAGES[0]);
  const [activeTab, setActiveTab] = useState<'pip' | 'stack'>('pip');

  return (
    <section id="skills" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="pip list --format=columns && env | grep -E 'AI|PYTHON'"
          title="python_environment/"
          subtitle="Production data science and machine learning packages configured in the active virtual environment, accompanied by core computing competencies."
          tag="VENV: (ml-env)"
        />

        {/* Tab Switcher: pip list vs Technical Stacks */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-1.5 bg-[#0B0F14] border border-[#1F2937] rounded-lg w-full sm:w-fit mb-8 font-mono text-xs">
          <button
            onClick={() => setActiveTab('pip')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 sm:py-1.5 rounded-md transition-all cursor-pointer w-full sm:w-auto ${
              activeTab === 'pip'
                ? 'bg-[#3776AB] text-white font-semibold shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>$ pip list (Python ML Ecosystem)</span>
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 sm:py-1.5 rounded-md transition-all cursor-pointer w-full sm:w-auto ${
              activeTab === 'stack'
                ? 'bg-[#3776AB] text-white font-semibold shadow-sm'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>System Stacks & Languages</span>
          </button>
        </div>

        {/* View 1: PIP LIST Interactive Terminal & Package Inspector */}
        {activeTab === 'pip' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Terminal pip list table */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="lg:col-span-7 rounded-xl border border-[#1F2937] bg-[#0B0F14] overflow-hidden shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 py-2.5 text-xs font-mono text-[#94A3B8]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span className="ml-2 text-[#E5E7EB]">pip list --verbose</span>
                </div>
                <span className="text-[#3776AB]">Python 3.12 / venv</span>
              </div>

              <div className="p-3 sm:p-4 overflow-x-auto font-mono text-xs">
                <div className="min-w-[420px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 pb-2 border-b border-[#1F2937] text-[#94A3B8] font-bold select-none uppercase tracking-wider">
                    <div className="col-span-5">Package</div>
                    <div className="col-span-3">Version</div>
                    <div className="col-span-4">Category</div>
                  </div>

                  {/* Table Rows */}
                  <div className="divide-y divide-[#1F2937]/50 mt-1">
                    {PIP_PACKAGES.map((pkg) => {
                      const isSelected = selectedPackage.name === pkg.name;
                      return (
                        <button
                          key={pkg.name}
                          onClick={() => setSelectedPackage(pkg)}
                          className={`w-full grid grid-cols-12 py-2.5 px-1 items-center text-left transition-colors rounded cursor-pointer ${
                            isSelected
                              ? 'bg-[#3776AB]/20 text-[#FFD43B] font-semibold'
                              : 'text-[#E5E7EB] hover:bg-[#111827] hover:text-white'
                          }`}
                        >
                          <div className="col-span-5 flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#FFD43B]' : 'bg-[#3776AB]'}`} />
                            <span className="font-mono">{pkg.name}</span>
                          </div>
                          <div className="col-span-3 text-[#38BDF8]">{pkg.version}</div>
                          <div className="col-span-4 text-[#94A3B8] text-[11px] truncate">{pkg.category}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Package Inspector / pip show */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
              className="lg:col-span-5 rounded-xl border border-[#1F2937] bg-[#0B0F14] p-5 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] pb-3 border-b border-[#1F2937]">
                  <span className="text-[#3776AB]">$ pip show {selectedPackage.name}</span>
                  <span className="text-[#22C55E]">Installed</span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-[#94A3B8]">Name: </span>
                    <span className="text-white font-bold text-sm">{selectedPackage.name}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]">Version: </span>
                    <span className="text-[#38BDF8]">{selectedPackage.version}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]">Domain: </span>
                    <span className="text-[#FFD43B]">{selectedPackage.category}</span>
                  </div>
                  <div>
                    <span className="text-[#94A3B8]">Summary: </span>
                    <p className="font-sans text-sm text-[#D1D5DB] mt-1 leading-relaxed bg-[#070A0E] p-3 rounded border border-[#1F2937]/70">
                      {selectedPackage.summary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1F2937] font-mono text-[11px] text-[#94A3B8] bg-[#070A0E] p-3 rounded">
                <span className="text-[#8B5CF6]">&gt;&gt;&gt;</span> import {selectedPackage.name.replace('-', '_')}
                <br />
                <span className="text-[#22C55E]">Module loaded successfully into workspace runtime.</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* View 2: Grouped Stacks (PROGRAMMING, AI/ML, BACKEND, DATABASE, TOOLS) */}
        {activeTab === 'stack' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: idx * 0.06, ease: 'easeOut' }}
                className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-5 flex flex-col justify-between transition-all duration-300 hover:border-[#3776AB]/70 hover:shadow-lg hover:-translate-y-0.5"
              >
                <div>
                  {/* Category Header */}
                  <div className="border-b border-[#1F2937] pb-3 mb-4">
                    <div className="font-mono text-xs text-[#3776AB] flex items-center gap-1.5 mb-1 truncate">
                      <span className="text-[#8B5CF6]">&gt;</span>
                      <span className="truncate">{cat.command}</span>
                    </div>
                    <h3 className="font-mono text-base font-bold text-white tracking-wide">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skills Module Cards */}
                  <div className="space-y-3">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill rounded-lg border border-[#1F2937]/70 bg-[#070A0E] p-3 transition-colors hover:border-[#3776AB]"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-semibold text-white group-hover/skill:text-[#FFD43B] transition-colors">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#94A3B8] font-sans leading-relaxed">
                          {skill.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
