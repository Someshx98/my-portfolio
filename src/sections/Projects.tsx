import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { PROJECTS, Project } from '../data/projects';
import {
  Folder,
  FolderOpen,
  Github,
  ExternalLink,
  Code2,
  Terminal,
  CheckCircle2,
  Star,
  GitFork,
  Search,
  FileText,
  Layers,
  Sparkles,
  ArrowUpDown,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { motion } from 'motion/react';

interface PublicRepo {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  isFeatured: boolean;
}

export const Projects: React.FC = () => {
  // Main view tab: 'featured' | 'all'
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');

  // Featured project state
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [inspectorMode, setInspectorMode] = useState<'specs' | 'snippet' | 'casestudy'>('specs');

  // All repos state
  const [repos, setRepos] = useState<PublicRepo[]>([]);
  const [loadingRepos, setLoadingRepos] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');

  // Fetch all public repos when user switches to 'all' or mounts
  const fetchAllRepos = async () => {
    try {
      setLoadingRepos(true);
      const res = await fetch('/api/github/repos');
      if (res.ok) {
        const json = await res.json();
        if (json && Array.isArray(json.repos)) {
          setRepos(json.repos);
        }
      }
    } catch (e) {
      // Keeps state graceful
    } finally {
      setLoadingRepos(false);
    }
  };

  useEffect(() => {
    fetchAllRepos();
  }, []);

  // Filter and sort all public repositories
  const filteredRepos = repos
    .filter((repo) => {
      const matchesSearch =
        searchQuery === '' ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repo.topics && repo.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesLang =
        languageFilter === 'all' ||
        (repo.language && repo.language.toLowerCase().includes(languageFilter.toLowerCase()));

      return matchesSearch && matchesLang;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    });

  const availableLanguages = ['all', 'Python', 'Jupyter Notebook', 'CSS / Python', 'C++'];

  return (
    <section id="projects" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="ls -la ~/projects && tree -L 1"
          title="projects/"
          subtitle="Engineered software systems, competitive algorithmic pipelines, and machine learning architectures solving concrete technical challenges."
          tag="REPOSITORIES"
        />

        {/* View Toggle Bar (Featured Showcase vs All Public Repos) */}
        <div className="flex items-center justify-between border-b border-[#1F2937] pb-4 mb-8 flex-wrap gap-4 font-mono text-xs">
          <div className="inline-flex flex-col min-[480px]:flex-row w-full min-[480px]:w-auto rounded-lg border border-[#1F2937] bg-[#070A0E] p-1 gap-1">
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md font-semibold transition-all cursor-pointer w-full min-[480px]:w-auto ${
                activeTab === 'featured'
                  ? 'bg-[#3776AB] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#1F2937]/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD43B]" />
              <span>Featured Showcase ({PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md font-semibold transition-all cursor-pointer w-full min-[480px]:w-auto ${
                activeTab === 'all'
                  ? 'bg-[#3776AB] text-white shadow-md'
                  : 'text-[#94A3B8] hover:text-white hover:bg-[#1F2937]/40'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>All Public Repos ({repos.length > 0 ? repos.length : 11})</span>
            </button>
          </div>

          <div className="text-[#64748B] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
            <span>Curated allowlist enforced</span>
          </div>
        </div>

        {/* VIEW A: FEATURED SHOWCASE */}
        {activeTab === 'featured' && (
          <div>
            {/* Directory Tree Navigation Bar */}
            <div className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-4 mb-8 font-mono text-xs overflow-x-auto shadow-md">
              <div className="text-[#94A3B8] mb-2 flex items-center justify-between gap-2 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-[#3776AB]">~/projects</span>
                  <span className="text-[#4B5563]">/ (click to inspect featured repository)</span>
                </div>
                <span className="text-[11px] text-[#64748B]">
                  Displaying {PROJECTS.length} explicitly selected projects
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PROJECTS.map((proj, idx) => {
                  const isSelected = selectedProject.id === proj.id;
                  const isLast = idx === PROJECTS.length - 1;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#3776AB] bg-[#3776AB]/15 text-[#FFD43B] font-semibold shadow-[0_0_15px_rgba(55,118,171,0.2)]'
                          : 'border-[#1F2937] bg-[#070A0E] text-[#94A3B8] hover:text-white hover:border-[#3776AB]/50'
                      }`}
                    >
                      <span className="text-[#4B5563]">{isLast ? '└──' : '├──'}</span>
                      {isSelected ? (
                        <FolderOpen className="w-3.5 h-3.5 text-[#FFD43B] shrink-0" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-[#3776AB] shrink-0" />
                      )}
                      <span className="truncate max-w-[150px] min-[400px]:max-w-none">{proj.dirName}</span>
                      {proj.badge && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#0B0F14] border border-[#1F2937] text-[#93C5FD] shrink-0">
                          {proj.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expanded Project Terminal Inspector Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-xl border border-[#1F2937] bg-[#0B0F14] overflow-hidden shadow-2xl"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 sm:px-6 py-3 select-none flex-wrap gap-3">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm flex-wrap">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                  <span className="text-[#94A3B8] ml-2">$ cd</span>
                  <span className="text-[#FFD43B] font-bold break-all">{selectedProject.dirName}</span>
                </div>

                {/* Quick Actions & View Mode Toggles */}
                <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs flex-wrap">
                  <div className="inline-flex rounded border border-[#1F2937] bg-[#0B0F14] p-0.5">
                    <button
                      onClick={() => setInspectorMode('specs')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        inspectorMode === 'specs'
                          ? 'bg-[#3776AB] text-white font-medium'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <Layers className="w-3 h-3" />
                      <span>Specs</span>
                    </button>

                    <button
                      onClick={() => setInspectorMode('snippet')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        inspectorMode === 'snippet'
                          ? 'bg-[#3776AB] text-white font-medium'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <Code2 className="w-3 h-3" />
                      <span>Snippet</span>
                    </button>

                    <button
                      onClick={() => setInspectorMode('casestudy')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        inspectorMode === 'casestudy'
                          ? 'bg-[#3776AB] text-white font-medium'
                          : 'text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>Case Study</span>
                    </button>
                  </div>

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1F2937] bg-[#070A0E] text-[#E5E7EB] hover:border-[#3776AB] hover:text-[#FFD43B] transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>

                  {selectedProject.liveDemoUrl && (
                    <a
                      href={selectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#3776AB] text-white hover:bg-[#2d628f] transition-colors font-semibold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Docs / Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Body Content */}
              <div className="p-4 sm:p-8">
                {/* Mode 1: Specs & Architecture */}
                {inspectorMode === 'specs' && (
                  <div className="space-y-6">
                    {/* Title & Tagline */}
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#3776AB] mb-1 flex-wrap">
                        <span>CATEGORY:</span>
                        <span className="text-[#FFD43B] uppercase tracking-wide font-semibold">
                          {selectedProject.category}
                        </span>
                        <span className="text-[#4B5563]">·</span>
                        <span className="text-[#22C55E]">{selectedProject.stats.status}</span>
                        {selectedProject.badge && (
                          <>
                            <span className="text-[#4B5563]">·</span>
                            <span className="px-2 py-0.5 rounded bg-[#3776AB]/20 text-[#38BDF8] border border-[#3776AB]/40">
                              {selectedProject.badge}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white">
                        {selectedProject.name}
                      </h3>
                      <p className="font-mono text-xs sm:text-sm text-[#94A3B8] mt-1">
                        {selectedProject.tagline}
                      </p>
                    </div>

                    {/* Curated Description */}
                    <p className="text-sm sm:text-base text-[#D1D5DB] font-sans leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Architecture Specs */}
                    <div>
                      <div className="font-mono text-xs text-[#94A3B8] mb-3 uppercase tracking-wider">
                        $ cat architecture_specs.txt
                      </div>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E5E7EB]">
                            <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies used */}
                    <div className="pt-4 border-t border-[#1F2937]/70">
                      <div className="font-mono text-xs text-[#94A3B8] mb-2 uppercase tracking-wider">
                        MODULES & DEPENDENCIES
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-xs px-2.5 py-1 rounded bg-[#070A0E] text-[#93C5FD] border border-[#1F2937]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CLI Run Command Box */}
                    <div className="pt-2">
                      <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-3 font-mono text-xs flex items-center justify-between text-[#94A3B8]">
                        <span className="text-[#FFD43B]">{selectedProject.command}</span>
                        <span className="text-[#64748B] text-[11px]">telemetry: ready</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode 2: Code Snippet */}
                {inspectorMode === 'snippet' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8]">
                      <span>$ cat implementation_core.py</span>
                      <span className="text-[#22C55E]">Python 3 Syntax Highlighted</span>
                    </div>

                    <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 sm:p-5 font-mono text-xs overflow-x-auto shadow-inner">
                      <pre className="text-[#E5E7EB] leading-relaxed">
                        <code>{selectedProject.codeSnippet}</code>
                      </pre>
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-2 border-t border-[#1F2937]/60">
                      <span>Verified module logic</span>
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#38BDF8] hover:underline flex items-center gap-1"
                      >
                        <span>Inspect repository on GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Mode 3: Expanded Case Study */}
                {inspectorMode === 'casestudy' && (
                  <div className="space-y-6">
                    <div>
                      <div className="font-mono text-xs text-[#3776AB] mb-1">ENGINEERING CASE STUDY</div>
                      <h4 className="font-mono text-xl sm:text-2xl font-bold text-white">
                        {selectedProject.name}
                      </h4>
                      <p className="font-mono text-xs text-[#94A3B8] mt-0.5">
                        In-depth breakdown of engineering requirements, architectural design, and implementation
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Section 1: Problem */}
                      <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#EF4444] mb-2 font-bold uppercase tracking-wider">
                          <span>01. The Problem</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                          {selectedProject.caseStudy.problem}
                        </p>
                      </div>

                      {/* Section 2: Solution */}
                      <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#22C55E] mb-2 font-bold uppercase tracking-wider">
                          <span>02. The Solution</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                          {selectedProject.caseStudy.solution}
                        </p>
                      </div>

                      {/* Section 3: Architecture */}
                      <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#FFD43B] mb-2 font-bold uppercase tracking-wider">
                          <span>03. Architecture & Design</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                          {selectedProject.caseStudy.architecture}
                        </p>
                      </div>

                      {/* Section 4: My Contribution */}
                      <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                        <div className="flex items-center gap-2 font-mono text-xs text-[#38BDF8] mb-2 font-bold uppercase tracking-wider">
                          <span>04. Personal Contribution</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                          {selectedProject.caseStudy.myContribution}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* VIEW B: ALL PUBLIC REPOSITORIES */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {/* Filter & Search Terminal Bar */}
            <div className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-4 sm:p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] border-b border-[#1F2937] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#3776AB]">$ gh repo list Someshx98</span>
                  <span className="text-[#64748B]">--public --limit 30</span>
                </div>
                <button
                  onClick={fetchAllRepos}
                  disabled={loadingRepos}
                  className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                  title="Reload repositories from GitHub"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingRepos ? 'animate-spin text-[#FFD43B]' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Search Input */}
                <div className="md:col-span-2 relative">
                  <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search repository name, description or topic..."
                    className="w-full bg-[#070A0E] border border-[#1F2937] rounded-lg pl-9 pr-4 py-2 font-mono text-xs text-white placeholder-[#64748B] focus:outline-none focus:border-[#3776AB] transition-colors"
                  />
                </div>

                {/* Sort Selector */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-[#64748B] shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full bg-[#070A0E] border border-[#1F2937] rounded-lg px-3 py-2 font-mono text-xs text-[#E5E7EB] focus:outline-none focus:border-[#3776AB] cursor-pointer"
                  >
                    <option value="updated">Sort: Recently Pushed</option>
                    <option value="stars">Sort: Most Stars</option>
                    <option value="name">Sort: Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Language Filter Pills */}
              <div className="flex items-center gap-2 pt-1 flex-wrap font-mono text-xs">
                <span className="text-[#64748B] text-[11px]">Filter Language:</span>
                {availableLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguageFilter(lang)}
                    className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                      languageFilter === lang
                        ? 'bg-[#3776AB] text-white font-semibold'
                        : 'bg-[#070A0E] border border-[#1F2937] text-[#94A3B8] hover:text-white hover:border-[#3776AB]/50'
                    }`}
                  >
                    {lang === 'all' ? 'All Languages' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Repositories Grid */}
            {filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRepos.map((repo, idx) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.3, delay: (idx % 6) * 0.05, ease: 'easeOut' }}
                    className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-5 flex flex-col justify-between hover:border-[#3776AB]/70 transition-all duration-300 group overflow-hidden hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-start gap-2 min-w-0 flex-1">
                          <Code2 className="w-4 h-4 text-[#3776AB] shrink-0 mt-0.5" />
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-[#FFD43B] transition-colors break-words [overflow-wrap:anywhere]"
                            title={repo.name}
                          >
                            {repo.name}
                          </a>
                        </div>

                        {repo.isFeatured && (
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#FFD43B]/10 border border-[#FFD43B]/30 text-[#FFD43B] shrink-0 whitespace-nowrap mt-0.5">
                            ★ FEATURED
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed mb-3">
                        {repo.description || 'Public repository by Somesh Chandra Behera'}
                      </p>

                      {/* Topics */}
                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {repo.topics.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070A0E] text-[#93C5FD] border border-[#1F2937]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-[#1F2937]/70 font-mono text-xs flex items-center justify-between text-[#94A3B8]">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            repo.language && repo.language.toLowerCase().includes('python')
                              ? 'bg-[#3776AB]'
                              : repo.language && repo.language.toLowerCase().includes('jupyter')
                              ? 'bg-[#F97316]'
                              : 'bg-[#FFD43B]'
                          }`}
                        />
                        <span className="text-[#E5E7EB]">{repo.language || 'Code'}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Star className="w-3.5 h-3.5 text-[#FFD43B]" />
                          <span>{repo.stars}</span>
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{repo.forks}</span>
                        </span>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#94A3B8] hover:text-white p-1"
                          title="Open on GitHub"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-[#1F2937] bg-[#0B0F14] p-12 text-center font-mono">
                <p className="text-sm text-[#94A3B8]">No repositories match your current filter parameters.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setLanguageFilter('all');
                  }}
                  className="mt-3 px-3 py-1.5 rounded bg-[#1F2937] text-white text-xs hover:bg-[#3776AB] transition-colors"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
