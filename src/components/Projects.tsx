import { motion } from "framer-motion";
import { ExternalLink, Terminal, Cpu, ArrowRight, Sparkles, Activity, Layers } from "lucide-react";
import { CONFIG } from "../config";
import { GithubIcon } from "./GithubIcon";
import StaggerText from "./StaggerText";
import SectionReveal from "./SectionReveal";

// Architecture & Pipeline data for each project
const PROJECT_METADATA: Record<
  string,
  {
    icon: typeof Cpu;
    pipelineLabel: string;
    steps: string[];
    highlights: string[];
    role: string;
  }
> = {
  "01": {
    icon: Activity,
    pipelineLabel: "Data Telemetry & Processing Flow",
    steps: ["Linux Host (psutil)", "Python / Flask API", "Pandas Analytics", "Chart.js Live UI"],
    highlights: ["Live Real-Time Telemetry", "Session Inactivity Guard", "Downloadable Reports"],
    role: "System Architecture & Full-Stack",
  },
  "02": {
    icon: Layers,
    pipelineLabel: "Automated CI/CD Deployment Flow",
    steps: ["GitHub Webhook Push", "Jenkins Automated CI", "Docker Containerization", "AWS EC2 Cloud"],
    highlights: ["Automated Webhook Triggers", "Containerized Deployment", "Build Notification Alerts"],
    role: "DevOps & Cloud Automation",
  },
  "03": {
    icon: Cpu,
    pipelineLabel: "IoT Hardware & ML Prediction Flow",
    steps: ["MQ-2 & HX711 Sensors", "NodeMCU ESP8266", "ML Depletion Predictor", "Blynk & ThingSpeak"],
    highlights: ["Automatic Leakage Alert", "API Cylinder Booking", "Live Cloud Telemetry"],
    role: "Embedded IoT & ML Engineering",
  },
};

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
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 16,
      mass: 0.8,
    },
  },
};

export default function Projects() {
  return (
    <SectionReveal id="projects">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "2.75rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <p className="eyebrow">Projects</p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.62rem",
                fontFamily: "var(--font-mono)",
                color: "var(--accent)",
                background: "var(--accent-dim)",
                padding: "2px 8px",
                borderRadius: "99px",
                fontWeight: 600,
              }}
            >
              <Sparkles size={10} /> Architecture Showcase
            </span>
          </div>
          <StaggerText text="Things I've Built" accentWord="Built" />
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bento-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "1.5rem",
          }}
        >
          {CONFIG.projects.map((p, idx) => {
            const meta = PROJECT_METADATA[p.id] ?? PROJECT_METADATA["01"];
            const Icon = meta.icon;
            const isFeatured = idx === 0; // First project is large featured Hero bento card

            return (
              <motion.div
                key={p.id}
                variants={cardSpringVariants}
                style={{
                  gridColumn: isFeatured
                    ? "span 12"
                    : "span 6",
                  display: "flex",
                }}
                className={`bento-card-wrapper ${isFeatured ? "bento-featured" : "bento-standard"}`}
              >
                <div
                  className="card"
                  style={{
                    padding: isFeatured ? "2.2rem 2.2rem" : "1.8rem 1.8rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    border: isFeatured
                      ? "1px solid rgba(217, 119, 6, 0.25)"
                      : "1px solid var(--border)",
                    boxShadow: isFeatured
                      ? "0 16px 36px -8px rgba(28, 25, 23, 0.08), 0 0 20px rgba(217, 119, 6, 0.04)"
                      : "0 8px 24px -4px rgba(28, 25, 23, 0.04)",
                  }}
                >
                  {/* Top Bar Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1.2rem",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: isFeatured
                            ? "var(--accent)"
                            : "var(--accent-dim)",
                          color: isFeatured ? "#ffffff" : "var(--accent)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <span
                          className="mono"
                          style={{
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.14em",
                            color: "var(--text-3)",
                            textTransform: "uppercase",
                          }}
                        >
                          Project #{p.id} · {meta.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    style={{
                      fontSize: isFeatured ? "1.25rem" : "1.08rem",
                      fontWeight: 700,
                      color: "var(--text-1)",
                      lineHeight: 1.28,
                      marginBottom: "0.65rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--text-2)",
                      lineHeight: 1.72,
                      marginBottom: "1.4rem",
                    }}
                  >
                    {p.description}
                  </p>

                  {/* Visual Architecture Pipeline Flow Box */}
                  <div
                    style={{
                      background: "rgba(28, 25, 23, 0.03)",
                      border: "1px solid rgba(28, 25, 23, 0.08)",
                      borderRadius: 8,
                      padding: "0.9rem 1rem",
                      marginBottom: "1.4rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "0.65rem",
                      }}
                    >
                      <Terminal size={12} style={{ color: "var(--accent)" }} />
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.58rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          color: "var(--text-3)",
                          textTransform: "uppercase",
                        }}
                      >
                        {meta.pipelineLabel}
                      </span>
                    </div>

                    {/* Step-by-Step Flow Nodes */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                    >
                      {meta.steps.map((step, sIdx) => (
                        <div
                          key={step}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <span
                            className="mono"
                            style={{
                              fontSize: "0.66rem",
                              fontWeight: 600,
                              color: "var(--text-1)",
                              background: "#ffffff",
                              border: "1px solid rgba(28, 25, 23, 0.1)",
                              padding: "3px 8px",
                              borderRadius: 5,
                              boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                            }}
                          >
                            {step}
                          </span>
                          {sIdx < meta.steps.length - 1 && (
                            <ArrowRight
                              size={11}
                              style={{ color: "var(--accent)", opacity: 0.7 }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights Tags */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.4rem",
                      marginBottom: "1.4rem",
                    }}
                  >
                    {meta.highlights.map((hl) => (
                      <span
                        key={hl}
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          color: "var(--text-2)",
                          background: "rgba(217, 119, 6, 0.05)",
                          border: "1px solid rgba(217, 119, 6, 0.12)",
                          borderRadius: 99,
                          padding: "2px 9px",
                        }}
                      >
                        ✓ {hl}
                      </span>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      marginBottom: "1.5rem",
                      marginTop: "auto",
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

                  {/* Action Links */}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-sm"
                    >
                      <GithubIcon size={12} /> Source Code
                    </a>
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost-sm"
                      >
                        <ExternalLink size={12} /> Live Demo
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
    </SectionReveal>
  );
}
