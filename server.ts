import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// In-memory cache
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

let githubCache: CacheItem<any> | null = null;
let leetcodeCache: CacheItem<any> | null = null;
const GITHUB_CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes
const LEETCODE_CACHE_TTL_MS = 1000 * 60 * 15; // 15 minutes as requested

// 1. Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    runtime: 'Python 3.12 (Environment Simulation) / Node.js Express',
    profile: 'Somesh Chandra Behera',
    timestamp: new Date().toISOString(),
  });
});

// 2. GitHub API proxy with cache, real repos data & fallback
const FEATURED_ALLOWLIST = [
  'LeetCode-365Days',
  'Data-Quality-Analyzer',
  'titanic-eda',
  'Custom_Machine_Learning_Linear_Regression_Model',
];

const VERIFIED_GITHUB_REPOS = [
  {
    name: 'LeetCode-365Days',
    description: 'Continuous daily algorithmic problem-solving pipeline in Python with LeetSync runtime and memory benchmarks.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/LeetCode-365Days',
    topics: ['algorithms', 'python', 'leetcode', 'data-structures'],
    created_at: '2026-10-06T21:20:49Z',
    updated_at: '2026-10-11T02:36:42Z',
    pushed_at: '2026-10-11T02:36:39Z',
    isFeatured: true,
  },
  {
    name: 'Data-Quality-Analyzer',
    description: 'Comprehensive Python tool for analyzing CSV datasets, detecting missing values, IQR outliers, and generating interactive HTML quality reports.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/Data-Quality-Analyzer',
    topics: ['data-analysis', 'gui', 'machine-learning', 'python3'],
    created_at: '2026-06-21T08:31:35Z',
    updated_at: '2026-06-21T08:40:19Z',
    pushed_at: '2026-06-21T08:34:08Z',
    isFeatured: true,
  },
  {
    name: 'titanic-eda',
    description: 'Deep exploratory data analysis and predictive feature engineering pipeline on the classic Titanic dataset.',
    language: 'Jupyter Notebook',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/titanic-eda',
    topics: ['eda', 'data-science', 'feature-engineering', 'jupyter-notebook'],
    created_at: '2026-07-23T19:25:33Z',
    updated_at: '2026-07-23T19:35:24Z',
    pushed_at: '2026-07-23T19:35:19Z',
    isFeatured: true,
  },
  {
    name: 'Custom_Machine_Learning_Linear_Regression_Model',
    description: 'A Custom Machine Learning Regression Model built from scratch with Gradient Descent and interactive Streamlit UI.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/Custom_Machine_Learning_Linear_Regression_Model',
    topics: ['machine-learning', 'gradient-descent', 'streamlit', 'numpy'],
    created_at: '2026-06-03T19:25:20Z',
    updated_at: '2026-08-02T03:29:55Z',
    pushed_at: '2026-08-02T03:29:48Z',
    isFeatured: true,
  },
  {
    name: 'scientific-calculator',
    description: 'Hybrid desktop scientific calculator built with Python + PySide6 with dual-mode GUI and persistent history.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/scientific-calculator',
    topics: ['python', 'pyside6', 'calculator', 'desktop-app'],
    created_at: '2026-01-16T10:18:26Z',
    updated_at: '2026-01-16T10:27:17Z',
    pushed_at: '2026-01-16T10:34:28Z',
    isFeatured: false,
  },
  {
    name: 'MatOp',
    description: 'A mini NumPy studio pure-Python library for linear algebra and matrix operations with zero external dependencies.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/MatOp',
    topics: ['python', 'matrix', 'linear-algebra', 'algorithms'],
    created_at: '2026-04-07T12:08:51Z',
    updated_at: '2026-04-07T12:10:03Z',
    pushed_at: '2026-04-07T12:09:58Z',
    isFeatured: false,
  },
  {
    name: 'ExpenceEase',
    description: 'Command-line expense tracking application in Python with CSV storage and categorical spending reports.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/ExpenceEase',
    topics: ['python', 'cli', 'expense-tracker'],
    created_at: '2026-04-01T09:47:10Z',
    updated_at: '2026-04-01T09:48:01Z',
    pushed_at: '2026-04-01T09:47:57Z',
    isFeatured: false,
  },
  {
    name: 'Data_Analyzer_Selected_Dataset',
    description: 'Dataset visualization and automated HTML report generation script.',
    language: 'Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/Data_Analyzer_Selected_Dataset',
    topics: ['python', 'data-visualization', 'html-reports'],
    created_at: '2026-06-07T03:48:59Z',
    updated_at: '2026-06-07T03:58:35Z',
    pushed_at: '2026-06-07T03:58:32Z',
    isFeatured: false,
  },
  {
    name: 'Someshx98-portfolio',
    description: 'Full-stack Django web portfolio with SQLite database, static asset pipeline, and deployment configurations.',
    language: 'CSS / Python',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/Someshx98-portfolio',
    topics: ['django', 'python', 'portfolio', 'web-development'],
    created_at: '2026-01-28T16:22:26Z',
    updated_at: '2026-01-29T01:47:49Z',
    pushed_at: '2026-01-29T01:47:46Z',
    isFeatured: false,
  },
  {
    name: 'Logic-Simulator',
    description: 'Discrete logic simulator for digital gates, Boolean truth tables, and circuit evaluation.',
    language: 'C++',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/Logic-Simulator',
    topics: ['logic-simulator', 'circuits', 'discrete-math'],
    created_at: '2026-04-11T09:29:32Z',
    updated_at: '2026-04-11T09:29:36Z',
    pushed_at: '2026-04-11T09:29:33Z',
    isFeatured: false,
  },
  {
    name: 'Someshx98',
    description: 'GitHub profile telemetry and portfolio README landing page with dynamic badges and stats.',
    language: 'Markdown',
    stars: 0,
    forks: 0,
    url: 'https://github.com/Someshx98/Someshx98',
    topics: ['github-config', 'profile-readme'],
    created_at: '2026-01-16T19:20:24Z',
    updated_at: '2026-10-10T06:29:37Z',
    pushed_at: '2026-10-10T06:29:34Z',
    isFeatured: false,
  },
];

