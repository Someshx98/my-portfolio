import type { LeetCodeStats } from './types.ts';
import { memoryCache } from './cache.ts';

export const LEETCODE_CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes
const CACHE_KEY_LEETCODE = 'leetcode_stats';

export const FALLBACK_LEETCODE_STATS: LeetCodeStats = {
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
  lastSynchronized: new Date().toISOString(),
  isLive: false,
  cached: true,
  fallback: true,
  provider: 'baseline',
};

async function fetchFromGraphQL(username: string): Promise<LeetCodeStats | null> {
  const gqlBody = {
    query: `
      query getFullUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          username
          profile {
            ranking
            reputation
            starRating
          }
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
            totalSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          userCalendar {
            streak
            totalActiveDays
          }
          languageProblemCount {
            languageName
            problemsSolved
          }
          tagProblemCounts {
            advanced {
              tagName
              problemsSolved
            }
            intermediate {
              tagName
              problemsSolved
            }
            fundamental {
              tagName
              problemsSolved
            }
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          topPercentage
          badge {
            name
          }
        }
        recentAcSubmissionList(username: $username, limit: 8) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `,
    variables: { username },
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Referer: 'https://leetcode.com',
      },
      body: JSON.stringify(gqlBody),
      signal: controller.signal,
    });

    if (!res.ok) return null;

    const json = await res.json();
    const matched = json?.data?.matchedUser;
    const allQ = json?.data?.allQuestionsCount;
    const contestData = json?.data?.userContestRanking;
    const recentAc = json?.data?.recentAcSubmissionList;

    if (!matched || !matched.submitStats) return null;

    const acList = matched.submitStats.acSubmissionNum || [];
    const totalList = matched.submitStats.totalSubmissionNum || [];

    const allAc = acList.find((s: any) => s.difficulty === 'All');
    const easyAc = acList.find((s: any) => s.difficulty === 'Easy');
    const medAc = acList.find((s: any) => s.difficulty === 'Medium');
    const hardAc = acList.find((s: any) => s.difficulty === 'Hard');

    const allTot = totalList.find((s: any) => s.difficulty === 'All');
    const easyTot = totalList.find((s: any) => s.difficulty === 'Easy');
    const medTot = totalList.find((s: any) => s.difficulty === 'Medium');
    const hardTot = totalList.find((s: any) => s.difficulty === 'Hard');

    const allQTotal = allQ?.find((q: any) => q.difficulty === 'All')?.count || 4101;
    const easyQTotal = allQ?.find((q: any) => q.difficulty === 'Easy')?.count || 975;
    const medQTotal = allQ?.find((q: any) => q.difficulty === 'Medium')?.count || 2139;
    const hardQTotal = allQ?.find((q: any) => q.difficulty === 'Hard')?.count || 987;

    const totalSolvedCount = allAc?.count ?? 151;
    const totalSubmissions = allTot?.submissions ?? 200;
    const acceptedSubmissions = allAc?.submissions ?? 166;

    const acRateNum =
      totalSubmissions > 0 ? Number(((acceptedSubmissions / totalSubmissions) * 100).toFixed(1)) : 82.8;

    const easySub = easyTot?.submissions ?? 95;
    const easyAcc = easyAc?.submissions ?? 79;
    const easyRate = easySub > 0 ? `${((easyAcc / easySub) * 100).toFixed(1)}%` : '83.2%';

    const medSub = medTot?.submissions ?? 82;
    const medAcc = medAc?.submissions ?? 67;
    const medRate = medSub > 0 ? `${((medAcc / medSub) * 100).toFixed(1)}%` : '81.7%';

    const hardSub = hardTot?.submissions ?? 23;
    const hardAcc = hardAc?.submissions ?? 20;
    const hardRate = hardSub > 0 ? `${((hardAcc / hardSub) * 100).toFixed(1)}%` : '87.0%';

    const contestAttended = contestData?.attendedContestsCount || 0;
    const contestRating = contestData?.rating ? Math.round(contestData.rating) : null;
    const contestRanking = contestData?.globalRanking || null;
    const contestStatus = contestRating ? `${contestRating} Rating` : 'Unrated (0 Contests Attended)';

    const recentSubmissions =
      Array.isArray(recentAc) && recentAc.length > 0
        ? recentAc.map((sub: any) => ({
            id: String(sub.id),
            title: sub.title,
            titleSlug: sub.titleSlug,
            timestamp: typeof sub.timestamp === 'string' ? Number(sub.timestamp) : sub.timestamp,
            url: `https://leetcode.com/problems/${sub.titleSlug}/`,
          }))
        : FALLBACK_LEETCODE_STATS.recentSubmissions;

    const allTags: Array<{ name: string; count: number }> = [];
    const tagGroups = matched.tagProblemCounts;
    if (tagGroups) {
      ['fundamental', 'intermediate', 'advanced'].forEach((grp) => {
        if (Array.isArray(tagGroups[grp])) {
          tagGroups[grp].forEach((t: any) => {
            if (t.problemsSolved > 0) {
              allTags.push({ name: t.tagName, count: t.problemsSolved });
            }
          });
        }
      });
    }
    allTags.sort((a, b) => b.count - a.count);

    const ranking = matched.profile?.ranking || 1192080;

    return {
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved: String(totalSolvedCount),
      solvedNumber: totalSolvedCount,
      totalQuestions: allQTotal,
      acceptanceRate: `${acRateNum}%`,
      acceptanceRateNumber: acRateNum,
      totalSubmissions,
      acceptedSubmissions,
      ranking,
      rankingDisplay: `#${ranking.toLocaleString()}`,
      streak: matched.userCalendar?.streak ?? 65,
      totalActiveDays: matched.userCalendar?.totalActiveDays ?? 74,
      contestRating,
      contestRanking,
      contestAttended,
      contestStatus,
      recentSubmissions,
      categories: {
        easy: {
          solved: easyAc?.count ?? 72,
          total: easyQTotal,
          submissions: easySub,
          accepted: easyAcc,
          acceptanceRate: easyRate,
          color: '#22C55E',
        },
        medium: {
          solved: medAc?.count ?? 63,
          total: medQTotal,
          submissions: medSub,
          accepted: medAcc,
          acceptanceRate: medRate,
          color: '#FFD43B',
        },
        hard: {
          solved: hardAc?.count ?? 16,
          total: hardQTotal,
          submissions: hardSub,
          accepted: hardAcc,
          acceptanceRate: hardRate,
          color: '#EF4444',
        },
      },
      languages:
        Array.isArray(matched.languageProblemCount) && matched.languageProblemCount.length > 0
          ? matched.languageProblemCount
          : FALLBACK_LEETCODE_STATS.languages,
      topTopics: allTags.length > 0 ? allTags.slice(0, 15) : FALLBACK_LEETCODE_STATS.topTopics,
      lastSynchronized: new Date().toISOString(),
      isLive: true,
      cached: false,
      fallback: false,
      provider: 'graphql',
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchFromAlfaProxy(username: string): Promise<LeetCodeStats | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (!data || typeof data.totalSolved !== 'number') return null;

    const totalSolved = data.totalSolved;
    const easySolved = data.easySolved ?? 72;
    const medSolved = data.mediumSolved ?? 63;
    const hardSolved = data.hardSolved ?? 16;
    const totalQ = data.totalQuestions ?? 4101;
    const totalEasy = data.totalEasy ?? 975;
    const totalMed = data.totalMedium ?? 2139;
    const totalHard = data.totalHard ?? 987;
    const ranking = data.ranking ?? 1192080;

    return {
      username,
      profileUrl: `https://leetcode.com/u/${username}/`,
      totalSolved: String(totalSolved),
      solvedNumber: totalSolved,
      totalQuestions: totalQ,
      acceptanceRate: '82.8%',
      acceptanceRateNumber: 82.8,
      totalSubmissions: 200,
      acceptedSubmissions: 166,
      ranking,
      rankingDisplay: `#${ranking.toLocaleString()}`,
      streak: 65,
      totalActiveDays: 74,
      contestRating: null,
      contestRanking: null,
      contestAttended: 0,
      contestStatus: 'Unrated (0 Contests Attended)',
      recentSubmissions: FALLBACK_LEETCODE_STATS.recentSubmissions,
      categories: {
        easy: {
          solved: easySolved,
          total: totalEasy,
          submissions: 95,
          accepted: 79,
          acceptanceRate: `${((79 / 95) * 100).toFixed(1)}%`,
          color: '#22C55E',
        },
        medium: {
          solved: medSolved,
          total: totalMed,
          submissions: 82,
          accepted: 67,
          acceptanceRate: `${((67 / 82) * 100).toFixed(1)}%`,
          color: '#FFD43B',
        },
        hard: {
          solved: hardSolved,
          total: totalHard,
          submissions: 23,
          accepted: 20,
          acceptanceRate: `${((20 / 23) * 100).toFixed(1)}%`,
          color: '#EF4444',
        },
      },
      languages: FALLBACK_LEETCODE_STATS.languages,
      topTopics: FALLBACK_LEETCODE_STATS.topTopics,
      lastSynchronized: new Date().toISOString(),
      isLive: true,
      cached: false,
      fallback: false,
      provider: 'alfa-proxy',
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchLeetCodeStats(forceRefresh = false): Promise<LeetCodeStats> {
  const username = 'PtVRqr4rhF';

  if (!forceRefresh) {
    const cached = memoryCache.get<LeetCodeStats>(CACHE_KEY_LEETCODE, LEETCODE_CACHE_TTL_MS);
    if (cached) {
      return { ...cached, cached: true, isLive: false };
    }
  }

  // Tier 1: Direct official GraphQL API
  const liveGql = await fetchFromGraphQL(username);
  if (liveGql) {
    memoryCache.set(CACHE_KEY_LEETCODE, liveGql);
    return liveGql;
  }

  // Tier 2: High availability secondary proxy
  const proxyStats = await fetchFromAlfaProxy(username);
  if (proxyStats) {
    memoryCache.set(CACHE_KEY_LEETCODE, proxyStats);
    return proxyStats;
  }

  // Tier 3: Memory cache (even if expired)
  const lastGood = memoryCache.getLastKnownGood<LeetCodeStats>(CACHE_KEY_LEETCODE);
  if (lastGood) {
    return { ...lastGood, cached: true, isLive: false, fallback: false };
  }

  // Tier 4: Verified baseline static data
  return { ...FALLBACK_LEETCODE_STATS, cached: false, fallback: true, isLive: false };
}
