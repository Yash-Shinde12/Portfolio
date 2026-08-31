import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { CONFIG } from "../config";

const TYPING_ROLES = [
  "Computer Science Student",
  "Full-Stack Developer",
  "Cloud & DevOps Enthusiast",
  "Cloud Computing Explorer",
];

// Smooth Animated Count-Up Stat Component
function CountUpStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, "");

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;

    let start = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const totalSteps = duration / stepTime;
    const increment = targetNumber / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetNumber]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

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

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetEl = document.getElementById("projects");
    if (targetEl) {
      const lenisInstance = (window as any).lenisInstance;
      if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
        lenisInstance.scrollTo(targetEl, { offset: 15, duration: 1.1 });
      } else {
        const y = targetEl.getBoundingClientRect().top + window.scrollY + 15;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

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
      <div style={{ width: "100%" }}>
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
                Hi, I'm <span className="shimmer-name">Yash</span>
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
                  marginBottom: "0.25rem",
                }}
              >
                {CONFIG.tagline}
              </motion.p>

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.36 }}
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  marginTop: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="#projects"
                  onClick={handleScrollToProjects}
                  className="btn-primary"
                >
                  View Projects <ArrowRight size={15} />
                </a>
                <a
                  href={CONFIG.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Download size={15} /> Resume
                </a>
              </motion.div>
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
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                src={CONFIG.portrait}
                alt={`${CONFIG.name} portrait`}
                className="portrait-cutout-img"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Stats row with animated count-up */}
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
                <div className="stat-num">
                  <CountUpStat value={s.value} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
