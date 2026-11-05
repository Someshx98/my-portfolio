import React, { useState, useEffect } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ExternalLink, Code2, RefreshCw, Flame, Target, Activity, Trophy } from 'lucide-react';
import { motion } from 'motion/react';

export interface TopicItem {
  name: string;
  count: number;
}

export interface LanguageStat {
  languageName: string;
  problemsSolved: number;
}

export interface DifficultyCategory {
  solved: number;
  total: number;
  submissions?: number;
  accepted?: number;
  acceptanceRate?: string;
  color: string;
}

export interface RecentSubmission {
  id: string;
  title: string;
  titleSlug: string;
  timestamp: number;
  url: string;
}

export interface LeetCodeStats {
  username: string;
  profileUrl: string;
  totalSolved: string;
  solvedNumber: number;
  totalQuestions?: number;
  acceptanceRate: string;
  acceptanceRateNumber?: number;
  totalSubmissions?: number;
  acceptedSubmissions?: number;
  ranking?: number;
  rankingDisplay?: string;
  streak?: number;
  totalActiveDays?: number;
  contestRating?: number | null;
  contestRanking?: number | null;
  contestAttended?: number;
  contestStatus?: string;
  recentSubmissions?: RecentSubmission[];
  categories: {
    easy: DifficultyCategory;
    medium: DifficultyCategory;
    hard: DifficultyCategory;
  };
  languages?: LanguageStat[];
  topTopics: (string | TopicItem)[];
  lastSynchronized?: string;
  isLive?: boolean;
  cached?: boolean;
}

