export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  score: string;
  notes?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  tag: string;
  organization: string;
  highlight: boolean;
  details: string;
}

export const PROFILE = {
  name: "Somesh Chandra Behera",
  role: "AI/ML Engineer",
  degree: "3rd Year B.Tech CSE Student",
  university: "Veer Surendra Sai University of Technology (VSSUT), Burla",
  cgpa: "7.71 / 10.00",
  cgpaDetails: "Till 4th Semester (Coursework ongoing through 6th)",
  tagline: "Computer Science student building intelligent systems with Python.",
  email: "someshbehera0908@gmail.com",
  github: "https://github.com/Someshx98",
  linkedin: "https://www.linkedin.com/in/somesh-chandra-behera-918242315/",
  leetcode: "https://leetcode.com/u/PtVRqr4rhF/",
  location: "Burla, Odisha, India",
  interests: [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Deep Learning",
    "Algorithms & Data Structures"
  ],
  metrics: {
    projectsCount: "11",
    leetcodeSolved: "125",
    leetcodeAcceptance: "82.8%",
    sihStatus: "FINALIST",
    sihYear: "2025"
  }
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: "btech",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Veer Surendra Sai University of Technology (VSSUT)",
    location: "Burla, Odisha",
    score: "CGPA: 7.71 / 10.00",
    notes: "3rd Year · Focus on Machine Learning, Algorithms, Operating Systems, and Database Systems"
  },
  {
    id: "higher-secondary",
    degree: "Higher Secondary (12th Standard)",
    institution: "Triveni Academy Higher Secondary School",
    location: "Bhubaneswar, Odisha",
    score: "85%",
    notes: "Science Stream (Mathematics, Physics, Chemistry, Computer Science)"
  },
  {
    id: "matriculation",
    degree: "Matriculation (10th Standard)",
    institution: "Saraswata Secondary School and Vocational Education",
    location: "Puri, Odisha",
    score: "85%",
    notes: "Foundational mathematics, science, and scholastic excellence"
  }
];

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    id: "sih-2025",
    title: "Smart India Hackathon 2025",
    tag: "FINALIST",
    organization: "Ministry of Education & AICTE",
    highlight: true,
    details: "Qualified as Finalist in India's premier nationwide innovation hackathon, competing against thousands of teams to engineer production software solutions for national problem statements."
  },
  {
    id: "umich",
    title: "AI & Data Science Specialized Coursework",
    tag: "COURSEWORK",
    organization: "University of Michigan",
    highlight: false,
    details: "Rigorous academic coursework in machine learning fundamentals, data science pipelines, statistical analysis, and applied Python computational techniques."
  },
  {
    id: "uc-davis",
    title: "SQL & Relational Database Engineering",
    tag: "COURSEWORK",
    organization: "UC Davis",
    highlight: false,
    details: "Advanced SQL querying, schema optimization, transactional modeling, and data preparation for analytical workloads."
  },
  {
    id: "leetcode-achievement",
    title: "Competitive Problem Solving",
    tag: "125 SOLVED",
    organization: "LeetCode",
    highlight: false,
    details: "Solved 125 algorithmic problems with an 82.8% acceptance rate across Dynamic Programming, Arrays, Two Pointers, and Binary Search."
  }
];
