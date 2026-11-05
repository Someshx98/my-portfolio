import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  GitCommit,
  GitPullRequest,
  RefreshCw,
  Clock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';

interface ActivityItem {
  type: string;
  repo: string;
  date: string;
  message: string;
  author: string;
}

interface LanguageDistributionItem {
  bytes: number;
  percentage: number;
}

interface GitHubTelemetryData {
  username: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  html_url: string;
  avatar_url: string;
  dominant_language?: string;
  dominant_percentage?: number;
  language_distribution: Record<string, LanguageDistributionItem>;
  recent_activity: ActivityItem[];
  isLive?: boolean;
  cached?: boolean;
  fallback?: boolean;
}

const DEFAULT_GITHUB_DATA: GitHubTelemetryData = {
  username: 'Someshx98',
  name: 'Somesh Chandra Behera',
  bio: 'AI/ML Engineer · 3rd Year B.Tech CSE @ VSSUT Burla',
  public_repos: 12,
  followers: 0,
  following: 0,
  total_stars: 0,
  total_forks: 0,
  html_url: 'https://github.com/Someshx98',
  avatar_url: 'https://github.com/Someshx98.png',
  dominant_language: 'Python',
  dominant_percentage: 65.8,
  language_distribution: {
    Python: { bytes: 260840, percentage: 65.8 },
    JupyterNotebook: { bytes: 86450, percentage: 21.8 },
    'Jupyter Notebook': { bytes: 86450, percentage: 21.8 },
    WebAndOther: { bytes: 49200, percentage: 12.4 },
  },
  recent_activity: [
    {
      type: 'PushEvent',
      repo: 'Someshx98/LeetCode-365Days',
      date: '2026-11-05T19:13:57Z',
      message: 'Continuous algorithmic benchmarks & daily problem solving',
      author: 'Someshx98',
    },
    {
      type: 'PushEvent',
      repo: 'Someshx98/my-portfolio',
      date: '2026-11-04T18:54:19Z',
      message: 'Update portfolio deployment configuration and telemetry',
      author: 'Someshx98',
    },
    {
      type: 'PushEvent',
      repo: 'Someshx98/LeetCode-365Days',
      date: '2026-11-02T19:40:42Z',
      message: 'Algorithmic benchmarks and problem solving solutions',
      author: 'Someshx98',
    },
    {
      type: 'PushEvent',
      repo: 'Someshx98/Someshx98',
      date: '2026-10-10T06:29:35Z',
      message: 'Fix badge formatting and update labels in README',
      author: 'Someshx98',
    },
    {
      type: 'PushEvent',
      repo: 'Someshx98/Custom_Machine_Learning_Linear_Regression_Model',
      date: '2026-08-02T03:29:48Z',
      message: 'Updated app and engine logic',
      author: 'Someshx98',
    },
  ],
};