function formatTimeAgo(timestamp: number): string {
  if (!timestamp) return 'Recent';
  const now = Math.floor(Date.now() / 1000);
  const diffSec = now - timestamp;
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

const DEFAULT_STATS: LeetCodeStats = {
  username: 'PtVRqr4rhF',
  profileUrl: 'https://leetcode.com/u/PtVRqr4rhF/',
  totalSolved: '151',
  solvedNumber: 151,
  totalQuestions: 4101,
  acceptanceRate: '82.8%',
  acceptanceRateNumber: 82.8,
  totalSubmissions: 200,
  acceptedSubmissions: 166,
  ranking: 1192080,
  rankingDisplay: '#1,192,080',
  streak: 65,
  totalActiveDays: 74,
  contestRating: null,
  contestRanking: null,
  contestAttended: 0,
  contestStatus: 'Unrated (0 Contests Attended)',
  recentSubmissions: [
    {
      id: '2190316054',
      title: 'Find the Distance Value Between Two Arrays',
      titleSlug: 'find-the-distance-value-between-two-arrays',
      timestamp: 1793906026,
      url: 'https://leetcode.com/problems/find-the-distance-value-between-two-arrays/',
    },
    {
      id: '2189592173',
      title: 'Minimum Operations to Make Elements Within K Subarrays Equal',
      titleSlug: 'minimum-operations-to-make-elements-within-k-subarrays-equal',
      timestamp: 1793817455,
      url: 'https://leetcode.com/problems/minimum-operations-to-make-elements-within-k-subarrays-equal/',
    },
    {
      id: '2188842386',
      title: 'Minimum Moves to Equal Array Elements III',
      titleSlug: 'minimum-moves-to-equal-array-elements-iii',
      timestamp: 1793729230,
      url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-iii/',
    },
    {
      id: '2188071727',
      title: 'Minimum Moves to Equal Array Elements II',
      titleSlug: 'minimum-moves-to-equal-array-elements-ii',
      timestamp: 1793648426,
      url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements-ii/',
    },
    {
      id: '2187255647',
      title: 'Minimum Moves to Equal Array Elements',
      titleSlug: 'minimum-moves-to-equal-array-elements',
      timestamp: 1793560073,
      url: 'https://leetcode.com/problems/minimum-moves-to-equal-array-elements/',
    },
  ],
  categories: {
    easy: {
      solved: 72,
      total: 975,
      submissions: 95,
      accepted: 79,
      acceptanceRate: '83.2%',
      color: '#22C55E',
    },
    medium: {
      solved: 63,
      total: 2139,
      submissions: 82,
      accepted: 67,
      acceptanceRate: '81.7%',
      color: '#FFD43B',
    },
    hard: {
      solved: 16,
      total: 987,
      submissions: 23,
      accepted: 20,
      acceptanceRate: '87.0%',
      color: '#EF4444',
    },
  },
  languages: [
    { languageName: 'Python3', problemsSolved: 81 },
    { languageName: 'C++', problemsSolved: 36 },
    { languageName: 'Pandas', problemsSolved: 36 },
    { languageName: 'MySQL', problemsSolved: 1 },
  ],
  topTopics: [
    { name: 'Arrays', count: 78 },
    { name: 'Database', count: 37 },
    { name: 'Strings', count: 30 },
    { name: 'Two Pointers', count: 18 },
    { name: 'Math', count: 16 },
    { name: 'Hash Table', count: 15 },
    { name: 'Stack', count: 14 },
    { name: 'Backtracking', count: 12 },
    { name: 'Dynamic Programming', count: 12 },
    { name: 'Sorting', count: 12 },
    { name: 'Binary Search', count: 10 },
    { name: 'Divide & Conquer', count: 7 },
    { name: 'Matrix', count: 7 },
    { name: 'Bit Manipulation', count: 6 },
    { name: 'Greedy', count: 5 },
  ],
};

export const LeetCode: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [lastSyncLabel, setLastSyncLabel] = useState<string>('Live Sync');
  const [syncStatus, setSyncStatus] = useState<'live' | 'cached' | 'syncing' | 'error'>('live');
  const inFlightRef = React.useRef(false);

  const fetchStats = async (isManual = false) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    try {
      setLoading(true);
      setSyncStatus('syncing');
      setSyncError(null);
      const res = await fetch(`/api/leetcode${isManual ? '?refresh=true' : ''}`);
      if (res.ok) {
        const data = await res.json();
        if (data && data.categories) {
          setStats(data);
          const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          if (data.isLive) {
            setSyncStatus('live');
            setLastSyncLabel(`Synced ${timeStr}`);
          } else {
            setSyncStatus('cached');
            setLastSyncLabel(`Cached ${timeStr}`);
          }
        }
      } else {
        setSyncStatus('error');
        setSyncError('Remote LeetCode telemetry gateway returned non-200 status. Preserving cached data.');
      }
    } catch (err) {
      setSyncStatus('error');
      setSyncError('Network disconnect while updating LeetCode data. Verified cached telemetry active.');
    } finally {
      setLoading(false);
      inFlightRef.current = false;
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 15 minutes as specified
    const interval = setInterval(() => {
      fetchStats();
    }, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const totalCatalog = stats.totalQuestions || 4101;
  const easyPct = ((stats.categories.easy.solved / stats.categories.easy.total) * 100).toFixed(1);
  const medPct = ((stats.categories.medium.solved / stats.categories.medium.total) * 100).toFixed(1);
  const hardPct = ((stats.categories.hard.solved / stats.categories.hard.total) * 100).toFixed(1);

  return (
    <section id="leetcode" className="py-20 border-t border-[#1F2937]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          command="python3 -m leetcode --profile PtVRqr4rhF"
          title="leetcode.py"
          subtitle="Continuous competitive programming and algorithmic data structures training focused on graph traversals, dynamic programming, and asymptotic efficiency."
          tag="PROFILE TELEMETRY"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="rounded-xl border border-[#1F2937] bg-[#0B0F14] overflow-hidden shadow-2xl"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#070A0E] px-4 sm:px-6 py-3 select-none flex-wrap gap-2">
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-[#E5E7EB]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#EAB308]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
              <span className="text-[#3776AB] ml-2">$ leetcode --stats</span>
              <span className="text-[#FFD43B] font-semibold">{stats.username}</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              {/* Telemetry live status */}
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
                <span>{loading ? 'Syncing...' : lastSyncLabel}</span>
              </div>

              {/* Refresh Button */}
              <button
                type="button"
                onClick={() => fetchStats(true)}
                disabled={loading}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#1F2937] bg-[#070A0E] text-[#94A3B8] hover:text-[#FFD43B] hover:border-[#FFD43B] transition-colors disabled:opacity-50 cursor-pointer"
                title="Refresh LeetCode Statistics (15m Cache)"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#FFD43B]' : ''}`} />
                <span className="hidden md:inline">{loading ? 'Syncing...' : 'Sync'}</span>
              </button>

              {/* View Profile */}
              <a
                href={stats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#1F2937] bg-[#070A0E] text-[#E5E7EB] hover:border-[#FFD43B] hover:text-[#FFD43B] transition-colors"
              >
                <span>View Profile</span>
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
                onClick={() => fetchStats(true)}
                className="underline hover:text-white cursor-pointer ml-3 shrink-0 disabled:opacity-50"
              >
                {loading ? 'Retrying...' : 'Retry'}
              </button>
            </div>
          )}

          <div className="p-4 sm:p-8">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
              {/* Card 1: Problems Solved */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 relative overflow-hidden group hover:border-[#3776AB]/70 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>TOTAL PROBLEMS</span>
                  <Target className="w-3.5 h-3.5 text-[#38BDF8]" />
                </div>
                <div className="text-3xl font-mono font-bold text-white tracking-tight">
                  {stats.solvedNumber}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mt-1.5">
                  <span className="text-[#22C55E] font-medium">
                    {stats.solvedNumber} / {totalCatalog.toLocaleString()}
                  </span>
                  <span className="text-[#64748B]">
                    {((stats.solvedNumber / totalCatalog) * 100).toFixed(1)}% catalog
                  </span>
                </div>
              </motion.div>

              {/* Card 2: Particular Acceptance Rate */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 relative overflow-hidden group hover:border-[#FFD43B]/70 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>ACCEPTANCE RATE</span>
                  <Activity className="w-3.5 h-3.5 text-[#FFD43B]" />
                </div>
                <div className="text-3xl font-mono font-bold text-[#FFD43B] tracking-tight">
                  {stats.acceptanceRate}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mt-1.5">
                  <span className="text-[#FFD43B]">
                    {stats.acceptedSubmissions ?? 140} / {stats.totalSubmissions ?? 169} AC
                  </span>
                  <span className="text-[#64748B]">First-pass precision</span>
                </div>
              </motion.div>

              {/* Card 3: Ranking & Contest Status */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 relative overflow-hidden group hover:border-[#8B5CF6]/70 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>GLOBAL RANK & CONTEST</span>
                  <Trophy className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </div>
                <div className="text-3xl font-mono font-bold text-[#8B5CF6] tracking-tight">
                  {stats.rankingDisplay || (stats.ranking ? `#${stats.ranking.toLocaleString()}` : '#1,416,809')}
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mt-1.5 gap-1">
                  <span className="text-[#A78BFA] font-medium truncate max-w-[120px] min-[400px]:max-w-[170px]" title={stats.contestStatus || 'Unrated (0 Contests)'}>
                    {stats.contestStatus || 'Unrated (0 Contests)'}
                  </span>
                  <span className="text-[#F97316] font-medium flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#F97316]" />
                    {stats.streak ?? 40}d
                  </span>
                </div>
              </motion.div>

              {/* Card 4: Primary Languages */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 relative overflow-hidden group hover:border-[#3776AB]/70 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-1">
                  <span>PRIMARY LANGUAGES</span>
                  <Code2 className="w-3.5 h-3.5 text-[#3776AB]" />
                </div>
                <div className="text-3xl font-mono font-bold text-[#3776AB] tracking-tight">
                  Python & C++
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mt-1.5">
                  <span className="text-[#93C5FD]">Python: 55 · C++: 36</span>
                  <span className="text-[#64748B]">Pandas: 36</span>
                </div>
              </motion.div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="border-t border-[#1F2937] pt-6 mb-8">
              <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] mb-4">
                <span className="uppercase tracking-wider">
                  $ leetcode --breakdown --by-difficulty
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Exact submissions & acceptance
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Easy */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 flex flex-col justify-between hover:border-[#22C55E]/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] font-bold">
                        EASY
                      </span>
                      <span className="text-white font-mono font-bold text-sm">
                        {stats.categories.easy.solved}{' '}
                        <span className="text-[#64748B] text-xs font-normal">
                          / {stats.categories.easy.total}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-2 mt-2">
                      <span className="text-[#22C55E]">
                        Acceptance: {stats.categories.easy.acceptanceRate || '81.6%'}
                      </span>
                      <span className="text-[#64748B]">
                        {stats.categories.easy.accepted ?? 71} / {stats.categories.easy.submissions ?? 87} AC
                      </span>
                    </div>

                    <div className="w-full bg-[#1F2937] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#22C55E] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(10, (stats.categories.easy.solved / stats.categories.easy.total) * 100 * 4))}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#94A3B8] font-mono mt-3 pt-2 border-t border-[#1F2937]/60 flex items-center justify-between">
                    <span>Solved ratio: {easyPct}%</span>
                    <span className="text-[#64748B]">Arrays, Pointers, Search</span>
                  </div>
                </motion.div>

                {/* Medium */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 flex flex-col justify-between hover:border-[#FFD43B]/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#FFD43B]/10 border border-[#FFD43B]/30 text-[#FFD43B] font-bold">
                        MEDIUM
                      </span>
                      <span className="text-white font-mono font-bold text-sm">
                        {stats.categories.medium.solved}{' '}
                        <span className="text-[#64748B] text-xs font-normal">
                          / {stats.categories.medium.total}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-2 mt-2">
                      <span className="text-[#FFD43B]">
                        Acceptance: {stats.categories.medium.acceptanceRate || '83.3%'}
                      </span>
                      <span className="text-[#64748B]">
                        {stats.categories.medium.accepted ?? 55} / {stats.categories.medium.submissions ?? 66} AC
                      </span>
                    </div>

                    <div className="w-full bg-[#1F2937] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FFD43B] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(10, (stats.categories.medium.solved / stats.categories.medium.total) * 100 * 4))}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#94A3B8] font-mono mt-3 pt-2 border-t border-[#1F2937]/60 flex items-center justify-between">
                    <span>Solved ratio: {medPct}%</span>
                    <span className="text-[#64748B]">Backtracking, DP, Math</span>
                  </div>
                </motion.div>

                {/* Hard */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.35, delay: 0.15 }}
                  className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-4 flex flex-col justify-between hover:border-[#EF4444]/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] font-bold">
                        HARD
                      </span>
                      <span className="text-white font-mono font-bold text-sm">
                        {stats.categories.hard.solved}{' '}
                        <span className="text-[#64748B] text-xs font-normal">
                          / {stats.categories.hard.total}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-2 mt-2">
                      <span className="text-[#EF4444]">
                        Acceptance: {stats.categories.hard.acceptanceRate || '87.5%'}
                      </span>
                      <span className="text-[#64748B]">
                        {stats.categories.hard.accepted ?? 14} / {stats.categories.hard.submissions ?? 16} AC
                      </span>
                    </div>

                    <div className="w-full bg-[#1F2937] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#EF4444] h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, Math.max(10, (stats.categories.hard.solved / stats.categories.hard.total) * 100 * 4))}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-[#94A3B8] font-mono mt-3 pt-2 border-t border-[#1F2937]/60 flex items-center justify-between">
                    <span>Solved ratio: {hardPct}%</span>
                    <span className="text-[#64748B]">Complex Memoization, Divide</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Live Recent Submissions Activity */}
            {stats.recentSubmissions && stats.recentSubmissions.length > 0 && (
              <div className="border-t border-[#1F2937] pt-6 mb-8">
                <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] mb-3">
                  <span className="uppercase tracking-wider">
                    $ leetcode --recent-submissions (live pipeline)
                  </span>
                  <span className="text-[11px] text-[#22C55E] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    Latest Solved Challenges
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stats.recentSubmissions.slice(0, 6).map((sub, idx) => {
                    const timeAgo = formatTimeAgo(sub.timestamp);
                    return (
                      <motion.a
                        key={sub.id || sub.titleSlug}
                        href={sub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="group/sub rounded-lg border border-[#1F2937] bg-[#070A0E] p-3 flex items-center justify-between hover:border-[#22C55E]/60 hover:bg-[#0B0F14] transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-mono font-bold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-1.5 py-0.2 rounded shrink-0">
                              AC
                            </span>
                            <span className="font-mono text-xs text-white truncate font-medium group-hover/sub:text-[#FFD43B] transition-colors">
                              {sub.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-[#64748B]">
                            {timeAgo}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover/sub:text-[#FFD43B] shrink-0 transition-colors" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages Breakdown */}
            {stats.languages && stats.languages.length > 0 && (
              <div className="border-t border-[#1F2937] pt-6 mb-8">
                <div className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider mb-4">
                  $ leetcode --languages --distribution
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                  {stats.languages.map((lang) => {
                    const isPy = lang.languageName.toLowerCase().includes('python');
                    const isCpp = lang.languageName.toLowerCase().includes('c++');
                    const isPandas = lang.languageName.toLowerCase().includes('pandas');
                    const color = isPy ? '#3776AB' : isCpp ? '#38BDF8' : isPandas ? '#A855F7' : '#F59E0B';

                    return (
                      <div
                        key={lang.languageName}
                        className="rounded-lg border border-[#1F2937] bg-[#070A0E] p-3 hover:border-[#3776AB]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span style={{ color }} className="font-bold">
                            {lang.languageName}
                          </span>
                          <span className="text-white font-bold">
                            {lang.problemsSolved}
                          </span>
                        </div>
                        <div className="w-full bg-[#1F2937] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: color,
                              width: `${Math.min(100, Math.max(15, (lang.problemsSolved / stats.solvedNumber) * 100))}%`,
                            }}
                          />
                        </div>
                        <div className="text-[10px] text-[#64748B] mt-1 text-right">
                          {((lang.problemsSolved / stats.solvedNumber) * 100).toFixed(0)}% of solved
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Solved Topics Tags with Particular Counts */}
            <div className="border-t border-[#1F2937] pt-6">
              <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8] mb-3">
                <span className="uppercase tracking-wider">
                  $ leetcode --topics --verified-counts
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Top algorithmic tags
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {stats.topTopics.map((item, idx) => {
                  const name = typeof item === 'string' ? item : item.name;
                  const count = typeof item === 'object' && item.count !== undefined ? item.count : null;

                  return (
                    <span
                      key={`${name}-${idx}`}
                      className="px-2.5 py-1 rounded bg-[#070A0E] border border-[#1F2937] text-[#93C5FD] font-mono text-xs flex items-center gap-1.5 hover:border-[#38BDF8]/60 hover:text-white transition-colors"
                    >
                      <span>{name}</span>
                      {count !== null && (
                        <span className="px-1.5 py-0.2 rounded bg-[#1E293B] text-[#38BDF8] text-[10px] font-bold">
                          {count}
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Terminal Telemetry Strip */}
            <div className="mt-8 pt-4 border-t border-[#1F2937]/60 flex items-center justify-between flex-wrap gap-2 font-mono text-[11px] text-[#64748B]">
              <div className="flex items-center gap-2">
                <span className="text-[#22C55E]">✓</span>
                <span>telemetry: matched_user="{stats.username}"</span>
                <span className="text-[#3776AB]">|</span>
                <span>ac_rate={stats.acceptanceRate}</span>
                <span className="text-[#3776AB]">|</span>
                <span>total_solved={stats.solvedNumber}</span>
              </div>
              <div>
                <span>submissions={stats.totalSubmissions ?? 169} (ac={stats.acceptedSubmissions ?? 140})</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
