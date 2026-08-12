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

export default function About() {
  const [ref, inView] = useInView();

  const info = [
    { label: "LOCATION", value: CONFIG.location },
    { label: "ROLE", value: CONFIG.role },
    { label: "CURRENTLY", value: CONFIG.currently },
  ];

  return (
    <section id="about">
      <div className="section-padding" ref={ref as React.RefObject<HTMLDivElement>}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
        >
          <p className="section-label">ABOUT</p>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            Who I Am
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          style={{
            fontSize: "1.05rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.8,
            maxWidth: 680,
            marginBottom: "2.5rem",
          }}
        >
          {CONFIG.about}
        </motion.p>

        {/* Info row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {info.map((item) => (
            <div key={item.label} className="info-card">
              <span
                className="mono"
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: "var(--color-accent)",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
