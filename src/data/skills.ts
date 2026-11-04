export interface PipPackage {
  name: string;
  version: string;
  category: "Core Math" | "Data Manipulation" | "Visualization" | "Modeling & ML" | "Vision";
  summary: string;
}

export interface SkillCategory {
  title: string;
  command: string;
  skills: {
    name: string;
    description: string;
    highlight?: boolean;
  }[];
}

export const PIP_PACKAGES: PipPackage[] = [
  {
    name: "numpy",
    version: "1.26.4",
    category: "Core Math",
    summary: "N-dimensional vectorization, matrix algebra, Fourier transforms, and broadcasting ops."
  },
  {
    name: "pandas",
    version: "2.2.1",
    category: "Data Manipulation",
    summary: "High-performance DataFrames, time-series indexing, aggregation pipelines, and ETL."
  },
  {
    name: "scipy",
    version: "1.12.0",
    category: "Core Math",
    summary: "Scientific computing routines: optimization, numerical integration, and statistics."
  },
  {
    name: "matplotlib",
    version: "3.8.3",
    category: "Visualization",
    summary: "Publication-quality 2D/3D charts, loss curve plotting, and statistical figures."
  },
  {
    name: "seaborn",
    version: "0.13.2",
    category: "Visualization",
    summary: "Statistical data visualization built on Matplotlib for heatmaps and distributions."
  },
  {
    name: "plotly",
    version: "5.19.0",
    category: "Visualization",
    summary: "Interactive dynamic charting, 3D scatter plots, and dashboard visualizations."
  },
  {
    name: "scikit-learn",
    version: "1.4.1",
    category: "Modeling & ML",
    summary: "Supervised and unsupervised learning, cross-validation, dimensionality reduction."
  },
  {
    name: "pytorch",
    version: "2.2.1",
    category: "Modeling & ML",
    summary: "Tensor computation with GPU acceleration, autograd, and deep neural network layers."
  },
  {
    name: "opencv-python",
    version: "4.9.0",
    category: "Vision",
    summary: "Real-time computer vision, Haar cascades, facial landmarks, and frame processing."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "PROGRAMMING",
    command: "$ which compilers && python3 --version",
    skills: [
      { name: "Python", description: "Primary language for AI/ML pipelines, scripting, OOP, and data science.", highlight: true },
      { name: "C++", description: "Performance-critical algorithms, competitive programming, and STL structures.", highlight: true },
      { name: "C", description: "Systems programming, memory management, and hardware-level computing fundamentals." },
      { name: "JavaScript", description: "Interactive full-stack web interfaces, asynchronous event loop, and Node.js." }
    ]
  },
  {
    title: "AI / ML",
    command: "$ python -c 'import torch, sklearn, cv2; print(\"ML Runtime Ready\")'",
    skills: [
      { name: "Machine Learning", description: "Regression, classification, clustering, ensemble models, and hyperparameter tuning.", highlight: true },
      { name: "Deep Learning", description: "Neural network architectures, backprop optimization, loss curves, and PyTorch.", highlight: true },
      { name: "Computer Vision", description: "OpenCV image filtering, face recognition embeddings, and video stream analysis." },
      { name: "Data Analysis", description: "Exploratory data analysis (EDA), statistical inference, and data wrangling." }
    ]
  },
  {
    title: "BACKEND",
    command: "$ uvicorn app:main --reload --port 8000",
    skills: [
      { name: "Django", description: "Robust Python web framework with ORM, authentication, and admin panels.", highlight: true },
      { name: "Node.js & Express", description: "Event-driven asynchronous backend services and middleware pipelines." },
      { name: "REST APIs", description: "RESTful architecture, JSON serialization, endpoint routing, and API security." }
    ]
  },
  {
    title: "DATABASE",
    command: "$ mongosh --eval 'db.stats()' && mysql -u root",
    skills: [
      { name: "MongoDB", description: "Document-oriented NoSQL storage, schema aggregation pipelines, and indexing.", highlight: true },
      { name: "MySQL", description: "Relational database design, ACID compliance, complex JOINs, and query optimization." }
    ]
  },
  {
    title: "TOOLS & ENVIRONMENT",
    command: "$ git status && uname -a",
    skills: [
      { name: "Git & GitHub", description: "Branching workflows, version control, CI/CD collaboration, and open-source.", highlight: true },
      { name: "VS Code", description: "Configured developer environment with Python debuggers, linters, and extensions." },
      { name: "Linux / Bash", description: "Command-line automation, shell scripting, process monitoring, and package management." }
    ]
  }
];