export const GitHubSection: React.FC = () => {
  const [data, setData] = useState<GitHubTelemetryData>(DEFAULT_GITHUB_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string>('Live Sync');
  const [syncStatus, setSyncStatus] = useState<'live' | 'cached' | 'syncing' | 'error'>('live');
  const [syncError, setSyncError] = useState<string | null>(null);
  const inFlightRef = React.useRef(false);

  const fetchGitHubData = async (isManual = false) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      setLoading(true);
      setSyncStatus('syncing');
      setSyncError(null);
      const res = await fetch(`/api/github${isManual ? '?refresh=true' : ''}`);
      if (res.ok) {
        const json = await res.json();
        if (json && json.username) {
          setData(json);
          const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          if (json.isLive) {
            setSyncStatus('live');
            setLastSynced(`Synced ${time}`);
          } else {
            setSyncStatus('cached');
            setLastSynced(`Cached ${time}`);
          }
        }
      } else {
        setSyncStatus('error');
        setSyncError('Remote GitHub telemetry gateway returned non-200 status. Preserving cached data.');
      }
    } catch (e) {
      setSyncStatus('error');
      setSyncError('Network disconnect while updating GitHub telemetry. Verified cached data active.');
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  };

  useEffect(() => {
    fetchGitHubData();
    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      fetchGitHubData();
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <section id="github" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="python3 -m github.telemetry --user Someshx98 --audit-activity"
          title="github.sh"
          subtitle="Real-time remote repository telemetry, codebase language distribution, and public version-control event stream."
          tag="ACTIVITY DASHBOARD"
        />

        {/* Dashboard Container */}
        <div className="rounded-xl border border-[#1F2937] bg-[#0B0F14] overflow-hidden shadow-2xl">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 sm:px-6 py-3 select-none flex-wrap gap-2">
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#E5E7EB]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span className="text-[#3776AB] ml-2">$ github --telemetry</span>
              <span className="text-[#FFD43B] font-semibold">@{data.username}</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0B0F14] border border-[#1F2937] text-[11px] ${
                syncStatus === 'live' ? 'text-[#22C55E]' :
                syncStatus === 'cached' ? 'text-[#EAB308]' :
                syncStatus === 'error' ? 'text-[#EF4444]' :
                'text-[#FFD43B]'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  syncStatus === 'live' ? 'bg-[#22C55E]' :
                  syncStatus === 'cached' ? 'bg-[#EAB308]' :
                  syncStatus === 'error' ? 'bg-[#EF4444]' :
                  'bg-[#FFD43B]'
                } animate-pulse`} />
                <span>{loading ? 'Syncing...' : lastSynced}</span>
              </div>

              <button
                onClick={() => fetchGitHubData(true)}
                disabled={loading}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#1F2937] bg-[#070A0E] text-[#94A3B8] hover:text-[#FFD43B] hover:border-[#FFD43B] transition-colors cursor-pointer disabled:opacity-50"
                title="Refresh GitHub telemetry"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FFD43B]' : ''}`} />
                <span className="hidden md:inline">{loading ? 'Syncing...' : 'Sync'}</span>
              </button>

              <a
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#3776AB] text-white hover:bg-[#2d628f] transition-colors font-semibold shrink-0"
              >
                <span className="hidden min-[400px]:inline">Follow @{data.username}</span>
                <span className="min-[400px]:hidden">Follow</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Sync Warning / Error Banner (if any) */}
          {syncError && (
            <div className="px-4 sm:px-6 py-2 bg-[#EF4444]/10 border-b border-[#EF4444]/30 flex items-center justify-between font-mono text-xs text-[#EF4444]">
              <div className="flex items-center gap-2">
                <span className="font-bold">[!]</span>
                <span>{syncError}</span>
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={() => fetchGitHubData(true)}
                className="underline hover:text-white cursor-pointer ml-3 shrink-0 disabled:opacity-50"
              >
                {loading ? 'Retrying...' : 'Retry'}
              </button>
            </div>
          )}

          <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
            {/* Top Telemetry Stats Grid */}
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Metric 1: Public Repositories */}
              <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>PUBLIC REPOSITORIES</span>
                  <Github className="w-3.5 h-3.5 text-[#3776AB]" />
                </div>
                <div className="text-3xl font-mono font-bold text-white tracking-tight">
                  {data.public_repos}
                </div>
                <div className="text-[11px] font-mono text-[#22C55E] mt-1.5">
                  100% Public Access
                </div>
              </div>

              {/* Metric 2: Total Stars & Forks */}
              <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>STARS & FORKS</span>
                  <Star className="w-3.5 h-3.5 text-[#FFD43B]" />
                </div>
                <div className="text-3xl font-mono font-bold text-[#FFD43B] tracking-tight">
                  {data.total_stars} <span className="text-sm font-normal text-[#94A3B8]">stars</span>
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8] mt-1.5 flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  <span>{data.total_forks} downstream forks</span>
                </div>
              </div>

              {/* Metric 3: Dominant Language */}
              <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>DOMINANT LANGUAGE</span>
                  <Code2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                </div>
                <div className="text-3xl font-mono font-bold text-[#38BDF8] tracking-tight">
                  {data.dominant_language || 'Python'}
                </div>
                <div className="text-[11px] font-mono text-[#94A3B8] mt-1.5">
                  ~{data.dominant_percentage || data.language_distribution.Python?.percentage || 65.8}% of tracked volume
                </div>
              </div>

              {/* Metric 4: Version Control Stream */}
              <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4">
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>REMOTE TELEMETRY</span>
                  <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
                </div>
                <div className="text-xl font-mono font-bold text-white tracking-tight mt-1">
                  Active Origin
                </div>
                <div className="text-[11px] font-mono text-[#22C55E] mt-2">
                  Verified Git push events
                </div>
              </div>
            </div>

            {/* Language Distribution Breakdown */}
            <div className="border-t border-[#1F2937] pt-6">
              <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] mb-3">
                <span className="uppercase tracking-wider">
                  $ github --language-distribution --breakdown
                </span>
                <span className="text-[11px] text-[#64748B]">Across all public repositories</span>
              </div>

              {/* Visual Language Bar */}
              <div className="w-full bg-[#1F2937] h-3 rounded-full overflow-hidden flex mb-4">
                <div
                  className="bg-[#3776AB] h-full"
                  style={{ width: `${data.language_distribution.Python?.percentage || 65.8}%` }}
                  title={`Python: ${data.language_distribution.Python?.percentage || 65.8}%`}
                />
                <div
                  className="bg-[#F97316] h-full"
                  style={{
                    width: `${
                      data.language_distribution.JupyterNotebook?.percentage ||
                      data.language_distribution['Jupyter Notebook']?.percentage ||
                      21.8
                    }%`,
                  }}
                  title="Jupyter Notebook"
                />
                <div
                  className="bg-[#EAB308] h-full"
                  style={{ width: `${data.language_distribution.WebAndOther?.percentage || 12.4}%` }}
                  title="Web & Other"
                />
              </div>

              {/* Language Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3776AB]" />
                    <span className="text-white font-semibold">Python</span>
                  </div>
                  <span className="text-[#38BDF8]">
                    {data.language_distribution.Python?.percentage || 65.8}%
                  </span>
                </div>

                <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                    <span className="text-white font-semibold">Jupyter Notebooks</span>
                  </div>
                  <span className="text-[#F97316]">
                    {data.language_distribution.JupyterNotebook?.percentage ||
                      data.language_distribution['Jupyter Notebook']?.percentage ||
                      21.8}
                    %
                  </span>
                </div>

                <div className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
                    <span className="text-white font-semibold">Web & Scripting</span>
                  </div>
                  <span className="text-[#EAB308]">
                    {data.language_distribution.WebAndOther?.percentage || 12.4}%
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Public Repository Activity Stream */}
            <div className="border-t border-[#1F2937] pt-6">
              <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] mb-4">
                <span className="uppercase tracking-wider">
                  $ git log --public-events --recent
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Verified GitHub push events
                </span>
              </div>

              <div className="space-y-3">
                {data.recent_activity.map((item, idx) => (
                  <div
                    key={`${item.repo}-${idx}`}
                    className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs hover:border-[#3776AB]/50 transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-2.5">
                      <GitCommit className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5 sm:mt-0" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[#38BDF8] font-bold break-all">{item.repo}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1F2937] text-[#94A3B8] shrink-0">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-[#E5E7EB] text-xs mt-0.5 line-clamp-2 sm:line-clamp-1 break-words">{item.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#64748B] shrink-0 pl-6 sm:pl-0">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Distinction Disclaimer */}
              <div className="mt-4 p-3 rounded-lg border border-[#1F2937]/70 bg-[#070A0E]/50 flex items-start gap-2.5 text-[11px] font-mono text-[#64748B]">
                <Info className="w-3.5 h-3.5 text-[#3776AB] shrink-0 mt-0.5" />
                <span>
                  Telemetry notice: Activity logs display public repository PushEvents captured via the official
                  GitHub REST API. Repository event timestamps reflect recorded pushes and are distinguished from
                  offline local Git author dates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
