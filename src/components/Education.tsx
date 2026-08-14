import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../config";
import StaggerText from "./StaggerText";
import SectionReveal from "./SectionReveal";

export default function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [beamHeight, setBeamHeight] = useState(0);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewTop = window.innerHeight * 0.6; // beam "reaches" 60% down the viewport
      const totalH = rect.height;

      // How far the top of the timeline has scrolled past the trigger point
      const progress = Math.min(
        Math.max((viewTop - rect.top) / totalH, 0),
        1
      );
      setBeamHeight(progress * totalH);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SectionReveal id="education">
      <div className="section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p className="eyebrow">Education</p>
          <StaggerText text="My Journey" accentWord="Journey" />
        </motion.div>

        {/* Timeline */}
        <div className="timeline" ref={timelineRef} style={{ position: "relative", paddingLeft: "2.5rem" }}>
          {/* Static base line */}
          <div
            style={{
              position: "absolute",
              left: 6,
              top: 0,
              bottom: 0,
              width: 2,
              background: "rgba(28, 25, 23, 0.08)",
              borderRadius: 99,
            }}
          />

          {/* Animated beam that fills on scroll */}
          <div
            className="beam-line"
            style={{
              position: "absolute",
              left: 6,
              top: 0,
              width: 2,
              height: beamHeight,
              background:
                "linear-gradient(to bottom, var(--accent), rgba(217,119,6,0.15))",
              borderRadius: 99,
              transition: "height 0.1s linear",
              boxShadow: "0 0 8px rgba(217,119,6,0.3)",
              zIndex: 1,
            }}
          />

          {/* Education entries */}
          {CONFIG.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 16,
                delay: i * 0.12,
              }}
              style={{
                position: "relative",
                paddingBottom: i < CONFIG.education.length - 1 ? "3rem" : 0,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-2.5rem",
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  border: "3px solid var(--accent)",
                  background: "var(--bg)",
                  boxShadow: "0 0 0 4px rgba(217,119,6,0.1)",
                  zIndex: 2,
                }}
              />

              {/* Content card */}
              <div
                className="card"
                style={{ padding: "1.4rem 1.6rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.6rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 650,
                      color: "var(--text-1)",
                    }}
                  >
                    {edu.degree}
                  </h3>
                  <span
                    className="mono"
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      letterSpacing: "0.08em",
                      background: "var(--accent-dim)",
                      padding: "3px 10px",
                      borderRadius: 4,
                      border: "1px solid rgba(217,119,6,0.12)",
                    }}
                  >
                    {edu.period}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: "var(--text-2)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {edu.institution}
                </p>

                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text-3)",
                    lineHeight: 1.65,
                  }}
                >
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="divider" />
    </SectionReveal>
  );
}
