import { motion } from "framer-motion";
import { CONFIG } from "../config";
import StaggerText from "./StaggerText";
import SectionReveal from "./SectionReveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
};

const chipSpring = {
  hidden: { opacity: 0, scale: 0.8, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 12,
    },
  },
};

export default function Skills() {
  return (
    <SectionReveal id="skills">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="eyebrow">Tech Stack</p>
          <StaggerText text="Skills & Tools" accentWord="Tools" />
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {Object.entries(CONFIG.skills).map(([cat, techs]) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <p
                className="mono"
                style={{
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "var(--text-3)",
                  textTransform: "uppercase",
                  marginBottom: "0.65rem",
                }}
              >
                / {cat}
              </p>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}
              >
                {(techs as readonly string[]).map((t) => (
                  <motion.span key={t} variants={chipSpring} className="chip">
                    {t}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </SectionReveal>
  );
}