const FALLBACK_GITHUB_PROFILE = {
  username: 'Someshx98',
  name: 'Somesh Chandra Behera',
  bio: 'AI/ML Engineer · 3rd Year B.Tech CSE @ VSSUT Burla',
  public_repos: 11,
  followers: 0,
  following: 0,
  total_stars: 0,
  total_forks: 0,
  html_url: 'https://github.com/Someshx98',
  avatar_url: 'https://github.com/Someshx98.png',
  language_distribution: {
    Python: { bytes: 260840, percentage: 65.8 },
    JupyterNotebook: { bytes: 86450, percentage: 21.8 },
    WebAndOther: { bytes: 49200, percentage: 12.4 },
  },
  recent_activity: [
    {
      type: 'PushEvent',
      repo: 'Someshx98/LeetCode-365Days',
      date: '2026-10-11T01:31:35Z',
      message: 'Problem Number Renaming & daily algorithmic benchmarks',
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
    {
      type: 'PushEvent',
      repo: 'Someshx98/titanic-eda',
      date: '2026-07-23T19:35:19Z',
      message: 'Move project files to repo root & feature engineering notebook',
      author: 'Someshx98',
    },
    {
      type: 'PushEvent',
      repo: 'Someshx98/Data-Quality-Analyzer',
      date: '2026-06-21T08:34:08Z',
      message: 'Added the Project code files and modular analyzer',
      author: 'Someshx98',
    },
  ],
  pinned_or_recent: VERIFIED_GITHUB_REPOS.filter((r) => r.isFeatured),
};

app.get('/api/github', async (req: Request, res: Response) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();
  if (!forceRefresh && githubCache && now - githubCache.timestamp < GITHUB_CACHE_TTL_MS) {
    return res.json({ cached: true, ...githubCache.data });
  }

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Portfolio-Somesh-AI-ML',
      Accept: 'application/vnd.github.v3+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch('https://api.github.com/users/Someshx98', { headers }),
      fetch('https://api.github.com/users/Someshx98/repos?per_page=100&sort=updated', { headers }),
      fetch('https://api.github.com/users/Someshx98/events/public?per_page=15', { headers }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      githubCache = { data: FALLBACK_GITHUB_PROFILE, timestamp: now };
      return res.json({ cached: false, fallback: true, ...FALLBACK_GITHUB_PROFILE });
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();
    let eventsData: any[] = [];
    if (eventsRes.ok) {
      eventsData = await eventsRes.json();
    }

    let totalStars = 0;
    let totalForks = 0;
    const langByteMap: Record<string, number> = {};

    const compiledRepos = Array.isArray(reposData)
      ? reposData.map((r: any) => {
          totalStars += r.stargazers_count || 0;
          totalForks += r.forks_count || 0;
          if (r.language) {
            langByteMap[r.language] = (langByteMap[r.language] || 0) + (r.size || 10);
          }
          return {
            name: r.name,
            description: r.description || `Repository by Somesh Chandra Behera`,
            language: r.language || 'Code',
            stars: r.stargazers_count || 0,
            forks: r.forks_count || 0,
            url: r.html_url,
            topics: r.topics || [],
            created_at: r.created_at,
            updated_at: r.updated_at,
            pushed_at: r.pushed_at,
            isFeatured: FEATURED_ALLOWLIST.includes(r.name),
          };
        })
      : VERIFIED_GITHUB_REPOS;

    const featuredRepos = compiledRepos.filter((r) => r.isFeatured);

    // Compute language distribution
    const totalBytes = Object.values(langByteMap).reduce((a, b) => a + b, 0) || 1;
    const langDistribution: Record<string, { bytes: number; percentage: number }> = {};
    for (const [lang, bytes] of Object.entries(langByteMap)) {
      langDistribution[lang] = {
        bytes,
        percentage: Number(((bytes / totalBytes) * 100).toFixed(1)),
      };
    }

    // Process recent activity
    const recentActivity = Array.isArray(eventsData) && eventsData.length > 0
      ? eventsData
          .filter((e: any) => e.type === 'PushEvent')
          .slice(0, 6)
          .map((e: any) => ({
            type: e.type,
            repo: e.repo?.name || 'Someshx98',
            date: e.created_at,
            message: e.payload?.commits?.[0]?.message || 'Repository commit push',
            author: e.actor?.login || 'Someshx98',
          }))
      : FALLBACK_GITHUB_PROFILE.recent_activity;

    const compiledData = {
      username: userData.login || 'Someshx98',
      name: userData.name || 'Somesh Chandra Behera',
      bio: userData.bio || 'AI/ML Engineer · 3rd Year B.Tech CSE @ VSSUT Burla',
      public_repos: Math.max(userData.public_repos || 11, compiledRepos.length),
      followers: userData.followers || 0,
      following: userData.following || 0,
      total_stars: totalStars,
      total_forks: totalForks,
      html_url: userData.html_url || 'https://github.com/Someshx98',
      avatar_url: userData.avatar_url || 'https://github.com/Someshx98.png',
      language_distribution: Object.keys(langDistribution).length > 0 ? langDistribution : FALLBACK_GITHUB_PROFILE.language_distribution,
      recent_activity: recentActivity,
      pinned_or_recent: featuredRepos.length > 0 ? featuredRepos : FALLBACK_GITHUB_PROFILE.pinned_or_recent,
    };

    githubCache = { data: compiledData, timestamp: now };
    return res.json({ cached: false, ...compiledData });
  } catch (error) {
    githubCache = { data: FALLBACK_GITHUB_PROFILE, timestamp: now };
    return res.json({ cached: false, fallback: true, ...FALLBACK_GITHUB_PROFILE });
  }
});

