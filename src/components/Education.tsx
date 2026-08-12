import { motion } from "framer-motion";
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

export default function Education() {
  const [ref, inView] = useInView();

  return (
    <section
      id="education"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid rgba(139,92,246,0.08)",
      }}
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
          <p className="section-label">EDUCATION</p>
          <h2 className="section-title">Academic Journey</h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {CONFIG.education.map((edu, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + 1}
            >
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  position: "relative",
                }}
              >
                {/* Left: checkpoint */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    paddingTop: 4,
                  }}
                >
                  {/* Checkpoint marker */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <span
                      className="mono"
                      style={{
                        fontSize: "0.5rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        color: "var(--color-accent)",
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        opacity: 0.7,
                        display: "none",
                      }}
                    >
                      CHECKPOINT
                    </span>
                    <div className="checkpoint-dot" />
                  </div>
                  {/* Vertical line */}
                  <div
                    style={{
                      width: 1,
                      flex: 1,
                      minHeight: 40,
                      background: "linear-gradient(to bottom, rgba(139,92,246,0.4), transparent)",
                    }}
                  />
                </div>

                {/* Right: content */}
                <div style={{ flex: 1, paddingBottom: "1rem" }}>
                  {/* CHECKPOINT label above */}
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "var(--color-accent)",
                      marginBottom: "0.5rem",
                      display: "block",
                      opacity: 0.8,
                    }}
                  >
                    ▸ CHECKPOINT
                  </span>

                  <h3
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--color-text-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {edu.institution}
                  </p>
                  <p
                    className="mono"
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--color-text-muted)",
                      marginBottom: "1rem",
                    }}
                  >
                    {edu.period}
                  </p>

                  {/* Core subjects */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {edu.areas.map((area) => (
                      <span
                        key={area}
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 500,
                          color: "var(--color-text-muted)",
                          background: "rgba(139,92,246,0.06)",
                          border: "1px solid rgba(139,92,246,0.12)",
                          borderRadius: 4,
                          padding: "2px 8px",
                        }}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
