import { motion } from "framer-motion";
import { CONFIG } from "../config";
import StaggerText from "./StaggerText";

export default function About() {
  return (
    <section id="about" style={{ position: "relative", zIndex: 10 }}>
      <div className="divider" />
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
        >
          <p className="eyebrow">About</p>
          <StaggerText text="A bit about me" accentWord="me" style={{ marginBottom: "1.5rem" }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.15 }}
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