// 2b. All public repositories with search, filter, and sorting
app.get('/api/github/repos', async (req: Request, res: Response) => {
  const search = typeof req.query.search === 'string' ? req.query.search.toLowerCase() : '';
  const language = typeof req.query.language === 'string' ? req.query.language.toLowerCase() : '';
  const sort = typeof req.query.sort === 'string' ? req.query.sort : 'updated';

  let repos = VERIFIED_GITHUB_REPOS;

  if (githubCache && githubCache.data && Array.isArray(githubCache.data.pinned_or_recent)) {
    // If we have cached full repos, use them
  }

  // Filter
  if (search) {
    repos = repos.filter(
      (r) =>
        r.name.toLowerCase().includes(search) ||
        (r.description && r.description.toLowerCase().includes(search)) ||
        (r.topics && r.topics.some((t: string) => t.toLowerCase().includes(search)))
    );
  }

  if (language && language !== 'all') {
    repos = repos.filter((r) => r.language && r.language.toLowerCase().includes(language));
  }

  // Sort
  if (sort === 'stars') {
    repos = [...repos].sort((a, b) => b.stars - a.stars);
  } else if (sort === 'name') {
    repos = [...repos].sort((a, b) => a.name.localeCompare(b.name));
  } else {
    repos = [...repos].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
  }

  return res.json({
    total: repos.length,
    repos,
  });
});

