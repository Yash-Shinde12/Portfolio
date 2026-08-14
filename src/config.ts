// ============================================================
// config.ts — Edit THIS FILE to update your portfolio data
// ============================================================

export const CONFIG = {
  // ── PERSONAL ──────────────────────────────────────────────
  name: "Yash Shinde",
  title: "Computer Science Student & Developer",
  tagline:
    "I build software, explore new technologies, and turn ideas into working products.",
  portrait: "/imag3.png",

  location: "India",

  // ── LINKS ─────────────────────────────────────────────────
  github: "https://github.com/yash-shinde",
  linkedin: "https://linkedin.com/in/yash-shinde",
  email: "yashshinde7441@gmail.com",
  resume: "/resume.pdf", // ← Drop resume.pdf into /public/

  // ── EMAILJS CREDENTIALS ───────────────────────────────────
  emailjs: {
    serviceId: "service_0l6m5a7",
    templateId: "template_bquua4b", // ← Paste your EmailJS Template ID here (e.g. template_xxxx)
    publicKey: "vq4nijLlqvlv6OWIT",  // ← Paste your EmailJS Public Key here (from Account settings)
  },

  // ── GITHUB STATS ──────────────────────────────────────────
  githubUsername: "yash-shinde",
  githubStats: {
    repos: 12,
    contributions: 340,
    stars: 18,
  },

  // ── STATS (hero row) ──────────────────────────────────────
  stats: [
    { value: "3+", label: "Projects" },
    { value: "12+", label: "Repos" },
    { value: "340+", label: "Commits" },
    { value: "5+", label: "Tech Skills" },
  ],

  // ── ABOUT ─────────────────────────────────────────────────
  about:
    "I'm a Computer Science student interested in software development, problem solving, AI/ML, and building things that actually work. I enjoy learning by creating projects and experimenting with different technologies.",

  // ── SKILLS ────────────────────────────────────────────────
  skills: {
    Languages: ["C", "C++", "Java", "Python", "JavaScript"],
    Web: ["HTML", "CSS", "React", "Node.js", "Express.js"],
    Database: ["MySQL", "MongoDB", "SQLite"],
    "Data / AI": ["Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
    Tools: ["Git", "GitHub", "Docker", "Jenkins", "Linux"],
  },

  // ── PROJECTS ──────────────────────────────────────────────
  projects: [
    {
      id: "01",
      title: "Enhanced Anomaly Detection in Web Traffic",
      description:
        "Machine learning system for detecting anomalous web traffic using an ensemble of classifiers. Achieved high accuracy on imbalanced datasets using SMOTE oversampling.",
      tech: ["Python", "Scikit-learn", "XGBoost", "SMOTE", "Pandas"],
      github: "https://github.com/yash-shinde",
      live: "",
      status: "Completed",
    },
    {
      id: "02",
      title: "Student Result Management System",
      description:
        "Full-stack web application for managing student results with role-based access control for administrators, faculty, and students.",
      tech: ["Node.js", "Express.js", "MySQL", "HTML", "CSS"],
      github: "https://github.com/yash-shinde",
      live: "",
      status: "Deployed",
    },
    {
      id: "03",
      title: "ML-Based Sentiment Analyzer",
      description:
        "Text sentiment analysis tool trained on social media datasets. Supports real-time classification of user input with confidence scoring.",
      tech: ["Python", "NLTK", "Scikit-learn", "Flask"],
      github: "https://github.com/yash-shinde",
      live: "",
      status: "Completed",
    },
    {
      id: "04",
      title: "CLI Task Manager",
      description:
        "Command-line productivity tool with local JSON persistence, tags, priorities, and due-date reminders.",
      tech: ["Python", "Click", "JSON", "Linux"],
      github: "https://github.com/yash-shinde",
      live: "",
      status: "In Progress",
    },
  ],

  // ── EDUCATION ─────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor of Engineering — Computer Science",
      institution: "Your College / University",
      period: "2023 – Present",
      description:
        "Core coursework in Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Machine Learning.",
    },
    {
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Your Junior College",
      period: "2021 – 2023",
      description: "Science stream with a focus on Mathematics and Computer Science.",
    },
  ],
} as const;
