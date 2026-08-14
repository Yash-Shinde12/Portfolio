// ============================================================
// config.ts — Edit THIS FILE to update your portfolio data
// ============================================================

export const CONFIG = {
  // ── PERSONAL ──────────────────────────────────────────────
  name: "Yash Shinde",
  title: "Computer Science Student & Developer",
  tagline:
    "A dedicated engineering student building real-time dashboards, DevOps automation pipelines, and IoT systems.",
  portrait: "/imag3.png",

  location: "Belagavi, Karnataka, India",

  // ── LINKS ─────────────────────────────────────────────────
  github: "https://github.com/Yash-Shinde12",
  linkedin: "https://linkedin.com/in/yash-shinde",
  email: "yashshinde7441@gmail.com",
  resume: "/resume.pdf", // ← Drop resume.pdf into /public/

  // ── EMAILJS CREDENTIALS ───────────────────────────────────
  emailjs: {
    serviceId: "service_0l6m5a7",
    templateId: "template_bquua4b",
    publicKey: "vq4nijLlqvlv6OWIT",
  },

  // ── GITHUB STATS ──────────────────────────────────────────
  githubUsername: "Yash-Shinde12",
  githubStats: {
    repos: 12,
    contributions: 340,
    stars: 18,
  },

  // ── STATS (hero row) ──────────────────────────────────────
  stats: [
    { value: "3+", label: "Projects" },
    { value: "8.24", label: "BE CGPA" },
    { value: "8.38", label: "Diploma CGPA" },
    { value: "10+", label: "Tech Tools" },
  ],

  // ── ABOUT ─────────────────────────────────────────────────
  about:
    "I'm a Computer Science student interested in software development, problem solving, AI/ML, and building things that actually work. I enjoy learning by creating projects and experimenting with different technologies.",

  // ── SKILLS ────────────────────────────────────────────────
  skills: {
    Languages: ["C", "C++", "Java", "Python", "JavaScript"],
    Web: ["HTML", "CSS", "React", "Node.js", "Express.js", "Flask"],
    Database: ["Oracle SQL", "MySQL", "MongoDB", "SQLite"],
    "Data / AI": ["Pandas", "NumPy", "Scikit-learn", "Machine Learning"],
    Tools: ["Git", "GitHub", "Docker", "Jenkins", "AWS", "Linux", "VS Code"],
  },

  // ── PROJECTS ──────────────────────────────────────────────
  projects: [
    {
      id: "01",
      title: "GPU Monitoring & User Management Dashboard",
      description:
        "Designed and implemented a real-time GPU/CPU monitoring system for Linux servers using psutil, streaming live metrics to a web dashboard. Built secure user authentication, session handling, inactivity tracking, and automated data processing with Pandas and Chart.js.",
      tech: ["Python", "Flask", "Pandas", "Chart.js", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/Yash-Shinde12",
      live: "",
      status: "Completed",
    },
    {
      id: "02",
      title: "DevOps Automation — CI/CD Pipeline for React Chat App",
      description:
        "Implemented an end-to-end CI/CD pipeline using Jenkins and GitHub Webhooks to automate build, test, and deployment workflows. Containerized a React-based chat application using Docker and deployed it on AWS EC2 with automated build status notifications.",
      tech: ["Docker", "Jenkins", "AWS EC2", "GitHub Webhooks", "React"],
      github: "https://github.com/Yash-Shinde12",
      live: "",
      status: "Deployed",
    },
    {
      id: "03",
      title: "IoT-based Gas Detection & Automated Booking System",
      description:
        "Developed an IoT-enabled gas monitoring system that detects leakage and low gas levels with email alerts. Applied machine learning models to predict cylinder depletion and automatically initiate gas booking via APIs, integrated with ThingSpeak and Blynk.",
      tech: ["NodeMCU ESP8266", "MQ2 Sensor", "HX711", "Python", "ThingSpeak", "Blynk", "Machine Learning"],
      github: "https://github.com/Yash-Shinde12",
      live: "",
      status: "Completed",
    },
  ],

  // ── EDUCATION ─────────────────────────────────────────────
  education: [
    {
      degree: "Bachelor of Engineering (B.E) — Computer Science",
      institution: "KLE Technological University, Belagavi, Karnataka, India",
      period: "2023 – 2026",
      description:
        "CGPA: 8.24. Core coursework in Data Structures, OOPs, DBMS, Operating Systems, Computer Networks, Machine Learning, and DevOps.",
    },
    {
      degree: "Diploma in Computer Science",
      institution: "Maratha Mandal Polytechnic, Belagavi, Karnataka, India",
      period: "2020 – 2023",
      description:
        "CGPA: 8.38. Strong foundation in C/C++ programming, Web Development, Database Management, and Systems Engineering.",
    },
  ],
} as const;
