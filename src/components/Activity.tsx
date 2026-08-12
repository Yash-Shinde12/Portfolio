import { motion } from "framer-motion";
import { GitCommitHorizontal, Star, BookOpen } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { CONFIG } from "../config";
import { useInView } from "../hooks/useInView";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Activity() {
  const [ref, inView] = useInView();

  const stats = [
    { icon: <BookOpen size={22} />, value: CONFIG.githubStats.repos, label: "Public Repos" },
    { icon: <GitCommitHorizontal size={22} />, value: CONFIG.githubStats.contributions, label: "Contributions" },
    { icon: <Star size={22} />, value: CONFIG.githubStats.stars, label: "Stars Earned" },
  ];

  return (
    <section
      id="activity"
      style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}
    >
      <div
        className="section-padding"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="section-label">PLAYER ACTIVITY</p>
          <h2 className="section-title" style={{ marginBottom: "0.4rem" }}>
            GitHub Stats
          </h2>
          <p
            className="mono"
            style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}
          >
            RECENT BUILDS
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="gh-stat"
              style={{ flex: "1 1 140px" }}
            >
              <span style={{ color: "var(--color-accent)" }}>{stat.icon}</span>
              <span
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--color-text-muted)",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* GitHub contribution graph embed */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          style={{
            background: "var(--color-bg-card)",
            border: "1px solid var(--color-border)",
            borderRadius: 12,
            padding: "1.5rem",
            marginBottom: "1.5rem",
            overflow: "hidden",
          }}
        >
          <p
            className="mono"
            style={{
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "var(--color-text-muted)",
              marginBottom: "1rem",
            }}
          >
            CONTRIBUTION GRAPH
          </p>
          <img
            src={`https://ghchart.rshah.org/8b5cf6/${CONFIG.githubUsername}`}
            alt={`${CONFIG.name} GitHub contribution graph`}
            style={{
              width: "100%",
              borderRadius: 6,
              opacity: 0.85,
            }}
            loading="lazy"
          />
        </motion.div>

        {/* GitHub link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={3}
        >
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="activity-github-link"
          >
            <GithubIcon size={16} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
