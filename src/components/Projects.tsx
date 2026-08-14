import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CONFIG } from "../config";
import { GithubIcon } from "./GithubIcon";

const STATUS: Record<string, { color: string; bg: string; border: string }> = {
  Completed: { color: "#16a34a", bg: "rgba(22,163,74,0.06)", border: "rgba(22,163,74,0.18)" },
  Deployed: { color: "#0891b2", bg: "rgba(8,145,178,0.06)", border: "rgba(8,145,178,0.18)" },
  "In Progress": { color: "#d97706", bg: "rgba(217,119,6,0.06)", border: "rgba(217,119,6,0.18)" },
};

// Smooth Spring Physics Variant for Staggered Cards
const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardSpringVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
      mass: 0.8,
    },
  },
};

export default function Projects() {
  return (
    <section id="projects" style={{ position: "relative", zIndex: 10 }}>
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          style={{ marginBottom: "2.75rem" }}
        >
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">
            Things I've <span style={{ color: "var(--accent)" }}>Built</span>
          </h2>
        </motion.div>

        {/* Staggered Spring Cards Grid */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 440px), 1fr))",
            gap: "1.2rem",
          }}
        >
          {CONFIG.projects.map((p) => {
            const st = STATUS[p.status] ?? STATUS.Completed;
            return (
              <motion.div key={p.id} variants={cardSpringVariants}>
                <div
                  className="card"
                  style={{
                    padding: "1.8rem 1.9rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
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
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.14em",
                        color: "var(--text-3)",
                      }}
                    >
                      #{p.id}
                    </span>
                    <span
                      className="status-pill"
                      style={{
                        color: st.color,
                        background: st.bg,
                        border: `1px solid ${st.border}`,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: st.color,
                          display: "inline-block",
                        }}
                      />
                      {p.status}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 650,
                      color: "var(--text-1)",
                      lineHeight: 1.3,
                      marginBottom: "0.6rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-2)",
                      lineHeight: 1.72,
                      marginBottom: "1.2rem",
                      flex: 1,
                    }}
                  >
                    {p.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1.3rem",
                    }}
                  >
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="mono"
                        style={{
                          fontSize: "0.64rem",
                          fontWeight: 600,
                          color: "var(--accent)",
                          background: "var(--accent-dim)",
                          border: "1px solid rgba(217,119,6,0.12)",
                          borderRadius: 4,
                          padding: "2px 8px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-sm"
                    >
                      <GithubIcon size={12} /> GitHub
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost-sm"
                      >
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="divider" />
    </section>
  );
}
