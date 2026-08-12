import { motion } from "framer-motion";
import { Mail, Download, ChevronDown } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./GithubIcon";
import { CONFIG } from "../config";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 clamp(1rem, 5vw, 3rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div
        className="hero-orb"
        style={{
          width: 600,
          height: 600,
          top: "-15%",
          left: "60%",
          background: "rgba(139,92,246,0.08)",
        }}
      />
      <div
        className="hero-orb"
        style={{
          width: 400,
          height: 400,
          bottom: "10%",
          left: "-5%",
          background: "rgba(139,92,246,0.05)",
        }}
      />

      {/* Grid bg */}
      <div
        className="grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: "2rem",
            padding: "6px 14px",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.2)",
            borderRadius: 999,
          }}
        >
          <span className="online-dot" />
          <span
            className="mono"
            style={{ fontSize: "0.7rem", fontWeight: 600, color: "#22c55e", letterSpacing: "0.12em" }}
          >
            ONLINE
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: "0.5rem",
          }}
        >
          {CONFIG.name}
        </motion.h1>

        {/* Level badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ marginBottom: "1.25rem" }}
        >
          <span
            className="mono"
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              color: "var(--color-accent)",
              textTransform: "uppercase",
            }}
          >
            LVL {CONFIG.level} • DEVELOPER
          </span>
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            fontWeight: 400,
            color: "var(--color-text-secondary)",
            marginBottom: "1rem",
          }}
        >
          {CONFIG.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            color: "var(--color-text-muted)",
            maxWidth: 560,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            fontStyle: "italic",
          }}
        >
          "{CONFIG.tagline}"
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
          }}
        >
          <a href="#projects" className="btn-primary" id="hero-view-projects">
            VIEW PROJECTS
          </a>
          <a
            href={CONFIG.resume}
            download
            className="btn-outline"
            id="hero-download-resume"
          >
            <Download size={16} />
            DOWNLOAD RESUME ↓
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
        >
          {[
            { href: CONFIG.github, icon: <GithubIcon size={18} />, label: "GitHub" },
            { href: CONFIG.linkedin, icon: <LinkedinIcon size={18} />, label: "LinkedIn" },
            { href: `mailto:${CONFIG.email}`, icon: <Mail size={18} />, label: "Email" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={s.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "var(--color-text-muted)",
                fontSize: "0.8rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "color 0.2s",
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent-bright)";
                e.currentTarget.style.borderColor = "rgba(139,92,246,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {s.icon}
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          color: "var(--color-text-muted)",
        }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
