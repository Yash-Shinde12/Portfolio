import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./GithubIcon";
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

export default function Contact() {
  const [ref, inView] = useInView();

  return (
    <section
      id="contact"
      style={{
        background: "var(--color-bg-secondary)",
        borderTop: "1px solid rgba(139,92,246,0.08)",
      }}
    >
      <div
        className="section-padding"
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ textAlign: "center" }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          style={{ marginBottom: "1.25rem" }}
        >
          <p className="section-label" style={{ justifyContent: "center", display: "flex" }}>
            CONTACT
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            LET'S BUILD
            <span style={{ color: "var(--color-accent)" }}> SOMETHING.</span>
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
            maxWidth: 500,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Have an idea, opportunity, or interesting project? Let's talk.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "3rem",
          }}
        >
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="contact-github"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          <a
            href={CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            id="contact-linkedin"
          >
            <LinkedinIcon size={16} />
            LinkedIn
          </a>
          <a
            href={`mailto:${CONFIG.email}`}
            className="btn-primary"
            id="contact-email"
          >
            <Mail size={16} />
            Send Email
          </a>
        </motion.div>

        {/* Status footer tag */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={3}
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
              borderRadius: 999,
            }}
          >
            <span className="online-dot" />
            <span
              className="mono"
              style={{
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                color: "#22c55e",
              }}
            >
              STATUS: ONLINE
            </span>
          </div>
          <span
            className="mono"
            style={{
              fontSize: "0.62rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "var(--color-text-muted)",
            }}
          >
            READY FOR THE NEXT QUEST
          </span>
        </motion.div>
      </div>
    </section>
  );
}
