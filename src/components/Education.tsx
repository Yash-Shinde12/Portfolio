import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CONFIG } from "../config";
import StaggerText from "./StaggerText";
import SectionReveal from "./SectionReveal";
import { GraduationCap, Calendar, Award } from "lucide-react";

export default function Education() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.55"],
  });

  // Smooth spring physics on the beam
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Scale the beam height from 0% to 100% using GPU scaleY
  const beamScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  // Glow intensity increases as beam travels
  const beamGlow = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      "0 0 4px rgba(217,119,6,0.15)",
      "0 0 12px rgba(217,119,6,0.35)",
      "0 0 18px rgba(217,119,6,0.5)",
    ]
  );

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

        {/* Timeline Container */}
        <div
          ref={timelineRef}
          style={{
            position: "relative",
            paddingLeft: "3.5rem",
          }}
        >
          {/* Static base track — exact 15px center axis */}
          <div
            style={{
              position: "absolute",
              left: 15,
              transform: "translateX(-50%)",
              top: 0,
              bottom: 0,
              width: 2,
              background: "var(--ink-008)",
              borderRadius: 99,
            }}
          />

          {/* Animated beam — centered with Framer Motion x: "-50%" */}
          <motion.div
            style={{
              position: "absolute",
              left: 15,
              x: "-50%",
              top: 0,
              bottom: 0,
              width: 2,
              borderRadius: 99,
              background:
                "linear-gradient(to bottom, var(--accent) 0%, rgba(217,119,6,0.7) 60%, rgba(217,119,6,0.1) 100%)",
              transformOrigin: "top center",
              scaleY: beamScaleY,
              boxShadow: beamGlow,
              zIndex: 1,
            }}
          />

          {/* Education entries */}
          {CONFIG.education.map((edu, i) => {
            const entryStart = i / CONFIG.education.length;
            const entryEnd = (i + 0.5) / CONFIG.education.length;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 18,
                  delay: i * 0.1,
                }}
                style={{
                  position: "relative",
                  paddingBottom:
                    i < CONFIG.education.length - 1 ? "2.5rem" : 0,
                }}
              >
                {/* Timeline Dot — precisely bisected by the line through equal halves */}
                <TimelineDot
                  progress={smoothProgress}
                  threshold={[entryStart, entryEnd]}
                />

                {/* Content Card with Smooth Project-Style Hover Effects */}
                <div
                  className="card"
                  style={{
                    padding: "1.7rem 1.8rem",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    boxShadow: "0 8px 24px -4px var(--ink-shadow)",
                  }}
                >
                  {/* Header Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.85rem",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: "var(--accent-dim)",
                          border: "1px solid rgba(217,119,6,0.18)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--accent)",
                          flexShrink: 0,
                        }}
                      >
                        <GraduationCap size={18} />
                      </div>
                      <div>
                        <h3
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: "var(--text-1)",
                            lineHeight: 1.3,
                          }}
                        >
                          {edu.degree}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.84rem",
                            fontWeight: 500,
                            color: "var(--text-2)",
                            marginTop: "2px",
                          }}
                        >
                          {edu.institution}
                        </p>
                      </div>
                    </div>

                    <span
                      className="mono"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "0.64rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                        letterSpacing: "0.08em",
                        background: "var(--accent-dim)",
                        padding: "4px 10px",
                        borderRadius: 6,
                        border: "1px solid rgba(217,119,6,0.14)",
                        flexShrink: 0,
                      }}
                    >
                      <Calendar size={11} />
                      {edu.period}
                    </span>
                  </div>

                  {/* Description / Coursework details */}
                  <div
                    style={{
                      background: "var(--ink-005)",
                      border: "1px solid var(--border)",
                      borderRadius: 8,
                      padding: "0.85rem 1rem",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                    }}
                  >
                    <Award size={15} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                    <p
                      style={{
                        fontSize: "0.84rem",
                        color: "var(--text-2)",
                        lineHeight: 1.68,
                        margin: 0,
                      }}
                    >
                      {edu.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div className="divider" />
    </SectionReveal>
  );
}

/**
 * TimelineDot — Centered using Framer Motion's native `x: "-50%", y: "-50%"`
 * so that scaling does not override translation.
 * The vertical line crosses straight through its dead center into equal halves.
 */
function TimelineDot({
  progress,
  threshold,
}: {
  progress: ReturnType<typeof useSpring>;
  threshold: [number, number];
}) {
  const dotScale = useTransform(
    progress,
    [threshold[0], threshold[1]],
    [0.75, 1.05]
  );
  const dotBg = useTransform(
    progress,
    [threshold[0], threshold[1]],
    ["var(--bg)", "var(--accent)"]
  );
  const dotBorder = useTransform(
    progress,
    [threshold[0], threshold[1]],
    ["2.5px solid rgba(217,119,6,0.35)", "2.5px solid var(--accent)"]
  );
  const dotShadow = useTransform(
    progress,
    [threshold[0], threshold[1]],
    [
      "0 0 0 3px rgba(217,119,6,0.06)",
      "0 0 0 5px rgba(217,119,6,0.2), 0 0 14px rgba(217,119,6,0.35)",
    ]
  );

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "calc(15px - 3.5rem)",
        top: 30,
        x: "-50%",
        y: "-50%",
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: dotBg,
        border: dotBorder,
        boxShadow: dotShadow,
        scale: dotScale,
        zIndex: 2,
        transition: "background 0.3s ease",
      }}
    />
  );
}
