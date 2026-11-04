import { GITHUB_SHOWCASE_CONFIG, FeaturedProjectConfig, ProjectCaseStudy } from './githubShowcaseConfig';

export interface ProjectStats {
  language: string;
  files: number;
  stars?: number;
  forks?: number;
  status: string;
}

export interface Project {
  id: string;
  slug: string;
  dirName: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  command: string;
  codeSnippet: string;
  badge?: string;
  order: number;
  caseStudy: ProjectCaseStudy;
  stats: ProjectStats;
}

export const PROJECTS: Project[] = GITHUB_SHOWCASE_CONFIG.featuredProjects
  .filter((fp) => GITHUB_SHOWCASE_CONFIG.allowlist.includes(fp.repoName))
  .sort((a, b) => a.order - b.order)
  .map((fp) => ({
    id: fp.id,
    slug: fp.id,
    dirName: fp.dirName,
    name: fp.displayName,
    tagline: fp.tagline,
    description: fp.customDescription,
    category: fp.category,
    technologies: fp.technologies,
    features: fp.features,
    githubUrl: `https://github.com/${GITHUB_SHOWCASE_CONFIG.username}/${fp.repoName}`,
    liveDemoUrl: fp.liveDemoUrl,
    command: fp.command,
    codeSnippet: fp.codeSnippet,
    badge: fp.badge,
    order: fp.order,
    caseStudy: fp.caseStudy,
    stats: {
      language: fp.technologies[0] || 'Python',
      files: fp.features.length,
      stars: 0,
      forks: 0,
      status: fp.status,
    },
  }));
