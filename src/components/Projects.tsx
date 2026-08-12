import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./GithubIcon";
import { CONFIG } from "../config";
import { useInView } from "../hooks/useInView";

const STATUS_COLOR: Record<string, string> = {
  COMPLETED: "#22c55e",
  DEPLOYED: "#06b6d4",
  "IN PROGRESS": "#f59e0b",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Projects() {
  const [ref, inView] = useInView();

  return (
    <section id="projects">
      <div
        className="section-padding"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="section-label">PROJECTS</p>
          <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>
            Things I've Built
          </h2>
          <p
            className="mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
            }}
          >
            Things I've built, broken, fixed, and learned from.
          </p>
        </motion.div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
            gap: "1.5rem",
          }}
        >
          {CONFIG.projects.map((project, i) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + 1}
            >
              <div className="project-card">
                {/* Quest label row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    QUEST #{project.id}
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      color: STATUS_COLOR[project.status] ?? "var(--color-accent)",
                      background: `${STATUS_COLOR[project.status] ?? "var(--color-accent)"}18`,
                      border: `1px solid ${STATUS_COLOR[project.status] ?? "var(--color-accent)"}40`,
                      borderRadius: 4,
                      padding: "2px 8px",
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    lineHeight: 1.3,
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-secondary)",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                    flexGrow: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 500,
                        fontFamily: "var(--font-mono)",
                        color: "var(--color-accent)",
                        background: "rgba(139,92,246,0.08)",
                        border: "1px solid rgba(139,92,246,0.2)",
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    id={`project-github-${project.id}`}
                  >
                    <GithubIcon size={14} />
                    GitHub
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost"
                      id={`project-live-${project.id}`}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
