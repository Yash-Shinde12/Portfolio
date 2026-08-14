import { motion } from "framer-motion";
import { CONFIG } from "../config";

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
    <section id="skills" style={{ position: "relative", zIndex: 10 }}>
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="eyebrow">Tech Stack</p>
          <h2 className="section-title">
            Skills &amp; <span style={{ color: "var(--accent)" }}>Tools</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
          {Object.entries(CONFIG.skills).map(([cat, techs]) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
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
                viewport={{ once: true, amount: 0.2 }}
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
    </section>
  );
}
