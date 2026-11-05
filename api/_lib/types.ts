export interface ApiRequest {
  method?: string;
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, any>;
}

export interface ApiResponse {
  status: (statusCode: number) => ApiResponse;
  json: (body: any) => void;
  setHeader: (name: string, value: string | number | readonly string[]) => ApiResponse;
  send?: (body: any) => void;
  end?: () => void;
}

export interface ActivityItem {
  type: string;
  repo: string;
  date: string;
  message: string;
  author: string;
}

export interface LanguageDistributionItem {
  bytes: number;
  percentage: number;
}

export interface PublicRepo {
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

export interface GitHubTelemetryData {
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
  pinned_or_recent?: PublicRepo[];
  lastSynchronized?: string;
  isLive?: boolean;
  cached?: boolean;
  fallback?: boolean;
}

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
  fallback?: boolean;
  provider?: string;
}
