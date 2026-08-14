import { motion } from "framer-motion";
import { CONFIG } from "../config";

export default function About() {
  return (
    <section id="about" style={{ position: "relative", zIndex: 10 }}>
      <div className="divider" />
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        >
          <p className="eyebrow">About</p>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            A bit about <span style={{ color: "var(--accent)" }}>me</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.1 }}
          style={{
            fontSize: "0.98rem",
            color: "var(--text-2)",
            lineHeight: 1.85,
            maxWidth: 680,
          }}
        >
          {CONFIG.about}
        </motion.p>
      </div>
      <div className="divider" />
    </section>
  );
}
