import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CONFIG } from "../config";

const TYPING_ROLES = [
  "Computer Science Student & Developer",
  "DevOps Engineer",
  "Cloud Computing Explorer",
  "Full-Stack Web Developer",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = TYPING_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const pauseTime = isDeleting ? 300 : 2000;

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayedText === currentRole) {
      // Pause at full word before deleting
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === "") {
      // Finished deleting, move to next role
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
    } else {
      // Typing or deleting character by character
      timer = setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.substring(0, displayedText.length - 1)
          : currentRole.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="section-wrap" style={{ paddingTop: "7rem" }}>
        {/* Two-column layout */}
        <div
          className="hero-grid"
          style={{ display: "flex", gap: "3.5rem", alignItems: "center" }}
        >
          {/* Left: text */}
          <div
            className="hero-left"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(2.6rem, 6vw, 3.8rem)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
                marginBottom: "0.75rem",
              }}
            >
              Hi, I'm <span style={{ color: "var(--accent)" }}>Yash</span>
            </motion.h1>

            {/* Auto-typing text */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                minHeight: "2.4rem",
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.05rem, 2.2vw, 1.35rem)",
                  fontWeight: 600,
                  color: "var(--text-1)",
                  margin: 0,
                }}
              >
                <span>{displayedText}</span>
                <span className="typewriter-cursor">|</span>
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              style={{
                fontSize: "0.95rem",
                color: "var(--text-2)",
                lineHeight: 1.75,
                maxWidth: 460,
                marginBottom: "0.5rem",
              }}
            >
              {CONFIG.tagline}
            </motion.p>
          </div>

          {/* Right: Seamless Cutout Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="portrait-cutout-wrapper"
          >
            {/* Ambient Behind Glow Halo */}
            <div className="portrait-glow-halo" />

            {/* Decorative Architectural Backdrop Ring */}
            <div className="portrait-backdrop-ring" />

            {/* Transparent Cutout Image */}
            <motion.img
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
              src={CONFIG.portrait}
              alt={`${CONFIG.name} portrait`}
              className="portrait-cutout-img"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="stats-row"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${CONFIG.stats.length}, 1fr)`,
            marginTop: "3.5rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 10,
          }}
        >
          {CONFIG.stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-num">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
