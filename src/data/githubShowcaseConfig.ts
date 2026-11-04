/**
 * Editable Configuration for GitHub Showcase & Integration
 * 
 * This file keeps all curation settings independent of React components:
 * - Featured repository allowlist
 * - Display order
 * - Custom curated descriptions (never overwritten by GitHub API)
 * - Technology tags
 * - Live demo / documentation links
 * - Code snippets & architecture specifications
 * - Expanded case study breakdown (problem, solution, architecture, contribution)
 * - Dashboard widget visibility flags
 */

export interface ProjectCaseStudy {
  problem: string;
  solution: string;
  architecture: string;
  myContribution: string;
}

export interface FeaturedProjectConfig {
  repoName: string;
  id: string;
  order: number;
  dirName: string;
  displayName: string;
  tagline: string;
  customDescription: string;
  category: 'DSA & Algorithms' | 'AI/ML & Data Engineering' | 'Data Science & Analytics' | 'Machine Learning from Scratch';
  technologies: string[];
  features: string[];
  caseStudy: ProjectCaseStudy;
  command: string;
  codeSnippet: string;
  liveDemoUrl?: string;
  badge: string;
  status: string;
}

export interface DashboardWidgetsConfig {
  showRepoCount: boolean;
  showTotalStars: boolean;
  showLanguageDistribution: boolean;
  showRecentUpdates: boolean;
  showActivityTimeline: boolean;
}

export interface GitHubShowcaseSettings {
  username: string;
  profileUrl: string;
  allowlist: string[];
  featuredProjects: FeaturedProjectConfig[];
  widgets: DashboardWidgetsConfig;
}