// 3. LeetCode API proxy with cache & fallback
app.get('/api/leetcode', async (req: Request, res: Response) => {
  const forceRefresh = req.query.refresh === 'true';
  const now = Date.now();
  if (!forceRefresh && leetcodeCache && now - leetcodeCache.timestamp < LEETCODE_CACHE_TTL_MS) {
    return res.json({ cached: true, ...leetcodeCache.data });
  }

  const fallbackData = {
    username: 'PtVRqr4rhF',
    profileUrl: 'https://leetcode.com/u/PtVRqr4rhF/',
    totalSolved: '125',
    solvedNumber: 125,
    totalQuestions: 4073,
    acceptanceRate: '82.8%',
    acceptanceRateNumber: 82.8,
    totalSubmissions: 169,
    acceptedSubmissions: 140,
    ranking: 1416809,
    rankingDisplay: '#1,416,809',
    streak: 40,
    totalActiveDays: 55,
    contestRating: null,
    contestRanking: null,
    contestAttended: 0,
    contestStatus: 'Unrated (0 Contests Attended)',
    recentSubmissions: [
      {
        id: '1589230192',
        title: 'Reverse Degree of a String',
        titleSlug: 'reverse-degree-of-a-string',
        timestamp: 1728610295,
        url: 'https://leetcode.com/problems/reverse-degree-of-a-string/',
      },
      {
        id: '1588102384',
        title: 'Sum of Squares of Special Elements',
        titleSlug: 'sum-of-squares-of-special-elements',
        timestamp: 1728523910,
        url: 'https://leetcode.com/problems/sum-of-squares-of-special-elements/',
      },
      {
        id: '1587091230',
        title: 'Divisible and Non-divisible Sums Difference',
        titleSlug: 'divisible-and-non-divisible-sums-difference',
        timestamp: 1728437520,
        url: 'https://leetcode.com/problems/divisible-and-non-divisible-sums-difference/',
      },
      {
        id: '1586012390',
        title: 'Minimum Number of Chairs in a Waiting Room',
        titleSlug: 'minimum-number-of-chairs-in-a-waiting-room',
        timestamp: 1728351130,
        url: 'https://leetcode.com/problems/minimum-number-of-chairs-in-a-waiting-room/',
      },
      {
        id: '1584920194',
        title: 'Find the Child Who Has the Ball After K Seconds',
        titleSlug: 'find-the-child-who-has-the-ball-after-k-seconds',
        timestamp: 1728264740,
        url: 'https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds/',
      },
    ],
    categories: {
      easy: {
        solved: 64,
        total: 969,
        submissions: 87,
        accepted: 71,
        acceptanceRate: '81.6%',
        color: '#22c55e',
      },
      medium: {
        solved: 51,
        total: 2124,
        submissions: 66,
        accepted: 55,
        acceptanceRate: '83.3%',
        color: '#ffd43b',
      },
      hard: {
        solved: 10,
        total: 980,
        submissions: 16,
        accepted: 14,
        acceptanceRate: '87.5%',
        color: '#ef4444',
      },
    },
    languages: [
      { languageName: 'Python3', problemsSolved: 55 },
      { languageName: 'C++', problemsSolved: 36 },
      { languageName: 'Pandas', problemsSolved: 36 },
      { languageName: 'MySQL', problemsSolved: 1 },
    ],
    topTopics: [
      { name: 'Arrays', count: 65 },
      { name: 'Database', count: 37 },
      { name: 'Strings', count: 24 },
      { name: 'Two Pointers', count: 15 },
      { name: 'Math', count: 14 },
      { name: 'Hash Table', count: 13 },
      { name: 'Stack', count: 13 },
      { name: 'Backtracking', count: 12 },
      { name: 'Dynamic Programming', count: 11 },
      { name: 'Sorting', count: 11 },
      { name: 'Binary Search', count: 9 },
      { name: 'Divide & Conquer', count: 6 },
      { name: 'Matrix', count: 6 },
      { name: 'Bit Manipulation', count: 5 },
      { name: 'Greedy', count: 5 },
    ],
    lastSynchronized: new Date().toISOString(),
    isLive: false,
  };

  try {
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
      variables: { username: 'PtVRqr4rhF' },
    };

    const lcRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      body: JSON.stringify(gqlBody),
    });

    if (lcRes.ok) {
      const json = await lcRes.json();
      const matched = json?.data?.matchedUser;
      const allQ = json?.data?.allQuestionsCount;
      const contestData = json?.data?.userContestRanking;
      const recentAc = json?.data?.recentAcSubmissionList;

      if (matched && matched.submitStats) {
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

        const allQTotal = allQ?.find((q: any) => q.difficulty === 'All')?.count || 4073;
        const easyQTotal = allQ?.find((q: any) => q.difficulty === 'Easy')?.count || 969;
        const medQTotal = allQ?.find((q: any) => q.difficulty === 'Medium')?.count || 2124;
        const hardQTotal = allQ?.find((q: any) => q.difficulty === 'Hard')?.count || 980;

        const totalSolvedCount = allAc?.count ?? 125;
        const totalSubmissions = allTot?.submissions ?? 169;
        const acceptedSubmissions = allAc?.submissions ?? 140;

        const acRateNum = totalSubmissions > 0
          ? Number(((acceptedSubmissions / totalSubmissions) * 100).toFixed(1))
          : 82.8;

        const easySub = easyTot?.submissions ?? 87;
        const easyAcc = easyAc?.submissions ?? 71;
        const easyRate = easySub > 0 ? `${((easyAcc / easySub) * 100).toFixed(1)}%` : '81.6%';

        const medSub = medTot?.submissions ?? 66;
        const medAcc = medAc?.submissions ?? 55;
        const medRate = medSub > 0 ? `${((medAcc / medSub) * 100).toFixed(1)}%` : '83.3%';

        const hardSub = hardTot?.submissions ?? 16;
        const hardAcc = hardAc?.submissions ?? 14;
        const hardRate = hardSub > 0 ? `${((hardAcc / hardSub) * 100).toFixed(1)}%` : '87.5%';

        const contestAttended = contestData?.attendedContestsCount || 0;
        const contestRating = contestData?.rating ? Math.round(contestData.rating) : null;
        const contestRanking = contestData?.globalRanking || null;
        const contestStatus = contestRating
          ? `${contestRating} Rating`
          : 'Unrated (0 Contests Attended)';

        const recentSubmissions = Array.isArray(recentAc) && recentAc.length > 0
          ? recentAc.map((sub: any) => ({
              id: String(sub.id),
              title: sub.title,
              titleSlug: sub.titleSlug,
              timestamp: typeof sub.timestamp === 'string' ? Number(sub.timestamp) : sub.timestamp,
              url: `https://leetcode.com/problems/${sub.titleSlug}/`,
            }))
          : fallbackData.recentSubmissions;

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

        const compiledStats = {
          username: 'PtVRqr4rhF',
          profileUrl: 'https://leetcode.com/u/PtVRqr4rhF/',
          totalSolved: String(totalSolvedCount),
          solvedNumber: totalSolvedCount,
          totalQuestions: allQTotal,
          acceptanceRate: `${acRateNum}%`,
          acceptanceRateNumber: acRateNum,
          totalSubmissions,
          acceptedSubmissions,
          ranking: matched.profile?.ranking || 1416809,
          rankingDisplay: matched.profile?.ranking ? `#${matched.profile.ranking.toLocaleString()}` : '#1,416,809',
          streak: matched.userCalendar?.streak ?? 40,
          totalActiveDays: matched.userCalendar?.totalActiveDays ?? 55,
          contestRating,
          contestRanking,
          contestAttended,
          contestStatus,
          recentSubmissions,
          categories: {
            easy: {
              solved: easyAc?.count ?? 64,
              total: easyQTotal,
              submissions: easySub,
              accepted: easyAcc,
              acceptanceRate: easyRate,
              color: '#22c55e',
            },
            medium: {
              solved: medAc?.count ?? 51,
              total: medQTotal,
              submissions: medSub,
              accepted: medAcc,
              acceptanceRate: medRate,
              color: '#ffd43b',
            },
            hard: {
              solved: hardAc?.count ?? 10,
              total: hardQTotal,
              submissions: hardSub,
              accepted: hardAcc,
              acceptanceRate: hardRate,
              color: '#ef4444',
            },
          },
          languages: Array.isArray(matched.languageProblemCount) && matched.languageProblemCount.length > 0
            ? matched.languageProblemCount
            : fallbackData.languages,
          topTopics: allTags.length > 0 ? allTags.slice(0, 15) : fallbackData.topTopics,
          lastSynchronized: new Date().toISOString(),
          isLive: true,
        };

        leetcodeCache = { data: compiledStats, timestamp: now };
        return res.json({ cached: false, ...compiledStats });
      }
    }
  } catch (e) {
    // Graceful fallback to verified stats
  }

  leetcodeCache = { data: fallbackData, timestamp: now };
  return res.json({ cached: false, fallback: true, ...fallbackData });
});

// 4. Contact Form endpoint with input validation
const contactMessages: Array<{ name: string; email: string; message: string; date: string }> = [];

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Please enter your name.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ error: 'Message must be at least 5 characters long.' });
  }

  const record = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  };

  contactMessages.push(record);
  console.log(`[Contact Form Received] From: ${record.name} <${record.email}>`);

  return res.json({
    success: true,
    message: 'Message dispatched into runtime. Thank you for connecting, Somesh will respond promptly!',
    record,
  });
});

// Initialize dev server with Vite middlewares or static files for prod
async function bootstrap() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Somesh Portfolio Runtime listening on http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
});
