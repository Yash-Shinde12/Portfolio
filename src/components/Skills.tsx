import { motion } from "framer-motion";
import { CONFIG } from "../config";
import { useInView } from "../hooks/useInView";

const EQUIPPED_LABELS = ["EQUIPPED", "UNLOCKED", "INSTALLED", "ACTIVE", "MASTERED"];

function getLabel(tech: string): string {
  // Deterministically pick a label based on tech name
  const idx = tech.charCodeAt(0) % EQUIPPED_LABELS.length;
  return EQUIPPED_LABELS[idx];
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

export default function Skills() {
  const [ref, inView] = useInView();

  return (
    <section
      id="skills"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid rgba(139,92,246,0.08)",
        borderBottom: "1px solid rgba(139,92,246,0.08)",
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
          <p className="section-label">TECH STACK</p>
          <h2 className="section-title">Skills & Tools</h2>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {Object.entries(CONFIG.skills).map(([category, techs], catIdx) => (
            <motion.div
              key={category}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={catIdx + 1}
            >
              {/* Category label */}
              <p
                className="mono"
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "var(--color-text-muted)",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                — {category}
              </p>

              {/* Tag row */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {(techs as readonly string[]).map((tech) => (
                  <div key={tech} className="skill-tag">
                    {tech}
                    <span className="tag-tooltip">{getLabel(tech)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