export const GITHUB_SHOWCASE_CONFIG: GitHubShowcaseSettings = {
  username: 'Someshx98',
  profileUrl: 'https://github.com/Someshx98',
  // Only repositories strictly in this allowlist can appear in the Featured Projects view
  allowlist: [
    'LeetCode-365Days',
    'Data-Quality-Analyzer',
    'titanic-eda',
    'Custom_Machine_Learning_Linear_Regression_Model',
  ],
  widgets: {
    showRepoCount: true,
    showTotalStars: true,
    showLanguageDistribution: true,
    showRecentUpdates: true,
    showActivityTimeline: true,
  },
  featuredProjects: [
    {
      repoName: 'LeetCode-365Days',
      id: 'leetcode-365',
      order: 1,
      dirName: 'leetcode-365days/',
      displayName: 'LeetCode 365 Days Challenge',
      tagline: 'Continuous daily algorithmic problem-solving pipeline with benchmark tracking',
      customDescription:
        'An ongoing, daily competitive programming log documenting algorithmic problem solutions in Python and Jupyter Notebooks. Features automated LeetSync synchronization with per-problem execution runtime percentiles, memory footprints, and systematic classification across dynamic programming, two pointers, strings, and trees.',
      category: 'DSA & Algorithms',
      technologies: ['Python 3', 'LeetCode', 'Algorithms', 'Data Structures', 'Dynamic Programming', 'LeetSync'],
      features: [
        'Continuous multi-week streak tracking across structured daily directories (Day06 through Day35+)',
        'Per-submission benchmark telemetry logging runtime execution (ms & percentile) and memory usage',
        'Systematic categorization for complex string manipulation, parentheses balancing, and math',
        'Directly corroborates portfolio LeetCode telemetry (124 problems solved, 82.7% acceptance rate)',
      ],
      caseStudy: {
        problem:
          'Developing sub-quadratic problem-solving instincts requires continuous, disciplined daily practice, systematic review of asymptotic bottlenecks, and verifiable logging of execution performance.',
        solution:
          'Established an automated daily pipeline using LeetSync to commit verified Python solutions with precise runtime and space benchmarks directly from LeetCode into GitHub.',
        architecture:
          'Structured directory hierarchy organized by daily progression (DayXX/) and standardized problem slugs with automated commit messages documenting submission benchmarks.',
        myContribution:
          'Authored, optimized, and benchmarked Python solutions for competitive algorithmic problems, prioritizing optimal space complexity and sub-second runtimes.',
      },
      command: '$ python -m leetcode.runner --streak-check --recent',
      codeSnippet: `def min_insertions_balance(s: str) -> int:
    """Calculate minimum insertions needed to balance parentheses string."""
    insertions = 0
    open_count = 0
    i, n = 0, len(s)
    
    while i < n:
        if s[i] == '(':
            open_count += 1
            i += 1
        else:
            # Check for consecutive closing brackets '))'
            if i + 1 < n and s[i + 1] == ')':
                i += 2
            else:
                insertions += 1
                i += 1
                
            if open_count > 0:
                open_count -= 1
            else:
                insertions += 1
                
    return insertions + (open_count * 2)`,
      badge: 'DAILY STREAK',
      status: 'Actively Updated',
      liveDemoUrl: 'https://github.com/Someshx98/LeetCode-365Days#readme',
    },
    {
      repoName: 'Data-Quality-Analyzer',
      id: 'data-quality-analyzer',
      order: 2,
      dirName: 'data-quality-analyzer/',
      displayName: 'Data Quality Analyzer',
      tagline: 'Automated tabular dataset profiling, statistical evaluation & interactive HTML report engine',
      customDescription:
        'A comprehensive Python data engineering package designed to audit tabular CSV datasets before model training. Automatically analyzes missing value matrices, computes interquartile range (IQR) outlier boundaries, extracts column distribution statistics, and compiles interactive HTML quality reports.',
      category: 'AI/ML & Data Engineering',
      technologies: ['Python 3', 'Pandas', 'NumPy', 'HTML5/CSS', 'Data Profiling', 'IQR Outlier Detection'],
      features: [
        'Automated missing values analysis and percentage matrix computation across all columns',
        'IQR-based outlier identification and boundary classification across numerical feature columns',
        'Descriptive statistical synthesis (skewness, kurtosis, variance, quantile spreads)',
        'Interactive HTML report compilation with responsive visual charts and summary metrics',
        'Clean package architecture separating analyzer computation, reporter templates, and test suites',
      ],
      caseStudy: {
        problem:
          'Unverified, dirty datasets introduce silent bugs, distribution drift, and degraded accuracy in machine learning pipelines when ingested into model training without automated profiling.',
        solution:
          'Engineered a lightweight, zero-cloud-dependency Python profiling tool that inspects CSV data files and produces self-contained, shareable HTML audit reports.',
        architecture:
          'Decoupled analyzer engine (pure Pandas/NumPy computational pass) from reporter module (HTML templating engine) with clean CLI entry points and unit test suites.',
        myContribution:
          'Architected the modular package layout, implemented the IQR statistical boundary algorithms, and built the HTML reporting generator.',
      },
      command: '$ python -m analyzer.cli --input dataset.csv --output report.html --outliers iqr',
      codeSnippet: `import pandas as pd
import numpy as np

class DataQualityAnalyzer:
    def __init__(self, df: pd.DataFrame):
        self.df = df

    def detect_outliers_iqr(self, column: str, multiplier: float = 1.5):
        """Compute IQR boundaries and identify outlier indices."""
        q25 = self.df[column].quantile(0.25)
        q75 = self.df[column].quantile(0.75)
        iqr = q75 - q25
        lower_bound = q25 - (multiplier * iqr)
        upper_bound = q75 + (multiplier * iqr)
        
        outliers = self.df[(self.df[column] < lower_bound) | (self.df[column] > upper_bound)]
        return {
            "column": column,
            "outlier_count": len(outliers),
            "outlier_ratio": len(outliers) / len(self.df),
            "bounds": (lower_bound, upper_bound)
        }`,
      badge: 'FEATURED TOOL',
      status: 'Production Ready',
      liveDemoUrl: 'https://github.com/Someshx98/Data-Quality-Analyzer#readme',
    },
    {
      repoName: 'titanic-eda',
      id: 'titanic-eda',
      order: 3,
      dirName: 'titanic-eda/',
      displayName: 'Titanic Survival EDA & Feature Engineering',
      tagline: 'Deep exploratory data analysis, statistical hypothesis testing & predictive feature transformations',
      customDescription:
        'A comprehensive 1.39 MB Jupyter Notebook research project dissecting the classic Titanic passenger dataset. Evaluates socio-economic survival correlations, analyzes class and demographic variance, imputes non-random missing values, and crafts predictive engineered features (family unit sizes, title extraction, deck binning) for downstream model training.',
      category: 'Data Science & Analytics',
      technologies: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Feature Engineering'],
      features: [
        'Multi-layered survival rate correlation by socio-economic class, gender, and age brackets',
        'Family size synthesis (combining SibSp & Parch into discrete family status cohorts)',
        'Honorific title extraction and binning from unstructured passenger names',
        'Cabin deck imputation and fare-bracket normalization to mitigate positive distribution skew',
        'Accompanied by a dedicated technical research writeup (PROJECT_WRITEUP.md)',
      ],
      caseStudy: {
        problem:
          'Raw demographic datasets suffer from missing values, heavy skewness, and subtle interaction effects that baseline models fail to capture without deliberate domain feature engineering.',
        solution:
          'Conducted a deep exploratory investigation with statistical visual distributions, extracting informative latent signals like social hierarchy from name titles and ticket clusters.',
        architecture:
          'Iterative Jupyter data pipeline structured into Data Hygiene, Univariate Exploration, Bivariate Interactions, and Feature Engineering stages.',
        myContribution:
          'Formulated the feature engineering logic, generated publication-grade Seaborn distribution charts, and authored the comprehensive project writeup.',
      },
      command: '$ jupyter nbconvert --to html titanic_eda_feature_engineering.ipynb',
      codeSnippet: `import pandas as pd
import numpy as np

def engineer_titanic_features(df: pd.DataFrame) -> pd.DataFrame:
    """Extract predictive signals from passenger names and family structures."""
    # Extract honorific title from passenger name
    df['Title'] = df['Name'].str.extract(r' ([A-Za-z]+)\\.', expand=False)
    df['Title'] = df['Title'].replace(['Lady', 'Countess', 'Sir', 'Jonkheer', 'Don'], 'Noble')
    df['Title'] = df['Title'].replace(['Mlle', 'Ms'], 'Miss').replace('Mme', 'Mrs')
    
    # Family size and singleton indicator
    df['FamilySize'] = df['SibSp'] + df['Parch'] + 1
    df['IsAlone'] = (df['FamilySize'] == 1).astype(int)
    
    # Fare binning using quantile cuts to handle positive skew
    df['FareBin'] = pd.qcut(df['Fare'], q=4, labels=['Low', 'Medium', 'High', 'VeryHigh'])
    return df`,
      badge: 'DATA SCIENCE',
      status: 'Complete Analysis',
      liveDemoUrl: 'https://github.com/Someshx98/titanic-eda#readme',
    },
    {
      repoName: 'Custom_Machine_Learning_Linear_Regression_Model',
      id: 'custom-linear-regression',
      order: 4,
      dirName: 'custom-linear-regression/',
      displayName: 'Custom Linear Regression Engine',
      tagline: 'From-scratch gradient descent optimization engine with interactive Streamlit comparative UI',
      customDescription:
        'A machine learning regression engine written completely from first principles using NumPy and Pandas—implementing batch gradient descent, loss calculation (MSE), and weight update formulas without importing scikit-learn. Accompanied by a real-time Streamlit dashboard allowing users to tune learning rates, epochs, and observe convergence curves live.',
      category: 'Machine Learning from Scratch',
      technologies: ['Python', 'NumPy', 'Pandas', 'Streamlit', 'Gradient Descent', 'Loss Optimization', 'Mathematics'],
      features: [
        'Pure mathematical gradient descent optimizer implemented without scikit-learn estimators',
        'Dynamic Mean Squared Error (MSE) cost tracking across iterative training epochs',
        'Interactive Streamlit UI with hyperparameter sliders for learning rate (alpha) and epochs',
        'Real-time regression hyperplane visualization against empirical scatter distributions',
        '1-to-1 benchmark comparison validating convergence against analytical OLS solutions',
      ],
      caseStudy: {
        problem:
          'Many engineers treat machine learning algorithms as black boxes by relying on sklearn without grasping convergence mechanics, learning rate sensitivity, or loss gradient derivations.',
        solution:
          'Built an educational and verified regression engine from scratch using vectorized NumPy matrix calculus, paired with a dynamic Streamlit GUI for visual inspection.',
        architecture:
          'Modular separation between mathematical optimization (engine.py) and interactive reactive visualization (app.py).',
        myContribution:
          'Derived and coded the gradient descent cost-minimization equations, vectorized matrix calculations in NumPy, and built the Streamlit visualizer.',
      },
      command: '$ streamlit run app.py --server.port 8501',
      codeSnippet: `import numpy as np

class CustomLinearRegression:
    """Linear Regression implemented from first mathematical principles."""
    def __init__(self, learning_rate: float = 0.01, epochs: int = 1000):
        self.lr = learning_rate
        self.epochs = epochs
        self.weights = None
        self.bias = 0.0
        self.loss_history = []

    def fit(self, X: np.ndarray, y: np.ndarray):
        n_samples, n_features = X.shape
        self.weights = np.zeros(n_features)
        
        for epoch in range(self.epochs):
            # Forward pass: y_pred = Xw + b
            y_pred = np.dot(X, self.weights) + self.bias
            
            # Cost computation (Mean Squared Error)
            loss = np.mean((y - y_pred) ** 2)
            self.loss_history.append(loss)
            
            # Compute analytical partial derivatives
            dw = -(2 / n_samples) * np.dot(X.T, (y - y_pred))
            db = -(2 / n_samples) * np.sum(y - y_pred)
            
            # Gradient descent parameter update
            self.weights -= self.lr * dw
            self.bias -= self.lr * db`,
      badge: 'ALGORITHMIC ML',
      status: 'Interactive Web Engine',
      liveDemoUrl: 'https://github.com/Someshx98/Custom_Machine_Learning_Linear_Regression_Model#readme',
    },
  ],
};
